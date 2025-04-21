import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

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
      {
        name: "Next.js",
        modelPath: "/models/nextjs.glb",
        scale: 2.7,
        rotation: [0, 0, 0],
        position: [0, -0.7, 0],
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
    name: "Database & Cloud",
    skills: [
      // <a href="https://iconscout.com/3d-illustrations/mongo-db" class="text-underline font-size-sm" target="_blank">Mongo DB</a> by <a href="https://iconscout.com/contributors/tomsdesign" class="text-underline font-size-sm" target="_blank">Toms Design</a>
      {
        name: "MySQL",
        modelPath: "/models/mysql.glb", // Placeholder, replace with actual MySQL model
        scale: 1.5,
        rotation: [0, 0, 0],
      },
      {
        name: "MongoDB",
        modelPath: "/models/mongodb.glb", // Placeholder, replace with actual MongoDB model
        scale: 5,
        rotation: [0, 0, 0],
        position: [0, -1, 0],
      },
      // <a href="https://iconscout.com/3d-illustrations/mysql" class="text-underline font-size-sm" target="_blank">MySQL</a> by <a href="https://iconscout.com/contributors/sonisokell" class="text-underline font-size-sm" target="_blank">Soni Sokell</a> */}

      {
        name: "Supabase",
        modelPath: "/models/supabase.glb",
        scale: 4,
        rotation: [0, 0.01, 0],
        position: [0, -0.5, 0],
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
      {
        name: "GitHub",
        modelPath: "/models/github.glb",
        scale: 2,
        rotation: [0, 0, 0],
      },
    ],
  },
];

const TechStack = () => {
  const sectionRef = useRef(null);
  const techGridsRef = useRef([]);

  // Handle animations when section comes into view
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animate the main header
      gsap.fromTo(
        ".skills-header",
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate each category heading and its tech grid
      techCategories.forEach((_, index) => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: techGridsRef.current[index],
            start: "top bottom-=50",
            toggleActions: "play none none none",
          },
        });

        timeline
          .fromTo(
            `.category-heading-${index}`,
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
          )
          .fromTo(
            `.tech-card-${index}`,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.3"
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      className="flex-center section-padding"
      ref={sectionRef}
    >
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Technical Skills & Expertise"
          sub="🧰 My Technology Toolkit"
          className="skills-header"
        />

        {/* Render all categories with headings */}
        <div className="space-y-16 mt-16">
          {techCategories.map((category, categoryIndex) => (
            <div
              key={category.name}
              ref={(el) => (techGridsRef.current[categoryIndex] = el)}
            >
              {/* Category Heading */}
              <div className={`mb-6 category-heading-${categoryIndex}`}>
                <h2 className="text-2xl md:text-3xl font-bold">
                  {category.name}
                </h2>
                <div className="h-0.5 bg-gradient-to-r from-blue-600 to-transparent w-24 mt-2"></div>
              </div>

              {/* Tech Grid for this category */}
              <div className="tech-grid">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className={`card-border tech-card tech-card-${categoryIndex} overflow-hidden group rounded-lg relative`}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
