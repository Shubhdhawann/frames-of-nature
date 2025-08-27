// Lightbox functionality
document.addEventListener('click', (e) => {
    const lightboxLink = e.target.closest('a.lightbox');
    if (!lightboxLink) return;
    
    e.preventDefault();
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    
    // Create image
    const img = document.createElement('img');
    img.src = lightboxLink.getAttribute('href');
    img.alt = lightboxLink.querySelector('img')?.alt || '';
    
    overlay.appendChild(img);
    document.body.appendChild(overlay);
    
    // Close on click
    overlay.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
});

// Contact form functionality (for later)
function submitContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert('Message sent successfully!');
        event.target.reset();
    })
    .catch(error => {
        alert('Error sending message. Please try again.');
        console.error('Error:', error);
    });
}
