import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/Contact.css';


function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const templateParams = {
            from_name: name,
            from_email: email, // User's email (from the form)
            message: message,
            to_email: "info@harmonysounds.co.ke", // Ensure this matches EmailJS template
        };
    
        emailjs.send(
            "service_2tx5dkk",  // Replace with your actual service ID
            "template_kkeuhp3", // Replace with your actual template ID
            templateParams,
            "8xx6KtJD_mwwxtc-4"      // Replace with your actual user ID (public key)
        )
        .then((response) => {
            console.log("SUCCESS!", response.status, response.text);
            alert("Message sent successfully!");
            setName('');
            setEmail('');
            setMessage('');
        })
        .catch((error) => {
            console.log("FAILED...", error);
            alert("Failed to send message.");
        });
    };
    

    return (
        <div className="contact-container">
            <h2>Contact Us</h2>
            <div className="contact-content">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Message:</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit">Send Message</button>
                </form>
                <div className="contact-details">
                    <h3>Contact Details</h3>
                    <p><FontAwesomeIcon icon={faPhone} /> 0720361935</p>
                    <p><FontAwesomeIcon icon={faEnvelope} /> info@harmonysounds.co.ke</p>
                    <p><FontAwesomeIcon icon={faMapMarkerAlt} /> North Airport Road, Behind Even Business Park, Nairobi, Kenya</p>
                </div>
            </div>
        </div>
    );
}

export default Contact;
