import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TitleHeader from "../components/TitleHeader";
import TechIconCardExperience from "../components/TechStackModels/TechIconCardExperience";

// Tech stack data organized by categories
const techCategories = [
  {
    name: "Frontend",
    skills: [
      {
        name: "HTML",
        modelPath: "/models/html5_logo.glb",
        scale: 1,
        rotation: [0, -Math.PI / 2, 0],
        position: [0, -2.9, 0],
      },
      {
        name: "CSS",
        modelPath: "/models/final_css.glb",
        scale: 0.07,
        rotation: [0.05, -0.006, 0],
        position: [0, -1.9, 0],
      },
      {
        name: "TailwindCSS",
        modelPath: "/models/tailwind.glb",
        scale: 1.8,
        rotation: [0, 0, 0],
        position: [0, -0.26, 0],
      },

      {
        name: "JavaScript",
        modelPath: "/models/js.glb",
        scale: 1.2,
        rotation: [0, 4.5, 0],
        position: [0, -0.26, 0],
      },
      {
        name: "TypeScript",
        modelPath: "/models/typescript.glb",
        scale: 1.5,
        rotation: [0, 0, 0],
        position: [0, -0.2, 0],
      },
      {
        name: "React",
        modelPath: "/models/react_logo-transformed.glb",
        scale: 1,
        rotation: [0, 0, 0],
      },
    ],
  },
  {
    name: "Backend",
    skills: [
      {
        name: "Node.js",
        modelPath: "/models/node-transformed.glb",
        scale: 5,
        rotation: [0, -Math.PI / 2, 0],
      },
      {
        name: "Python",
        modelPath: "/models/python-transformed.glb",
        scale: 0.8,
        rotation: [0, 0, 0],
      },
    ],
  },
  {
    name: "Database",
    skills: [
      {
        name: "MongoDB",
        modelPath: "/models/react_logo-transformed.glb", // Placeholder, replace with actual MongoDB model
        scale: 0.9,
        rotation: [0, 0, 0],
      },
      {
        name: "MySQL",
        modelPath: "/models/python-transformed.glb", // Placeholder, replace with actual MySQL model
        scale: 0.8,
        rotation: [0, 0, 0],
      },
    ],
  },
  {
    name: "Cloud & DevOps",
    skills: [
      {
        name: "AWS",
        modelPath: "/models/html5_logo.glb", // Placeholder, replace with actual AWS model
        scale: 0.8,
        rotation: [0, -Math.PI / 4, 0],
      },
      {
        name: "Docker",
        modelPath: "/models/js_logo.glb", // Placeholder, replace with actual Docker model
        scale: 0.8,
        rotation: [0, -Math.PI / 4, 0],
      },
    ],
  },
  {
    name: "Version Control",
    skills: [
      {
        name: "Git",
        modelPath: "/models/git-svg-transformed.glb",
        scale: 0.05,
        rotation: [0, -Math.PI / 4, 0],
      },
    ],
  },
];

const TechStack = () => {
  const techGridRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("Frontend");

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animate cards appearance with staggered effect
      gsap.fromTo(
        ".tech-card",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        }
      );
    }, techGridRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section id="skills" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Technical Skills & Expertise"
          sub="🧰 My Technology Toolkit"
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mt-10 mb-10">
          {techCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-5 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                activeCategory === category.name
                  ? "bg-blue-600 text-white"
                  : "bg-black-200 text-white-50 hover:bg-black-50"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Display selected category skills */}
        <div className="tech-grid" ref={techGridRef}>
          {techCategories
            .find((category) => category.name === activeCategory)
            .skills.map((skill) => (
              <div
                key={skill.name}
                className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg relative"
              >
                {/* Background animation layer */}
                <div className="tech-card-animated-bg" />

                {/* Content layer */}
                <div className="tech-card-content">
                  <div className="tech-icon-wrapper">
                    <TechIconCardExperience model={skill} />
                  </div>
                  <div className="padding-x w-full">
                    <p>{skill.name}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
