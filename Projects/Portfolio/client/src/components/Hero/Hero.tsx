import "./Hero.css";

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container">
        <h1>Sander Karlsen</h1>

        <p>Junior Developer</p>

        <div className="hero-buttons">
          <a href="#projects" className="hero-button"> View My Projects </a>

          <a href="https://github.com/SanderK36"className="hero-button hero-secondary-button" target="_blank" rel="noopener noreferrer">GitHub</a>

          <a href="https://www.linkedin.com/in/sander-karlsen-21ab91412/" className="hero-button hero-secondary-button" target="_blank" rel="noopener noreferrer">LinkedIn</a>

          <a href="/Sander_Karlsen_CV_oppdatert.pdf" className="hero-button hero-secondary-button" download>Download CV</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;