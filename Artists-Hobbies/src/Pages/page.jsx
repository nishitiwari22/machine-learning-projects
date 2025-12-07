// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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
        <AnimatedRoutes />
        <Footer />
      </div>
    </Router>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
          <Route path="/explore" element={<PageWrapper><ExplorePage /></PageWrapper>} />
          <Route path="/hobby" element={<PageWrapper><HobbyPage /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </main>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

function Header() {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-orange-500 text-white shadow-md sticky top-0 z-10"
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold tracking-wide cursor-pointer">
          Know Your Artists
        </motion.div>
        <nav className="space-x-6">
          {[{ to: '/', label: 'Home' }, { to: '/explore', label: 'Explore' }, { to: '/hobby', label: 'Find Hobby' }, { to: '/about', label: 'About' }].map(({ to, label }) => (
            <motion.span whileHover={{ scale: 1.1 }} key={to}>
              <Link to={to} className="hover:text-yellow-200 transition">{label}</Link>
            </motion.span>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}

// src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <motion.section className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <motion.h1 className="text-4xl md:text-5xl font-bold mb-4 text-orange-600" initial={{ y: -30 }} animate={{ y: 0 }} transition={{ duration: 0.7 }}>
        Know Your Artists and Culture
      </motion.h1>
      <motion.p className="max-w-2xl mx-auto mb-8 text-lg text-gray-700" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        Before our fashion dupatta is marketed as a Scandinavian scarf, let’s learn the artistry and culture behind it.
      </motion.p>
      <motion.div className="flex justify-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <Link to="/explore" className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition">Explore Artists</Link>
        <Link to="/hobby" className="px-6 py-3 bg-yellow-400 text-gray-800 rounded-lg shadow hover:bg-yellow-500 transition">Find Your Hobby</Link>
      </motion.div>
    </motion.section>
  );
}

// src/pages/ExplorePage.jsx
import React from "react";
import { motion } from "framer-motion";

export default function ExplorePage() {
  return (
    <motion.section className="text-center py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <h2 className="text-3xl font-semibold mb-4 text-orange-600">Explore Local Artists by State</h2>
      <p className="max-w-xl mx-auto text-gray-700">
        Discover traditional crafts, music, dance, and artisans from every corner of India.
      </p>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {["Rajasthan", "Punjab", "West Bengal", "Kerala", "Maharashtra", "Gujarat", "Assam", "Karnataka"].map((state, i) => (
          <motion.div key={state} className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer" whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 150 }}>
            <h3 className="font-bold text-lg text-orange-600">{state}</h3>
            <p className="text-sm text-gray-600">Famous Art: Coming soon</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// src/pages/HobbyPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

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
    <motion.section className="text-center py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <h2 className="text-3xl font-semibold mb-4 text-orange-600">Find Your Hobby</h2>
      <p className="text-gray-700 mb-6">Enter a habit or interest to get an artistic suggestion.</p>
      <motion.div className="flex justify-center gap-2 mb-6" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
        <input
          type="text"
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
          placeholder="e.g., reading, socializing"
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:ring focus:ring-orange-300 outline-none"
        />
        <motion.button whileTap={{ scale: 0.95 }} onClick={handleSuggest} className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
          Suggest
        </motion.button>
      </motion.div>
      {suggestion && (
        <motion.p className="text-lg text-gray-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          🎨 Suggested Art Domain: <span className="font-semibold">{suggestion}</span>
        </motion.p>
      )}
    </motion.section>
  );
}

// src/pages/AboutPage.jsx
import React from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <motion.section className="text-center py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <h2 className="text-3xl font-semibold mb-4 text-orange-600">About Know Your Artists</h2>
      <p className="max-w-2xl mx-auto text-gray-700">
        This platform celebrates India’s local artistry, heritage, and craftsmanship. We aim to bridge the gap between artisans and modern audiences, helping you connect with your cultural roots.
      </p>
    </motion.section>
  );
}

// src/components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer className="bg-orange-500 text-white text-center py-4 mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <p>© {new Date().getFullYear()} Know Your Artists. Made with ❤️ in India.</p>
    </motion.footer>
  );
}
