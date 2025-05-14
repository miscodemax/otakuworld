import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import SearchAnime from "./searchAnime";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [liens, setLiens] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(false);


  useEffect(() => {
    setLiens([
      ["Accueil", "/"],
      ["Animes", "/animes"],
      ["Mangas", "/manga"],
      ["recommendations", "/recommendations"],
    ]);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-gray-950 shadow-lg opacity-95" : "bg-transparent"}`}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
          <Link to="/" onClick={closeMenu} className="hover:text-yellow-400 transition-colors duration-300">
            Otakuworld
          </Link>
        </div>

        {/* Desktop Search + Links */}
        <div className="hidden md:flex items-center space-x-8">
          <SearchAnime />
          <ul className="flex space-x-6">
            {liens.map(([nom, chemin]) => (
              <li key={nom}>
                <Link
                to={chemin}
                onClick={() => {
                  closeMenu();
                  setActiveLink(nom);
                }}
                className={
                  "transition-colors duration-300 font-medium " +
                  (activeLink === nom ? "text-amber-400 underline" : "text-white no-underline")
                }
              >
                {nom}
              </Link>

              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden z-50">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {menuOpen ? <X size={32} className="text-white" /> : <Menu size={32} className="text-white" />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <div className={`md:hidden fixed inset-0 bg-gray-950 text-white flex flex-col items-center justify-center gap-8 transition-all duration-300 ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}`}>
          {liens.map(([nom, chemin]) => (
            <NavLink
              key={nom}
              to={chemin}
              onClick={closeMenu}
              className="text-2xl font-semibold hover:text-yellow-400 transition"
            >
              {nom}
            </NavLink>
          ))}
          <div className="w-10/12">
            <SearchAnime />
          </div>
        </div>
      </div>
    </nav>
  );
}
