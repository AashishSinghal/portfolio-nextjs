"use client"

export type Project = {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  demoUrl?: string
  githubUrl?: string
  featured: boolean
}

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  coverImage: string
  tags: string[]
}

export type Game = {
  id: string
  title: string
  description: string
  image: string
  difficulty: "easy" | "medium" | "hard"
}

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with product management, cart, and checkout.",
    longDescription:
      "This e-commerce platform provides a comprehensive solution for online stores. It includes features such as product catalog management, user authentication, shopping cart functionality, secure checkout process, order tracking, and admin dashboard for inventory management. Built with scalability in mind, it can handle large product catalogs and high traffic volumes. The platform also includes analytics to track user behavior and sales performance.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    demoUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com/example/ecommerce",
    featured: true,
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    longDescription:
      "This task management application helps teams organize and track their work efficiently. It features task creation, assignment, prioritization, and deadline tracking. Users can create projects, add team members, and collaborate in real-time. The app includes a dashboard that provides an overview of project progress, upcoming deadlines, and team workload. Notifications keep everyone informed about task updates and approaching deadlines. The intuitive drag-and-drop interface makes it easy to reorganize tasks and update their status.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["React", "Redux", "Node.js", "Express", "MongoDB", "Socket.io"],
    demoUrl: "https://example.com/taskmanager",
    githubUrl: "https://github.com/example/taskmanager",
    featured: true,
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description: "A weather dashboard that displays current and forecasted weather data.",
    longDescription:
      "This weather dashboard provides users with accurate and up-to-date weather information for locations worldwide. It displays current conditions, hourly forecasts, and extended 7-day forecasts. Users can save favorite locations for quick access and receive alerts for severe weather conditions. The dashboard includes visualizations for temperature trends, precipitation probability, wind speed and direction, and humidity levels. It sources data from multiple weather APIs to ensure reliability and accuracy.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["JavaScript", "React", "Chart.js", "Weather API", "CSS"],
    demoUrl: "https://example.com/weather",
    githubUrl: "https://github.com/example/weather",
    featured: false,
  },
  {
    id: "4",
    title: "Fitness Tracker",
    description: "A fitness tracking application that monitors workouts and nutrition.",
    longDescription:
      "This comprehensive fitness tracker helps users monitor their health and fitness journey. It allows tracking of various workout types, including strength training, cardio, and flexibility exercises. Users can log their nutrition intake, set fitness goals, and monitor their progress over time. The app provides insights through visualizations of workout history, calorie intake vs. expenditure, and progress toward goals. It can integrate with popular fitness devices and apps to automatically import workout data. Personalized recommendations help users optimize their fitness routines based on their goals and performance.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["React Native", "Firebase", "Redux", "Health API", "Chart.js"],
    demoUrl: "https://example.com/fitness",
    githubUrl: "https://github.com/example/fitness",
    featured: false,
  },
  {
    id: "5",
    title: "Social Media Dashboard",
    description: "A dashboard for managing and analyzing social media accounts.",
    longDescription:
      "This social media dashboard provides a centralized platform for managing multiple social media accounts. It allows scheduling and publishing of posts across different platforms, monitoring engagement metrics, and analyzing audience demographics. The dashboard includes sentiment analysis of comments and mentions, competitor tracking, and content performance analytics. Users can generate comprehensive reports to evaluate their social media strategy effectiveness. The tool also suggests optimal posting times based on historical engagement data and provides content ideas based on trending topics in the user's industry.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["Vue.js", "Node.js", "Express", "MongoDB", "Social Media APIs"],
    demoUrl: "https://example.com/socialmedia",
    githubUrl: "https://github.com/example/socialmedia",
    featured: true,
  },
  {
    id: "6",
    title: "Portfolio Website",
    description: "A personal portfolio website to showcase projects and skills.",
    longDescription:
      "This portfolio website serves as a professional online presence to showcase work, skills, and achievements. It features a clean, responsive design that adapts to different screen sizes and devices. The site includes sections for projects, with detailed descriptions and links to live demos or repositories. A skills section highlights technical proficiencies, while a resume section provides an overview of professional experience and education. The contact form allows potential clients or employers to reach out easily. The website is optimized for search engines and fast loading times.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
    demoUrl: "https://example.com/portfolio",
    githubUrl: "https://github.com/example/portfolio",
    featured: false,
  },
]

