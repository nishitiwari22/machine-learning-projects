import React, { useState, useEffect } from "react";

// Step 2 — Added StateGrid and HobbyFinder sections
export default function App() {
  useInjectStyles();

  return (
    <div className="kya-root">
      <Header />
      <main>
        <Hero />
        <section id="intro" className="container intro">
          <h2>Our Mission</h2>
          <p>
            We connect you with local Indian artists and the cultural stories behind their craft.
            Know your artists and culture — before our Dupatta is marketed as a Scandinavian Scarf.
          </p>
        </section>
        <StateGrid />
        <HobbyFinder />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="logo">Know Your Artists</div>
        <nav className="nav">
          <a href="#explore">Explore Artists</a>
          <a href="#hobby">Find Your Hobby</a>
          <a href="#about">About</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden></div>
      <div className="container hero-content">
        <div className="hero-text">
          <h1>
            Discover local artists across India — <span className="accent">state by state</span>
          </h1>
          <p className="lead">
            Celebrate authentic craft, learn the stories, and find the artistic hobby that aligns with
            your habits and curiosity.
          </p>
          <div className="hero-ctas">
            <a className="btn primary" href="#explore">
              Explore Artists by State
            </a>
            <a className="btn ghost" href="#hobby">
              Find Your Artistic Match
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="fabric-card">
            <div className="fabric-patch">Bihar — Madhubani</div>
            <div className="fabric-patch">Rajasthan — Bandhani</div>
            <div className="fabric-patch">Assam — Mekhela</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StateGrid() {
  const states = [
    { name: "Bihar", art: "Madhubani" },
    { name: "Rajasthan", art: "Bandhani" },
    { name: "Maharashtra", art: "Warli" },
    { name: "West Bengal", art: "Kantha" },
    { name: "Tamil Nadu", art: "Tanjore Painting" },
    { name: "Assam", art: "Muga Silk Weaving" },
  ];

  return (
    <section id="explore" className="container state-grid">
      <h2>Explore Artists by State</h2>
      <div className="grid">
        {states.map((s, i) => (
          <div key={i} className="state-card">
            <div className="state-name">{s.name}</div>
            <div className="state-art">{s.art}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HobbyFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const questions = [
    {
      q: "What do you enjoy doing in your free time?",
      opts: ["Sketching", "Listening to music", "Gardening", "Exploring fashion"],
    },
    {
      q: "How do you describe your personality?",
      opts: ["Calm and patient", "Expressive and bold", "Detail-oriented", "Adventurous"],
    },
    {
      q: "Which environment do you feel most creative in?",
      opts: ["Quiet indoors", "Open nature", "Workshops/studios", "Festive gatherings"],
    },
  ];

  const suggestions = {
    Sketching: "Madhubani Painting",
    Music: "Classical Instrument Learning",
    Gardening: "Terracotta Pottery",
    Fashion: "Handloom Weaving",
    Calm: "Mandala Art",
    Expressive: "Dance or Theater",
    Detail: "Miniature Painting",
    Adventurous: "Folk Dance or Street Photography",
  };

  const handleAnswer = (ans) => {
    const next = [...answers, ans];
    setAnswers(next);
    if (next.length === questions.length) setStep(questions.length);
    else setStep(step + 1);
  };

  const hobbySuggestion = () => {
    const joined = answers.join(" ");
    for (const key in suggestions) {
      if (joined.includes(key)) return suggestions[key];
    }
    return "Exploring local crafts or art workshops!";
  };

  return (
    <section id="hobby" className="container hobby-finder">
      <h2>Find Your Artistic Match</h2>
      {step < questions.length ? (
        <div className="question-block">
          <p className="question">{questions[step].q}</p>
          <div className="options">
            {questions[step].opts.map((opt, i) => (
              <button key={i} className="btn ghost" onClick={() => handleAnswer(opt)}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="result">
          <h3>We think you might love:</h3>
          <p className="highlight">{hobbySuggestion()}</p>
          <button className="btn primary" onClick={() => { setStep(0); setAnswers([]); }}>
            Try Again
          </button>
        </div>
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Know Your Artists — Support local creators</p>
        <div className="social">Follow: Instagram • X • LinkedIn</div>
      </div>
    </footer>
  );
}

// Inject CSS into the document so this single-file example is self-contained.
function useInjectStyles() {
  useEffect(() => {
    const css = `
      :root{
        --bg:#FAF9F6;
        --ivory:#FFFDF8;
        --accent:#FF9933;
        --deep:#00695C;
        --muted:#6B6B6B;
        --container:1200px;
      }
      body,html,#root{margin:0;background:var(--bg);color:#222;font-family:Inter,system-ui,sans-serif}
      .container{max-width:var(--container);margin:0 auto;padding:0 1rem}
      .btn{cursor:pointer}
      h2{color:var(--deep)}
      .site-header{position:sticky;top:0;background:white;border-bottom:1px solid rgba(0,0,0,0.05);z-index:40}
      .header-inner{display:flex;justify-content:space-between;align-items:center;padding:0.75rem 0}
      .nav a{margin-left:1rem;text-decoration:none;color:var(--muted);font-weight:600}
      .nav a:hover{color:var(--deep)}
      .hero{padding:3.5rem 0;position:relative;overflow:hidden}
      .hero-bg{position:absolute;inset:0;background:linear-gradient(135deg, rgba(255,153,51,0.06), rgba(0,105,92,0.04));transform:skewY(-3deg);}
      .hero-content{display:flex;gap:2rem;align-items:center;padding:2rem 0;position:relative;z-index:2}
      .state-grid{padding:2rem 0}
      .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;margin-top:1rem}
      .state-card{background:var(--ivory);padding:1rem;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.05);text-align:center}
      .state-name{font-weight:700;color:var(--deep)}
      .state-art{color:var(--accent)}
      .hobby-finder{padding:2rem 0}
      .question-block{margin-top:1rem}
      .options{display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:0.5rem}
      .highlight{color:var(--accent);font-weight:700;font-size:1.1rem}
    `;
    const style=document.createElement("style");
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    return()=>document.head.removeChild(style);
  },[]);
}
