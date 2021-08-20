// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export type TypeTool = {
  name: string;
  imgSrc: string;
  imgAlt?: string;
};

type T = {
  name: string;
  url: string;
};

export type TypeProject = {
  projectName: string;
  imgUrl: string;
  imgAlt: string;
  demoUrl: string;
  sourceUrl: string;
  description: string;
  animationName: string;
  delay: any;
  duration: any;
  tags: Array<T>;
};
