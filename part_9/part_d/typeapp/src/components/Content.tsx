import React from "react";
import { CourseContent } from "../types";

const Content: React.FC<CourseContent> = ({ content }) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  return (
    <div>
      {content.map((item, index) => {
        switch (item.name) {
          case "Fundamentals":
            return (
              <p key={`${item.name}-${item.exerciseCount}-${index}`}>
                {item.name} <br /> {item.description} <br /> {item.exerciseCount}
              </p>
            );

          case "Using props to pass data":
            return (
              <p key={`${item.name}-${item.exerciseCount}-${index}`}>
                {item.name} <br /> {item.groupProjectCount} <br /> {item.exerciseCount}
              </p>
            );

          case "Deeper type usage":
            return (
              <p key={`${item.name}-${item.exerciseCount}-${index}`}>
                {item.name} <br /> {item.description} <br /> {item.exerciseSubmissionLink} <br /> {item.exerciseCount}
              </p>
            );

          case "Custom course":
            return (
              <p key={`${item.name}-${item.exerciseCount}-${index}`}>
                {item.name} <br /> {item.description} <br /> {item.grade} <br /> {item.exerciseCount}
              </p>
            );

          default:
            return assertNever(item);
        }
      })}
    </div>
  );
};

export default Content;
