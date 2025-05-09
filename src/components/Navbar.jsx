import { useState, useEffect } from "react";
import {Link} from "react-router-dom"

export default function Navbar() {
  const [liens, setLiens] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setLiens([['Accueil', '/'], ['Animes', '/animes'], ['Mangas', '/manga'], ['Series', '/series']]);
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
        scrolled ? "bg-gray-950 shadow-lg opacity-90" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
          <Link href="/" className="hover:text-yellow-400 transition-colors duration-300">
            Otakuworld
          </Link>
        </div>
        <ul className="flex space-x-6">
          {liens.map((lien) => (
            <li key={lien}>
              <Link
                to={lien[1]}
                className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
              >
                {lien[0]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
