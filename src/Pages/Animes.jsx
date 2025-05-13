import Topseiyus from "../components/Seiyuscarousel";
import { Link, Outlet } from "react-router-dom";
import Shonen from "../components/shonen";
import { useState } from "react";
import Badge from "../components/Badge";
import Genres from "../components/PageGenre";
import CarouselSuggestion from "../components/CarouselSuggestion";

export default function Animes() {
const genresAnime = [
  { name: '🔥 Action', id: 1, color: 'bg-red-600' },
  { name: '🗺️ Aventure', id: 2, color: 'bg-orange-500' },
  { name: '😂 Comédie', id: 4, color: 'bg-yellow-400' },
  { name: '🎭 Drame', id: 8, color: 'bg-rose-600' },
  { name: '🧚‍♂️ Fantaisie', id: 10, color: 'bg-purple-500' },
  { name: '👻 Horreur', id: 14, color: 'bg-gray-700' },
  { name: '💘 Romance', id: 22, color: 'bg-pink-500' },
  { name: '🛸 Science-Fiction', id: 24, color: 'bg-cyan-500' },
  { name: '🏅 Sport', id: 30, color: 'bg-green-500' },
  { name: '✨ Surnaturel', id: 37, color: 'bg-indigo-400' },
  { name: '🧠 Psychologie', id: 40, color: 'bg-blue-700' },
  { name: '🔪 Thriller', id: 41, color: 'bg-black' }
];


const themesAnime = [
  { name: '👬 Amitié', id: 17, color: 'bg-green-400' },
  { name: '💔 Amour non réciproque', id: 18, color: 'bg-rose-400' },
  { name: '🔺 Triangle amoureux', id: 19, color: 'bg-pink-500' },
  { name: '⚔️ Rivalité', id: 20, color: 'bg-red-500' },
  { name: '⏳ Voyage dans le temps', id: 21, color: 'bg-amber-500' },
  { name: '🧠 Mémoire perdue', id: 22, color: 'bg-blue-400' },
  { name: '🕊️ Rédemption', id: 23, color: 'bg-teal-500' },
  { name: '🎯 Vengeance', id: 24, color: 'bg-red-700' },
  { name: '🕵️‍♂️ Identité secrète', id: 25, color: 'bg-gray-600' },
  { name: '🌀 Transformation', id: 26, color: 'bg-indigo-500' },
  { name: '⚡ Pouvoirs cachés', id: 27, color: 'bg-purple-600' },
  { name: '🌌 Monde parallèle', id: 28, color: 'bg-violet-500' },
  { name: '🔫 Survie', id: 29, color: 'bg-gray-700' },
  { name: '🏆 Compétition', id: 30, color: 'bg-yellow-500' },
  { name: '🔍 Enquête', id: 31, color: 'bg-blue-500' },
  { name: '💼 Crime organisé', id: 32, color: 'bg-slate-600' },
  { name: '⚔️ Guerre', id: 33, color: 'bg-red-800' },
  { name: '🚩 Rébellion', id: 34, color: 'bg-rose-600' },
  { name: '🙏 Sacrifice', id: 35, color: 'bg-amber-400' },
  { name: '🧨 Trahison', id: 36, color: 'bg-red-600' },
  { name: '🌀 Destin', id: 37, color: 'bg-indigo-300' },
  { name: '🕊️ Liberté', id: 38, color: 'bg-teal-400' },
  { name: '⚖️ Justice', id: 39, color: 'bg-emerald-500' },
  { name: '💣 Corruption', id: 40, color: 'bg-gray-700' },
  { name: '🏛️ Pouvoir politique', id: 41, color: 'bg-yellow-700' },
  { name: '🤖 Technologie avancée', id: 42, color: 'bg-blue-400' },
  { name: '🧠 Intelligence artificielle', id: 43, color: 'bg-fuchsia-500' },
  { name: '🔬 Expériences scientifiques', id: 44, color: 'bg-sky-500' },
  { name: '🧬 Mutation', id: 45, color: 'bg-lime-500' },
  { name: '🌪️ Catastrophe naturelle', id: 46, color: 'bg-cyan-700' },
  { name: '☠️ Apocalypse', id: 47, color: 'bg-black' },
  { name: '🛡️ Résistance', id: 48, color: 'bg-amber-600' },
  { name: '🪐 Colonisation', id: 49, color: 'bg-purple-400' },
  { name: '🚀 Exploration spatiale', id: 50, color: 'bg-sky-600' }
];


  const [mode, setMode] = useState(true);
  const [visible, setVisible] = useState('');
  const [id, setId] = useState('1');

  const HandleClick = () => setVisible('hidden');
  const genreClick = (genreId) => setId(genreId);
  const dataArray = mode ? genresAnime : themesAnime;

  return (
    <section className="flex-grow grid grid-cols-1 justify-items-center gap-32 pt-5">
      <Topseiyus />
    <div className="w-full grid justify-items-center py-10 gap-10">
    <div className="flex flex-col justify-center items-center gap-10 w-full bg-gray-900 border-b h-64">
        <h2 className="text-5xl text-center text-gray-500 font-extrabold hover:text-amber-500 transition-all duration-200">Vous preferez quoi comme style d'animé ?</h2>
        <div className="flex gap-10 justify-center text-4xl font-extrabold py-5 w-full">
            <Link to='/animes/shonen' onClick={HandleClick} className="cursor-pointer transition-all duration-200 hover:text-gray-700 hover:underline">Shonen</Link>
            <Link to='/animes/seinen' onClick={HandleClick} className="cursor-pointer transition-all duration-200 hover:text-gray-700 hover:underline">Seinen</Link>
            <Link to='/animes/shojo' onClick={HandleClick} className="cursor-pointer transition-all duration-200 hover:text-gray-700 hover:underline">Shojo</Link>
        </div>
    </div>


      <Shonen visibility={visible} />
      <Outlet />
    </div>

      <div className="w-full grid justify-items-center py-10 gap-10">
      <div className="w-full bg-gray-950 border-b py-10 flex flex-col items-center justify-center gap-8 sm:gap-10 md:gap-14 px-4">
  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center text-gray-500 font-extrabold hover:text-amber-500 transition-all duration-200">
    Choisissez parmi vos genres et thèmes préférés !
  </h2>

  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-10 items-center justify-center">
    <button
      onClick={() => setMode(true)}
      className={`text-xl sm:text-2xl md:text-3xl font-bold cursor-pointer transition-all duration-200 
      ${mode ? 'text-amber-500 underline underline-offset-4' : 'text-white hover:text-gray-700'}`}
    >
      GENRES
    </button>

    <button
      onClick={() => setMode(false)}
      className={`text-xl sm:text-2xl md:text-3xl font-bold cursor-pointer transition-all duration-200 
      ${!mode ? 'text-amber-500 underline underline-offset-4' : 'text-white hover:text-gray-700'}`}
    >
      THÈMES
    </button>
  </div>
</div>

      <div className={`grid ${mode ? 'grid-cols-4' : 'grid-cols-5'} gap-5 pt-5 justify-items-center`}>
        {dataArray.map(({ name, id, color }) => (
            <Badge key={id} onClick={() => genreClick(id)} color={color}>
                {name}
            </Badge>
            ))}

      </div>

      <Genres genreId={id} Mode="genres" />
      </div>

      <CarouselSuggestion/>

    </section>
  );
}
