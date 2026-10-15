import Link from "next/link";
import { AldersonWordmark } from "@/components/alderson-wordmark";
import { LightsCarousel, type LightsCarouselImage } from "@/components/lights-carousel";
import { ProgressiveImage } from "@/components/progressive-image";
import { Footer, Header } from "@/components/site-shell";

const lightPhotos: LightsCarouselImage[] = [
  { src: "/media/about/lights-1.jpg", alt: "Gail reaching toward rainbow-colored light projections", width: 1346, height: 1794 },
  { src: "/media/about/lights-2.jpg", alt: "Gail standing in a tunnel of blue lights", width: 1346, height: 1794 },
  { src: "/media/about/lights-3.jpg", alt: "Gail reclining in blue light", width: 1346, height: 1794 },
  { src: "/media/about/lights-4.jpg", alt: "Gail at a colorful outdoor light display", width: 2392, height: 1794 },
  { src: "/media/about/lights-5.jpg", alt: "Gail casting multicolored shadows in an interactive light installation", width: 1346, height: 1794 },
  { src: "/media/about/lights-6.jpg", alt: "Gail walking through a garden illuminated in saturated colors", width: 2392, height: 1794 },
  { src: "/media/about/lights-7.jpg", alt: "Gail relaxing in a room filled with red light", width: 1346, height: 1794 },
  { src: "/media/about/lights-8.jpg", alt: "Gail holding an illuminated fiber artwork with another person", width: 2392, height: 1794 },
  { src: "/media/about/lights-9.jpg", alt: "Gail looking at a Halloween display lit in blue and red", width: 2392, height: 1794 },
  { src: "/media/about/lights-10.jpg", alt: "Gail taking a selfie with two people at a holiday light display", width: 2392, height: 1794 },
  { src: "/media/about/lights-11.jpg", alt: "Gail inside a white illuminated sphere", width: 1346, height: 1794 },
  { src: "/media/about/lights-12.jpg", alt: "Gail beneath a canopy of lights", width: 1920, height: 2222 },
];

export default function Home() {
  return (
    <>
      <Header current="about" />
      <main>
        <section className="about-masthead" aria-label="Alderson illustration">
          <AldersonWordmark />
          <a className="masthead-scroll" href="#about-content" aria-label="Continue to about Gail">↓</a>
        </section>

        <section className="intro" id="about-content">
          <p className="eyebrow">designer · engineer · researcher</p>
          <h1>
            howdy, i&rsquo;m gail.
            <br />
            I make tech feel <span className="accent">less like tech</span>
            <br />
            and more like <span className="accent">magic.</span>
          </h1>
        </section>

        <section className="spread" aria-labelledby="principles-title">
          <div>
            <h2 className="section-label" id="principles-title">My design principles</h2>
            <ol className="principles">
              <li>functionality <span>it&rsquo;s gotta work</span></li>
              <li>modularity <span>little configurable pieces rock</span></li>
              <li>customizability <span>make it yours</span></li>
              <li>modesty <span>good design does not shout</span></li>
              <li>delight <span>make them smile</span></li>
            </ol>
          </div>
          <div className="portrait-stack">
            <figure>
              <ProgressiveImage src="/media/about/01.png" alt="Gail Alderson" loading="lazy" />
              <figcaption><span className="fig-n">fig. a</span>self-portrait</figcaption>
            </figure>
          </div>
        </section>

        <section className="spread rev" aria-labelledby="interests-title">
          <LightsCarousel images={lightPhotos} />
          <div>
            <h2 className="section-label" id="interests-title">My interests</h2>
            <div className="interests">
              <div className="interest">
                <h3><span className="accent">optics</span></h3>
                <p>
                  I explore how light shapes what we see and feel. See{" "}
                  <Link href="/by-a-thread">by a thread</Link> and <Link href="/mycelium">mycelium</Link>.
                </p>
              </div>
              <div className="interest">
                <h3><span className="accent">music</span></h3>
                <p>
                  I&rsquo;m really into production and mixing. Check out my all-time favorites{" "}
                  <a href="https://open.spotify.com/playlist/29hCucoKetqwvekTVgp9hq?si=abdb47f8868d49fe" target="_blank" rel="noreferrer">here</a>.
                </p>
              </div>
              <div className="interest">
                <h3><span className="accent">books</span></h3>
                <ul className="interest-list">
                  <li><em>A Brave New World</em></li>
                  <li><em>Sapiens</em></li>
                  <li><em>This Is Your Mind on Plants</em></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
