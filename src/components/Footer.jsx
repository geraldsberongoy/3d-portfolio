import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, ExternalLink, ArrowUpRight } from "lucide-react";
import { navLinks } from "../constants";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const year = new Date().getFullYear();

  // Handle smooth scrolling with offset
  const handleNavClick = (e, link) => {
    e.preventDefault();
    
    // Get the target element
    const targetElement = document.querySelector(link);
    
    if (targetElement) {
      // Get the position of the element relative to the viewport
      const elementPosition = targetElement.getBoundingClientRect().top;
      
      // Get the current scroll position
      const offsetPosition = elementPosition + window.pageYOffset - 80; // 80px offset
      
      // Scroll to the target with offset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // GSAP animations
  useGSAP(() => {
    // Footer reveal animation
    gsap.fromTo(
      ".footer-animation > *",
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <footer ref={footerRef} id="contact" className="relative bg-black-100/50 py-16 mt-20 border-t border-black-50">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 size-64 rounded-full bg-blue-600/40 blur-3xl z-0"/>
      <di className="absolute bottom-0 right-1/4 size-64 rounded-full bg-purple-600/40 blur-3xl z-0"/>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="footer-animation grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {/* Column 1: Logo and description */}
          <div className="space-y-6">
            <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="inline-block">
              <h2 className="text-2xl md:text-3xl font-bold text-white">GeralDev</h2>
              <div className="h-0.5 w-12 bg-gradient-to-r from-blue-600 to-purple-600 mt-1.5"></div>
            </a>
            <p className="text-white-50 md:max-w-xs">
              Transforming ideas into elegant software solutions. A portfolio showcasing my journey as a Computer Engineering student and developer.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/geraldsberongoy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="icon"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://linkedin.com/in/geraldberongoy" 
                target="_blank"
                rel="noopener noreferrer"
                className="icon"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="mailto:geraldberongoy@example.com" 
                className="icon"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map(({ name, link }) => (
                <li key={name}>
                  <a 
                    href={link}
                    onClick={(e) => handleNavClick(e, link)}
                    className="text-white-50 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    {name}
                    <ArrowUpRight 
                      size={14} 
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" 
                    />
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="text-white-50 hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  Contact
                  <ArrowUpRight 
                    size={14} 
                    className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" 
                  />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Get in Touch */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail size={18} className="text-white-50 mt-1 shrink-0" />
                <a 
                  href="mailto:geraldberongoy@example.com" 
                  className="text-white-50 hover:text-white transition-colors line-clamp-1"
                >
                  geraldberongoy@example.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <ExternalLink size={18} className="text-white-50 mt-1 shrink-0" />
                <p className="text-white-50">Taguig, Philippines</p>
              </li>
            </ul>

            <div className="mt-6 relative group w-fit">
              <a 
                href="#hero" 
                onClick={(e) => handleNavClick(e, "#hero")}
                className="bg-black-200 hover:bg-black-50 transition-colors duration-300 px-4 py-2.5 rounded-lg font-medium text-white flex items-center gap-1.5"
              >
                Back to top
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom section with copyright */}
        <div className="footer-animation mt-10 pt-8 border-t-2 border-white-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white-50 text-sm text-center md:text-left">
            © {year} Gerald Berongoy. All rights reserved.
          </p>
          
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;