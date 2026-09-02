import "./Skill.css";

type SkillProps = {
  name: string;
  color: string;
};

type SkillStyle = React.CSSProperties & {
  "--skill-color": string;
};

function Skill({ name, color }: SkillProps) {
  const skillStyle: SkillStyle = {
    "--skill-color": color,
  };

  return (
    <div className="skill" style={skillStyle}>
      <h3>{name}</h3>
    </div>
  );
}

export default Skill;