// middleware/requestLogger.js
// Request logging middleware that records API request details.
// Logs method, path, status code, and response time for every request.
// Useful for debugging, performance monitoring, and API usage tracking.

/**
 * Logs each incoming HTTP request with timing information.
 * Attaches to the response 'finish' event to capture the status code
 * and calculate response time after the request completes.
 *
 * Log format: [TIMESTAMP] METHOD /path — STATUS (TIMEms)
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function requestLogger(req, res, next) {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();

  // Log when the response finishes
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;

    // Color-code status for console readability
    let statusColor;
    if (statusCode >= 500) {
      statusColor = '\x1b[31m'; // Red for server errors
    } else if (statusCode >= 400) {
      statusColor = '\x1b[33m'; // Yellow for client errors
    } else if (statusCode >= 300) {
      statusColor = '\x1b[36m'; // Cyan for redirects
    } else {
      statusColor = '\x1b[32m'; // Green for success
    }

    const resetColor = '\x1b[0m';

    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl} — ${statusColor}${statusCode}${resetColor} (${duration}ms)`
    );
  });

  next();
}

module.exports = requestLogger;
