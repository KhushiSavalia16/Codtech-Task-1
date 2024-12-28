const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Mock database for blog posts (You can replace this with a real database like MongoDB)
let blogPosts = [
    { id: 1, title: 'My First Blog Post', content: 'Content for the first blog post.' },
    { id: 2, title: 'Learning Express.js', content: 'Content for the second blog post.' },
];

// Serve static files (portfolio template)
app.use(express.static('public'));

// Get all blog posts
app.get('/api/blog', (req, res) => {
    res.json(blogPosts);
});

// Get a single blog post by ID
app.get('/api/blog/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = blogPosts.find(p => p.id === postId);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

// Create a new blog post
app.post('/api/blog', (req, res) => {
    const { title, content } = req.body;
    const newPost = { id: blogPosts.length + 1, title, content };
    blogPosts.push(newPost);
    res.status(201).json(newPost);
});

// Update an existing blog post
app.put('/api/blog/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = blogPosts.find(p => p.id === postId);

    if (post) {
        const { title, content } = req.body;
        post.title = title;
        post.content = content;
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

// Delete a blog post
app.delete('/api/blog/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    blogPosts = blogPosts.filter(p => p.id !== postId);
    res.status(200).json({ message: 'Post deleted' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
