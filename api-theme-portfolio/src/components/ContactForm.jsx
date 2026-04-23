import { useState } from 'react';
import '../css/contact.css';

function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Basic validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            setStatusMessage('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            setStatusMessage('Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);
        setStatusMessage('Sending message...');

        try {
            const response = await fetch('/api/v1/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer visitor-token'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setStatusMessage('Message sent successfully! I\'ll get back to you soon.');
                
                // Reset form
                e.target.reset();
            } else {
                // Handle HTTP errors
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.message || `Error: ${response.status} ${response.statusText}`;
                setStatusMessage(`Failed to send message: ${errorMessage}`);
            }
        } catch (error) {
            // Handle network errors
            console.error('Contact form error:', error);
            setStatusMessage('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="form-section">
            <div className="contact-form">

                <form id="contactForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            className="form-input" 
                            required 
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className="form-input" 
                            required 
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject" className="form-label">Subject</label>
                        <input 
                            type="text" 
                            id="subject" 
                            name="subject" 
                            className="form-input" 
                            required 
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            className="form-textarea" 
                            required 
                            placeholder="Tell me about your project, idea, or just say hello..."
                            disabled={isSubmitting}
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        className="form-submit" 
                        id="submitBtn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'SENDING...' : 'Send Message'}
                    </button>

                    <div id="statusMessage" className="status-message">
                        {statusMessage}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContactForm;

//TODO: fix message sending backend. Ensure user can succesfully email me