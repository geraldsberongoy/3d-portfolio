import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight, Github, Link, LayoutGrid, List } from "lucide-react";
import TitleHeader from "@/components/TitleHeader";
import projectsData from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const ProjectSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [projects, setProjects] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  
  // Projects per page depends on view mode
  const projectsPerPage = viewMode === "grid" ? 6 : 8;
  const totalPages = Math.ceil(projectsData.length / projectsPerPage);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const projectRefs = useRef([]);

  useEffect(() => {
    // Reset page to 0 when toggling view mode to prevent empty pages
    setCurrentPage(0);
  }, [viewMode]);

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
  }, [currentPage, viewMode]);

  useGSAP(() => {
    // Optimized header fade-in
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.5, 
        ease: "power2.out",
        force3D: true,
      }
    );

    // Optimized project cards animation with batching
    projectRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            delay: 0.05 * (index % 3), // Minimal column-based stagger
            ease: "power2.out",
            force3D: true,
            scrollTrigger: {
              trigger: ref,
              start: "top bottom-=50",
              lazy: true,
              fastScrollEnd: true,
            },
          }
        );
      }
    });
  }, [projects, viewMode]);

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

  // Rotating background colors for grid view
  const bgColors = [
    "#1A202C", // Deep Navy
    "#1F2937", // Charcoal
    "#2D3748", // Dark Slate
    "#282732", // Deep Purple-Gray
    "#27272A", // Dark Zinc
    "#1C1917"  // Dark Stone
  ];

  return (
    <section
      id="projects"
      className="w-full section-padding relative overflow-hidden mb-10"
    >
      <div className="absolute top-6 left-6 size-20 md:size-100 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-2xl z-0"></div>
      <div className="absolute bottom-6 right-6 size-20 md:size-100 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-2xl z-0"></div>
      {/* Container to keep content centered */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex flex-col items-center justify-center">
          <TitleHeader title="My Work" sub="Featured Projects" ref={headerRef} />
        </div>

        {/* View Toggle - Separate Row */}
        <div className="flex justify-end mb-6 px-2">
          <div className="bg-black-200 p-1 rounded-lg border border-white/10 z-20 flex gap-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-all duration-300 flex items-center gap-2 ${
                viewMode === "grid" 
                  ? "bg-white/10 text-white shadow-sm" 
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
              aria-label="Grid View"
            >
              <LayoutGrid size={18} />
              <span className="text-sm font-medium hidden sm:block">Grid</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-all duration-300 flex items-center gap-2 ${
                viewMode === "list" 
                  ? "bg-white/10 text-white shadow-sm" 
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
              aria-label="List View"
            >
              <List size={18} />
              <span className="text-sm font-medium hidden sm:block">List</span>
            </button>
          </div>
        </div>

        {/* Projects Display */}
        <div ref={sectionRef} className="w-full min-h-[600px]">
          {viewMode === "grid" ? (
            /* GRID VIEW */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="flex flex-col group"
                  ref={(el) => (projectRefs.current[index] = el)}
                >
                  {/* Project Card */}
                  <div
                    onClick={() => window.open(project.projectUrl || project.githubUrl, "_blank", "noopener,noreferrer")}
                    className="cursor-pointer block h-56 sm:h-48 md:h-52 lg:h-64 relative overflow-hidden rounded-xl"
                    role="link"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        window.open(project.projectUrl || project.githubUrl, "_blank", "noopener,noreferrer");
                      }
                    }}
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundColor: bgColors[index % bgColors.length]
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10 opacity-30 group-hover:opacity-70 transition-opacity duration-300"></div>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-contain px-5 py-5 will-change-transform transform-gpu backface-visibility-hidden transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        style={{ willChange: "transform" }}
                      />

                      {/* Project Links Container */}
                      <div className="absolute top-3 right-3 z-20 flex gap-2">
                        {/* Source Link */}
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 md:p-2 rounded-full bg-black/50 hover:bg-black/80 transition-all flex items-center justify-center backdrop-blur-sm"
                            aria-label={`View ${project.title} live demo`}
                            title="View Live Demo"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Link size={16} className="text-white" />
                          </a>
                        )}

                        {/* GitHub icon */}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 md:p-2 rounded-full bg-black/50 hover:bg-black/80 transition-all flex items-center justify-center backdrop-blur-sm"
                            aria-label={`View ${project.title} on GitHub`}
                            title="View on Github"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github size={16} className="text-white" />
                          </a>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        {project.tags?.slice(0, 4).map((tag, tagIndex) => (
                          <span
                            key={`project-${index}-tag-${tagIndex}`}
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
                  </div>

                  {/* Project title and description */}
                  <div className="mt-3 space-y-1.5">
                    <h3 className="text-base md:text-lg font-semibold group-hover:text-blue-400 transition-colors duration-300 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-white-50 text-sm md:text-base line-clamp-4">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* LIST VIEW - File Explorer Style */
            <div className="flex flex-col gap-3">
              {/* Header Row (Desktop only) */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-sm text-white-50 font-medium border-b border-white/10 uppercase tracking-wider">
                <div className="col-span-1">Preview</div>
                <div className="col-span-3">Project Name</div>
                <div className="col-span-4">Description</div>
                <div className="col-span-3">Tech Stack</div>
                <div className="col-span-1 text-right">Links</div>
              </div>

              {projects.map((project, index) => (
                <div
                  key={index}
                  ref={(el) => (projectRefs.current[index] = el)}
                  className="group relative md:grid md:grid-cols-12 md:gap-4 flex flex-col gap-3 items-center p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer"
                  onClick={() => window.open(project.projectUrl || project.githubUrl, "_blank", "noopener,noreferrer")}
                >
                  {/* Image/Icon Column */}
                  <div className="md:col-span-1 w-full md:w-auto flex justify-center md:justify-start">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-black-200 border border-white/10 flex items-center justify-center">
                       <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Name Column */}
                  <div className="md:col-span-3 w-full text-center md:text-left">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    {/* Mobile only description snippet */}
                    <span className="md:hidden text-xs text-white-50 mt-1 block">
                      {project.tags?.slice(0, 3).join(" • ")}
                    </span>
                  </div>

                  {/* Description Column */}
                  <div className="md:col-span-4 hidden md:block">
                    <p className="text-white-50 text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Column */}
                  <div className="md:col-span-3 hidden md:flex flex-wrap gap-1.5">
                    {project.tags?.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags?.length > 3 && (
                      <span className="text-xs text-white-50 self-center">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Links Column */}
                  <div className="md:col-span-1 w-full flex justify-center md:justify-end gap-3" onClick={(e) => e.stopPropagation()}>
                     {project.projectUrl && (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-400 text-white-50 transition-colors p-1"
                          title="Live Demo"
                        >
                          <Link size={18} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white text-white-50 transition-colors p-1"
                          title="GitHub Code"
                        >
                          <Github size={18} />
                        </a>
                      )}
                  </div>
                </div>
              ))}
            </div>
          )}
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
