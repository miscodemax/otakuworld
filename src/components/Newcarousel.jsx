import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import { getNewsFromStudioAnimes } from '../API/jikan';

const NewsCarousel = () => {
  const studios = [
    [11, 'MAPPA'],
    [2, 'KYOTO ANIMATION'],
    [4, 'BONES'],
    [44, 'A-1 PICTURES'],
  ];

  const [studioIndex, setStudioIndex] = useState(0);
  const [news, setNews] = useState([]);

  // Fetch news every time studioIndex changes
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const [studioId] = studios[studioIndex];
        const fetchingNews = await getNewsFromStudioAnimes(studioId, 5, 3);
        setNews(fetchingNews);
      } catch (error) {
        console.error('Erreur lors de la récupération des news :', error);
      }
    };

    fetchNews();
  }, [studioIndex]); // ✅ la dépendance ici est studioIndex

  // Interval pour changer de studio automatiquement
  useEffect(() => {
    const interval = setInterval(() => {
      setStudioIndex((prevIndex) => (prevIndex + 1) % studios.length);
    }, 30000); // toutes les 30 secondes

    return () => clearInterval(interval); // nettoyage à la fin
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-2">
      <h2 className="text-center text-6xl font-extrabold text-green-900 hover:text-amber-500 transition-all duration-200 pb-2">
        {studios[studioIndex][1]} NEWS
      </h2>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 5000 }}
      >
        {news.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col md:flex-row items-center h-full bg-gray-800 rounded-lg p-1 shadow-lg max-w-4xl mx-auto">
              <img
                src={item.image}
                alt={item.title}
                className="w-full md:w-1/3 h-48 object-cover rounded hover:scale-105 overflow-hidden transition-all duration-200"
              />
              <div className="md:ml-4 mt-2 md:mt-0">
                <h3 className="text-2xl font-bold hover:text-amber-500 transition-all duration-200">
                  {item.title}
                </h3>
                <p className="text-lg text-gray-500 mt-1 line-clamp-3 hover:text-amber-500 transition-all duration-200">
                  {item.excerpt}
                </p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-shadow-white hover:text-amber-500 text-lg mt-2 inline-block transition-all duration-300"
                >
                  Lire plus
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewsCarousel;
