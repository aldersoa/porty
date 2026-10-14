import Link from "next/link";
import { AldersonWordmark } from "@/components/alderson-wordmark";
import { ProgressiveImage } from "@/components/progressive-image";
import { Footer, Header } from "@/components/site-shell";

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
          <figure>
            <ProgressiveImage src="/media/about/02.jpg" alt="Gail Alderson beneath a canopy of lights" loading="lazy" />
            <figcaption><span className="fig-n">fig. b</span>i&rsquo;m not weird about lights, YOU&rsquo;RE weird</figcaption>
          </figure>
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
