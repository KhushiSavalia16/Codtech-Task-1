document.addEventListener('DOMContentLoaded', function() {
    const blogList = document.getElementById('blog-list');

    // Fetch all blog posts from the backend
    fetch('/api/blog')
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('blog-post');
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <a href="/blog/${post.id}" class="read-more">Read more...</a>
                `;
                blogList.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error('Error fetching blog posts:', error);
        });
});
