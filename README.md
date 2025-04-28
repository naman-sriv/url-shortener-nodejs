# URL Shortener Microservice

A Node.js backend microservice that takes a long URL and returns a shorter, unique link. Clicking the short link redirects to the original URL.

## Functionality

This microservice provides the following API endpoints:

* **`POST /api/shorturl`**:
    * Accepts a URL in the request body (as `x-www-form-urlencoded` data with the key `url`).
    * Validates the submitted URL format and hostname.
    * Generates a unique short URL for the submitted URL.
    * Stores the mapping between the original URL and the short URL.
    * Returns a JSON response with the `original_url` and the `short_url`.
        ```json
        { "original_url": "[https://www.example.com/very/long/url](https://www.example.com/very/long/url)", "short_url": 1 }
        ```
    * If the submitted URL is invalid, returns a JSON response with an error:
        ```json
        { "error": "invalid url" }
        ```
    * If the hostname of the submitted URL is invalid or cannot be resolved, returns a JSON response with an error:
        ```json
        { "error": "invalid hostname" }
        ```

* **`GET /api/shorturl/:short_url`**:
    * Accepts a short URL as a path parameter.
    * Looks up the corresponding original URL in the database.
    * If found, performs an HTTP 302 redirect to the original URL.
    * If not found, returns a 404 error with a JSON message:
        ```json
        { "error": "Short URL not found" }
        ```

## Technologies Used

* Node.js
* Express.js
* `cors` for enabling Cross-Origin Resource Sharing
* `body-parser` for parsing URL-encoded request bodies
* `dotenv` for managing environment variables (optional)
* `dns` (built-in Node.js module) for DNS lookup

## Setup

1.  **Clone the repository** (if you have the code in one).
2.  **Navigate to the project directory** in your terminal.
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Create a `.env` file** in the root of the project to manage environment variables (optional, but recommended for setting the port):
    ```
    PORT=3000
    ```
5.  **Run the application:**
    ```bash
    npm start
    ```
    or
    ```bash
    node index.js
    ```
    The server will start listening on the port specified in your `.env` file or port `3000` by default.

## Usage

### Shortening a URL

You can shorten a URL by sending a POST request to the `/api/shorturl` endpoint with the URL you want to shorten in the request body. The data should be sent as `x-www-form-urlencoded` with the key `url`.

**Example using `curl`:**

```bash
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "url=[https://www.example.com/very/long/url](https://www.example.com/very/long/url)" http://localhost:3000/api/shorturl