export const blogPosts: BlogPost[] = [
  {
    slug: "1",
    title: "Getting Started with Next.js",
    excerpt: "Learn the basics of Next.js and how to set up your first project.",
    content: `
# Getting Started with Next.js

Next.js is a React framework that enables server-side rendering and static site generation for React applications. It's designed to make it easy to build fast, SEO-friendly web applications.

## Why Next.js?

- **Server-side Rendering (SSR)**: Next.js renders pages on the server, which improves performance and SEO.
- **Static Site Generation (SSG)**: Generate static HTML at build time for even better performance.
- **API Routes**: Create API endpoints as part of your Next.js application.
- **File-based Routing**: Create routes based on the file structure in your pages directory.
- **Built-in CSS Support**: Import CSS files directly in your components.

## Setting Up Your First Project

To create a new Next.js project, run the following command:

\`\`\`bash
npx create-next-app my-next-app
\`\`\`

This will create a new directory called \`my-next-app\` with a basic Next.js project structure.

## Project Structure

A typical Next.js project structure looks like this:

\`\`\`
my-next-app/
  ├── pages/
  │   ├── _app.js
  │   ├── index.js
  │   └── api/
  ├── public/
  ├── styles/
  ├── components/
  ├── package.json
  └── next.config.js
\`\`\`

- **pages/**: Contains your application's pages and API routes.
- **public/**: Stores static assets like images and fonts.
- **styles/**: Contains your CSS files.
- **components/**: Houses your React components.

## Creating Your First Page

In Next.js, pages are React components exported from files in the \`pages\` directory. Let's create a simple home page:

\`\`\`jsx
// pages/index.js
export default function Home() {
  return (
    <div>
      <h1>Welcome to My Next.js App</h1>
      <p>This is my first Next.js page!</p>
    </div>
  );
}
\`\`\`

## Running Your Application

To start your development server, run:

\`\`\`bash
npm run dev
\`\`\`

Your application will be available at \`http://localhost:3000\`.

## Conclusion

Next.js provides a powerful framework for building React applications with server-side rendering and static site generation. Its intuitive API and excellent developer experience make it a great choice for modern web development.

In future posts, we'll explore more advanced features of Next.js, such as data fetching, dynamic routes, and deployment strategies.
    `,
    date: "2023-05-15",
    author: "Jane Doe",
    coverImage: "/placeholder.svg?height=300&width=600",
    tags: ["Next.js", "React", "Web Development"],
  },
  {
    slug: "2",
    title: "Understanding React Hooks",
    excerpt: "A comprehensive guide to React Hooks and how to use them effectively.",
    content: `
# Understanding React Hooks

React Hooks were introduced in React 16.8 as a way to use state and other React features without writing a class component. They allow you to "hook into" React state and lifecycle features from function components.

## Why Hooks?

Before Hooks, you had to use class components if you needed state or lifecycle methods. This led to several issues:

- **Complex Components**: Class components could become unwieldy with many lifecycle methods.
- **Reusing Stateful Logic**: It was difficult to reuse stateful logic between components.
- **Confusing Classes**: The \`this\` keyword in JavaScript classes can be confusing.

Hooks solve these problems by allowing you to use state and other React features in function components.

## Basic Hooks

### useState

The \`useState\` hook lets you add state to function components:

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

### useEffect

The \`useEffect\` hook lets you perform side effects in function components:

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  }, [count]); // Only re-run the effect if count changes

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

### useContext

The \`useContext\` hook lets you subscribe to React context without introducing nesting:

\`\`\`jsx
import React, { useContext } from 'react';
const ThemeContext = React.createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button theme={theme}>I am styled by theme context!</button>;
}
\`\`\`

## Additional Hooks

React provides several additional hooks:

- **useReducer**: An alternative to useState for complex state logic.
- **useCallback**: Returns a memoized callback function.
- **useMemo**: Returns a memoized value.
- **useRef**: Returns a mutable ref object.
- **useLayoutEffect**: Similar to useEffect, but fires synchronously after all DOM mutations.
- **useDebugValue**: Used to display a label for custom hooks in React DevTools.

## Custom Hooks

You can create your own Hooks to reuse stateful logic between components:

\`\`\`jsx
import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return width;
}

function MyComponent() {
  const width = useWindowWidth();
  return <div>Window width: {width}</div>;
}
\`\`\`

## Rules of Hooks

There are two important rules to follow when using Hooks:

1. **Only Call Hooks at the Top Level**: Don't call Hooks inside loops, conditions, or nested functions.
2. **Only Call Hooks from React Functions**: Call Hooks from React function components or custom Hooks.

## Conclusion

React Hooks provide a more direct API to React concepts you already know: props, state, context, refs, and lifecycle. They make it easier to reuse stateful logic between components and make your code more readable and maintainable.

In future posts, we'll explore more advanced patterns with Hooks and how to combine them effectively in larger applications.
    `,
    date: "2023-06-22",
    author: "John Smith",
    coverImage: "/placeholder.svg?height=300&width=600",
    tags: ["React", "Hooks", "JavaScript"],
  },
  {
    slug: "3",
    title: "CSS Grid vs. Flexbox",
    excerpt: "A comparison of CSS Grid and Flexbox for layout design.",
    content: `
# CSS Grid vs. Flexbox: When to Use Each

CSS Grid and Flexbox are two powerful layout systems in CSS that solve different problems. Understanding when to use each can help you create more efficient and maintainable layouts.

## Flexbox: One-Dimensional Layout

Flexbox is designed for one-dimensional layouts - either a row or a column. It's perfect for:

- Navigation menus
- Card layouts with equal height but variable content
- Centering elements vertically and horizontally
- Distributing space between items in a container

### Basic Flexbox Example

\`\`\`css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item {
  flex: 1;
  margin: 10px;
}
\`\`\`

This creates a row of items that are evenly spaced and vertically centered.

## CSS Grid: Two-Dimensional Layout

CSS Grid is designed for two-dimensional layouts - rows and columns together. It's ideal for:

- Overall page layouts
- Complex grid systems
- Placing items in exact positions
- Creating layouts where items span multiple rows or columns

### Basic Grid Example

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}

.item {
  grid-column: span 1;
}

.wide-item {
  grid-column: span 2;
}
\`\`\`

This creates a three-column grid where some items can span multiple columns.

## When to Use Flexbox

Use Flexbox when:

1. You're laying out items in a single dimension (row or column)
2. You want to distribute space dynamically between items
3. You need to align items within their container
4. You're creating a small-scale layout

## When to Use Grid

Use Grid when:

1. You're creating a two-dimensional layout (rows and columns)
2. You need precise control over item placement
3. You're designing a complex layout that would be difficult with Flexbox
4. You're creating a full-page or large section layout

## Combining Flexbox and Grid

Often, the best approach is to use both:

- Use Grid for the overall page layout
- Use Flexbox for components within the grid

\`\`\`css
.page {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.navbar {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar {
  grid-column: 1;
  grid-row: 2;
}

.content {
  grid-column: 2;
  grid-row: 2;
}

.footer {
  grid-column: 1 / -1;
  grid-row: 3;
}
\`\`\`

## Browser Support

Both Flexbox and Grid have excellent browser support:

- Flexbox: Supported in all modern browsers
- Grid: Supported in all modern browsers

## Conclusion

Both Flexbox and Grid are powerful tools in modern CSS. Understanding their strengths and use cases will help you create more efficient layouts:

- Flexbox excels at one-dimensional layouts and alignment
- Grid excels at two-dimensional layouts and precise placement
- Often, the best approach is to use both together

By choosing the right tool for each part of your layout, you can create more maintainable and responsive designs.
    `,
    date: "2023-07-10",
    author: "Sarah Johnson",
    coverImage: "/placeholder.svg?height=300&width=600",
    tags: ["CSS", "Web Design", "Flexbox", "CSS Grid"],
  },
  {
    slug: "4",
    title: "Introduction to TypeScript",
    excerpt: "Learn the basics of TypeScript and how it improves JavaScript development.",
    content: `
# Introduction to TypeScript

TypeScript is a strongly typed programming language that builds on JavaScript. It adds static types to JavaScript, which can help prevent bugs and improve developer productivity through better tooling.

## Why TypeScript?

JavaScript is dynamically typed, which means variables can change types during runtime. This flexibility can lead to unexpected bugs. TypeScript addresses this by adding a type system that:

- Catches errors during development rather than at runtime
- Provides better documentation through type annotations
- Enables better IDE support with autocompletion and refactoring tools
- Makes code more maintainable, especially in larger projects

## Getting Started

To start using TypeScript, you'll need to install it:

\`\`\`bash
npm install -g typescript
\`\`\`

Create a simple TypeScript file (e.g., \`hello.ts\`):

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("TypeScript"));
\`\`\`

Compile it to JavaScript:

\`\`\`bash
tsc hello.ts
\`\`\`

This will generate a \`hello.js\` file that you can run with Node.js.

## Basic Types

TypeScript provides several basic types:

\`\`\`typescript
// Boolean
let isDone: boolean = false;

// Number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;

// String
let color: string = "blue";
let greeting: string = \`Hello, \${color}!\`;

// Array
let list: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob", "Charlie"];

// Tuple
let x: [string, number] = ["hello", 10];

// Enum
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// Any
let notSure: any = 4;
notSure = "maybe a string";
notSure = false;

// Void
function warnUser(): void {
  console.log("This is a warning message");
}

// Null and Undefined
let u: undefined = undefined;
let n: null = null;

// Never
function error(message: string): never {
  throw new Error(message);
}

// Object
let obj: object = {key: "value"};
\`\`\`

## Interfaces

Interfaces define the structure of objects:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
  readonly createdAt: Date; // Read-only property
}

function createUser(user: User): User {
  return user;
}

const newUser = createUser({
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  createdAt: new Date()
});
\`\`\`

## Classes

TypeScript supports class-based object-oriented programming:

\`\`\`typescript
class Person {
  private name: string;
  protected age: number;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  
  greet(): string {
    return \`Hello, my name is \${this.name} and I am \${this.age} years old.\`;
  }
}

class Employee extends Person {
  private department: string;
  
  constructor(name: string, age: number, department: string) {
    super(name, age);
    this.department = department;
  }
  
  greet(): string {
    return \`${super.greet()} I work in \${this.department}.\`;
  }
}

const john = new Employee("John", 30, "Engineering");
console.log(john.greet());
\`\`\`

## Generics

Generics allow you to create reusable components:

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
let output2 = identity(123); // Type inference works too
\`\`\`

## Type Assertions

Type assertions are like type casts in other languages:

\`\`\`typescript
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
// Or using the angle-bracket syntax
let strLength2: number = (<string>someValue).length;
\`\`\`

## TypeScript with React

TypeScript works great with React:

\`\`\`typescript
import React, { useState } from 'react';

interface Props {
  initialCount: number;
}

const Counter: React.FC<Props> = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Counter;
\`\`\`

## Conclusion

TypeScript adds a powerful type system to JavaScript, helping catch errors early and improve code quality. While there is a learning curve, the benefits of TypeScript become increasingly apparent as projects grow in size and complexity.

In future posts, we'll explore more advanced TypeScript features and patterns for building robust applications.
    `,
    date: "2023-08-05",
    author: "Michael Chen",
    coverImage: "/placeholder.svg?height=300&width=600",
    tags: ["TypeScript", "JavaScript", "Programming"],
  },
]

export const games: Game[] = [
  {
    id: "1",
    title: "Tic Tac Toe",
    description: "The classic game of X's and O's. Play against a friend on the same device.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "easy",
  },
  {
    id: "2",
    title: "Memory Match",
    description: "Test your memory by matching pairs of cards. Find all pairs in the fewest moves possible.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "medium",
  },
  {
    id: "3",
    title: "Snake Game",
    description: "Control a snake to eat food and grow longer without hitting the walls or yourself.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "medium",
  },
]

