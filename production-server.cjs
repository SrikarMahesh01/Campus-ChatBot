
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3500;

// Security headers
app.use((req, res, next) => {
	res.setHeader('X-Content-Type-Options', 'nosniff');
	res.setHeader('X-Frame-Options', 'DENY');
	res.setHeader('X-XSS-Protection', '1; mode=block');
	res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
	next();
});

// Serve static files from dist directory only
app.use(express.static(path.join(__dirname, 'dist'), {
	maxAge: '1d',
	etag: false
}));

// Prevent access to source files
app.use('/src', (req, res) => {
	res.status(403).send('Access denied');
});

// Handle React Router - serve index.html for all routes
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
	console.log(`🚀 URCET Campus ChatBot running on port ${PORT}`);
	console.log(`📱 Local: http://localhost:${PORT}`);
	console.log(`🌐 Network: http://0.0.0.0:${PORT}`);
});

process.on('SIGTERM', () => {
	console.log('Service stopping...');
	process.exit(0);
});
