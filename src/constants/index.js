export const words = [
  { id: 1, text: "Ideas", imgPath: "/images/ideas.svg" },
  { id: 2, text: "Concepts", imgPath: "/images/concepts.svg" },
  { id: 3, text: "Designs", imgPath: "/images/designs.svg" },
  { id: 4, text: "Code", imgPath: "/images/code.svg" },
  { id: 5, text: "Ideas", imgPath: "/images/ideas.svg" },
  { id: 6, text: "Concepts", imgPath: "/images/concepts.svg" },
  { id: 7, text: "Designs", imgPath: "/images/designs.svg" },
  { id: 8, text: "Code", imgPath: "/images/code.svg" },
];

export const navLinks = [
  {
    name: "About",
    link: "#about",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Projects",
    link: "#projects",
  },
];

export const techCategories = [
  {
    name: "Frontend",
    skills: [
      {
        name: "HTML",
        modelPath: "/models/html5_logo.glb",
        logoPath:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        scale: 1,
        rotation: [0, -Math.PI / 2, 0],
        position: [0, -2.9, 0],
      },
      {
        name: "CSS",
        modelPath: "/models/final_css.glb",
        logoPath:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        scale: 0.07,
        rotation: [0.05, -0.006, 0],
        position: [0, -1.9, 0],
      },
      {
        name: "TailwindCSS",
        modelPath: "/models/tailwind.glb",
        logoPath:
          "https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg",
        scale: 1.8,
        rotation: [0, 0, 0],
        position: [0, -0.26, 0],
      },
      {
        name: "JavaScript",
        modelPath: "/models/js.glb",
        logoPath:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        scale: 1.2,
        rotation: [0, 4.5, 0],
        position: [0, -0.26, 0],
      },
      {
        name: "TypeScript",
        modelPath: "/models/typescript.glb",
        logoPath:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        scale: 1.5,
        rotation: [0, 0, 0],
        position: [0, -0.2, 0],
      },
      {
        name: "React",
        modelPath: "/models/react_logo-transformed.glb",
        logoPath: "/images/logos/react.png",
        scale: 1,
        rotation: [0, 0, 0],
      },
      {
        name: "Next.js",
        modelPath: "/models/nextjs.glb",
        logoPath:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        scale: 2.7,
        rotation: [0, 0, 0],
        position: [0, -0.7, 0],
      },
    ],
  },
  {
    name: "Backend",
    skills: [
      {
        name: "Node.js",
        modelPath: "/models/node-transformed.glb",
        logoPath: "/images/logos/node.png",
        scale: 5,
        rotation: [0, -Math.PI / 2, 0],
      },
      {
        name: "Python",
        modelPath: "/models/python-transformed.glb",
        logoPath: "/images/logos/python.svg",
        scale: 0.8,
        rotation: [0, 0, 0],
      },
    ],
  },
  {
    name: "Database & Cloud",
    skills: [
      // <a href="https://iconscout.com/3d-illustrations/mongo-db" class="text-underline font-size-sm" target="_blank">Mongo DB</a> by <a href="https://iconscout.com/contributors/tomsdesign" class="text-underline font-size-sm" target="_blank">Toms Design</a>
      {
        name: "MySQL",
        modelPath: "/models/mysql.glb", // Placeholder, replace with actual MySQL model
        logoPath:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        scale: 1.5,
        rotation: [0, 0, 0],
      },
      {
        name: "MongoDB",
        modelPath: "/models/mongodb.glb", // Placeholder, replace with actual MongoDB model
        logoPath:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        scale: 5,
        rotation: [0, 0, 0],
        position: [0, -1, 0],
      },
      // <a href="https://iconscout.com/3d-illustrations/mysql" class="text-underline font-size-sm" target="_blank">MySQL</a> by <a href="https://iconscout.com/contributors/sonisokell" class="text-underline font-size-sm" target="_blank">Soni Sokell</a> */}

      {
        name: "Supabase",
        modelPath: "/models/supabase.glb",
        logoPath:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
        scale: 4,
        rotation: [0, 0.01, 0],
        position: [0, -0.5, 0],
      },
    ],
  },
  {
    name: "Version Control",
    skills: [
      // from
      {
        name: "Git",
        modelPath: "/models/git-svg-transformed.glb",
        logoPath: "/images/logos/git.svg",
        scale: 0.05,
        rotation: [0, -Math.PI / 4, 0],
      },
      // <a href="https://iconscout.com/3d-illustrations/github" class="text-underline font-size-sm" target="_blank">Github</a> by <a href="https://iconscout.com/contributors/tomsdesign" class="text-underline font-size-sm">Toms Design</a> on <a href="https://iconscout.com" class="text-underline font-size-sm">IconScout</a>
      {
        name: "GitHub",
        modelPath: "/models/github.glb",
        logoPath:
          "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-white-icon.png",
        scale: 2,
        rotation: [0, 0, 0],
      },
    ],
  },
];
