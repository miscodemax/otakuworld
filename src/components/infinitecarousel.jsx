import { useEffect, useState } from "react";
import { getUpcomingAnimes } from "../API/jikan";

// Import Swiper React + modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination"; // Assure-toi que le CSS de Swiper est bien importé
import "../swiper-styles.css"; // Ton fichier CSS personnalisé

export default function InfiniteCarousel() {
    const [animes, setAnimes] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const fetchAnime = async () => {
            const data = await getUpcomingAnimes(25);
            setAnimes(data);
            setLoader(false);
        };

        fetchAnime();
    }, []);

    if (loader) {
        return <div className="text-center text-amber-500 text-3xl margin-56">Chargement...</div>;
    }

    return (
        <div className="w-full px-6 py-10 bg-gray-950">
            <h2 className="text-5xl text-center font-bold text-white mb-6 transition-all duration-200 hover:text-amber-400">Animes à venir</h2>
            <Swiper
                modules={[Navigation, Autoplay, EffectCoverflow, Pagination]} // Ajouter Pagination ici
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
                    clickable: true,  // Permet de cliquer sur les points pour naviguer
                }}
                className="w-full max-w-6xl"
            >
                {Array.isArray(animes) && 
                    animes.map((anime) => (
                        <SwiperSlide
                            key={anime.mal_id}  // Utilise mal_id comme clé unique
                            className="bg-gray-800 rounded-lg pb-4 shadow-md max-w-[300px]"
                        >
                            <img
                                src={anime.images.jpg.image_url}
                                alt={anime.title}
                                className="w-full h-60 object-cover rounded-md mb-2"
                            />
                            <h3 className="text-white text-sm font-semibold px-4">{anime.title}</h3>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}
