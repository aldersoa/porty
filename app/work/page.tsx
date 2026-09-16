import { Footer, Header } from "@/components/site-shell";
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
        {projects.map((project, index) => (
          <a
            className="project-card"
            href={`/${project.slug}`}
            key={project.slug}
            aria-label={`${project.title}, ${project.disciplines}`}
          >
            <div className="project-image-wrap">
              {project.cover ? (
                <img src={project.cover} alt="" loading={index < 2 ? "eager" : "lazy"} />
              ) : (
                <span className="locked-mark">private</span>
              )}
            </div>
            <div className="project-copy">
              <span className="index-n">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>
                  {project.title}
                  {project.locked && <span className="lock-note">private</span>}
                </h3>
                <p className="dek">{project.dek}</p>
                <p className="disciplines">{project.disciplines}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
