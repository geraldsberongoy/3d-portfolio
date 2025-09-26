import NavBar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import ProjectSection from "./sections/ProjectSection";
import TechStack from "./sections/TechStack";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot/ChatBot";

const App = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <About />
      <TechStack />
      <ProjectSection />
      <Footer />
      <ChatBot />
    </>
  );
};

export default App;
