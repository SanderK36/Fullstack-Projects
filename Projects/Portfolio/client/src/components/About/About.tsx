import FadeIn from "../FadeIn/FadeIn";
import "./About.css";

function About() {
  return (
    <section id="about" className="about">
      <FadeIn>
        <div className="container">
          <h2>About Me</h2>

          <p>
            Hi! I'm Sander Karlsen, a junior full-stack developer with a
            passion for coding.
          </p>
        </div>
      </FadeIn>
    </section>
  );
}

export default About;