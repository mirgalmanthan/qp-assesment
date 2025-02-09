# qp-assesment
A Grocery Booking API made as assingment for QuestionPro Full Stack Developer position

# Setup Without Dockerfile
1. Go to db_and_postman_files folder and locate grocery-db.db file and Grocery API.postman_collection.json files
2. Create a db in PostGres with name Grocery and password Manthan@123
3. Retore from file grocery-db.db to get all tables and schema
4. Import Grocery API.postman_collection.json in Postman
5. Ready to run the API!

# Grocery Booking API

A RESTful API for managing a grocery store's inventory, orders, and user management.

## Features

- User Authentication (Admin & Customer)
- Product Management (CRUD operations)
- Inventory Management
- Order Processing
- PostgreSQL Database

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development only)
- PostgreSQL (for local development only)

## Quick Start with Docker

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd qp-assesment
   ```

2. Start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

This will:
- Build the Node.js application
- Start PostgreSQL database
- Initialize the database schema
- Create default admin user (username: 'admin', password: 'admin')

The API will be available at:
- API Endpoint: http://localhost:3000
- Database: localhost:5433 (if you need direct database access)

## Manual Setup (Without Docker)

1. Create a PostgreSQL database:
   ```bash
   createdb Grocery
   ```

2. Set up environment variables in `.env`:
   ```
   DB_PASSWORD=Manthan@123
   DB_USERNAME=postgres
   DB_NAME=Grocery
   DB_HOST=localhost
   DB_PORT=5432
   PORT=3000
   ```

3. Install dependencies and build:
   ```bash
   npm install
   npm run build
   ```

4. Initialize the database:
   ```bash
   psql -U postgres -d Grocery -f schema.sql
   ```

5. Start the application:
   ```bash
   npm run prod
   ```

## API Endpoints

### Authentication
- POST `/admin/login` - Admin login
- POST `/user/login` - User login
- POST `/user/signup` - User registration

### Products (Admin Only)
- POST `/admin/product` - Add new product
- PUT `/admin/product/:pid` - Update product
- DELETE `/admin/product/:pid` - Remove product
- GET `/admin/products` - List all products

### Inventory Management (Admin Only)
- POST `/admin/inventory/:pid` - Add inventory
- DELETE `/admin/inventory/:iid` - Remove inventory
- GET `/admin/inventory` - View inventory

### Orders
- POST `/user/order` - Place order (User)
- GET `/user/orders` - View orders (User)
- DELETE `/user/order/:oid` - Cancel order (User)

## Database Schema

The application uses PostgreSQL with the following main tables:
- `users` - User information
- `admin` - Admin credentials
- `products` - Product catalog
- `inventory` - Stock management
- `orders` - Order processing

## Development

For development, you can use:
```bash
npm run dev
```

This will start the server in development mode with nodemon for auto-reloading.

## Testing

Import the Postman collection from `Grocery API.postman_collection.json` to test the API endpoints.

## Stopping the Application

If using Docker:
```bash
docker-compose down
```

To remove all data and start fresh:
```bash
docker-compose down -v