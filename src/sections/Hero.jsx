import React, { useRef } from "react";
import { words } from "../constants";
import Button from "../components/Button";
import HeroExperience from "../components/HeroModels/HeroExperience";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
  ArrowDown,
  SquareChartGantt,
  Github,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const heroRef = useRef(null);
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });

  useGSAP(() => {
    // Text animation
    gsap.fromTo(
      [".hero-animation", ".hero-text h2"],
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.in",
      }
    );
  });

  return (
    <section id="hero" className="relative overflow-hidden" ref={heroRef}>
      <div className="absolute top-0 left-0 z-10">
        <img
          src="/images/bg.png"
          alt="background"
          loading="eager"
          width="100%"
          height="auto"
        />
      </div>

      <div className="hero-layout">
        {/* HERO CONTENT */}
        <header
          className={`flex flex-col justify-center${
            isDesktop ? "md:w-full" : "w-full"
          } ${!isDesktop && "items-center"} w-screen md:px-20 px-5`}
        >
          <div
            className={`flex flex-col gap-4 ${
              !isDesktop && "hero-content-wrapper"
            }`}
          >
            {/* Bold name introduction */}
            <div className="z-20 mb-10">
              <p className="text-white text-xl md:text-2xl font-medium mb-1 hero-animation">
                Hi, I'm
              </p>
              <h1 className="font-bold text-white text-4xl md:text-6xl lg:text-7xl mb-2 tracking-tight hero-animation">
                Gerald S. Berongoy
              </h1>
              <p className="text-white-50 font-semibold text-xl md:text-2xl hero-animation">
                Software Developer | Tech Enthusiast
              </p>

              {/* Social Media Links */}
              <div className="flex items-center gap-2 mt-3">
                {/* GitHub */}
                <div className="hero-animation">
                  <a
                    href="https://github.com/geraldsberongoy"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Github Profile"
                    title="GitHub Profile"
                    className="bg-[#333] hover:bg-[#24292e] p-2.5 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Github size={20} className="text-white" />
                  </a>
                </div>

                {/* LinkedIn */}
                <div className="hero-animation">
                  <a
                    href="https://linkedin.com/in/geraldberongoy"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    title="LinkedIn Profile"
                    className=" bg-[#0077B5] hover:bg-[#0069a6] p-2.5 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Linkedin size={20} className="text-white" />
                  </a>
                </div>

                {/* Twitter */}
                {/* <div className="hero-animation">
                  <a
                    href="https://twitter.com/yourhandle"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter Profile"
                    title="Twitter Profile"
                    className=" bg-[#1DA1F2] hover:bg-[#0d8fd9] p-2.5 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Twitter size={22} className="text-white" />
                  </a>
                </div> */}

                {/* Instagram */}
                {/* <div className="hero-animation">
                  <a
                    href="https://instagram.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Profile"
                    title="Instagram Profile"
                    className=" bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] p-2.5 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Instagram size={22} className="text-white" />
                  </a>
                </div> */}
              </div>
            </div>

            <div className="hero-text">
              <h2>
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
                          loading="lazy"
                          width={48}
                          height={48}
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h2>
              <h2>into Elegant Solutions</h2>
            </div>

            <div>
              <p className="text-white-50 md:text-xl relative z-10 pointer-events-none hero-animation">
                A sophomore Computer engineering student crafting innovative
                solutions.
              </p>
              <div className="flex gap-3 mt-7 z-20">
                <Button
                  text="View Projects"
                  className="md:w-60 md:h-16 w-full h-5 hero-animation"
                  id="counter"
                  svg={<ArrowDown className="text-black-50" />}
                  href="#projects"
                />
                <Button
                  text="View Resume"
                  className="md:w-60 md:h-16 w-full h-5 hero-animation"
                  id="counter"
                  svg={<SquareChartGantt className="text-black-50" />}
                />
              </div>
            </div>
          </div>
        </header>

        {/* 3D MODEL - Only render on desktop */}
        {isDesktop && (
          <figure>
            <div className="hero-3d-layout">
              <HeroExperience />
            </div>
          </figure>
        )}
      </div>
    </section>
  );
};
export default Hero;
