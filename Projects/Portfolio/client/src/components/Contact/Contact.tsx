import { useState } from "react";
import type { FormEvent } from "react";
import "./Contact.css";
import FadeIn from "../FadeIn/FadeIn";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSending) return;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("Please fill in all fields.");
      return;
    }

    if (name.trim().length < 2) {
      setStatus("Please enter a valid name.");
      return;
    }

    if (!email.includes("@")) {
      setStatus("Please enter a valid email.");
      return;
    }

    if (message.trim().length < 10) {
      setStatus("Your message must be at least 10 characters.");
      return;
    }

    try {
      setIsSending(true);
      setStatus("Sending...");

      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message.");
      }

      setStatus("Message sent successfully!");

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section id="contact" className="contact">
      <FadeIn>
        <div className="container">
          <h2>Contact Me</h2>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={isSending}
            />

            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isSending}
            />

            <textarea
              placeholder="Your message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              disabled={isSending}
            />

            <button type="submit" disabled={isSending}>
              {isSending ? "Sending..." : "Send Message"}
            </button>

            {status && (
              <p
                className={
                  status === "Message sent successfully!"
                    ? "form-success"
                    : "form-status"
                }
              >
                {status}
              </p>
            )}
          </form>
        </div>
      </FadeIn>
    </section>
  );
}

export default Contact;