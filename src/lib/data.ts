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
  image?: string;
}

export const projects: ProjectItem[] = [
  {
    title: "Lane Centering Bracketbot",
    description:
      "Hackathon-winning autonomous robot navigation using vision and lane centering",
    link: "https://github.com/Krish120003/lane-centering-bracketbot",
    image: "/work/bracketbot.png",
  },
  {
    title: "Deltahacks",
    description: "McMaster University's biggest hackathon",
    link: "https://github.com/deltahacks/portal",
    image: "/popovers/deltahacks.png",
  },
  {
    title: "JSON Parser",
    description: "A hand written JSON parser in 500 lines of Rust",
    link: "https://github.com/krish120003/jsonparser",
    image: "/assets/json-parser-in-rust/json_number.png",
  },
  {
    title: "Integrity",
    description: "Scan a hackathon project gallery for misconduct",
    link: "https://github.com/krish120003/integrity",
    image: "/work/integrity.jpg",
  },
  {
    title: "Dash",
    description:
      "A smart new tab page that acts like a central hub for all your web tools",
    link: "https://github.com/Krish120003/dash",
    image:
      "https://github.com/Krish120003/dash/raw/main/assets/dash-banner.png",
  },
  {
    title: "C++ Neural Network",
    description: "Fully connected neural networks in C++",
    link: "https://github.com/Krish120003/CPP_Neural_Network",
    image: "/work/cpp_neural_network.png",
  },
  // {
  //   title: "Website",
  //   description:
  //     "My personal website and blog, built with Next.js and Tailwind",
  //   link: "https://github.com/Krish120003/website",
  // },
  {
    title: "River",
    description: "User-friendly event RSVP collection platform",
    link: "https://github.com/Krish120003/rsvp",
    image:
      "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/407/729/datas/original.png",
  },
  {
    title: "SheepIt Client",
    description: "Cross-platform Python/Qt GUI client for SheepIt Renderfarm",
    link: "https://github.com/Krish120003/SheepIt-Client",
    image: "/work/sheepit.png",
  },
  {
    title: "Advent of Code solutions",
    description: "My solutions to Advent of Code since 2022",
    link: "https://github.com/Krish120003/AdventOfCode",
    image: "/work/aoc.png",
  },
  // {
  //   title: "BitTorrent Client",
  //   description:
  //     "A simple BitTorrent client written in Python, following the codecrafters BitTorrent challenge",
  //   link: "https://github.com/Krish120003/codecrafters-bittorrent-python",
  // },
  {
    title: "Spiral Particle System",
    description: "A C++ particle animation that creates spiral patterns",
    link: "https://github.com/Krish120003/Spiral-Particle-System",
    image: "work/particle_system.png",
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
