import type { Metadata } from "next";
import { Footer, Header } from "@/components/site-shell";
import { siteData } from "@/lib/content";
import { ProjectIndex } from "../work/page";

export const metadata: Metadata = { title: "Play" };

export default function Play() {
  return (
    <>
      <Header current="play" />
      <main>
        <ProjectIndex projects={siteData.play} title="Personal projects" />
      </main>
      <Footer />
    </>
  );
}
