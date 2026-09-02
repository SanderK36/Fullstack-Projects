import "./Contact.css"

function Contact() {
    return (
        <section id="contact" className="contact">
            <div className="container">
                <h2>Get in touch with me</h2>

                <p className="contact-description">
                    Have a question or want to work together? Fill out the form and i will answer as soon as i can!
                </p>

                <form className="contact-form">
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" placeholder="Your name"/>

                    <label htmlFor="email">Email</label>
                    <input id="name" type="text" placeholder="Your@email.here"/>

                    <label htmlFor="message">Message</label>
                    <textarea id="message" placeholder="Write your message..." rows={6}/>

                    <button type="submit">Send Message</button>
                </form>
            </div>
        </section>
    )
}

export default Contact;