// Base configuration
const API_URL = 'http://webpage-api.jimmyn.idv.tw/api/visitors';
const USE_LOCAL_FALLBACK = true;
const DEBUG_MODE = true;

/**
 * Debug logging helper
 * @param {string} message - The message to log
 * @param {any} data - Optional data to log
 */
function debugLog(message, data) {
    if (DEBUG_MODE) {
        if (data) {
            console.log(`[Visitor Counter] ${message}`, data);
        } else {
            console.log(`[Visitor Counter] ${message}`);
        }
    }
}

/**
 * Get visitor count from localStorage
 * @param {string} postId - The post identifier
 * @returns {number} - The visitor count
 */
function getLocalVisitorCount(postId) {
    const count = localStorage.getItem(`blog-visit-${postId}`);
    return count ? parseInt(count) : 0;
}

/**
 * Update localStorage with new count
 * @param {string} postId - The post identifier
 * @param {number} count - The new count
 */
function setLocalVisitorCount(postId, count) {
    localStorage.setItem(`blog-visit-${postId}`, count.toString());
}

/**
 * Update all count elements for a post on the page
 * @param {string} postId - The post identifier
 * @param {number} count - The count to display
 */
function updateAllCountElements(postId, count) {
    // Update in cards (listing pages)
    const cardCountElements = document.querySelectorAll(`.blog-card[data-post-id="${postId}"] .count, .project-card[data-post-id="${postId}"] .count`);
    cardCountElements.forEach(element => {
        element.textContent = count;
    });
    
    // Update in page headers (detail pages)
    const pageCountElements = document.querySelectorAll('.page-count, .post-meta-info .count');
    pageCountElements.forEach(element => {
        element.textContent = count;
    });
    
    // Update local storage as fallback
    setLocalVisitorCount(postId, count);
}

/**
 * Increment visitor count for a specific post
 * @param {string} postId - The post identifier
 * @returns {Promise<number>} - The new count
 */
async function incrementVisitorCount(postId) {
    try {
        const response = await fetch(`${API_URL}/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Failed to update visitor count: ${response.status}`);
        }
        
        const data = await response.json();
        debugLog(`Updated count for post ${postId}:`, data);
        
        // Update all count displays on the page
        updateAllCountElements(postId, data.count);
        
        return data.count;
    } catch (error) {
        console.error('Error incrementing visitor count:', error);
        
        // Use local fallback if API fails
        if (USE_LOCAL_FALLBACK) {
            const count = getLocalVisitorCount(postId) + 1;
            setLocalVisitorCount(postId, count);
            return count;
        }
        
        return 0;
    }
}

/**
 * Load visitor counts for all blog cards and project cards on the page
 */
function loadVisitorCounts() {
    // Get all cards with visitor counters (both blog and project cards)
    const cards = document.querySelectorAll('.blog-card, .project-card');
    
    if (cards.length === 0) {
        debugLog('No cards with visitor counters found on page');
        return;
    }
    
    debugLog(`Found ${cards.length} cards with visitor counters`);
    
    // For each card, update its visitor count
    cards.forEach(card => {
        const postId = card.getAttribute('data-post-id');
        if (!postId) return;
        
        // Find the count display element
        const countElement = card.querySelector('.count');
        if (!countElement) return;
        
        // Fetch count for this post
        fetch(`${API_URL}/${postId}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Update all count displays for this post
            updateAllCountElements(postId, data.count);
        })
        .catch(error => {
            console.error(`Error loading visitor count for ${postId}:`, error);
            
            // Fallback to localStorage if API is unavailable
            if (USE_LOCAL_FALLBACK) {
                const count = getLocalVisitorCount(postId);
                countElement.textContent = count;
            }
        });
    });
}

/**
 * Set up click event handlers to increment counters when cards are clicked
 */
function setupCounterIncrementOnClick() {
    // Get all links in blog and project cards
    const cardLinks = document.querySelectorAll('.blog-card a.btn, .project-card a.btn');
    
    // Add click event listener to each link
    cardLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Find the parent card to get the post ID
            const card = this.closest('.blog-card') || this.closest('.project-card');
            if (!card) return;
            
            const postId = card.getAttribute('data-post-id') || this.getAttribute('data-post-id');
            if (postId) {
                // Increment the counter (don't prevent navigation)
                incrementVisitorCount(postId);
            }
        });
    });
}

/**
 * Record a visit to an individual blog post or project page
 * To be used on individual blog post and project pages
 * @param {string} postId - The post identifier
 */
function recordBlogVisit(postId) {
    if (!postId) {
        debugLog('No postId provided to recordBlogVisit');
        return;
    }
    
    debugLog(`Recording visit to page with ID: ${postId}`);
    incrementVisitorCount(postId).then(count => {
        // After incrementing, make sure the page header count is updated
        const pageCountElements = document.querySelectorAll('.page-count, .post-meta-info .count');
        pageCountElements.forEach(element => {
            element.textContent = count;
        });
    });
}

// Initialize the counter functionality when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    debugLog('Visitor counter initialized');
    
    // Check if we're on a listing page with cards
    const cards = document.querySelectorAll('.blog-card, .project-card');
    if (cards.length > 0) {
        loadVisitorCounts();
        setupCounterIncrementOnClick();
    }
    
    // Check if we're on an individual project or blog post page
    const postIdElement = document.getElementById('blog-post-id') || document.getElementById('project-post-id');
    if (postIdElement) {
        const postId = postIdElement.value || postIdElement.getAttribute('data-post-id');
        if (postId) {
            recordBlogVisit(postId);
        }
    }
});

// Make sure recordBlogVisit is globally available
window.recordBlogVisit = recordBlogVisit;
