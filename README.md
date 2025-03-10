# Products RESTful API

## Overview

This is a simple **Products RESTful API** built using **Node.js** and **Express.js**. The API allows users to **Create, Read, Update, and Delete (CRUD)** products, with additional features such as search and filtering.

## Features

- **Retrieve all products** (with product name search and result limit) - `/products`
- **Validate query parameters** to prevent invalid queries - `/products`
- **Retrieve a single product by ID** - `/product/:id`
- **Create a new product** - `/product`
- **Update an existing product** (full and partial updates) - `/product/:id`
- **Delete a product** - `/product/:id`

## Endpoints

### 1. Get All Products

- **URL:** `GET /products`
- **Query Parameters:**
  - `name` (optional) → Search by product name
  - `limit` (optional) → Limit the number of results
- **Response:**

```json
{
  "success": true,
  "message": "Products fetched successfully",
  "totalProducts": 2,
  "data": {
    "products": [
      { "id": 1, "name": "Laptop", "price": 1000 },
      { "id": 2, "name": "Mouse", "price": 20 }
    ]
  }
}
```

### Query Parameter Validation

The `/products` endpoint includes query parameter validation to ensure only `name` and `limit` are allowed. If an invalid parameter is passed, an error response is returned.

#### Example Invalid Query

- **URL:** `GET /products?invalidParam=xyz`
- **Response:**

```json
{
  "success": false,
  "message": "Invalid query parameter(s): invalidParam",
  "allowedParams": ["name", "limit"]
}
```

### 2. Get a Product by ID

- **URL:** `GET /product/:id`
- **Response:**

```json
{
  "success": true,
  "message": "Product found",
  "data": { "id": 1, "name": "Laptop", "price": 1000 }
}
```

### 3. Create a New Product

- **URL:** `POST /product`
- **Request Body:**

```json
{
  "name": "Keyboard",
  "price": 50
}
```

- **Response:**

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "product": { "id": 3, "name": "Keyboard", "price": 50 }
  }
}
```

### 4. Update a Product (Full Update)

- **URL:** `PUT /product/:id`
- **Request Body:**

```json
{
  "name": "Gaming Laptop",
  "price": 1500
}
```

- **Response:**

```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "product": { "id": 1, "name": "Gaming Laptop", "price": 1500 }
  }
}
```

### 5. Update a Product (Partial Update)

- **URL:** `PATCH /product/:id`
- **Request Body:** (Only updates specified fields)

```json
{
  "price": 1200
}
```

- **Response:**

```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "updatedKeyValuePair(s)": { "price": 1200 },
    "product": { "id": 1, "name": "Laptop", "price": 1200 }
  }
}
```

### 6. Delete a Product

- **URL:** `DELETE /product/:id`
- **Response:**

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

## Error Handling

- **Product Not Found:**

```json
{
  "success": false,
  "message": "Product not found"
}
```

- **Invalid Request:**

```json
{
  "success": false,
  "message": "Invalid query parameter(s)"
}
```

## Installation

### Prerequisites

- **Node.js** installed

### Steps

1. Clone the repository:

```sh
git clone https://github.com/ideateGudy/products-restfulApi
cd products-restfulApi
```

2. Install dependencies:

```sh
npm install
```

3. Start the server:

```sh
npm run dev
```

4. The API will be running at `http://localhost:3000/`, `http://localhost:3000/api/`, `http://localhost:3000/api/products`

## Technologies Used

- Node.js
- Express.js
- JavaScript

## Future Enhancements

- Integrate with a database
