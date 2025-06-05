package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func sendJSON(w http.ResponseWriter, data any, status int) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	err := json.NewEncoder(w).Encode(data)
	if err != nil {
		return fmt.Errorf("failed json encoding: %v", err)
	}

	return nil
}

func httpHandler(handler func(w http.ResponseWriter, r *http.Request) error, middlewares ...func(w http.ResponseWriter, r *http.Request) error) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		for _, m := range middlewares {
			err := m(w, r)
			if err != nil {
				http.Error(w, err.Error(), 500)
			}
		}

		if err := handler(w, r); err != nil {
			http.Error(w, err.Error(), 500)
		}
	}
}

func runServer(mux *http.ServeMux, middlewares ...func(w http.ResponseWriter, r *http.Request) error) http.HandlerFunc {
	fmt.Println("Started http server on :5000")
	return httpHandler(func(w http.ResponseWriter, r *http.Request) error {
		mux.ServeHTTP(w, r)
		return nil
	}, middlewares...)
}

func corsMiddleware(w http.ResponseWriter, r *http.Request) error {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Authorization")

	return nil
}

func main() {
	dbLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags),
		logger.Config{
			SlowThreshold:             time.Second,
			LogLevel:                  logger.Info,
			Colorful:                  true,
			IgnoreRecordNotFoundError: false,
			ParameterizedQueries:      false,
		},
	)
	db, err := gorm.Open(sqlite.Open("./wishlify.db"), &gorm.Config{
		Logger: dbLogger,
	})
	if err != nil {
		log.Fatalf("gorm.Open failed: %v\n", err)
	}

	if err := db.AutoMigrate(&User{}, &Session{}, &Wishlist{}, &Product{}, &Image{}); err != nil {
		log.Fatalf("db.AutoMigrate failed: %v\n", err)
	}

	mux := http.NewServeMux()

	// this handler handles all routes with OPTIONS method
	// for some reason when doing POST request (any other than GET i imagine), server says fuck off to browser. idk
	// TODO: fix later. i think something's wrong in httpHandler function
	mux.HandleFunc("OPTIONS /", httpHandler(func(w http.ResponseWriter, r *http.Request) error {
		return nil
	}))

	mux.HandleFunc("GET /", httpHandler(func(w http.ResponseWriter, r *http.Request) error {
		c, err := r.Cookie("sessionid")
		if err != nil {
			return fmt.Errorf("no session cookie: %v", err)
		}
		fmt.Fprint(w, c.Value)

		return nil
	}))

	mux.HandleFunc("POST /register", httpHandler(func(w http.ResponseWriter, r *http.Request) error {
		var body struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			return fmt.Errorf("json decoding failed: %v", err)
		}

		if body.Email == "" || body.Password == "" {
			return fmt.Errorf("invalid request")
		}

		hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 12)
		if err != nil {
			return fmt.Errorf("failed while generating hash from password: %v", err)
		}

		user := User{
			Email:    body.Email,
			Password: string(hash),
		}
		if tx := db.Create(&user); tx.Error != nil {
			return fmt.Errorf("failed creating user: %v", tx.Error)
		}

		uid, err := uuid.NewV7()
		if err != nil {
			return fmt.Errorf("generating uuid failed: %v", err)
		}

		sess := Session{
			UUID:   uid.String(),
			UserID: user.ID,
		}
		if tx := db.Create(&sess); tx.Error != nil {
			return fmt.Errorf("failed saving session to db: %v", tx.Error)
		}

		http.SetCookie(w, &http.Cookie{
			Name:     "sessionid",
			Value:    sess.UUID,
			Secure:   true,
			HttpOnly: true,
			SameSite: http.SameSiteLaxMode,
			Domain:   "localhost",
			Path:     "/",
			Expires:  time.Now().Add(time.Hour * 24 * 7),
		})

		return sendJSON(w, struct{ ok bool }{true}, 201)
	}))

	mux.HandleFunc("POST /login", httpHandler(func(w http.ResponseWriter, r *http.Request) error {
		var body struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			return fmt.Errorf("json decoding failed: %v", err)
		}

		if body.Email == "" || body.Password == "" {
			return fmt.Errorf("invalid request")
		}

		var user User
		if tx := db.First(&user, "email = ?", body.Email); tx.Error != nil {
			return fmt.Errorf("couldn't find user: %v", tx.Error)
		}

		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password)); err != nil {
			return fmt.Errorf("invalid password")
		}

		uid, err := uuid.NewV7()
		if err != nil {
			return fmt.Errorf("generating uuid failed: %v", err)
		}

		sess := Session{
			UUID:   uid.String(),
			UserID: user.ID,
		}
		if tx := db.Create(&sess); tx.Error != nil {
			return fmt.Errorf("failed saving session to db: %v", tx.Error)
		}

		http.SetCookie(w, &http.Cookie{
			Name:     "sessionid",
			Value:    sess.UUID,
			Secure:   true,
			HttpOnly: true,
			SameSite: http.SameSiteLaxMode,
			Domain:   "localhost",
			Path:     "/",
			Expires:  time.Now().Add(time.Hour * 24 * 7),
		})

		return sendJSON(w, struct{ ok bool }{true}, 200)
	}))

	mux.HandleFunc("POST /logout", httpHandler(func(w http.ResponseWriter, r *http.Request) error {
		_, sess, err := getUserFromRequest(r, db)
		if err != nil {
			return err
		}

		if tx := db.Delete(sess); tx.Error != nil {
			return fmt.Errorf("failed while deleting session: %v", tx.Error)
		}

		http.SetCookie(w, &http.Cookie{
			Name:     "sessionid",
			Secure:   true,
			HttpOnly: true,
			SameSite: http.SameSiteLaxMode,
			Domain:   "localhost",
			Path:     "/",
			Expires:  time.Now().Add(time.Hour * -1),
		})

		return sendJSON(w, nil, 200)
	}))

	mux.HandleFunc("GET /user", httpHandler(func(w http.ResponseWriter, r *http.Request) error {
		user, _, err := getUserFromRequest(r, db)
		if err != nil {
			return err
		}

		return sendJSON(w, user, 200)
	}))

	mux.HandleFunc("GET /wishlists", httpHandler(func(w http.ResponseWriter, r *http.Request) error {
		user, _, err := getUserFromRequest(r, db)
		if err != nil {
			return err
		}

		wishlists := []Wishlist{}
		if tx := db.Preload("Products").Find(&wishlists, "user_id = ?", user.ID); tx.Error != nil {
			return fmt.Errorf("couldn't find wishlists: %v", tx.Error)
		}

		return sendJSON(w, wishlists, 200)
	}))

	mux.HandleFunc("POST /wishlists", httpHandler(func(w http.ResponseWriter, r *http.Request) error {
		user, _, err := getUserFromRequest(r, db)
		if err != nil {
			return err
		}

		var body struct {
			Name        string `json:"name"`
			Description string `json:"description"`
		}
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			return fmt.Errorf("json decoding request body failed: %v", err)
		}

		if body.Name == "" {
			return fmt.Errorf("invalid request")
		}

		uid, err := uuid.NewV7()
		if err != nil {
			return fmt.Errorf("generating uuid failed: %v", err)
		}

		wishlist := Wishlist{
			Name:        body.Name,
			Description: body.Description,
			UUID:        uid.String(),
			UserID:      user.ID,
			Products:    []Product{},
		}
		if tx := db.Create(&wishlist); tx.Error != nil {
			return fmt.Errorf("adding wishlist to db failed: %v", tx.Error)
		}

		return sendJSON(w, wishlist, 201)
	}))

	mux.HandleFunc("GET /wishlists/{uuid}", httpHandler(func(w http.ResponseWriter, r *http.Request) error {
		uid := r.PathValue("uuid")

		var wishlist Wishlist
		if tx := db.Preload("User").Preload("Products").First(&wishlist, "uuid = ?", uid); tx.Error != nil {
			return fmt.Errorf("wishlist not found: %v", tx.Error)
		}

		return sendJSON(w, wishlist, 200)
	}))

	mux.HandleFunc("DELETE /wishlists/{id}", httpHandler(func(w http.ResponseWriter, r *http.Request) error {
		idStr := r.PathValue("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			return fmt.Errorf("parsing id to int failed: %v", err)
		}

		user, _, err := getUserFromRequest(r, db)
		if err != nil {
			return err
		}

		var wishlist Wishlist
		if tx := db.First(&wishlist, id).Where("user_id = ?", user.ID).Delete(&wishlist, id); tx.Error != nil {
			return fmt.Errorf("wishlist not found: %v", tx.Error)
		}

		return sendJSON(w, wishlist, 200)
	}))

	mux.HandleFunc("POST /wishlists/{id}/products", httpHandler(func(w http.ResponseWriter, r *http.Request) error {
		user, _, err := getUserFromRequest(r, db)
		if err != nil {
			return err
		}

		idStr := r.PathValue("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			return fmt.Errorf("parsing id to int failed: %v", err)
		}

		var wishlist Wishlist
		if tx := db.First(&wishlist, id); tx.Error != nil {
			return fmt.Errorf("wishlist not found: %v", tx.Error)
		}

		if user.ID != wishlist.UserID {
			return fmt.Errorf("can't add products to wishlist you didn't create")
		}

		var body struct {
			Name     string `json:"name"`
			Price    int    `json:"price"`
			Currency string `json:"currency"`
			ImageID  string `json:"imageId"`
		}
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			return fmt.Errorf("json decoding failed: %v", err)
		}

		if body.Name == "" || body.Price == 0 || body.Currency == "" || body.ImageID == "" {
			return fmt.Errorf("invalid request")
		}

		product := Product{
			Name:       body.Name,
			Price:      body.Price,
			Currency:   body.Currency,
			ImageID:    body.ImageID,
			WishlistID: wishlist.ID,
			UserID:     user.ID,
		}
		if tx := db.Create(&product); tx.Error != nil {
			return fmt.Errorf("adding product to db failed: %v", tx.Error)
		}

		return sendJSON(w, product, 201)
	}))

	mux.HandleFunc("DELETE /products/{id}", httpHandler(func(w http.ResponseWriter, r *http.Request) error {
		idStr := r.PathValue("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			return fmt.Errorf("parsing id to int failed: %v", err)
		}

		user, _, err := getUserFromRequest(r, db)
		if err != nil {
			return err
		}

		product := Product{}
		if tx := db.First(&product, id).Where("user_id = ?", user.ID).Delete(&product, id); tx.Error != nil {
			return fmt.Errorf("deleting product failed: %v", tx.Error)
		}

		return sendJSON(w, product, 200)
	}))

	mux.HandleFunc("POST /images", httpHandler(func(w http.ResponseWriter, r *http.Request) error {
		data, err := io.ReadAll(r.Body)
		if err != nil {
			return fmt.Errorf("error reading request body: %v", err)
		}

		uid, err := uuid.NewV7()
		if err != nil {
			return fmt.Errorf("generating uuid failed: %v", err)
		}

		img := Image{
			UUID: uid.String(),
			Data: data,
		}
		if tx := db.Create(&img); tx.Error != nil {
			return fmt.Errorf("adding image to db failed: %v", tx.Error)
		}

		return sendJSON(w, img, 201)
	}))

	mux.HandleFunc("GET /images/{uuid}", httpHandler(func(w http.ResponseWriter, r *http.Request) error {
		uid := r.PathValue("uuid")

		var img Image
		if tx := db.First(&img, "uuid = ?", uid); tx.Error != nil {
			return fmt.Errorf("image not found: %v", tx.Error)
		}

		_, err := w.Write(img.Data)
		if err != nil {
			return err
		}

		return nil
	}))

	if err := http.ListenAndServe(":5000", runServer(mux, corsMiddleware)); err != nil {
		log.Fatal(err)
	}
}

func getUserFromRequest(r *http.Request, db *gorm.DB) (*User, *Session, error) {
	c, err := r.Cookie("sessionid")
	if err != nil {
		return nil, nil, fmt.Errorf("no session cookie: %v", err)
	}

	var sess Session
	if tx := db.First(&sess, "uuid = ?", c.Value); tx.Error != nil {
		return nil, nil, fmt.Errorf("session not found: %v", tx.Error)
	}

	var user User
	if tx := db.First(&user, sess.UserID); tx.Error != nil {
		return nil, nil, fmt.Errorf("user not found: %v", tx.Error)
	}

	return &user, &sess, nil
}
