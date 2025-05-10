import { useEffect, useState } from "react";
import Loader from "./loader";

export default function AfficherAnime({ fetchingAnime}) {
  const [animes, setAnimes] = useState([]);
  const [loader, setLoader] = useState(true);
  const [numberPage, setNumberPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  // Fonction de récupération des données
  const fetchAnime = async () => {
    setLoader(true);
    const data = await fetchingAnime(25, currentPage);
    console.log(data[1]);
    
    //setCurrentPage(data[1].current_page);
    setHasNextPage(data[1].has_next_page);
    setNumberPage(data[1].last_visible_page);
    setAnimes(data[0]);
    setLoader(false);
  };

  useEffect(() => {
    fetchAnime();
  }, [currentPage, fetchingAnime]);

  const nextPage = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loader) {
    return <Loader />;
  }

  if (!Array.isArray(animes)) {
    return <div className="text-red-500 text-center mt-10">Erreur : données invalides</div>;
  }

  return (
    <div className="container w-full flex justify-center">
      <div className="w-full py-10">
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center">
          {animes.map((anime) => (
            <div
              key={anime.mal_id}
              className="w-[280px] h-[500px] bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 flex flex-col"
            >
              <img
                src={anime.images.jpg.image_url || "https://via.placeholder.com/300x400?text=Image+indisponible"}
                alt={anime.title}
                className="w-full h-64 object-cover"
              />
              <div className="flex flex-col flex-grow p-4">
                <h3 className="text-lg text-amber-400 font-bold mb-2 line-clamp-1">
                  {anime.title}
                </h3>
                <p className="text-sm text-gray-300 line-clamp-3 mb-4">
                  {anime.synopsis?.slice(0, 150)}...
                </p>
                <div className="mt-auto">
                  <button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-4 rounded-xl transition-colors duration-300 w-full">
                    Voir plus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination buttons */}
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Précédent
          </button>
          <span className="text-white text-lg flex justify-center items-center font-bold hover:text-amber-400 transition-all duration-200">
            Page {currentPage} / {numberPage}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === numberPage}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}
