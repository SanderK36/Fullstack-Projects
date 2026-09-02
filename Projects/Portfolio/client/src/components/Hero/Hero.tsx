import "./Hero.css";

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container">
        <h1>Sander Karlsen</h1>

        <p>Junior Developer</p>

        <a href="#projects" className="hero-button">
          View My Projects
        </a>
      </div>
    </section>
  );
}

export default Hero;
