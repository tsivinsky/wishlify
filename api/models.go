package main

import (
	"time"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type Model struct {
	ID        uint       `json:"id" gorm:"primarykey"`
	CreatedAt time.Time  `json:"createdAt"`
	UpdatedAt time.Time  `json:"updatedAt"`
	DeletedAt *time.Time `json:"deletedAt" gorm:"index"`
}

type User struct {
	Model

	Email    string `json:"email" gorm:"unique"`
	Password string `json:"-"`
}

type Session struct {
	Model

	UUID   string `json:"uuid"`
	UserID uint   `json:"userId"`
}

type Wishlist struct {
	Model

	UUID        string    `json:"uuid"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	UserID      uint      `json:"-"`
	User        User      `json:"user,omitzero"`
	Products    []Product `json:"products"`
}

func (w *Wishlist) AfterDelete(tx *gorm.DB) (err error) {
	tx.Clauses(clause.Returning{}).Where("wishlist_id = ?", w.ID).Delete(&Product{})
	return
}

type Product struct {
	Model

	Name       string `json:"name"`
	Price      int    `json:"price"`
	Currency   string `json:"currency"`
	ImageID    string `json:"imageId"`
	WishlistID uint   `json:"-"`
	UserID     uint   `json:"-"`
}

func (p *Product) AfterDelete(tx *gorm.DB) (err error) {
	tx.Clauses(clause.Returning{}).Where("uuid = ?", p.ImageID).Delete(&Image{})
	return
}

type Image struct {
	UUID      string    `json:"uuid" gorm:"primarykey"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	Data      []byte    `json:"-"`
}
