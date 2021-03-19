# API Documentation

Authorization header

```json
{
  "Authorization": "Bearer <token>"
}
```

## Authentication routes

### POST /auth/register

Create new user

```json
{
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "username": "johndoe",
  "password": "12345678"
}
```

### POST /auth/login

Login to existing account

```json
{
  "email": "johndoe@gmail.com",
  "password": "12345678"
}
```

## Users routes

These routes require Authorization header.

### GET /user

Get data of authorized user.

### PATCH /user

Update data of authorized user.

```json
{
  "name": "John",
  "email": "john@doe.com",
  "username": "john",
  "password": "htkvnevtie"
}
```

### DELETE /user

Delete authorized user.

## Wishlists routes

These routes also require Authorization header.

### GET /wishlists

Get wishlists of authorized user.

### POST /wishlists

Create new wishlists for authorized user.

```json
{
  "name": "Wishlist name",
  "description": "Optional description"
}
```

### GET /wishlists/:displayName

Get specific wishlist on authorized user by its display name.

### PATCH /wishlists/:displayName

Update specific wishlist by its display name.

### DELETE /wishlists/:displayName

Delete specific wishlist by its display name.

### POST /wishlists/:displayName/products

Add new product to wishlist

```json
{
  "url": "some product url"
}
```

### DELETE /wishlists/:displayName/products/:productID

Remove product from wishlist. The product itself will NOT be removed from products collection in database in purpose of optimization, when another user will add this product.
