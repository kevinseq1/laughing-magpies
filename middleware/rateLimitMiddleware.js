// middleware/rateLimitMiddleware.js

// In-memory store to track request timestamps (keyed by IP address)
const requestMap = new Map(); 

// Configuration: 
// 1 request per 5 seconds (5000 milliseconds) per IP
const WINDOW_SIZE_MS = 5000;
const MAX_REQUESTS = 1;

/**
 * Basic in-memory rate limiting middleware.
 */
const rateLimitMiddleware = (req, res, next) => {
    // 1. Get the client's IP address
    // We use req.ip for simple cases; in production, use req.headers['x-forwarded-for'] behind a proxy.
    const clientIp = req.ip; 
    const now = Date.now();

    // 2. Check the last request time for this IP
    const lastRequestTime = requestMap.get(clientIp) || 0;

    // 3. Check if the request is within the rate limit window
    if (now - lastRequestTime < WINDOW_SIZE_MS) {
        // Request is too soon: block it.
        const timeRemaining = Math.ceil((WINDOW_SIZE_MS - (now - lastRequestTime)) / 1000);
        
        // 429 Too Many Requests
        return res.status(429).json({
            error: `Rate limit exceeded. Try again in ${timeRemaining} seconds.`,
            limit: `${MAX_REQUESTS} request every ${WINDOW_SIZE_MS / 1000} seconds.`
        });
    }

    // 4. Update the timestamp for this IP
    requestMap.set(clientIp, now);

    // 5. Allow the request to proceed
    next();
};

module.exports = rateLimitMiddleware;