## Features

1. Fetch all transactions with details such as `collect_id`, `school_id`, `gateway`, `order_amount`, etc.
2. Fetch transaction details for a specific school.
3. Check transaction status using `custom_order_id`.
4. Update transaction status via webhook payload.
5. Manual transaction status updates via POST endpoint.
6. Create payment requests and handle redirection to payment pages.
7. Secure APIs using JWT authentication.

---

## Project Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up MongoDB:
   - Use the provided **Mongo URI**:
     `mongodb+srv://testuser:edviron@edvironassessment.ub8p5.mongodb.net/?retryWrites=true&w=majority&appName=edvironAssessment`
   - Import the provided CSV data into the database.
4. Run the application:
   ```bash
   npm run start
   ```
5. The server will start at `http://localhost:5050`.

---

## Data Import

1. Import the attached CSV files (`transactions.csv`, `schools.csv`) into the MongoDB database.
2. Use tools like **MongoDB Compass** or `mongoimport` to load the data:
   ```bash
   mongoimport --uri="mongodb+srv://testuser:edviron@edvironassessment.ub8p5.mongodb.net/schoolPayments" --collection=transactions --type=csv --file=transactions.csv --headerline
   ```

---

## API Endpoints

### Fetch All Transactions

- **Endpoint**: `GET /api/transactions`
- **Description**: Retrieve all transaction records.
- **Response**:
  ```json
  [
    {
      "collect_id": "12345",
      "school_id": "65b0e6293e9f76a9694d84b4",
      "gateway": "PhonePe",
      "order_amount": 2000,
      "transaction_amount": 2200,
      "status": "Success",
      "custom_order_id": "CUSTOM12345"
    }
  ]
  ```

### Fetch Transactions by School

- **Endpoint**: `GET /api/transactions/school/:school_id`
- **Description**: Fetch transactions for a specific school using `school_id`.
- **Response**:
  ```json
  [
    {
      "collect_id": "12345",
      "gateway": "PhonePe",
      "order_amount": 2000,
      "transaction_amount": 2200,
      "status": "Success",
      "custom_order_id": "CUSTOM12345"
    }
  ]
  ```

### Check Transaction Status

- **Endpoint**: `GET /api/transactions/status/:custom_order_id`
- **Description**: Retrieve the current status of a transaction using the `custom_order_id`.
- **Response**:
  ```json
  {
    "status": "Success",
    "transaction_amount": 2200,
    "gateway": "PhonePe",
    "custom_order_id": "CUSTOM12345"
  }
  ```

### Webhook for Status Updates

- **Endpoint**: `POST /api/transactions/webhook`
- **Description**: Receive transaction status updates and update the database accordingly.
- **Payload**:
  ```json
  {
    "status": 200,
    "order_info": {
      "order_id": "12345",
      "order_amount": 2000,
      "transaction_amount": 2200,
      "gateway": "PhonePe",
      "bank_reference": "YESBNK222"
    }
  }
  ```

### Manual Status Update

- **Endpoint**: `POST /api/transactions/update-status`
- **Description**: Manually update a transaction’s status.
- **Payload**:
  ```json
  {
    "custom_order_id": "CUSTOM12345",
    "status": "Success"
  }
  ```

### Create Payment Request

- **Endpoint**: `POST /api/payments/create`
- **Description**: Create a new payment request and redirect the user to the payment page.
- **Payload**:
  ```json
  {
    "pg_key": "edvtest01",
    "school_id": "65b0e6293e9f76a9694d84b4",
    "order_amount": 2000
  }
  ```

---

## Webhook Configuration

- **Webhook URL**: `http://localhost:5050/api/transactions/webhook`
- **Integration**: Configure the payment gateway to send transaction status updates to this URL.
- **Payload Handling**: The server will process the incoming payload to update the transaction status in the database.

---

## Authentication

- The APIs are secured using **JWT Authentication**.
- To access the protected endpoints, include the JWT token in the request header:
  ```
  Authorization: Bearer <your-token>
  ```

### Generate JWT Token

- Use the provided **API KEY** to sign tokens:
  ```
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0cnVzdGVlSWQiOiI2NWIwZTU1MmRkMzE5NTBhOWI0MWM1YmEiLCJJbmRleE9mQXBpS2V5Ijo2LCJpYXQiOjE3MTE2MjIyNzAsImV4cCI6MTc0MzE3OTg3MH0.Rye77Dp59GGxwCmwWekJHRj6edXWJnff9finjMhxKuw
  ```

---

## Additional Requirements

1. **Payment Gateway Integration**:

   - Use the provided **API Docs**: [Postman Documentation](https://documenter.getpostman.com/view/22738724/2sAY4viPQH).
   - Implement endpoints for creating payment requests and redirecting users to the payment page.

2. **Testing with cURL**:

   - Example cURL command for creating a payment request:
     ```bash
     curl -X POST http://localhost:5050/api/payments/create \
     -H "Authorization: Bearer <your-token>" \
     -H "Content-Type: application/json" \
     -d '{
       "pg_key": "edvtest01",
       "school_id": "65b0e6293e9f76a9694d84b4",
       "order_amount": 2000
     }'
     ```

3. **Database URI**:  
   Use the **Mongo URI**:
   ```
   mongodb+srv://testuser:edviron@edvironassessment.ub8p5.mongodb.net/?retryWrites=true&w=majority&appName=edvironAssessment
   ```

---

## Contact

For questions or clarifications, reach out to **rpbarmaiya@gmail.com**.
