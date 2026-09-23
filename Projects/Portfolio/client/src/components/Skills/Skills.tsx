import FadeIn from "../FadeIn/FadeIn";
import Skill from "../Skill/Skill";
import "./Skills.css";

function Skills() {
  const skills = [
      { name: "React", color: "#61dafb" },
      { name: "TypeScript", color: "#3178c6" },
      { name: "Express", color: "#333333" }, { name: "HTML", color: "#e34f26" },
      { name: "CSS", color: "#264de4" },
      { name: "Vue", color: "#42b883" },
      { name: "JavaScript", color: "#f7df1e" },
      { name: "SQL", color: "#4479a1" },
      { name: "Angular", color: "#dd0031" },
      { name: "Node.js", color: "#339933" },
      { name: "Nuxt.js", color: "#00dc82" },
      { name: "Bootstrap", color: "#7952b3" },
      { name: "EJS", color: "#a91e50" },
      { name: "Tailwind", color: "#38bdf8" },
      { name: "MongoDB", color: "#47a248" },
      { name: "jQuery", color: "#0769ad" },
      { name: "PHP", color: "#777bb4" },
    ]

  return (
    <section id="skills" className="skills">
      <FadeIn>
        <div className="container">
          <h2>My Skills</h2>
          <div className="skills-list">
            {skills.map((skill) => (
              <Skill key={skill.name} name={skill.name} color={skill.color} />
              ))}
          </div>
      </div>
      </FadeIn>
    </section>
  );
}

export default Skills;
