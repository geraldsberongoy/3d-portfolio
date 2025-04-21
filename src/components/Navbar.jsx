import { useState, useEffect } from "react";

import { navLinks } from "../constants";

const NavBar = () => {
  // track if the user has scrolled down the page
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // create an event listener for when the user scrolls
    const handleScroll = () => {
      // check if the user has scrolled down at least 10px
      // if so, set the state to true
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    // add the event listener to the window
    window.addEventListener("scroll", handleScroll);

    // cleanup the event listener when the component is unmounted
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <a href="#hero" className="logo" onClick={(e) => handleNavClick(e, "#hero")}>
          GeralDev
        </a>

        <nav className="desktop">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                <a href={link} onClick={(e) => handleNavClick(e, link)}>
                  <span>{name}</span>
                  <span className="underline" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#contact" className="contact-btn group" onClick={(e) => handleNavClick(e, "#contact")}>
          <div className="inner">
            <span>Contact me</span>
          </div>
        </a>
      </div>
    </header>
  );
};

export default NavBar;
