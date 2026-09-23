import FadeIn from "../FadeIn/FadeIn";
import "./About.css";

function About() {
  // Replace these placeholders with your education details.
  const education = [
    {
      degree: "Frontend Development & Programming Foundations",
      school: "Get Academy",
      logo: "/education/GetAcademy.png",
      period: "2025 — 2026",
      description: "At Get Academy, I learned JavaScript and the fundamentals of web development, including variables, operators, functions, conditional statements, loops, arrays, and objects. I also learned HTML, CSS, the MVC (Model–View–Controller) pattern, and unit testing. I frequently worked in teams on larger projects, building functional prototypes, discussing requirements, receiving feedback, and designing user interfaces. These projects helped me apply what I had learned in a realistic development setting. I also studied C# and object-oriented programming, including classes, encapsulation, inheritance, interfaces, and SOLID principles. The program emphasized practical learning through videos and assignments that I completed at my own pace, collaboration in teams of roughly four to six students, and support from coding instructors when needed. My frontend studies focused on building modern, responsive web applications using HTML, CSS, JavaScript, TypeScript, and Vue.js 3, with an emphasis on single-page applications (SPAs), responsive design, component-based development, frontend architecture, and design patterns. I gained hands-on experience applying these technologies and concepts through practical development projects.",
    },
    {
      degree: "Backend Development",
      school: "Noroff",
      logo: "/education/Noroff.png",
      period: "2026 — 2027",
      description: "I completed a one-year Backend Development program focused on designing, building, and deploying modern server-side applications and APIs. I developed practical skills in JavaScript, Node.js, Express.js, REST APIs, SQL databases, and database management while learning how to structure reliable and maintainable backend systems. The program covered API design and development, CRUD operations, data modeling, authentication and authorization, security, error handling, testing, and working with relational databases. I also gained experience with Git and GitHub, environment configuration, deployment, and connecting backend services to frontend applications. Throughout the program, I applied these skills through practical projects, building complete backend solutions from database design through API deployment.",
    },
  ];

  return (
    <section id="about" className="about">
      <FadeIn>
        <div className="container">
          <h2>About Me</h2>

          <p>
            Hi! I'm Sander Karlsen, a junior full-stack developer with a
            passion for coding.
          </p>

          <section className="education" aria-labelledby="education-heading">
            <div className="education-heading">
              <span className="education-eyebrow">My background</span>
              <h3 id="education-heading">Education</h3>
            </div>

            <ol className="education-timeline">
              {education.map((item) => (
                <li className="education-item" key={`${item.degree}-${item.period}`}>
                  <img className="education-logo" src={item.logo} alt={`${item.school} logo`} />
                  <article className="education-card">
                    <span className="education-period">{item.period}</span>
                    <h4>{item.degree}</h4>
                    <span className="education-school">{item.school}</span>
                    <p>{item.description}</p>
                  </article>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </FadeIn>
    </section>
  );
}

export default About;
