

import { useEffect, useState } from "react";
import { getSeiyus } from "../API/jikan";
import Loader from "./loader";

// Import Swiper React + modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination"; // Assure-toi que le CSS de Swiper est bien importé
import "../swiper-styles.css"; // Ton fichier CSS personnalisé

export default function Topseiyus() {
const [characters, setCharacters] = useState([]);
const [loader, setLoader] = useState(true);


// Fonction pour récupérer les personnages populaires
useEffect(() => {
const fetchCharacters = async () => {
    try {
        const data = await getSeiyus(15, 3);
        console.log(data);
        

        // Vérifie si data est un tableau valide
        if (Array.isArray(data)) {
          const unique = data.filter(
        (anime, index, self) =>
          anime.mal_id && index === self.findIndex(a => a.mal_id === anime.mal_id)
      );
      setCharacters(unique);
    } else {
      console.warn("Les données ne sont pas un tableau :", data);
      setCharacters([]);
    }
  } catch (err) {
    console.error("Erreur lors du fetch :", err);
    setCharacters([]);
  } finally {
    setLoader(false);
  }

};


    fetchCharacters();
}, []); // Se lance au premier rendu du composant

if (loader) {
    return (

        <Loader/>
    
)
}


return (
    <div className="w-full px-6 py-10 bg-gray-950">
        <h2 className="text-5xl text-center font-bold text-white mb-6 transition-all duration-200 hover:text-amber-400">
            Les goats derriéres vos persos préférés !
        </h2>
        <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow, Pagination]}
            effect="coverflow"
            loop={true}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            speed={1000}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 300,
                modifier: 1.5,
                slideShadows: true,
            }}
            autoplay={{ delay: 1500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation
            pagination={{
                clickable: true,
            }}
            className="w-full max-w-6xl"
        >
            {characters.map((character) => (
                <SwiperSlide
                    key={character.mal_id + character.name} // Utilisation de `mal_id` et `name` pour garantir une clé unique
                    className="bg-gray-900 rounded-2xl shadow-lg max-w-[250px] flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105"
                >
                    <img
                        src={character.images.jpg.image_url}
                        alt={character.name}
                        className="w-full h-64 object-cover"
                    />
                    <div className="p-4 flex flex-col flex-grow justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-amber-400 mb-1 text-center">{character.name}</h3>
                            <p className="text-sm text-gray-300 italic text-center">
                                {character.personnage?.toLocaleString() || "Aucun surnom"} 
                            </p>
                            <p className="text-sm text-gray-300 italic text-center">
                                {character.langue === 'Japanese' ? 'Japonais' : character.langue === 'English'? 'Anglais': character.langue === 'French'? 'Français': 'france'}
                            </p>
                        </div>
                        <div className="mt-4 text-xs text-gray-400 text-center">
                            <p><span className="text-white font-medium">Anime :</span> {character[0]?.anime[0].title || "Inconnu"}</p>
                            <p><span className="text-white font-medium">Favoris :</span> {character.favoris?.toLocaleString() || 0}</p>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
);


}
