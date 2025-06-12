# API Documentation

## Overview

This document describes the API endpoints available in the Akkuro Lending AI Studio application. All APIs are implemented as Next.js API routes and handle various aspects of the application including OpenAI integration, Google Sheets operations, and file management.

## Table of Contents

- [Authentication](#authentication)
- [OpenAI Integration](#openai-integration)
- [Conversation Management](#conversation-management)
- [File Operations](#file-operations)
- [Product Management](#product-management)
- [State Management](#state-management)
- [Error Handling](#error-handling)

## Authentication

## OpenAI Integration

### Text-to-Speech

**Endpoint**: `/api/openai-tts`

- **Method**: POST
- **Description**: Converts text to speech using OpenAI's TTS API
- **Headers**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "text": "Text to convert to speech",
    "voice": "nova", // optional: alloy, echo, fable, onyx, nova, shimmer
    "model": "tts-1" // optional: tts-1, tts-1-hd
  }
  ```
- **Response**: Audio file (audio/mp3)
- **Error Codes**:
  - 400: Invalid request body
  - 500: OpenAI API error

### Chat Responses (`Deprecated`)

**Endpoint**: `/api/responses`

- **Method**: POST
- **Description**: Handles chat completions with OpenAI
- **Headers**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "messages": [
      {
        "role": "user",
        "content": "User message"
      }
    ],
    "tools": [], // optional tool definitions
    "model": "gpt-4o", // optional model specification, 4o is best suggestion
    "stream": true // optional streaming response
  }
  ```
- **Response**: Streaming or complete chat response
- **Features**:
  - Function calling support
  - Streaming responses
  - Tool execution
  - Web search integration

### Turn Response (`Recommended` - Is currently used)

**Endpoint**: `/api/turn_response`

- **Method**: POST
- **Description**: Handles conversational turns with context management
- **Body**:
  ```json
  {
    "conversation_id": "uuid",
    "user_message": "User input",
    "context": {} // optional context data
  }
  ```
- **Response**: AI response with updated context

## Conversation Management

### Function Calling

**Endpoint**: `/api/functions`

- **Method**: POST
- **Description**: Executes AI function calls
- **Body**:
  ```json
  {
    "function_name": "function_to_execute",
    "arguments": {
      "param1": "value1",
      "param2": "value2"
    }
  }
  ```
- **Supported Functions**:
  - Product configuration functions
  - Data storage functions
  - Validation functions
  - Integration functions

## File Operations

### Vector Store Management

**Endpoint**: `/api/vector_stores`

- **Method**: POST, GET, DELETE
- **Description**: Manages vector stores for file search functionality

#### Create Vector Store

- **Method**: POST
- **Body**:
  ```json
  {
    "name": "store_name",
    "file_ids": ["file_id_1", "file_id_2"]
  }
  ```

#### List Vector Stores

- **Method**: GET
- **Response**: Array of vector store objects

#### Delete Vector Store

- **Method**: DELETE
- **Body**:
  ```json
  {
    "vector_store_id": "vs_123456"
  }
  ```

### File Upload

**Endpoint**: `/api/files/upload`

- **Method**: POST
- **Description**: Uploads files for vector store integration
- **Headers**:
  - `Content-Type: multipart/form-data`
- **Body**: FormData with file(s)
- **Response**:
  ```json
  {
    "file_id": "file_123456",
    "filename": "document.pdf",
    "bytes": 12345,
    "status": "uploaded"
  }
  ```

### PDF Generation

**Endpoint**: `/api/pdf`

- **Method**: POST
- **Description**: Generates PDF documents from product data
- **Body**:
  ```json
  {
    "product_data": {
      "name": "Product Name",
      "parameters": {},
      "pricing": {},
      "compliance": {}
    },
    "template": "standard" // optional template selection
  }
  ```
- **Response**: PDF file (application/pdf)

## Product Management

### Product Data Retrieval

**Endpoint**: `/api/product/read`

- **Method**: GET
- **Query Parameters**:
  - `product_id`: Product identifier
  - `sheet_name`: Specific sheet to read from
- **Response**: Complete product configuration data

### Product Reset

**Endpoint**: `/api/product/reset`

- **Method**: POST
- **Description**: Resets product configuration data
- **Body**:
  ```json
  {
    "product_id": "product_123",
    "reset_type": "full" // or "partial"
  }
  ```

### Bulk Operations

**Endpoint**: `/api/product/store-all`

- **Method**: POST
- **Description**: Stores complete product configuration in a single operation
- **Body**: Complete product object with all configuration sections

## State Management

### Application State

**Endpoint**: `/api/state`

- **Method**: GET, POST, PUT, DELETE
- **Description**: Manages application state persistence

#### Get State

- **Method**: GET
- **Query Parameters**: `state_key`
- **Response**: State object

#### Update State

- **Method**: POST/PUT
- **Body**:
  ```json
  {
    "state_key": "configuration_state",
    "state_data": {
      "current_step": 3,
      "completed_steps": [1, 2],
      "form_data": {}
    }
  }
  ```

#### Clear State

- **Method**: DELETE
- **Body**:
  ```json
  {
    "state_key": "configuration_state"
  }
  ```

## Error Handling

### Standard Error Response Format

All API endpoints return errors in a consistent format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {
      "field": "Specific field that caused the error",
      "received": "Value that was received",
      "expected": "Expected value format"
    }
  },
  "timestamp": "2024-01-01T00:00:00Z",
  "request_id": "req_123456"
}
```

### Common Error Codes

#### 400 Bad Request

- `INVALID_REQUEST_BODY`: Request body is malformed or missing required fields
- `INVALID_PARAMETERS`: URL parameters are invalid or missing
- `VALIDATION_ERROR`: Data validation failed

#### 401 Unauthorized

- `INVALID_API_KEY`: OpenAI API key is invalid or missing
- `AUTHENTICATION_FAILED`: User authentication failed

#### 403 Forbidden

- `INSUFFICIENT_PERMISSIONS`: User lacks required permissions
- `RATE_LIMIT_EXCEEDED`: API rate limit exceeded

#### 404 Not Found

- `RESOURCE_NOT_FOUND`: Requested resource doesn't exist
- `ENDPOINT_NOT_FOUND`: API endpoint doesn't exist

#### 500 Internal Server Error

- `OPENAI_API_ERROR`: Error communicating with OpenAI API
- `GOOGLE_SHEETS_ERROR`: Error with Google Sheets integration
- `DATABASE_ERROR`: Database operation failed
- `INTERNAL_ERROR`: Unexpected server error

### Error Handling Best Practices

1. **Always check response status**: Verify the HTTP status code before processing the response
2. **Handle rate limits**: Implement exponential backoff for rate limit errors
3. **Log errors appropriately**: Log errors with sufficient context for debugging
4. **Provide user feedback**: Display meaningful error messages to users
5. **Retry transient errors**: Implement retry logic for temporary failures

### Example Error Handling (JavaScript)

```javascript
async function apiCall(endpoint, data) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API Error: ${error.error.message}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}
```

## Rate Limits

### OpenAI API

- Respects OpenAI's rate limits based on your API plan
- Implements automatic retry with exponential backoff
- Monitor usage through OpenAI dashboard

### Google Sheets API

- 300 requests per minute per project
- 100 requests per 100 seconds per user
- Implements request queuing for batch operations

## Testing API Endpoints

### Development Testing

Use the built-in API testing tools during development:

```bash
# Test OpenAI integration
curl -X POST http://localhost:3000/api/openai-tts \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello world"}'

# Test product storage
curl -X POST http://localhost:3000/api/product/initial-setup \
  -H "Content-Type: application/json" \
  -d '{"product_name": "Test Product", "description": "Test"}'
```

### Production Testing

Use environment-specific testing procedures and monitor API performance through logging and analytics.

---

For implementation details, see [DEVELOPMENT.md](./DEVELOPMENT.md).
For deployment configuration, see [DEPLOYMENT.md](./DEPLOYMENT.md).
