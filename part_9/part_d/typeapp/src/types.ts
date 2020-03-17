export interface ContentItem {
  name: string;
  exerciseCount: number;
}

export interface CourseName {
  courseName: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CourseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CourseWithDescription {
  name: "Fundamentals";
  description: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CourseWithDescription {
  name: "Deeper type usage";
  description: string;
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CourseWithDescription {
  name: "Custom course";
  grade: number;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

export interface CourseContent {
  content: CoursePart[];
}
