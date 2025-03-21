// Function to parse dates from strings like "January 15, 2025"
function parseDate(dateStr) {
  const date = new Date(dateStr);
  return date;
}

// Function to sort blog cards by date
function sortBlogsByDate() {
  const blogGrid = document.querySelector('.blog-grid');
  if (!blogGrid) return;
  
  // Get all blog cards
  const blogCards = Array.from(blogGrid.querySelectorAll('.blog-card'));
  
  // Sort blog cards by date (newest first)
  blogCards.sort((a, b) => {
    const dateA = parseDate(a.querySelector('.blog-date').textContent);
    const dateB = parseDate(b.querySelector('.blog-date').textContent);
    return dateB - dateA; // For descending order (newest first)
  });
  
  // Remove all cards from the grid
  blogGrid.innerHTML = '';
  
  // Append cards in sorted order
  blogCards.forEach(card => {
    blogGrid.appendChild(card);
  });
}

// Run sort function when document is loaded
document.addEventListener('DOMContentLoaded', function() {
  sortBlogsByDate();
  
  // Also re-sort when filters are clicked
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Let the filter operation complete first, then sort
      setTimeout(sortBlogsByDate, 10);
    });
  });
});

// Filter functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const blogCards = document.querySelectorAll('.blog-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      const filter = button.getAttribute('data-filter');
      
      // Show/hide blog cards based on filter
      blogCards.forEach(card => {
        if (filter === 'all') {
          card.style.display = 'block';
        } else {
          const categories = card.getAttribute('data-category').split(' ');
          if (categories.includes(filter)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
});
