import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { techCategories } from "../constants";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

import TitleHeader from "../components/TitleHeader";
import TechIconCardExperience from "../components/TechStackModels/TechIconCardExperience";

// Tech stack data organized by categories

const TechStack = () => {
  const sectionRef = useRef(null);
  const techGridsRef = useRef([]);

  // Handle animations when section comes into view
  useGSAP(() => {
    // This animation is triggered when the user scrolls to the #skills wrapper
    // The animation starts when the top of the wrapper is at the center of the screen
    // The animation is staggered, meaning each card will animate in sequence
    // The animation ease is set to "power2.inOut", which is a slow-in fast-out ease
    gsap.fromTo(
      ".tech-card",
      {
        // Initial values
        y: 50, // Move the cards down by 50px
        opacity: 0, // Set the opacity to 0
      },
      {
        // Final values
        y: 0, // Move the cards back to the top
        opacity: 1, // Set the opacity to 1
        duration: 1, // Duration of the animation
        ease: "power2.inOut", // Ease of the animation
        stagger: 0.2, // Stagger the animation by 0.2 seconds
        scrollTrigger: {
          trigger: "#skills", // Trigger the animation when the user scrolls to the #skills wrapper
          start: "top center", // Start the animation when the top of the wrapper is at the center of the screen
        },
      }
    );
  });

  return (
    <section
      id="skills"
      className="min-hscreen relative overflow-hidden section-padding"
      ref={sectionRef}
    >
<div className="absolute top-6 left-6 size-20 md:size-100 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-2xl z-0"></div>
<div className="absolute bottom-6 right-6 size-20 md:size-100 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-2xl z-0"></div>
      {/* Container to keep content centered */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-blue-400 font-medium uppercase tracking-wider mb-3 inline-block">
            My Skills
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Technical Skills & Expertise
          </h2>
        </div>

        {/* Render all categories with headings - no animations on headings */}
        <div className="space-y-16 mt-16">
          {techCategories.map((category, categoryIndex) => (
            <div
              key={category.name}
              ref={(el) => (techGridsRef.current[categoryIndex] = el)}
            >
              {/* Category Heading - no animation */}
              <div className="mb-6">
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
                    data-index={skillIndex}
                    style={{ opacity: 0 }} /* Start hidden for animation */
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
