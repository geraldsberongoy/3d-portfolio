import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight, Github } from "lucide-react";
import TitleHeader from "@/components/TitleHeader";

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
  // Change to show 6 projects per page (3 columns × 2 rows)
  const projectsPerPage = 6;
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
    // Simplified animations for header and projects
    gsap.fromTo(
      headerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.7, ease: "power1.out" }
    );

    // Simple fade-in for project cards with minimal stagger
    projectRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.1 * (index % 3), // Subtle column-based stagger
            ease: "power1.out",
            scrollTrigger: {
              trigger: ref,
              start: "top bottom-=50",
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
    <section id="projects" className="w-full section-padding relative overflow-hidden">
      {/* Container to keep content centered */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="mb-10 text-center">
          <TitleHeader title="My Work" sub="Featured Projects"/>
        </div>

        {/* Projects Display - New 3×2 Grid Layout */}
        <div ref={sectionRef} className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="flex flex-col group"
                ref={(el) => (projectRefs.current[index] = el)}
              >
                {/* Project Card */}
                <a
                  href={project.githubUrl}
                  className="cursor-pointer block h-56 sm:h-48 md:h-52 lg:h-64 relative overflow-hidden rounded-xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className={`w-full h-full ${
                      project.bgColor || "bg-black-100"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10 opacity-30 group-hover:opacity-70 transition-opacity duration-300"></div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-contain px-5 py-5 will-change-transform transform-gpu backface-visibility-hidden transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      style={{ willChange: "transform" }}
                    />

                    {/* GitHub icon */}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/50 hover:bg-black/80 transition-all"
                        aria-label={`View ${project.title} on GitHub`}
                        title="View on Github"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={16} className="text-white" />
                      </a>
                    )}

                    {/* Tags */}
                    <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      {project.tags?.slice(0, 4).map((tag, tagIndex) => (
                        <span
                          key={`${project.id}-tag-${tagIndex}`}
                          className="px-2 py-0.5 bg-blue-500/80 text-white text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags?.length > 4 && (
                        <span className="px-2 py-0.5 bg-gray-500/80 text-white text-xs font-medium rounded-full">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </a>

                {/* Project title and description */}
                <div className="mt-3 space-y-1.5">
                  <h3 className="text-base md:text-lg font-semibold group-hover:text-blue-400 transition-colors duration-300 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-white-50 text-sm md:text-base line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-4">
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
      </div>
    </section>
  );
};

export default ProjectSection;
