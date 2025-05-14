import { useEffect, useState } from "react";
import QuizzButton from "./ButtonChoice";

export default function Questions() {
  const levels = [
    "Shonen (animes pour jeunes garçons)",
    "Seinen (animes pour jeunes adultes)",
    "Shojo (animes pour jeunes filles)",
  ];

  const animeGenres = [
    { id: 1, name: "Action" },
    { id: 2, name: "Adventure" },
    { id: 3, name: "Cars" },
    { id: 4, name: "Comedy" },
    { id: 5, name: "Dementia" },
    { id: 6, name: "Demons" },
    { id: 7, name: "Mystery" },
    { id: 8, name: "Drama" },
    { id: 9, name: "Ecchi" },
    { id: 10, name: "Fantasy" },
    { id: 11, name: "Game" },
    { id: 13, name: "Historical" },
    { id: 14, name: "Horror" },
    { id: 16, name: "Magic" },
    { id: 17, name: "Martial Arts" },
    { id: 18, name: "Mecha" },
    { id: 19, name: "Music" },
    { id: 20, name: "Parody" },
    { id: 21, name: "Samurai" },
    { id: 22, name: "Romance" },
    { id: 23, name: "School" },
    { id: 24, name: "Sci-Fi" },
    { id: 25, name: "Shoujo" },
    { id: 29, name: "Space" },
    { id: 30, name: "Sports" },
    { id: 31, name: "Super Power" },
    { id: 32, name: "Vampire" },
    { id: 33, name: "Yaoi" },
    { id: 34, name: "Yuri" },
    { id: 35, name: "Harem" },
    { id: 36, name: "Slice of Life" },
    { id: 37, name: "Supernatural" },
    { id: 38, name: "Military" },
    { id: 39, name: "Police" },
    { id: 40, name: "Psychological" },
    { id: 41, name: "Thriller" },
    { id: 43, name: "Josei" },
  ];

  const [selectedLevel, setSelectedLevel] = useState("");
  const [genreDisabled, setGenreDisabled] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleLevelClick = (level) => {
  setSelectedLevel(level);
  // Pas besoin de toucher à selectedGenres ici
};

   const handleGenreClick = (genre) => {
    if (genreDisabled) return;

    // toggle genre selection
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );

    if (selectedGenres.length > 4) {
      setGenreDisabled(true)
      setSelectedGenres((prev) => [...prev, selectedLevel.slice(0, 6)])
    }
       
  };
   console.log(selectedGenres);

  useEffect(() => [
    const fetchgenres = async () => {

    }
  ])
 

  return (
    
    <div className="p-8 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center transition-all duration-100 hover:text-amber-400">
        Veuillez répondre à ces questions
      </h2>

      <div className="grid grid-cols-1 justify-items-center gap-12 pt-7">
        {/* Question 1 : Niveau */}
        <div className="flex flex-col gap-5 pt-10">
          <h2>
            D’après <span className="font-semibold text-amber-400">vous</span>, vous êtes <span className="font-semibold text-amber-400">otaku</span> à quel point ?
          </h2>
          {levels.map((level) => (
            <QuizzButton
              key={level}
              onClick={() => handleLevelClick(level)}
              isSelected={selectedLevel === level}
            >
              {level}
            </QuizzButton>
          ))}
        </div>

        {/* Question 2 : Genres */}
        {selectedLevel && (
          <div className="flex flex-col gap-5 pt-10 w-full">
            <h2 className="text-center">
              Quels genres vous intéressent le plus ?
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {animeGenres.map((genre) => (
                <QuizzButton
                  key={genre.id}
                  onClick={() => handleGenreClick(genre.name)}
                  isSelected={selectedGenres.includes(genre.name)}
                  disabled={genreDisabled}
                >
                  {genre.name}
                </QuizzButton>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    <div className="p-8 w-2/5">
                    <h2 className="text-2xl font-bold text-center transition-all duration-100 hover:text-amber-400">Voici nos recommendations</h2>
                </div>
  );
}
