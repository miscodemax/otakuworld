import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../components/loader"
import Trailer from "../components/trailer"

export default function Animesdetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [anime, setAnime] = useState(null)
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const fetchAnime = async () => {
      const url = 'https://api.jikan.moe/v4/anime/' + id
      try {
        const res = await fetch(url)
        const data = await res.json()
        console.log(data.data)

        setAnime(data.data)
        setLoader(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchAnime()
  }, [id])

  if (loader) {
    return <Loader/>
  }

  return (
    <div className="w-full mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 m-8 bg-gray-800 hover:bg-black rounded hover:text-amber-400"
      >
        ← Retour
      </button>

      <div className="flex w-full flex-col md:flex-row gap-6">
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="w-full md:w-1/3 rounded-2xl shadow py-8 pl-8"
        />
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-2">{anime.title}</h1>
          <p className="text-sm text-gray-800 mb-4 hover:text-amber-400 transition-all duration-200">{anime.title_japanese}</p>
          <h3 className="text-red-800 text-3xl font-extrabold">
            {(anime.rank < 500 || anime.popularity < 500 || anime.score > 7) && 'Un incontournable à ne surtout pas rater !'}
          </h3>
          <p className="mb-4 text-gray-300 font-bold opacity-95 text-justify">{anime.synopsis}</p>
          <ul className="space-y-1">
            <li><strong>Type :</strong> {anime.type}</li>
            <li><strong>Episodes :</strong> {anime.episodes}</li>
            <li><strong>Note moyenne :</strong> {anime.score}</li>
            <li><strong>Statut :</strong> {anime.status}</li>
            <li><strong>Genre :</strong> {anime.genres[0].name}</li>
            <li><strong>Studio d'animation :</strong> {anime.studios[0].name}</li>
            <li><strong>Thèmes :</strong> {anime.themes.map((theme) => (<span className="text-amber-500 font-extrabold"> {theme.name} </span>))}</li>
            <li><strong>Nombre d'épisodes :</strong> {anime.episodes}</li>
            <li><strong className="text-amber-500 font-extrabold">{anime.duration}</strong> par episode</li>
            <li><strong className="text-amber-500 font-extrabold">{anime.favorites}</strong> fans l'ont mis en favoris !</li>
            <li><strong>Diffusion hebdo :</strong> <span className="text-amber-500 font-extrabold">{anime.broadcast.string}</span></li>
            <li><strong className="text-red-500 font-bold">{anime.rating}</strong></li>
          </ul>
          

        </div>
      </div>
      <div className="h-32 w-full flex items-center justify-center bg-gray-950 mt-12">
        <h3 className="text-5xl font-extrabold text-center text-gray-400 hover:text-amber-400">Regarder le trailer</h3>
      </div>
      <Trailer url={anime.trailer.embed_url}/>
    </div>
  )
}
