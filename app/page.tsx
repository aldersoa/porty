import Link from "next/link";
import { AldersonWordmark } from "@/components/alderson-wordmark";
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
          <p className="standfirst">
            <span className="lede">
              I&rsquo;m a product designer who&rsquo;s worn a lot of hats &mdash; software engineer, product manager,
              UX researcher &mdash; but the common thread?
            </span>{" "}
            I love designing things people actually want to use, whether it&rsquo;s hardware, software, or something
            in between.
          </p>
        </section>

        <section className="spread" aria-labelledby="principles-title">
          <div>
            <h2 className="section-label" data-n="i." id="principles-title">My design principles</h2>
            <ol className="principles">
              <li>functionality <span>it has to work, first</span></li>
              <li>modularity <span>small parts, endlessly recombined</span></li>
              <li>customizability <span>let people make it theirs</span></li>
              <li>modesty <span>the design shouldn&rsquo;t shout</span></li>
              <li>delight <span>&hellip;and then, one surprise</span></li>
            </ol>
          </div>
          <div className="portrait-stack">
            <figure className="tilt">
              <img src="/media/about/01.png" alt="Gail Alderson" />
              <figcaption><span className="fig-n">fig. a</span>self-portrait</figcaption>
            </figure>
          </div>
        </section>

        <section className="spread rev" aria-labelledby="interests-title">
          <figure>
            <img src="/media/about/02.jpg" alt="Gail Alderson beneath a canopy of lights" />
            <figcaption><span className="fig-n">fig. b</span>beneath a canopy of lights &mdash; naturally</figcaption>
          </figure>
          <div>
            <h2 className="section-label" data-n="ii." id="interests-title">My interests</h2>
            <div className="interests">
              <div className="interest">
                <h3><span className="accent">optics</span> &mdash; light &amp; its creative potential</h3>
                <p>
                  Light is fundamental to the human experience and I love exploring its physics. See{" "}
                  <Link href="/by-a-thread">by a thread</Link> and <Link href="/mycelium">mycelium</Link>.
                </p>
              </div>
              <div className="interest">
                <h3><span className="accent">music</span> &mdash; theory, production, mixing</h3>
                <p>
                  A playlist of my all-time favorites lives{" "}
                  <a href="https://open.spotify.com/playlist/29hCucoKetqwvekTVgp9hq?si=abdb47f8868d49fe" target="_blank" rel="noreferrer">here</a>.
                </p>
              </div>
              <div className="interest">
                <h3><span className="accent">books</span> &mdash; anthropology &amp; psychology</h3>
                <p>Favorites include <em>Sapiens</em>, <em>This Is Your Mind on Plants</em>, and <em>A Brave New World</em>.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
