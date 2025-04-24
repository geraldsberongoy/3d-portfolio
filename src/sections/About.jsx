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
import { BorderBeam } from "@/components/magicui/border-beam";

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
      className="min-h-screen relative overflow-hidden section-padding"
      ref={sectionRef}
    >
      {/* Background accent - subtle gradient similar to your hero section */}
      <div className="absolute top-6 left-6 size-20 md:size-100 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-2xl z-0"></div>
      <div className="absolute bottom-6 right-6 size-20 md:size-100 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-2xl z-0"></div>

      {/* Container to keep content centered */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <TitleHeader
          title="ABOUT ME"
          sub="Turning Vision into Reality"
          className="about-title-animation"
        />

        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-12 items-center">
          {/* Image column */}
          <div className="flex justify-center items-center about-image">
            <div className="relative group rounded-2xl border border-black-50 bg-black-100">
              {/* Main image with frame effect */}
              <BorderBeam duration={8} size={200} />
              <img
                src="/images/myimg.jpg"
                alt="Gerald Berongoy"
                className="rounded-3xl p-5 w-full max-w-md z-10"
              />
            </div>
          </div>

          {/* Content column */}
          <div className="about-content flex flex-col flex-1 gap-6 md:gap-8 z-1">
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
                    <span className="text-gray-500">
                      // Personal information
                    </span>
                    <br />
                    <span className="text-white">{"{"}</span>
                    <br />
                    <span className="text-blue-300 ml-4">"name"</span>
                    <span className="text-white">:</span>
                    <span className="text-green-300"> "Gerald Berongoy"</span>,
                    <br />
                    <span className="text-blue-300 ml-4">"title"</span>
                    <span className="text-white">:</span>
                    <span className="text-green-300">
                      {" "}
                      "Software Developer & Computer Engineering Student"
                    </span>
                    ,
                    <br />
                    <span className="text-blue-300 ml-4">"location"</span>
                    <span className="text-white">:</span>
                    <span className="text-green-300">
                      {" "}
                      "Taguig, Philippines"
                    </span>
                    ,
                    <br />
                    <span className="text-blue-300 ml-4">"education"</span>
                    <span className="text-white">: {"{"}</span>
                    <br />
                    <span className="text-blue-300 ml-8">"degree"</span>
                    <span className="text-white">:</span>
                    <span className="text-green-300">
                      {" "}
                      "Bachelor of Science in Computer Engineering"
                    </span>
                    ,
                    <br />
                    <span className="text-blue-300 ml-8">"university"</span>
                    <span className="text-white">:</span>
                    <span className="text-green-300">
                      {" "}
                      "Polytechnic University of the Philippines"
                    </span>
                    ,
                    <br />
                    <span className="text-blue-300 ml-8">"year"</span>
                    <span className="text-white">:</span>
                    <span className="text-green-300"> "Sophomore"</span>
                    <br />
                    <span className="text-white ml-4">{"}"}</span>,
                    <br />
                    <span className="text-blue-300 ml-4">"interests"</span>
                    <span className="text-white">: [</span>
                    <br />
                    <span className="text-green-300 ml-8">
                      "Software Development"
                    </span>
                    ,
                    <br />
                    <span className="text-green-300 ml-8">
                      "AI Engineering"
                    </span>
                    ,
                    <br />
                    <span className="text-green-300 ml-8">
                      "IoT Development"
                    </span>
                    ,
                    <br />
                    <span className="text-white ml-4">]</span>,
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
              I specialize in full-stack web development with expertise in
              React, Next.js, and Node.js, creating responsive and interactive
              digital experiences. My unique background in computer engineering
              allows me to bridge hardware understanding with software
              implementation, resulting in optimized and innovative solutions
              that stand out in today's tech landscape.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
