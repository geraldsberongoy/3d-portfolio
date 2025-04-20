import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Project data - allows for easier management and pagination
const projectsData = [
  {
    id: 1,
    title: "Isko-Chat Ai",
    description:
      "An app built to assist students in finding scholarships and educational resources.",
    image: "/images/projects/isko-chat.png",
    tags: ["Web App", "Next.js", "Supabase", "TailwindCSS", "AI"],
    githubUrl: "https://github.com/DavidBatoDev/iskochatai",
  },
  {
    id: 2,
    title: "Sparkfest 2025",
    description:
      "A web application for managing and organizing events for Sparkfest 2025.",
    image: "/images/projects/sparkfest.png",
    bgColor: "bg-[#FFEFDB]",
    tags: ["Web App", "React", "TypeScript", "TailwindCSS"],
    githubUrl: "https://github.com/geraldsberongoy/sparkfest-2025",
  },
  {
    id: 3,
    title: "Password Manager",
    description:
      "A CRUD application for securely managing and storing passwords.",
    image: "/images/projects/password.png",
    bgColor: "bg-[#FFE7EB]",
    tags: ["React.js", "TailwindCSS", "Flask", "SQLite"],
    githubUrl: "https://github.com/yourusername/password-manager",
  },
  {
    id: 4,
    title: "Alertech Web Dashboard",
    description:
      "A web dashboard system to monitor realtime fire and gas leak detection",
    image: "/images/projects/alertech.png",
    bgColor: "bg-[#E0F2FF]",
    tags: ["Dashboard", "React.js", "TailwindCSS", "Firebase", "IOT"],
    githubUrl: "https://github.com/geraldsberongoy/Arduino-Hackathon-Web",
  },
  {
    id: 5,
    title: "DSA Visualizer",
    description:
      "A web application to visualize and understand various data structures and algorithms.",
    image: "/images/projects/dsa.png",
    bgColor: "bg-[#F0EBFF]",
    tags: ["DSA", "React.js", "TailwindCSS"],
    githubUrl: "https://github.com/JoshuaHM-p4/data-structures-vis-project",
  },
  {
    id: 6,
    title: "SCAM App",
    description:
      "A Student Curricular Activity Management app to manage student activities.",
    image: "/images/projects/scam.png",
    bgColor: "bg-[#FFE8E8]",
    tags: ["Dashboard", "Python", "TKinter", "Flask", "SQLite"],
    githubUrl: "https://github.com/JoshuaHM-p4/oop-scam-app",
  },
  {
    id: 7,
    title: "Facial Recognition Attendance System with Email Notification",
    description:
      "A system that uses facial recognition to mark attendance and send notifications via email.",
    image: "/images/projects/facial-attendance.png",
    bgColor: "bg-[#E0F2FF]",
    tags: ["Python", "OpenCV", "Facial Recognition"],
    githubUrl: "https://github.com/geraldsberongoy/facial_recognition",
  },
];

const ProjectSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [projects, setProjects] = useState([]);
  const projectsPerPage = 3;
  const totalPages = Math.ceil(projectsData.length / projectsPerPage);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const projectRefs = useRef([]);

  useEffect(() => {
    // Update projects when page changes
    const startIndex = currentPage * projectsPerPage;
    const selectedProjects = projectsData.slice(
      startIndex,
      startIndex + projectsPerPage
    );
    setProjects(selectedProjects);

    // Reset project refs for new page
    projectRefs.current = projectRefs.current.slice(0, selectedProjects.length);

    // Preload images for better performance
    selectedProjects.forEach((project) => {
      if (project.image) {
        const img = new Image();
        img.src = project.image;
      }
    });
  }, [currentPage]);

  useGSAP(() => {
    // Animate header
    gsap.fromTo(
      headerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );

    // Animate main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animate each project card with delay
    projectRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.3 * (index + 1),
            scrollTrigger: {
              trigger: ref,
              start: "top bottom-=100",
            },
          }
        );
      }
    });
  }, [projects]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <section id="projects" className="w-full px-5 md:px-20 py-5">
      {/* Section Header */}
      <div ref={headerRef} className="mb-10 text-center">
        <span className="text-blue-400 font-medium uppercase tracking-wider mb-3 inline-block">
          My Work
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Featured Projects
        </h2>
        <p className="text-white-50 md:text-xl max-w-3xl mx-auto">
          Showcasing a collection of my best work across various technologies
          and industries. Each project represents unique challenges and creative
          solutions.
        </p>
      </div>

      {/* Projects Display */}
      <div ref={sectionRef} className="w-full">
        <div className="flex xl:flex-row flex-col gap-10 justify-between h-full overflow-hidden">
          {/* LEFT  */}
          {projects[0] && (
            <div
              className="h-full flex flex-col justify-between xl:w-[60%] group "
              ref={(el) => (projectRefs.current[0] = el)}
            >
              <a
                className={`xl:h-[70vh] md:h-[50vh] h-56 relative overflow-hidden rounded-xl cursor-pointer ${
                  projects[0].bgColor || "bg-[#E0F2FF]"
                }`}
                href={projects[0].githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                <img
                  src={projects[0].image}
                  className="w-full h-full object-contain xl:px-10 2xl:px-12 py-4 absolute inset-0 will-change-transform transform-gpu backface-visibility-hidden transition-transform duration-700 group-hover:scale-105"
                  alt={projects[0].title}
                  loading="lazy"
                  style={{ willChange: "transform" }}
                />
                {/* Display GitHub icon in top-right corner */}
                {projects[0].githubUrl && (
                  <a
                    href={projects[0].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/50 hover:bg-black/80 transition-all"
                    aria-label={`View ${projects[0].title} on GitHub`}
                    title="View on Github"
                  >
                    <Github size={16} className="text-white" />
                  </a>
                )}

                {/* Tags */}
                <div className="absolute bottom-6 left-6 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {projects[0].tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-500/80 text-white text-sm font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
              {/* Title and description */}
              <div className="space-y-2 mt-5">
                <h2 className="text-base w-full md:text-lg lg:text-xl font-semibold group-hover:text-blue-400 transition-colors duration-300">
                  {projects[0].title}
                </h2>
                <p className="text-white-50 md:text-lg">
                  {projects[0].description}
                </p>
              </div>
            </div>
          )}

          {/* RIGHT */}
          <div className="flex md:flex-row flex-col xl:flex-col justify-between gap-5 w-full xl:w-[40%] scrollbar-none">
            {projects.slice(1).map((project, index) => (
              <div
                key={project.id}
                className="group w-full md:w-1/2 lg:w-full"
                ref={(el) => (projectRefs.current[index + 1] = el)}
              >
                {/* Project Card */}
                <a
                  href={project.githubUrl}
                  className="cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className={`xl:h-[29vh] md:h-48 lg:h-60 h-56 relative rounded-xl xl:px-5 2xl:px-12 py-0  ${
                      project.bgColor || "bg-black-100"
                    } overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-30 group-hover:opacity-70 transition-opacity duration-300"></div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full px-5 py-5 object-contain rounded-xl will-change-transform transform-gpu backface-visibility-hidden transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      style={{ willChange: "transform" }}
                    />

                    {/* Display GitHub icon in top-right corner */}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/50 hover:bg-black/80 transition-all"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <Github size={16} className="text-white" />
                      </a>
                    )}

                    <div className="absolute bottom-4 left-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      {project.tags?.map((tag, tagIndex) => (
                        <span
                          key={`${project.id}-tag-${tagIndex}`}
                          className="px-2 py-1 bg-blue-500/80 text-white text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>

                <h2 className="text-base md:text-lg lg:text-xl font-semibold mt-3 group-hover:text-blue-400 transition-colors duration-300 line-clamp-1">
                  {project.title}
                </h2>
                <p className="text-white-50 mt-1 text-sm md:text-base">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className={`w-10 h-10 flex items-center justify-center rounded-full border ${
            currentPage === 0
              ? "border-gray-700 text-gray-700"
              : "border-white text-white hover:bg-white hover:text-black"
          } transition-colors duration-300`}
        >
          <ChevronLeft className="size-5" />
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index)}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentPage === index
                  ? "bg-blue-600 text-white"
                  : "text-white hover:bg-white/20"
              } transition-colors duration-300`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          className={`w-10 h-10 flex items-center justify-center rounded-full border ${
            currentPage === totalPages - 1
              ? "border-gray-700 text-gray-700"
              : "border-white text-white hover:bg-white hover:text-black"
          } transition-colors duration-300`}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </section>
  );
};

export default ProjectSection;
