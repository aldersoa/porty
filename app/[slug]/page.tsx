import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DeckViewer } from "@/components/deck-viewer";
import { ProgressiveImage } from "@/components/progressive-image";
import { Footer, Header } from "@/components/site-shell";
import { getProject, getProjectContext, projects, type Block, type Figure, type Project } from "@/lib/content";

export function generateStaticParams() {
  return projects.filter(({ locked }) => !locked).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project && !project.locked ? { title: project.title, description: project.dek } : {};
}

function Media({ figure, eager = false }: { figure: Figure; eager?: boolean }) {
  if (figure.video) {
    return <video controls playsInline preload="metadata" poster={figure.poster || undefined} src={figure.src} />;
  }
  return (
    <ProgressiveImage
      src={figure.src}
      alt={figure.caption ?? ""}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
    />
  );
}

function Figures({ items, numberFrom }: { items: Figure[]; numberFrom: number }) {
  const rows: Figure[][] = [];
  // Pair consecutive figures into two-up rows; a trailing odd figure runs full width.
  // Per-figure `layout` overrides: "full" takes its own row, "half" pairs with the next non-full figure.
  for (let i = 0; i < items.length; ) {
    if (items[i].layout === "full") {
      rows.push([items[i]]);
      i += 1;
    } else if (items[i + 1] && items[i + 1].layout !== "full") {
      rows.push([items[i], items[i + 1]]);
      i += 2;
    } else {
      rows.push([items[i]]);
      i += 1;
    }
  }
  let n = numberFrom;
  return (
    <>
      {rows.map((row, rowIndex) =>
        row.length === 2 ? (
          <div className="fig-row" key={rowIndex}>
            {row.map((figure) => {
              const figN = n++;
              return (
                <figure key={figure.src}>
                  <Media figure={figure} />
                  {figure.caption && (
                    <figcaption>
                      <span className="fig-n">fig. {figN}</span>
                      {figure.caption}
                    </figcaption>
                  )}
                </figure>
              );
            })}
          </div>
        ) : (
          <figure key={row[0].src}>
            <Media figure={row[0]} />
            {row[0].caption && (
              <figcaption>
                <span className="fig-n">fig. {n++}</span>
                {row[0].caption}
              </figcaption>
            )}
          </figure>
        ),
      )}
    </>
  );
}

function BlockView({ block, figureNumber }: { block: Block; figureNumber: number }) {
  switch (block.kind) {
    case "sub":
      return <h3 className="sub">{block.text}</h3>;
    case "text":
      return (
        <div className="prose">
          {block.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      );
    case "list":
      return (
        <ul className="ed-list">
          {block.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="steps">
          {block.items.map((item, index) => (
            <li key={index}>
              <span>
                <b>{item.term}</b>
                {item.detail && <span className="detail">: {item.detail}</span>}
              </span>
            </li>
          ))}
        </ol>
      );
    case "kv":
      return (
        <dl className="kv">
          {block.items.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      );
    case "pull":
      return (
        <blockquote className="pull">
          {block.quote}
          {block.note && <small>{block.note}</small>}
        </blockquote>
      );
    case "figures":
      return <Figures items={block.items} numberFrom={figureNumber} />;
  }
}

function figureCount(block: Block) {
  return block.kind === "figures" ? block.items.length : 0;
}

function Article({ project }: { project: Project }) {
  const figuresBeforeSection = project.sections.map((_, sectionIndex) =>
    project.sections
      .slice(0, sectionIndex)
      .reduce((sectionTotal, section) => sectionTotal + section.blocks.reduce((blockTotal, block) => blockTotal + figureCount(block), 0), 0),
  );

  return (
    <article className="article">
      {project.sections.map((section, sectionIndex) => (
        <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
          <h2 className="section-label" id={`${section.id}-title`}>
            {section.title}
          </h2>
          {section.blocks.map((block, blockIndex) => {
            const figuresBeforeBlock = section.blocks
              .slice(0, blockIndex)
              .reduce((blockTotal, priorBlock) => blockTotal + figureCount(priorBlock), 0);
            const figureNumber = 1 + figuresBeforeSection[sectionIndex] + figuresBeforeBlock;

            return <BlockView block={block} figureNumber={figureNumber} key={blockIndex} />;
          })}
        </section>
      ))}
    </article>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project || project.locked) notFound();

  const { collection } = getProjectContext(project.slug);
  const hasArticle = project.sections.length > 0;

  return (
    <>
      <Header current={collection} />
      <main>
        <header className="proj-masthead">
          <h1>{project.title}</h1>
          <p className="dek">{project.dek}</p>
        </header>

        {project.deck && (
          <DeckViewer
            key={project.slug}
            dir={project.deck.dir}
            pages={project.deck.pages}
            title={project.title}
            pdf={project.pdf}
          />
        )}
        {hasArticle && project.cover && (
          <div className="proj-hero cover-artwork" data-cover={project.slug}>
            <ProgressiveImage src={project.cover} alt="" loading="eager" fetchPriority="high" />
          </div>
        )}
        {hasArticle && <Article project={project} />}
        {project.gallery.length > 0 && (
          <section className="gallery-grid" aria-label={`${project.title} project media`}>
            {project.gallery.map((figure, mediaIndex) => (
              <Media figure={figure} eager={mediaIndex < 2} key={figure.src} />
            ))}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
