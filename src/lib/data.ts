import {
  SiCplusplus,
  SiDocker,
  SiGit,
  SiGooglecloud,
  SiJupyter,
  SiLinux,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVisualstudiocode,
} from "react-icons/si";

import { FaJava } from "react-icons/fa";

interface ProjectItem {
  title: string;
  description: string;
  link: string;
}

export const projects: ProjectItem[] = [
  {
    title: "Portal",
    description:
      "A unified hackathon platform for streamlined interaction between attendees and organizers",
    link: "https://github.com/deltahacks/portal",
  },
  {
    title: "Dash",
    description:
      "A smart new tab page that acts like a central hub for all your web tools",
    link: "https://github.com/Krish120003/dash",
  },
  {
    title: "C++ Neural Network",
    description:
      "A simple implementation of fully connected neural networks in C++",
    link: "https://github.com/Krish120003/CPP_Neural_Network",
  },
  {
    title: "Website",
    description:
      "My personal website and blog, built with Next.js and Tailwind",
    link: "https://github.com/Krish120003/website",
  },
  {
    title: "River",
    description: "A simplified and user-friendly RSVP collection platform",
    link: "https://github.com/Krish120003/rsvp",
  },
  {
    title: "SheepIt Client",
    description: "A cross-platform Python/Qt GUI client for SheepIt Renderfarm",
    link: "https://github.com/Krish120003/SheepIt-Client",
  },
  {
    title: "Advent of Code solutions",
    description:
      "My solutions to Advent of Code since 2022, implemented in Python",
    link: "https://github.com/Krish120003/AdventOfCode",
  },
  {
    title: "BitTorrent Client",
    description:
      "A simple BitTorrent client written in Python, following the codecrafters BitTorrent challenge",
    link: "https://github.com/Krish120003/codecrafters-bittorrent-python",
  },
  {
    title: "Spiral Particle System",
    description:
      "A simple particle system that draws a spiral using particles in C++",
    link: "https://github.com/Krish120003/Spiral-Particle-System",
  },
];

interface TechnologyItem {
  name: string;
  icon: React.FC;
}
export const technologies: TechnologyItem[] = [
  {
    name: "Python",
    icon: SiPython as React.FC,
  },
  {
    name: "Typescript",
    icon: SiTypescript as React.FC,
  },
  {
    name: "Docker",
    icon: SiDocker as React.FC,
  },
  {
    name: "React",
    icon: SiReact as React.FC,
  },
  {
    name: "Tailwind",
    icon: SiTailwindcss as React.FC,
  },
  {
    name: "C++",
    icon: SiCplusplus as React.FC,
  },
  {
    name: "Next.js",
    icon: SiNextdotjs as React.FC,
  },
  {
    name: "Node.js",
    icon: SiNodedotjs as React.FC,
  },
  {
    name: "Git",
    icon: SiGit as React.FC,
  },
  {
    name: "Linux",
    icon: SiLinux as React.FC,
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql as React.FC,
  },
  {
    name: "Google Cloud",
    icon: SiGooglecloud as React.FC,
  },
  {
    name: "Jupyter",
    icon: SiJupyter as React.FC,
  },
  {
    name: "Java",
    icon: FaJava as React.FC,
  },
  {
    name: "VS Code",
    icon: SiVisualstudiocode as React.FC,
  },
];
