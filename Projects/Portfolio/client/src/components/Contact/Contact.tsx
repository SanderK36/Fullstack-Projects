import { useState } from "react";
import './Contact.css'

function Contact() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        try {
            const response = await fetch(
                "http://localhost:5000/api/contact",
                { method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ name, email, message, }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error){
            console.error("Error sending message:", error);
        }
    }
    
    return (
        <section id="contact" className="contact">
            <div className="container">
                <h2>Get in touch</h2>

                <p className="contact-description">
                    Have any questions or want to work together? Fill out the form and i'll get back to you as soon as i can!
                </p>


                <form className="contact-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)}/>

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Your@emal.com" value={email} onChange={(event) => setEmail(event.target.value)}/>

                    <label htmlFor="message">Message</label>

                    <textarea id="message" placeholder="Write your message..." rows={6} value={message} onChange={(event) => setMessage(event.target.value)}/>

                        <button type="submit">Send Message</button>
                </form>
            </div>
        </section>
        )
    }
    export default Contact;