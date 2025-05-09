import { useEffect, useState } from "react";
import { getUpcomingAnimes } from "../API/jikan";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import Loader from "./loader";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../swiper-styles.css";

export default function InfiniteCarousel() {
  const [animes, setAnimes] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const data = await getUpcomingAnimes(25);
        console.log(data);
        
        if (Array.isArray(data)) {
          const unique = data.filter(
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
        return (
        
            <Loader/>
       
    )
    }

  return (
    <div className="w-full px-6 py-10 bg-gray-950">
      <h2 className="text-5xl text-center font-bold text-white mb-6 transition-all duration-200 hover:text-amber-400">Animes à venir</h2>
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
        autoplay={{ delay: 1500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        navigation
        pagination={{ clickable: true }}
        className="w-full max-w-6xl"
      >
        {animes.map(anime => (
          <SwiperSlide key={anime.mal_id} className="bg-gray-800 rounded-lg pb-4 shadow-md max-w-[300px]">
            <img src={anime.images.jpg.image_url} alt={anime.title} className="w-full h-60 object-cover rounded-md mb-2" />
            <h3 className="text-white text-sm font-semibold px-4">{anime.title}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
