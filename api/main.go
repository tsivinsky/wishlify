package main

import (
	"fmt"
	"log"
	"net/http"
)

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
	return httpHandler(func(w http.ResponseWriter, r *http.Request) error {
		mux.ServeHTTP(w, r)
		return nil
	}, middlewares...)
}

func corsMiddleware(w http.ResponseWriter, r *http.Request) error {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization")

	return nil
}

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /", httpHandler(func(w http.ResponseWriter, r *http.Request) error {
		fmt.Fprintf(w, "Hello, World!")

		return nil
	}))

	if err := http.ListenAndServe(":5000", runServer(mux, corsMiddleware)); err != nil {
		log.Fatal(err)
	}
}
