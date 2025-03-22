# JimmyN's Personal Website

A modern, responsive personal website and blog built with HTML, CSS, and JavaScript.

## Description

This project is a personal website for me, featuring a clean and modern design that showcases my portfolio, blog posts, and information about his skills and background. The website is fully responsive and includes several interactive features.

## Features

- Responsive design that works across desktop, tablet, and mobile devices
- Blog section with filtering by categories
- Projects showcase
- About page with skills and background information
- Contact form
- Timeline visualization
- Modal image viewing
- Visitor counter for blog posts
- Social media integration

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Font Awesome icons
- JSON for storing visitor counts

## Project Structure
```
Blog Page/ 
├── css/ 
│ ├── styles.css # Main stylesheet 
│ ├── blogs.css # Blog-specific styles 
│ ├── additional.css # Additional components (timeline, modals, etc.) 
│ └── all.min.css # Font Awesome icons 
├── js/ 
│ ├── script.js # Main JavaScript file 
│ ├── blogs.js # Blog functionality 
│ ├── visitor-counter.js # Visitor counter functionality
│ └── contact.js # Contact form handling 
├── images/ # Image assets 
├── blogs/ # Individual blog post pages 
├── projects/ # Project detail pages 
├── index.html # Home page 
├── blog.html # Blog listing page 
├── projects.html # Projects listing page 
├── about.html # About page 
├── contact.html # Contact page 
└── README.md # Project documentation
```

## Setup

1. Clone the repository:
```bash
$ git clone https://github.com/JimmyN0912/personal-website.git
```

2. Open `index.html` in your browser to view the website locally.

3. For the visitor counter functionality to work, you'll need to set up a simple server to handle the API requests. The server files are in the `api` directory.

## Development

To modify the website:

1. Edit the HTML files to update content
2. Modify CSS files in the `css` directory to change styling
3. Edit JavaScript files in the `js` directory to alter functionality

## Browser Compatibility

The website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.