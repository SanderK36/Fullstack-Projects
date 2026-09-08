import "./Footer.css";

function Footer() {
  return (
  <footer className="footer">
    <div className="container">
        <p className="footer-text">© {new Date().getFullYear()} Sander Karlsen. All rights reserved.</p>
        <div className="footer-links">
            <a href="https://github.com/SanderK36" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/sander-karlsen-21ab91412/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:sander.k606@gmail.com">Email</a>
        </div>
        <p className="footer-built"> Built with React, TypeScript & Express</p>
    </div>
    </footer>
  );
}

export default Footer;