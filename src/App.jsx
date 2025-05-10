import { Routes, Route } from 'react-router-dom';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./Pages/home.jsx";
import Animes from './Pages/Animes.jsx';
import Animesdetails from './Pages/details.jsx';
import Manga from './Pages/manga.jsx';
import Series from './Pages/series.jsx';
import { motion } from 'framer-motion';
import Shonen from './components/shonen.jsx';
import Shojo from './components/shojo.jsx';
import Seinen from './components/seinen.jsx';

function App() {
  return (
    <motion.main className="pt-20 min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/manga' element={<Manga />} />
        <Route path='/series' element={<Series />} />
        <Route path='/animesdetails/:id' element={<Animesdetails />} />
        
        {/* 👇 Route imbriquée pour Animes */}
        <Route path='/animes' element={<Animes />}>
          <Route path='shonen' element={<Shonen />} />
          <Route path='seinen' element={<Seinen />} />
          <Route path='shojo' element={<Shojo />} />

        </Route>
      </Routes>
      <Footer />
    </motion.main>
  );
}

export default App;
