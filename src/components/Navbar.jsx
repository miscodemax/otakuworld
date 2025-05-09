import { useState, useEffect } from "react";

export default function Navbar() {
  const [liens, setLiens] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setLiens(['Accueil', 'Animes', 'Mangas', 'Series']);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // déclenche après 10px de scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // nettoyage
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-950 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
          <a href="/" className="hover:text-yellow-400 transition-colors duration-300">
            Otakuworld
          </a>
        </div>
        <ul className="flex space-x-6">
          {liens.map((lien) => (
            <li key={lien}>
              <a
                href="#"
                className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
              >
                {lien}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
