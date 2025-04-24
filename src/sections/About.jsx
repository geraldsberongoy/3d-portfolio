import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import {
  ArrowDown,
  Download,
  Calendar,
  Award,
  Code,
  Lightbulb,
} from "lucide-react";
import TitleHeader from "../components/TitleHeader";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const jsonCardRef = useRef(null);
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });

  // GSAP animations
  useGSAP(() => {
    // Heading animations
    gsap.fromTo(
      ".about-title-animation",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
        },
      }
    );

    // Image reveal animation
    gsap.fromTo(
      ".about-image",
      {
        x: -50,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
        },
      }
    );

    // Content animation with staggered effect
    gsap.fromTo(
      ".about-content > *",
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 70%",
        },
      }
    );

    // Stats animation
    gsap.fromTo(
      ".stat-card",
      {
        scale: 0.9,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".about-stats",
          start: "top 85%",
        },
      }
    );

    // JSON card animations
    const jsonCard = jsonCardRef.current;
    if (jsonCard) {
      // Card entrance animation
      gsap.fromTo(
        jsonCard,
        {
          y: 50,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: jsonCard,
            start: "top 85%",
          },
        }
      );

      // Type animation for the JSON content
      const jsonLines = jsonCard.querySelectorAll("pre span");
      gsap.fromTo(
        jsonLines,
        {
          opacity: 0,
          x: -10,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.05,
          stagger: 0.025,
          ease: "none",
          scrollTrigger: {
            trigger: jsonCard,
            start: "top 75%",
          },
        }
      );

      // Blinking cursor effect
      const cursor = document.createElement("span");
      cursor.innerHTML = "|";
      cursor.classList.add("text-blue-400", "animate-blink");
      const lastLine = jsonLines[jsonLines.length - 1];
      if (lastLine) {
        lastLine.parentNode.appendChild(cursor);

        gsap.to(cursor, {
          opacity: 0,
          repeat: -1,
          yoyo: true,
          duration: 0.7,
        });
      }
    }
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen relative overflow-hidden section-padding my-20 md:px-20 px-5"
      ref={sectionRef}
    >
      {/* Background accent - subtle gradient similar to your hero section */}
      {/* <div className="absolute left-0 right-0 top-25 w-full h-[30%] bg-blue-600/50 blur-[120px] rounded-full"></div> */}
      <div className="absolute top-6 left-6 size-20 md:size-100 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-2xl z-0"></div>
      <div className="absolute bottom-6 right-6 size-20 md:size-100 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-2xl z-0"></div>
      {/* Section heading */}
      <TitleHeader
        title="ABOUT ME"
        sub="Turning Vision into Reality"
        className="about-title-animation"
      />

      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-12 items-center ">
        {/* Image column */}
        <div className="flex justify-center items-center about-image">
          <div className="relative group">
            {/* Main image with frame effect */}
            <img
              src="/images/myimg.jpg"
              alt="Gerald Berongoy"
              className="rounded-3xl w-full max-w-md r z-10 relative card-border p-2"
            />

            {/* Animated border effect */}
            <div className="absolute inset-0 card" style={{ "--start": "180" }}>
              <div className="glow"></div>
            </div>
          </div>
        </div>

        {/* Content column */}
        <div className="about-content flex flex-col flex-1 gap-6 md:gap-8 z-1">
          {/* <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-white-50 bg-clip-text">
            Computer Engineering Student & Web Developer
          </h3> */}

          {/* JSON-style card */}
          <div className="w-full" ref={jsonCardRef}>
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-800 overflow-hidden json-card">
              <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <p className="text-gray-400 text-xs">about-me.json</p>
              </div>
              <div className="p-4 font-mono text-sm">
                <pre className="whitespace-pre-wrap">
                  <span className="text-gray-500">// Personal information</span>
                  <br />
                  <span className="text-white">{"{"}</span>
                  <br />
                  <span className="text-blue-300 ml-4">"name"</span>
                  <span className="text-white">:</span>
                  <span className="text-green-300"> "Gerald Berongoy"</span>,
                  <br />
                  <span className="text-blue-300 ml-4">"location"</span>
                  <span className="text-white">:</span>
                  <span className="text-green-300"> "Philippines"</span>,
                  <br />
                  <span className="text-blue-300 ml-4">"education"</span>
                  <span className="text-white">:</span>
                  <span className="text-green-300">
                    {" "}
                    "Computer Engineering"
                  </span>
                  ,
                  <br />
                  <span className="text-blue-300 ml-4">"university"</span>
                  <span className="text-white">:</span>
                  <span className="text-green-300">
                    {" "}
                    "Polytechnic University of the Philippines"
                  </span>
                  ,
                  <br />
                  <span className="text-blue-300 ml-4">"interests"</span>
                  <span className="text-white">: [</span>
                  <br />
                  <span className="text-green-300 ml-8">
                    "Software Development"
                  </span>
                  ,
                  <br />
                  <span className="text-green-300 ml-8">"AI Engineering"</span>,
                  <br />
                  <span className="text-green-300 ml-8">"IOT Development"</span>
                  <br />
                  <span className="text-white ml-4">]</span>,
                  <br />
                  <span className="text-blue-300 ml-4">"skills"</span>
                  <span className="text-white">: [</span>
                  <br />
                  <span className="text-green-300 ml-8">"React"</span>,
                  <br />
                  <span className="text-green-300 ml-8">"Three.js"</span>,
                  <br />
                  <span className="text-green-300 ml-8">"GSAP"</span>,
                  <br />
                  <span className="text-green-300 ml-8">"Tailwind CSS"</span>
                  <br />
                  <span className="text-white ml-4">]</span>
                  <br />
                  <span className="text-white">{"}"}</span>
                </pre>
              </div>
            </div>
          </div>

          <p className="text-white-50 md:text-lg">
            I'm a passionate sophomore Computer Engineering student at
            Polytechnic University of the Philippines with a focus on creating
            innovative digital experiences. My journey in tech started with
            curiosity about how software and hardware interact to create
            solutions that impact people's lives.
          </p>

          <p className="text-white-50 md:text-lg">
            I specialize in frontend development with modern frameworks while
            exploring the fascinating world of computer engineering. I'm
            constantly learning new technologies and approaches to stay at the
            cutting edge of both fields.
          </p>

          {/* <div className="flex flex-wrap gap-4 md:gap-6">
            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-5 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <Download className="size-5" />
              Download CV
            </button>

            <button className="flex items-center gap-2 border border-white-50 hover:bg-white-50/10 px-5 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:-translate-y-1">
              <ArrowDown className="size-5" />
              Explore More
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default About;
