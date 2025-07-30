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

// Static image imports
import legendImage from "../../public/work/robinhood-legend.webp";
import gitfasterImg from "../../public/work/gitfaster.png";
import zercelImg from "../../public/work/zercel.png";
import bracketbotImg from "../../public/work/bracketbot.png";
import deltahacksImg from "../../public/popovers/deltahacks.png";
import jsonParserImg from "../../public/assets/json-parser-in-rust/json_number.png";
import integrityImg from "../../public/work/integrity.jpg";
import cppNeuralNetworkImg from "../../public/work/cpp_neural_network.png";

import liMeterGif from "../../public/work/limeter.gif";
import liMeterImg from "../../public/work/limeter.jpeg";

import sheepitImg from "../../public/work/sheepit.png";
import aocImg from "../../public/work/aoc.png";
import spiralParticleImg from "../../public/work/particle_system.png";
import dashImg from "../../public/work/dash-banner.png";
import riverImg from "../../public/work/river.png";
import { StaticImageData } from "next/image";

export interface ProjectItemType {
  title: string;
  description: string;
  link: string;
  image?: StaticImageData;
}

export const projects: ProjectItemType[] = [
  {
    title: "Robinhood Legend",
    description:
      "Worked on high performance charts on Robinhood's professional trading platform.",
    link: "https://robinhood.com/legend",
    image: legendImage,
  },
  {
    title: "GitFaster",
    description:
      "A minimal, blazing fast client to make GitHub feel modern again.",
    link: "https://github.com/Krish120003/gitfaster",
    image: gitfasterImg,
  },
  {
    title: "Zercel",
    description:
      "Open-source Vercel clone with Fluid Compute and automatic deployments.",
    link: "https://github.com/Krish120003/zercel",
    image: zercelImg,
  },
  {
    title: "Lane Centering Bracketbot",
    description:
      "Hackathon-winning autonomous robot navigation using vision and lane centering",
    link: "https://github.com/Krish120003/lane-centering-bracketbot",
    image: bracketbotImg,
  },
  {
    title: "Deltahacks",
    description: "McMaster University's biggest hackathon",
    link: "https://github.com/deltahacks/portal",
    image: deltahacksImg,
  },
  {
    title: "JSON Parser",
    description: "A hand written JSON parser in 500 lines of Rust",
    link: "https://github.com/krish120003/jsonparser",
    image: jsonParserImg,
  },
  {
    title: "Integrity",
    description: "Scan a hackathon project gallery for misconduct",
    link: "https://github.com/krish120003/integrity",
    image: integrityImg,
  },
  {
    title: "C++ Neural Network",
    description: "Fully connected neural networks in C++",
    link: "https://github.com/Krish120003/CPP_Neural_Network",
    image: cppNeuralNetworkImg,
  },
  // {
  //   title: "Website",
  //   description:
  //     "My personal website and blog, built with Next.js and Tailwind",
  //   link: "https://github.com/Krish120003/website",
  //   image: websie
  // },
  {
    title: "LiMeter",
    description: "Rainmeter, but for Linux",
    link: "https://www.reddit.com/r/unixporn/comments/i3bfq6/oc_i_made_myself_a_rainmeterlike_theme_in_ubuntu/",
    image: {
      ...liMeterGif,
      blurDataURL: liMeterImg.blurDataURL,
    },
  },
  {
    title: "SheepIt Client",
    description: "Cross-platform Python/Qt GUI client for SheepIt Renderfarm",
    link: "https://github.com/Krish120003/SheepIt-Client",
    image: sheepitImg,
  },
  {
    title: "Advent of Code solutions",
    description: "My solutions to Advent of Code since 2022",
    link: "https://github.com/Krish120003/AdventOfCode",
    image: aocImg,
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
    image: spiralParticleImg,
  },
  {
    title: "Dash",
    description:
      "A smart new tab page that acts like a central hub for all your web tools",
    link: "https://github.com/Krish120003/dash",
    image: dashImg,
  },
  {
    title: "River",
    description: "User-friendly event RSVP collection platform",
    link: "https://github.com/Krish120003/rsvp",
    image: riverImg,
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
