# API lense

A lightweight browser-based API client for testing GET requests and inspecting API responses.

## Overview

API lense is a small developer tool I built to understand how web applications communicate with APIs.

It lets you enter a public API endpoint, send a GET request, and inspect the response directly in the browser.

## Features

- Send HTTP GET requests to public APIs
- Display HTTP status codes
- Measure request/response time
- Show response size
- Display response content type
- Inspect response body as formatted JSON or text
- Inspect response headers
- Copy the response
- Handle invalid URLs and network/CORS errors
- Quick example endpoints for testing

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Browser Fetch API

## How It Works

```text
Enter API URL
      ↓
Select GET
      ↓
Click Send
      ↓
Browser uses fetch()
      ↓
API server processes the request
      ↓
HTTP response returns
      ↓
API lense displays status, timing, headers and body
```

The application uses the browser's built-in `fetch()` API to make requests. It records elapsed time with `performance.now()`, checks `response.ok` and `response.status`, reads response headers, and parses JSON responses when appropriate.

## Getting Started

### Prerequisites

- Node.js installed
- Git (optional, for cloning the repository)

### Installation

Clone the repository:

```bash
git clone https://github.com/vedantsasane11-dotcom/API-lense.git
cd API-lense
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

## Example APIs

You can try public GET endpoints such as:

```text
https://jsonplaceholder.typicode.com/todos/1
https://dummyjson.com/products
https://api.open-meteo.com/v1/forecast?latitude=18.52&longitude=73.86&current=temperature_2m
```

## Project Structure

```text
API-lense/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── QuickPresets.jsx
│   │   ├── RequestForm.jsx
│   │   └── ResponseViewer.jsx
│   ├── utils/
│   │   └── api.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── .gitignore
```

## Known Limitation: CORS

API lense runs in the browser, so the target API must allow cross-origin requests (CORS) for the browser to read its response.

If an API does not allow the request from the browser, API lense cannot bypass that restriction by itself. A backend/proxy would be required for APIs that block browser-based requests.

## What I Learned

Building API lense helped me understand practical concepts including:

- HTTP GET requests
- Request and response flow
- `fetch()` and asynchronous JavaScript
- HTTP status codes
- JSON parsing
- Response headers
- Response timing
- Browser CORS restrictions

## Future Improvements

Possible future versions could add:

- POST, PUT, PATCH and DELETE requests
- Query parameter editor
- Custom request headers
- Request body editor
- Request history
- Saved requests/collections
- Better JSON navigation and formatting

## Project Status

**MVP complete.**

API lense is intentionally small and focused on the core API-request and response-inspection workflow.

## License

No license has been added yet. See the repository settings for the current licensing status.
