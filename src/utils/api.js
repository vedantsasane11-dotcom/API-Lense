/**
 * Modular API fetch helper for API Lens.
 * 
 * Handles:
 * 1. URL validation.
 * 2. Timing starting BEFORE fetch() and stopping AFTER awaiting response body parsing.
 * 3. Checking response.ok to identify HTTP status errors (404, 500, etc.).
 * 4. Safe JSON parsing with fallback to raw text.
 * 5. Extracting response headers list and calculating content size.
 * 6. Catching Network & CORS errors thrown by fetch().
 * 
 * @param {string} inputUrl 
 * @returns {Promise<Object>} Result object with timing, status, formatted body, headers, and size.
 */
export async function executeGetRequest(inputUrl) {
  const trimmedUrl = inputUrl ? inputUrl.trim() : '';

  // 1. URL Validation
  if (!trimmedUrl) {
    return {
      isError: true,
      errorType: 'INVALID_URL',
      errorMessage: 'Please enter an API URL (e.g., https://jsonplaceholder.typicode.com/todos/1).'
    };
  }

  let validUrl;
  try {
    validUrl = new URL(trimmedUrl);
    if (validUrl.protocol !== 'http:' && validUrl.protocol !== 'https:') {
      throw new Error('URL must start with http:// or https://');
    }
  } catch (err) {
    return {
      isError: true,
      errorType: 'INVALID_URL',
      errorMessage: `Invalid URL format: "${trimmedUrl}". Make sure it starts with http:// or https://.`
    };
  }

  // 2. Start Timer BEFORE fetch()
  const startTime = performance.now();

  try {
    // 3. Make HTTP GET Request
    const response = await fetch(validUrl.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*'
      }
    });

    // 4. Retrieve & parse response body BEFORE stopping timer
    let rawText = '';
    let parsedData = null;
    let isJson = false;

    try {
      rawText = await response.text();
      if (rawText) {
        try {
          parsedData = JSON.parse(rawText);
          isJson = true;
        } catch {
          // Response is text/HTML, not valid JSON
          isJson = false;
        }
      }
    } catch (readError) {
      rawText = `[Failed to read response body: ${readError.message}]`;
    }

    // 5. Stop Timer AFTER body retrieval
    const endTime = performance.now();
    const timeMs = Math.round(endTime - startTime);

    // 6. Extract Headers & Calculate Size
    const headersList = [];
    if (response && response.headers) {
      response.headers.forEach((value, key) => {
        headersList.push({ key, value });
      });
    }

    const sizeBytes = new Blob([rawText]).size;
    const formattedSize = sizeBytes < 1024 
      ? `${sizeBytes} B` 
      : `${(sizeBytes / 1024).toFixed(2)} KB`;

    // 7. Check response.ok (HTTP status 200-299)
    const isOk = response.ok;
    const formattedData = isJson 
      ? JSON.stringify(parsedData, null, 2) 
      : rawText;

    const contentTypeHeader = response.headers.get('content-type') || (isJson ? 'application/json' : 'text/plain');
    const contentTypeShort = contentTypeHeader.split(';')[0].trim();

    return {
      isError: !isOk,
      errorType: isOk ? null : 'HTTP_ERROR',
      errorMessage: isOk 
        ? null 
        : `HTTP ${response.status} ${response.statusText || 'Error'}: The server responded with an error code.`,
      status: response.status,
      statusText: response.statusText || (isOk ? 'OK' : 'Error'),
      timeMs,
      ok: isOk,
      data: isJson ? parsedData : rawText,
      formattedData,
      isJson,
      headers: headersList,
      size: formattedSize,
      contentType: contentTypeShort
    };

  } catch (error) {
    // 8. Timer stop on Network / CORS failure
    const endTime = performance.now();
    const timeMs = Math.round(endTime - startTime);

    return {
      isError: true,
      errorType: 'NETWORK_OR_CORS',
      errorMessage: `Network or CORS Error: Could not connect to "${validUrl.hostname}". Either the domain is invalid, server is offline, or the server blocked cross-origin requests (CORS).`,
      status: 0,
      statusText: 'Network Error / CORS',
      timeMs,
      ok: false,
      data: null,
      formattedData: '',
      isJson: false,
      headers: [],
      size: '0 B',
      contentType: 'none'
    };
  }
}
