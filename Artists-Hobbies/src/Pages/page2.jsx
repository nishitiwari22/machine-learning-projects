// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import HobbyPage from "./pages/HobbyPage";
import AboutPage from "./pages/AboutPage";
import Footer from "./components/Footer";
import './index.css'; // Tailwind entry point

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-yellow-100 text-gray-800">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/hobby" element={<HobbyPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function Header() {
  return (
    <header className="bg-orange-500 text-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold tracking-wide">Know Your Artists</div>
        <nav className="space-x-6">
          <Link to="/" className="hover:text-yellow-200 transition">Home</Link>
          <Link to="/explore" className="hover:text-yellow-200 transition">Explore</Link>
          <Link to="/hobby" className="hover:text-yellow-200 transition">Find Hobby</Link>
          <Link to="/about" className="hover:text-yellow-200 transition">About</Link>
        </nav>
      </div>
    </header>
  );
}

// src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="text-center py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-orange-600">Know Your Artists and Culture</h1>
      <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-700">
        Before our fashion dupatta is marketed as a Scandinavian scarf, let’s learn the artistry and culture behind it.
      </p>
      <div className="flex justify-center gap-4">
        <Link to="/explore" className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition">Explore Artists</Link>
        <Link to="/hobby" className="px-6 py-3 bg-yellow-400 text-gray-800 rounded-lg shadow hover:bg-yellow-500 transition">Find Your Hobby</Link>
      </div>
    </section>
  );
}

// src/pages/ExplorePage.jsx
import React from "react";

export default function ExplorePage() {
  return (
    <section className="text-center py-16">
      <h2 className="text-3xl font-semibold mb-4 text-orange-600">Explore Local Artists by State</h2>
      <p className="max-w-xl mx-auto text-gray-700">
        Discover traditional crafts, music, dance, and artisans from every corner of India.
      </p>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {["Rajasthan", "Punjab", "West Bengal", "Kerala", "Maharashtra", "Gujarat", "Assam", "Karnataka"].map((state) => (
          <div key={state} className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer">
            <h3 className="font-bold text-lg text-orange-600">{state}</h3>
            <p className="text-sm text-gray-600">Famous Art: Coming soon</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// src/pages/HobbyPage.jsx
import React, { useState } from "react";

export default function HobbyPage() {
  const [habit, setHabit] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const handleSuggest = () => {
    const map = {
      reading: "Calligraphy or Poetry Writing",
      socializing: "Theatre or Folk Dance",
      nature: "Madhubani Painting or Pottery",
      gaming: "3D Art or Animation",
    };
    setSuggestion(map[habit.toLowerCase()] || "Explore local crafts to discover what inspires you!");
  };

  return (
    <section className="text-center py-16">
      <h2 className="text-3xl font-semibold mb-4 text-orange-600">Find Your Hobby</h2>
      <p className="text-gray-700 mb-6">Enter a habit or interest to get an artistic suggestion.</p>
      <div className="flex justify-center gap-2 mb-6">
        <input
          type="text"
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
          placeholder="e.g., reading, socializing"
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:ring focus:ring-orange-300 outline-none"
        />
        <button onClick={handleSuggest} className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
          Suggest
        </button>
      </div>
      {suggestion && <p className="text-lg text-gray-800">🎨 Suggested Art Domain: <span className="font-semibold">{suggestion}</span></p>}
    </section>
  );
}

// src/pages/AboutPage.jsx
import React from "react";

export default function AboutPage() {
  return (
    <section className="text-center py-16">
      <h2 className="text-3xl font-semibold mb-4 text-orange-600">About Know Your Artists</h2>
      <p className="max-w-2xl mx-auto text-gray-700">
        This platform celebrates India’s local artistry, heritage, and craftsmanship. We aim to bridge the gap between artisans and modern audiences, helping you connect with your cultural roots.
      </p>
    </section>
  );
}

// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-orange-500 text-white text-center py-4 mt-12">
      <p>© {new Date().getFullYear()} Know Your Artists. Made with ❤️ in India.</p>
    </footer>
  );
}