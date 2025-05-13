import { useEffect, useState } from "react";
import Loader from "./loader";
import { getGenre } from "../API/jikan";
import { Link } from "react-router-dom";

export default function Genres({ genreId, Mode, type='anime' }) {
  const [animes, setAnimes] = useState([]);
  const [loader, setLoader] = useState(true);
  const [numberPage, setNumberPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchAnime = async () => {
    setLoader(true);
    const data = await getGenre(25, currentPage, genreId, Mode, type);
    setHasNextPage(data[1].has_next_page);
    setNumberPage(data[1].last_visible_page);
    setAnimes(data[0]);
    setLoader(false);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [genreId]);

  useEffect(() => {
    fetchAnime();
  }, [currentPage, genreId]);

  const nextPage = () => {
    if (hasNextPage) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loader) return <Loader />;
  if (!Array.isArray(animes)) return <div className="text-red-500 text-center mt-10">Erreur : données invalides</div>;

  return (
    <div className="container w-full flex justify-center">
      <div className="w-full">
        {/* Pagination Top */}
        <div className="flex justify-center mb-8 gap-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 text-white transition-all duration-200 rounded hover:bg-black hover:text-red-600 disabled:opacity-50"
          >
            Précédent
          </button>
          <span className="text-white text-lg font-bold hover:text-amber-400">
            Page {currentPage} / {numberPage}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === numberPage}
            className="px-4 py-2 bg-gray-700 text-white transition-all duration-200 rounded hover:bg-black hover:text-amber-400 disabled:opacity-50"
          >
            Suivant
          </button>
        </div>

        {/* Anime Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center">
          {animes.map((anime) => (
            <div
              key={anime.mal_id}
              className="w-72 h-[520px] bg-gray-900 rounded-3xl shadow-xl transition-transform hover:scale-105 overflow-hidden flex flex-col"
            >
              <div className="relative h-64">
                <img
                  src={anime.images.jpg.image_url || "https://via.placeholder.com/300x400?text=Image+indisponible"}
                  alt={anime.title}
                  className="w-full h-full object-cover rounded-t-3xl"
                />
                {anime.rank && anime.rank < 500 && (
                  <div className="absolute top-2 left-2 bg-amber-500 text-black text-xs px-2 py-1 rounded shadow">
                    #{anime.rank}
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-grow p-4">
                <h3 className="text-lg font-bold text-amber-400 mb-2 line-clamp-2">
                  {anime.title}
                </h3>
                <p className="text-sm text-gray-300 line-clamp-3 mb-4">
                  {anime.synopsis?.slice(0, 200)}...
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xs text-gray-400">⭐ {anime.score || 'N/A'}</span>
                  <Link to={'/animedetails/' + anime.mal_id}>
                    <button className="bg-amber-500 hover:bg-amber-600 text-black text-sm font-bold py-2 px-3 rounded-full transition-all">
                      Voir plus
                    </button>
                  </Link>
                  
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Bottom */}
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 text-white transition-all duration-200 rounded hover:bg-black hover:text-red-600 disabled:opacity-50"
          >
            Précédent
          </button>
          <span className="text-white text-lg font-bold hover:text-amber-400">
            Page {currentPage} / {numberPage}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === numberPage}
            className="px-4 py-2 bg-gray-700 text-white transition-all duration-200 rounded hover:bg-black hover:text-amber-400 disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}
