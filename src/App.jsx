import NavBar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import ProjectSection from "./sections/ProjectSection";
import TechStack from "./sections/TechStack";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot/ChatBot";
import { PerformanceProvider } from "./context/PerformanceContext";

const App = () => {
  return (
    <PerformanceProvider>
      <NavBar />
      <Hero />
      <About />
      <TechStack />
      <ProjectSection />
      <Footer />
      <ChatBot />
    </PerformanceProvider>
  );
};

export default App;
