import React, { useEffect, useState, useRef } from "react";
import { Eye, Github, ExternalLink } from "lucide-react";

const ProjectSection = () => {
  const [currentFilter, setCurrentFilter] = useState("all");
  const floatingCodeContainerRef = useRef(null);

  // Configuration data
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and real-time inventory management.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      category: "fullstack",
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
      size: "large",
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=300&fit=crop",
      tags: ["React", "TypeScript", "Firebase", "Framer Motion"],
      category: "frontend",
      demoUrl: "#",
      githubUrl: "#",
      size: "medium",
    },
    {
      id: 3,
      title: "Learning Management System (LMS) API",
      description:
        "RESTful API for educational platforms with course management, student enrollment, progress tracking, and assessment features with automated grading.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=500&fit=crop",
      tags: ["Python", "FastAPI", "PostgreSQL", "Redis"],
      category: "backend",
      demoUrl: "#",
      githubUrl: "#",
      size: "large",
    },
    {
      id: 4,
      title: "Design System",
      description:
        "A comprehensive design system with reusable components, documentation, and design tokens for consistent UI development.",
      image:
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=350&fit=crop",
      tags: ["React", "Storybook", "Tailwind", "TypeScript"],
      category: "frontend",
      demoUrl: "#",
      githubUrl: "#",
      size: "medium",
    },
    {
      id: 5,
      title: "Mobile Banking App",
      description:
        "Secure mobile banking application with biometric authentication, transaction history, and budget tracking features.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      tags: ["React Native", "Node.js", "MongoDB", "AWS"],
      category: "mobile",
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
      size: "large",
    },
    {
      id: 6,
      title: "ML Image Classifier",
      description:
        "Machine learning model for image classification with web interface for real-time predictions and model training.",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=300&fit=crop",
      tags: ["Python", "TensorFlow", "Flask", "OpenCV"],
      category: "ml",
      demoUrl: "#",
      githubUrl: "#",
      size: "medium",
    },
  ];

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "fullstack", label: "Full Stack" },
    { id: "mobile", label: "Mobile" },
    { id: "ml", label: "Machine Learning" },
  ];

  useEffect(() => {
    createFloatingCode();
  }, []);

  const createFloatingCode = () => {
    if (!floatingCodeContainerRef.current) return;

    const codeBlocks = ["</>", "{ }", "<div>", "API", "DB", "()=>"];
    const colors = ["text-orange-400", "text-purple-400", "text-cyan-400"];

    for (let i = 0; i < 10; i++) {
      const code = document.createElement("div");
      code.className = `absolute opacity-20 floating-code ${colors[i % 3]}`;
      code.style.left = `${Math.random() * 100}%`;
      code.style.top = `${Math.random() * 100}%`;
      code.style.fontSize = `${Math.random() * 20 + 10}px`;
      code.textContent = codeBlocks[i % 6];

      floatingCodeContainerRef.current.appendChild(code);
    }
  };

  const filteredProjects =
    currentFilter === "all"
      ? projects
      : projects.filter((project) => project.category === currentFilter);

  // Inline styles
  const styles = {
    container: {
      minHeight: "screen",
      position: "relative",
      overflow: "hidden",
    },
    animatedBackground: {
      position: "absolute",
      inset: 0,
      overflow: "hidden",
    },
    gradientBackground: {
      position: "absolute",
      inset: 0,
      opacity: 0.2,
      background: "linear-gradient(45deg, #ff9a56, #ff6a95, #c471f5, #12c2e9)",
      backgroundSize: "400% 400%",
      animation: "gradientBackground 18s ease infinite",
    },
    matrixEffect: {
      position: "absolute",
      inset: 0,
      opacity: 0.05,
      backgroundImage:
        "repeating-linear-gradient(90deg, transparent, transparent 2px, #00ff00 2px, #00ff00 4px)",
      backgroundSize: "20px 20px",
      animation: "matrixMove 3s linear infinite",
    },
    contentContainer: {
      container: "true",
      margin: "auto",
      padding: "px-6 py-20",
      maxWidth: "7xl",
      position: "relative",
      zIndex: 10,
      minHeight: "screen",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    sectionHeader: {
      textAlign: "center",
      marginBottom: "16",
    },
    title: {
      fontSize: "4xl md:text-5xl",
      marginBottom: "6",
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: "lg",
      color: "gray-500",
      maxWidth: "2xl",
      margin: "auto",
    },
    filterContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "2",
      marginBottom: "12",
    },
    filterButton: (isActive) => ({
      padding: "px-4 py-2",
      borderRadius: "full",
      border: "true",
      transition: "colors",
      backgroundColor: isActive ? "blue-600" : "transparent",
      color: isActive ? "white" : "inherit",
      borderColor: isActive ? "blue-600" : "gray-200",
      _hover: {
        backgroundColor: isActive ? "blue-700" : "gray-100",
      },
    }),
    projectsGridContainer: {
      backgroundColor: "white/60",
      backdropFilter: "blur-sm",
      padding: "8",
      borderRadius: "2xl",
      border: "true",
      borderColor: "white/10",
      boxShadow: "2xl",
    },
    masonryGrid: {
      display: "grid",
      gap: "6",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gridAutoRows: "20px",
    },
    projectCard: (size) => ({
      gridRowEnd: `span ${size === "large" ? 12 : 8}`,
      position: "relative",
      backgroundColor: "white",
      border: "true",
      borderColor: "gray-200",
      borderRadius: "lg",
      overflow: "hidden",
      transition: "all duration-300",
      _hover: {
        transform: "translateY(-10px)",
        boxShadow: "xl",
      },
    }),
    featuredBadge: {
      position: "absolute",
      top: "4",
      left: "4",
      zIndex: 10,
      padding: "px-3 py-1",
      backgroundColor: "blue-600",
      color: "white",
      fontSize: "sm",
      borderRadius: "full",
    },
    imageContainer: {
      position: "relative",
      overflow: "hidden",
      height: "48",
    },
    image: {
      width: "full",
      height: "full",
      objectFit: "cover",
      transition: "transform duration-300",
      _groupHover: {
        transform: "scale(1.1)",
      },
    },
    imageOverlay: {
      position: "absolute",
      inset: 0,
      backgroundColor: "black/50",
      opacity: 0,
      transition: "opacity duration-300",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "4",
      _groupHover: {
        opacity: 100,
      },
    },
    iconButton: {
      padding: "3",
      backgroundColor: "white/20",
      backdropFilter: "blur-sm",
      borderRadius: "full",
      transition: "colors",
      _hover: {
        backgroundColor: "white/30",
      },
    },
    content: {
      padding: "6",
    },
    projectTitle: {
      fontSize: "xl",
      marginBottom: "3",
      fontWeight: "medium",
    },
    projectDescription: {
      color: "gray-500",
      marginBottom: "4",
      fontSize: "sm",
      lineHeight: "relaxed",
    },
    tagsContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "2",
    },
    tag: {
      padding: "px-2 py-1",
      backgroundColor: "gray-100",
      color: "gray-600",
      fontSize: "xs",
      borderRadius: "true",
    },
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={styles.container}
    >
      {/* Animated Background */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={styles.animatedBackground}
      >
        {/* Gradient Background */}
        <div
          className="absolute inset-0 opacity-20 gradient-animate"
          style={styles.gradientBackground}
        ></div>

        {/* Floating Code Blocks */}
        <div ref={floatingCodeContainerRef} id="floating-code-container"></div>

        {/* Matrix-like Effect */}
        <div
          className="absolute inset-0 opacity-5 matrix-effect"
          style={styles.matrixEffect}
        ></div>
      </div>

      <div
        className="container mx-auto px-6 py-20 max-w-7xl relative z-10 min-h-screen flex flex-col justify-center"
        style={styles.contentContainer}
      >
        {/* Section Header */}
        <div className="text-center mb-16" style={styles.sectionHeader}>
          <h2
            className="text-4xl md:text-5xl mb-6 font-bold"
            style={styles.title}
          >
            Featured Projects
          </h2>
          <p
            className="text-lg text-gray-500 max-w-2xl mx-auto"
            style={styles.subtitle}
          >
            A showcase of my recent work and side projects
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-12"
          style={styles.filterContainer}
        >
          <div className="bg-white/90 backdrop-blur-sm p-2 rounded-2xl border border-white/10 shadow-xl flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full border transition-colors filter-button ${
                  category.id === currentFilter
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-200 hover:bg-gray-100"
                }`}
                onClick={() => setCurrentFilter(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Masonry Grid */}
        <div
          className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-2xl"
          style={styles.projectsGridContainer}
        >
          <div className="masonry-grid" style={styles.masonryGrid}>
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`project-card group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  project.size === "large"
                    ? "masonry-grid-item-large"
                    : "masonry-grid-item"
                }`}
                style={{
                  opacity: 0,
                  transform: "translateY(50px)",
                  animation: `fadeInUp 0.5s ease forwards ${
                    index * 0.1 + 0.2
                  }s`,
                }}
              >
                {project.featured && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                    Featured
                  </div>
                )}

                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                      href={project.demoUrl}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                    >
                      <Eye className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                    >
                      <Github className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href={project.demoUrl}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl mb-3 font-medium">{project.title}</h3>
                  <p className="text-gray-500 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes gradientBackground {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .gradient-animate {
            background-size: 400% 400%;
            animation: gradientBackground 18s ease infinite;
          }

          .project-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }

          .filter-button:hover {
            transform: scale(1.05);
          }

          .filter-button:active {
            transform: scale(0.95);
          }

          .masonry-grid {
            display: grid;
            grid-gap: 24px;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            grid-auto-rows: 20px;
          }

          .masonry-grid-item {
            grid-row-end: span 8;
          }

          .masonry-grid-item-large {
            grid-row-end: span 12;
          }

          @media (max-width: 768px) {
            .masonry-grid {
              grid-template-columns: 1fr;
            }
          }

          .floating-code {
            animation: floatCode 15s ease-in-out infinite;
          }

          @keyframes floatCode {
            0%, 100% { transform: translate(0, 0) rotate(0); opacity: 0.1; }
            50% { transform: translate(50px, 50px) rotate(180deg); opacity: 0.3; }
          }

          .matrix-effect {
            animation: matrixMove 3s linear infinite;
          }

          @keyframes matrixMove {
            0% { background-position: 0px 0px; }
            100% { background-position: 20px 20px; }
          }

          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProjectSection;
src / components / ProjectSection.jsx;
