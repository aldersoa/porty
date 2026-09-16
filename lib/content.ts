import data from "../content/projects.json";

export type Figure = {
  src: string;
  caption?: string;
  video?: boolean;
  poster?: string;
  /** Overrides automatic pairing: "full" = own row, "half" = pair with the next half figure. */
  layout?: "full" | "half";
};

export type Block =
  | { kind: "sub"; text: string }
  | { kind: "text"; body: string[] }
  | { kind: "list"; items: string[] }
  | { kind: "steps"; items: { term: string; detail?: string }[] }
  | { kind: "kv"; items: { label: string; value: string }[] }
  | { kind: "pull"; quote: string; note?: string }
  | { kind: "figures"; items: Figure[] };

export type Section = {
  id: string;
  act: "context" | "approach" | "making" | "outcome" | "reflection";
  title: string;
  blocks: Block[];
};

export type Project = {
  slug: string;
  title: string;
  dek: string;
  disciplines: string;
  year?: string;
  locked: boolean;
  cover: string;
  /** Original case-study document, offered as a download link under the deck viewer. */
  pdf?: string;
  /** Pre-rendered pages of the PDF (see scripts/render-deck.swift); shown in the deck pager. */
  deck?: { dir: string; pages: number };
  sections: Section[];
  gallery: Figure[];
};

export const siteData = data as unknown as {
  contact: { email: string; linkedin: string };
  work: Project[];
  play: Project[];
};

export const projects = [...siteData.work, ...siteData.play];
export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export const getCollection = (slug: string): "work" | "play" =>
  siteData.work.some((project) => project.slug === slug) ? "work" : "play";

/** Position of a project within its collection, plus the next project for the footer link. */
export function getProjectContext(slug: string) {
  const collection = getCollection(slug);
  const list = siteData[collection];
  const index = list.findIndex((project) => project.slug === slug);
  const next = list[(index + 1) % list.length];
  return { collection, index, next };
}
