import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QuizzButton from "../components/ButtonChoice";

export default function Series() {
  const levels = ["Shonen (anime pour jeunes garçons)", "Seinen (anime pour jeunes adultes)", "Shojo (anime pour jeunes filles)"];

  const animeGenres = [
    { id: 1, name: "Action" }, { id: 2, name: "Adventure" }, { id: 3, name: "Comedy" },
    { id: 4, name: "Drama" }, { id: 5, name: "Fantasy" }, { id: 6, name: "Magic" },
    { id: 7, name: "Romance" }, { id: 8, name: "Sci-Fi" }, { id: 9, name: "Slice of Life" },
    { id: 10, name: "Supernatural" }, { id: 11, name: "Thriller" }, { id: 12, name: "Horror" },
    { id: 13, name: "Psychological" }, { id: 14, name: "Sports" }, { id: 15, name: "Martial Arts" },
    { id: 16, name: "Mecha" }, { id: 17, name: "Military" }, { id: 18, name: "Mystery" },
    { id: 19, name: "Parody" }, { id: 20, name: "Historical" }
  ];

  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genreId, setGenreId] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
    setSelectedGenres([]);
    setGenreId([]);
    setRecommendations([]);
  };

  const handleGenreClick = (genreName, genreIdValue) => {
    const isSelected = selectedGenres.includes(genreName);
    if (isSelected) {
      setSelectedGenres((prev) => prev.filter((g) => g !== genreName));
      setGenreId((prev) => prev.filter((id) => id !== genreIdValue));
    } else if (selectedGenres.length < 3) {
      setSelectedGenres((prev) => [...prev, genreName]);
      setGenreId((prev) => [...prev, genreIdValue]);
    }
  };

  const fetchRecommendations = async () => {
    if (genreId.length === 0) return;
    setLoading(true);
    try {
      const genreQuery = genreId.join(",");
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?genres=${genreQuery}&order_by=score&sort=desc&limit=25`
      );
      const data = await response.json();
      setRecommendations(data.data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des recommandations :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedLevel && genreId.length > 0 && genreId.length <= 3) {
      fetchRecommendations();
    } else {
      setRecommendations([]);
    }
  }, [genreId, selectedLevel]);

  return (
    <section className="w-full px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-white hover:text-amber-400 transition-all duration-150">
        Trouvons ton anime idéal 🎯
      </h1>

      <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
        {/* Partie Questionnaire */}
        <div className="p-6 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-400 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Réponds à ces quelques questions
          </h2>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-2">Tu es plutôt team :</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {levels.map((level) => (
                <QuizzButton
                  key={level}
                  onClick={() => handleLevelClick(level)}
                  isSelected={selectedLevel === level}
                  className="bg-amber-500 hover:bg-amber-600 text-white"
                >
                  {level}
                </QuizzButton>
              ))}
            </div>
          </div>

          {selectedLevel && (
            <div>
              <h3 className="text-lg font-medium text-white text-center mb-3">Choisis jusqu’à 3 genres</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                {animeGenres.map((genre) => (
                  <QuizzButton
                    key={genre.id}
                    onClick={() => handleGenreClick(genre.name, genre.id)}
                    isSelected={selectedGenres.includes(genre.name)}
                    disabled={
                      !selectedGenres.includes(genre.name) &&
                      selectedGenres.length >= 3
                    }
                    className="bg-teal-500 hover:bg-teal-600 text-white"
                  >
                    {genre.name}
                  </QuizzButton>
                ))}
              </div>
              <p className="text-sm text-white text-center">
                Genres sélectionnés :{" "}
                <span className="font-semibold">{selectedGenres.join(", ") || "aucun"}</span>
              </p>
            </div>
          )}
        </div>

        {/* Partie Recommandations */}
        <div>
          {loading && (
            <div className="text-center text-white text-xl font-semibold">Chargement...</div>
          )}

          {!loading && recommendations.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-white mb-4 text-center">Animes recommandés 💡</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {recommendations.map((anime) => (
                  <Link
                    key={anime.mal_id}
                    to={`/anime/${anime.mal_id}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
                  >
                    <img
                      src={anime.images?.jpg?.image_url}
                      alt={anime.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-amber-600">
                        {anime.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {anime.synopsis?.slice(0, 100)}...
                      </p>
                      <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                        <span>⭐ {anime.score}</span>
                        <span>🎖️ Rang #{anime.rank}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {!loading && selectedLevel && genreId.length > 0 && recommendations.length === 0 && (
            <p className="text-center text-gray-300 font-semibold mt-4">
              Aucun anime trouvé pour cette combinaison de genres.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
