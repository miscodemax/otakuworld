import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import InfiniteCarousel from "./components/infinitecarousel"
import NewTop from "./components/New-top"
import TopCharacters from "./components/characters"
function App() {


  return (
    <>
      <main className="min-h-screen flex flex-col overflow-x-hidden justify-between bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
        <Navbar/>
        <section className="flex-grow grid justify-items-center">
          <InfiniteCarousel/>
          <NewTop/>
          <TopCharacters/>
        </section>
        <Footer/>
      </main>
    </>
  )
}

export default App
