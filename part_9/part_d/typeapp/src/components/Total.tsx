import React from "react";
import { CourseContent } from "../types";

const Total: React.FC<CourseContent> = ({ content }) => {
  return <p>Number of exercises {content.reduce((carry, part) => carry + part.exerciseCount, 0)}</p>;
};

export default Total;
