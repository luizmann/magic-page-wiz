// Magic Page Wiz - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('🪄 Magic Page Wiz loaded successfully!');
    
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Add click handler for the start building button
    const startBtn = document.querySelector('.btn-primary');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            alert('🚀 Welcome to Magic Page Wiz! The page builder will be available soon.');
        });
    }
    
    // Add hover effects for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Health check
    checkServerHealth();
}

function checkServerHealth() {
    fetch('/health')
        .then(response => response.json())
        .then(data => {
            console.log('Server health:', data);
        })
        .catch(error => {
            console.warn('Health check failed:', error);
        });
}