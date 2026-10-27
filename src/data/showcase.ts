import { systemProjects } from "./home";
import { openSourceTools, productionLandings } from "./open-source";

export interface ShowcaseProject {
  id: string;
  title: string;
  category: "Sistemas" | "Webs" | "Open source";
  description: string;
  image?: string;
  snippet?: string;
  href: string;
  external: boolean;
  stack: string;
}

// Imágenes exclusivas del carrusel que sale del contenedor Docker.
const containerImages: Record<string, string> = {
  "sistema-zona": "/proyectos/zona/123.jpeg",
  "huevo-de-oro": "/proyectos/sistema/s1.png",
};

const systems: ShowcaseProject[] = systemProjects
  .filter(project => Object.hasOwn(containerImages, project.id))
  .map(project => ({
    id: project.id, title: project.title, category: "Sistemas",
    description: project.headline, image: containerImages[project.id] ?? project.image,
    href: `/casos#${project.id}`, external: false, stack: project.stack,
  }));
const websites: ShowcaseProject[] = productionLandings.map((site, index) => ({
  id: `web-${index}`, title: site.name, category: "Webs",
  description: site.niche, image: site.image,
  href: site.url, external: true, stack: site.tech.slice(0, 3).join(" · "),
}));
const tools: ShowcaseProject[] = openSourceTools.map(tool => ({
  id: tool.id, title: tool.name.split(" 🥸")[0], category: "Open source",
  description: tool.tagline, snippet: tool.commandOrSnippet,
  href: tool.repoUrl, external: true, stack: tool.stack.slice(0, 3).join(" · "),
}));

// Lead with systems, websites and open source; keep Huevo de Oro at the end.
export const showcaseProjects = [
  systems[0],
  websites[1],
  tools[0],
  websites[2],
  tools[1],
  websites[0],
  ...tools.slice(2),
  systems[1],
];
