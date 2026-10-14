import { Footer, Header } from "@/components/site-shell";
import { ProjectCard } from "@/components/project-card";
import { siteData, type Project } from "@/lib/content";

export default function Work() {
  return (
    <>
      <Header current="work" />
      <main>
        <ProjectIndex projects={siteData.work} title="Selected work" />
      </main>
      <Footer />
    </>
  );
}

export function ProjectIndex({ projects, title }: { projects: Project[]; title: string }) {
  const headingId = `${title.toLowerCase().replaceAll(" ", "-")}-title`;

  return (
    <section className="projects" aria-labelledby={headingId}>
      <h2 className="sr-only" id={headingId}>{title}</h2>
      <div className="project-grid">
        {projects.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}
      </div>
    </section>
  );
}
