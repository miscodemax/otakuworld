import { useEffect, useState } from "react";
import { getPopularMangakas } from "../API/jikan";
import Loader from "./loader";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

// Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../swiper-styles.css";

export default function Mangakas() {
  const [mangakas, setMangakas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupération des mangakas populaires
  useEffect(() => {
    const fetchMangakas = async () => {
      try {
        const data = await getPopularMangakas(25, 1);
        if (Array.isArray(data)) {
          const unique = data.filter(
            (item, index, self) =>
              item.mal_id && index === self.findIndex(a => a.mal_id === item.mal_id)
          );
          setMangakas(unique);
        } else {
          console.warn("Données non valides :", data);
          setMangakas([]);
        }
      } catch (err) {
        console.error("Erreur lors du fetch des mangakas :", err);
        setMangakas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMangakas();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="w-full px-4 py-12 bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 transition-all duration-300 hover:text-amber-400">
        Les <span className="text-red-600 font-extrabold">virtuoses</span> derrière vos <span className="text-red-600 font-extrabold">mangas</span> préférés
      </h2>

      <Swiper
        modules={[Navigation, Autoplay, EffectCoverflow, Pagination]}
        effect="coverflow"
        grabCursor
        centeredSlides
        loop={mangakas.length > 3}
        slidesPerView="auto"
        speed={800}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 200,
          modifier: 2,
          slideShadows: true,
        }}
        autoplay={{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        navigation
        pagination={{ clickable: true }}
        className="max-w-6xl mx-auto"
      >
        {mangakas.map((mangaka) => (
          <SwiperSlide
            key={mangaka.mal_id}
            className="bg-gray-800 rounded-2xl shadow-xl max-w-xs flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <img
              src={mangaka.images?.jpg?.image_url}
              alt={mangaka.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow justify-between">
              <h3 className="text-xl font-semibold text-center text-amber-400">{mangaka.name}</h3>
              <p className="text-sm text-gray-300 mt-2 text-center line-clamp-3">
                {mangaka.about ? mangaka.about.slice(0, 120) + "..." : "Description indisponible."}
              </p>
              <button
                className="mt-4 bg-amber-500 text-white font-medium py-2 px-4 rounded-xl hover:bg-amber-600 transition-all"
                onClick={() => window.open(`https://myanimelist.net/people/${mangaka.mal_id}`, "_blank")}
              >
                Voir plus
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
