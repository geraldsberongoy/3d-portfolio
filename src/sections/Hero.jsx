import React, { useRef } from "react";
import { words } from "../constants";
import Button from "../components/Button";
import HeroExperience from "../components/HeroModels/HeroExperience";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const heroRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animate all h3 elements in hero-text
      gsap.fromTo(
        ".hero-text h3",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "power3.out",
        }
      );

      // Intro animation
      gsap.fromTo(
        ".intro-text",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        }
      );

      // Enhanced animation for your name
      gsap.fromTo(
        ".name-highlight",
        {
          scale: 0.95,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          delay: 0.3,
          ease: "elastic.out(1,0.5)",
        }
      );

      // Animation for professional title
      gsap.fromTo(
        ".title-highlight",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.8,
          ease: "power2.out",
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden" ref={heroRef}>
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="background" />
      </div>

      <div className="hero-layout">
        {/* LEFT: HERO CONTENT */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5 ">
          <div className="flex flex-col gap-5 ">
            {/* Bold name introduction */}
            <div className="z-20">
              <p className="intro-text text-white text-xl md:text-2xl font-medium mb-1">
                Hi, I'm
              </p>
              <h1 className="name-highlight font-extrabold text-white text-4xl md:text-6xl lg:text-7xl mb-2 tracking-tight">
                Gerald S. Berongoy
              </h1>
              <p className="title-highlight text-white-50 font-semibold text-xl md:text-2xl mb-5">
                Software Developer | Tech Enthusiast
              </p>
            </div>

            <div className="hero-text">
              <h3>
                Transforming
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word) => (
                      <span
                        key={word.text}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt={word.text}
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h3>
              <h3>into Impactful Solutions</h3>
              <h3>with Precision & Creativity</h3>
            </div>
            <p className="max-w-1/2 text-white-50 md:text-xl relative z-10 pointer-events-none">
              A sophomore computer engineering student with a passion for
              creating innovative digital solutions.
            </p>
            <div className="flex flex-col md:flex-row gap-5 mt-5 z-20">
              <Button
                text="See My Work"
                className="md:w-80 md:h-16 w-60 h-5"
                id="counter"
                svg={<ArrowDown className="text-black-50"/>}
              />

            </div>
          </div>

          {/* RIGHT: 3D MODEL */}
          <figure>
            <div className="hero-3d-layout">
              <HeroExperience />
            </div>
          </figure>
        </header>
      </div>
    </section>
  );
};
export default Hero;
