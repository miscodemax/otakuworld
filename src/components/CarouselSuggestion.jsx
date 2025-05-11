import { useEffect, useState } from "react";
import { getSuggestionAnime } from "../API/jikan";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import Loader from "./loader";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../swiper-styles.css";

export default function CarouselSuggestion() {
  const [animes, setAnimes] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const data = await getSuggestionAnime();
        console.log(data[0]);

        if (Array.isArray(data[0])) {
          const unique = data[0].filter(
            (anime, index, self) =>
              anime.mal_id && index === self.findIndex(a => a.mal_id === anime.mal_id)
          );
          setAnimes(unique);
        } else {
          console.warn("Les données ne sont pas un tableau :", data);
          setAnimes([]);
        }
      } catch (err) {
        console.error("Erreur lors du fetch :", err);
        setAnimes([]);
      } finally {
        setLoader(false);
      }
    };

    fetchAnime();
  }, []);

  if (loader) {
    return <Loader />;
  }

  if (!loader && animes.length === 0) {
    return (
      <div className="text-center text-white py-10">
        <p>Aucun anime à venir n’a été trouvé pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-6 py-10 bg-gray-950">
      <h2 className="text-3xl md:text-4xl lg:text-5xl text-center font-bold text-white mb-6 transition-all duration-200 hover:text-amber-400">
        Les <span className="text-red-500 font-extrabold">Incontournables</span> à <span className="text-red-500 font-extrabold">Absolument</span> Regarder !
      </h2>
      <Swiper
        modules={[Navigation, Autoplay, EffectCoverflow, Pagination]}
        effect="coverflow"
        loop={animes.length > 3}
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
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          320: {
            coverflowEffect: { depth: 100, rotate: 30 },
          },
          768: {
            coverflowEffect: { depth: 200, rotate: 40 },
          },
          1024: {
            coverflowEffect: { depth: 300, rotate: 50 },
          },
        }}
        className="w-full max-w-6xl"
      >
        {animes
          .filter(anime => anime.rank && anime.rank > 7)
          .map(anime => (
            <SwiperSlide
              key={anime.mal_id}
              className="bg-gray-800 rounded-xl shadow-lg p-4 max-w-[280px] hover:scale-105 transition-transform duration-300"
            >
              <div className="relative">
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="w-full h-60 object-cover rounded-lg"
                />
                <span className="absolute top-2 left-2 bg-amber-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                  #{anime.rank}
                </span>
              </div>
              <h3 className="text-white text-base font-semibold mt-3 text-center">{anime.title}</h3>
              <p className="text-sm text-amber-400 text-center">{anime.studios[0]?.name || "inconnu"}</p>
              <p className="text-xs text-gray-400 text-center">{anime.aired?.string || "inconnu"}</p>
              <p className="text-xs text-red-400 text-center">{anime.rating}</p>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
