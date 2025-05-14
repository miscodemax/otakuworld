import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function SearchAnime() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noInput, setNoInput] = useState(false);
  const resultsRef = useRef(null);

  const handleSearch = async () => {
    if (!search.trim()) {
      setNoInput(true);
      setResults([]); // on vide les résultats si recherche invalide
      return;
    }

    setNoInput(false); // si on a un texte valide, on enlève le message d'erreur
    setLoading(true);

    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}`);
      const data = await res.json();
      setResults(data.data);
    } catch (error) {
      console.error("Erreur de recherche :", error);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setResults([]);
    setNoInput(false); // on enlève l'erreur aussi
  };

  // Ferme les résultats si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        clearSearch();
        setNoInput(false);
      }
    };

    if (results.length > 0) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [results]);

  return (
    <div className="max-w-3xl mx-auto p-4 relative">
      <div className="flex">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (noInput && e.target.value.trim()) setNoInput(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Rechercher un anime..."
          className="flex-grow px-4 py-2 border rounded-l outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-amber-600 text-white font-bold rounded-r"
        >
          Rechercher
        </button>
      </div>

      {loading && <p className="mt-4 text-amber-400 text-center">Chargement...</p>}

      {noInput&& (
            <p className="mt-4 text-red-500 text-center font-semibold">Veuillez entrer un nom d’anime.</p>

      )}

      {results.length > 0 && !loading && (
        <ul
          ref={resultsRef}
          className="absolute z-50 top-full left-0 right-0 mt-2 bg-gray-900 text-white rounded shadow-lg max-h-96 overflow-y-auto"
          role="list"
        >
          {results.map((anime) => (
            <li key={anime.mal_id} role="listitem">
              <Link
                to={`/animedetails/${anime.mal_id}`}
                onClick={clearSearch}
                className="block px-4 py-2 hover:bg-gray-700"
              >
                {anime.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
