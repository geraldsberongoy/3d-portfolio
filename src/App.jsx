import NavBar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import ProjectSection from "./sections/ProjectSection";
import TechStack from "./sections/TechStack";

const App = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <About />
      <TechStack />
      <ProjectSection />
    </>
  );
};

export default App;
