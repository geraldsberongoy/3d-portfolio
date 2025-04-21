import React, { useRef } from "react";
import { words } from "../constants";
import Button from "../components/Button";
import HeroExperience from "../components/HeroModels/HeroExperience";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ArrowDown, SquareChartGantt } from "lucide-react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const heroRef = useRef(null);
  const headerContentRef = useRef(null);
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Single collective animation for the entire header content
      gsap.fromTo(
        headerContentRef.current,
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
    }, heroRef);

    return () => ctx.revert();
  }, []);

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
          className={`flex flex-col justify-center ${
            isDesktop ? "md:w-full" : "w-full"
          } ${!isDesktop && "items-center"} w-screen md:px-20 px-5`}
        >
          <div
            ref={headerContentRef}
            className={`flex flex-col gap-4 ${
              !isDesktop && "hero-content-wrapper"
            }`}
          >
            {/* Bold name introduction */}
            <div className="z-20 mb-10">
              <p className="text-white text-xl md:text-2xl font-medium mb-1">
                Hi, I'm
              </p>
              <h1 className="font-bold text-white text-4xl md:text-6xl lg:text-7xl mb-2 tracking-tight">
                Gerald S. Berongoy
              </h1>
              <p className="text-white-50 font-semibold text-xl md:text-2xl">
                Software Developer | Tech Enthusiast
              </p>
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
              <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
                A sophomore Computer engineering student crafting innovative
                solutions.
              </p>
              <div className="flex gap-3 mt-7 z-20">
                <Button
                  text="View Projects"
                  className="md:w-60 md:h-16 w-full h-5"
                  id="counter"
                  svg={<ArrowDown className="text-black-50" />}
                  href="#projects"
                />
                <Button
                  text="View Resume"
                  className="md:w-60 md:h-16 w-full h-5"
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
