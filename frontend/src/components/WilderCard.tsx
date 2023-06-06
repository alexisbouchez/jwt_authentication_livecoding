import { getDisplayName } from "../utils/getDisplayName";

export type WilderProps = {
  firstName: string;
  lastName: string;
  city?: string;
  skills?: string[];
};

export const WilderCard = ({
  firstName,
  lastName,
  city,
  skills,
}: WilderProps) => {
  return (
    <div className="card">
      <h2 data-testid="heading">{getDisplayName(firstName, lastName, city)}</h2>

      <ul data-testid="skills-list">
        {skills?.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};
