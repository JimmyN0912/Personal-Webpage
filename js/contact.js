// Contact form webhook integration

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    const statusMessage = document.getElementById('status-message');
    
    // Webhook URL - Replace this with your actual webhook URL
    const WEBHOOK_URL = 'https://hook.us2.make.com/iio1y69tgfwsbmn3373s4rj2mevk8b79';
    
    // Debug info on load
    console.log('Contact form handler loaded');
    console.log('Contact form found:', !!contactForm);
    
    // Show status message
    function showStatus(message, type = 'loading') {
        formStatus.classList.remove('hidden', 'success', 'error', 'loading');
        formStatus.classList.add(type);
        statusMessage.textContent = message;
        
        // Hide message after 5 seconds if it's a success or error
        if (type === 'success' || type === 'error') {
            setTimeout(() => {
                formStatus.classList.add('hidden');
            }, 5000);
        }
    }
    
    // Function to collect form data directly
    function getFormData() {
        return {
            name: document.querySelector('#name').value.trim(),
            email: document.querySelector('#email').value.trim(),
            subject: document.querySelector('#subject').value.trim(),
            message: document.querySelector('#message').value.trim(),
            timestamp: new Date().toISOString()
        };
    }
    
    // Submit handler function
    function handleSubmit(event) {
        // Always prevent default to avoid conflicts
        event.preventDefault();
        event.stopPropagation();
        
        console.log('Contact form submit handler triggered');
        
        // Show loading status
        showStatus('Sending your message...', 'loading');
        
        // Collect data directly from fields
        const data = getFormData();
        console.log('Collected form data:', data);
        
        // Check if we have valid data before sending
        if (!data.name || !data.email || !data.subject || !data.message) {
            showStatus('Please fill out all fields correctly.', 'error');
            console.error('Form validation failed - missing fields', data);
            return;
        }
        
        // Send data to webhook
        fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            console.log('Response status:', response.status);
            // Check if response is ok (status code 200-299)
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            
            // Success, but don't try to parse the response
            return { success: true };
        })
        .then(() => {
            // Success
            showStatus('Your message has been sent successfully!', 'success');
            contactForm.reset();
        })
        .catch(error => {
            // Error
            showStatus('Sorry, there was an error sending your message. Please try again.', 'error');
            console.error('Error:', error);
        });
        
        return false; // Ensure no further form processing
    }
    
    // Remove any existing event handlers and add our new one
    if (contactForm) {
        // Use both approaches to ensure our handler gets triggered
        contactForm.addEventListener('submit', handleSubmit);
        
        // Also use direct button click as a fallback
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
            console.log('Submit button found, adding click handler');
            submitButton.addEventListener('click', function(event) {
                console.log('Submit button clicked');
                handleSubmit(event);
            });
        }
    } else {
        console.error('Contact form not found!');
    }
});
