import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import Loader from "../components/loader"
import Trailer from "../components/trailer"

export default function Animesdetails({ type = 'anime' }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [item, setItem] = useState(null)
  const [loader, setLoader] = useState(true)
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/${type}/${id}`)
        const data = await res.json()
        setItem(data.data)
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error)
      } finally {
        setLoader(false)
      }
    }

    fetchData()
  }, [id, type])

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/${type}/${id}/recommendations`)
        const data = await res.json()
        setRecommendations(data.data || [])
      } catch (error) {
        console.error("Erreur lors de la récupération des recommandations :", error)
      }
    }

    fetchRecommendations()
  }, [id, type])

  if (loader) return <Loader />
  if (!item) return <p className="text-center text-red-500 mt-10">Aucune donnée disponible</p>

  const isAnime = type === 'anime'

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
          src={item.images?.jpg?.large_image_url}
          alt={item.title}
          className="w-full md:w-1/3 rounded-2xl shadow py-8 pl-8"
        />

        <div className="p-8">
          <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
          <p className="text-sm text-gray-800 mb-4 hover:text-amber-400 transition-all duration-200">
            {item.title_japanese}
          </p>

          {(item.rank < 500 || item.popularity < 500 || item.score > 7) && (
            <h3 className="text-red-800 text-3xl font-extrabold">
              Un incontournable à ne surtout pas rater !
            </h3>
          )}

          <p className="mb-4 text-gray-300 font-bold opacity-95 text-justify">{item.synopsis}</p>

          <ul className="space-y-1">
            <li><strong>Type :</strong> {item.type}</li>
            {isAnime ? (
              <>
                <li><strong>Épisodes :</strong> {item.episodes || "?"}</li>
                <li><strong>Durée :</strong> <span className="text-amber-500 font-extrabold">{item.duration}</span></li>
                <li><strong>Studio d'animation :</strong> {item.studios?.[0]?.name || "Inconnu"}</li>
                <li><strong>Diffusion :</strong> <span className="text-amber-500 font-extrabold">{item.broadcast?.string || "?"}</span></li>
                <li><strong className="text-red-500 font-bold">{item.rating}</strong></li>
              </>
            ) : (
              <>
                <li><strong>Chapitres :</strong> {item.chapters || "?"}</li>
                <li><strong>Volumes :</strong> {item.volumes || "?"}</li>
                <li><strong>Magazine :</strong> {item.serializations?.[0]?.name || "?"}</li>
                <li><strong>Publication :</strong> {item.published?.string || "?"}</li>
              </>
            )}
            <li><strong>Note moyenne :</strong> {item.score || "Non noté"}</li>
            <li><strong>Statut :</strong> {item.status}</li>
            <li><strong>Genre :</strong> {item.genres?.[0]?.name || "Inconnu"}</li>
            <li>
              <strong>Thèmes :</strong>{" "}
              {item.themes?.map((theme) => (
                <span key={theme.mal_id} className="text-amber-500 font-extrabold"> {theme.name} </span>
              ))}
            </li>
            <li><strong>Favoris :</strong> <span className="text-amber-500 font-extrabold">{item.favorites}</span> fans</li>
          </ul>
        </div>
      </div>

      {isAnime && item.trailer?.embed_url && (
        <>
          <div className="h-32 w-full flex items-center justify-center bg-gray-950 mt-12">
            <h3 className="text-5xl font-extrabold text-center text-gray-400 hover:text-amber-400">
              Regarder le trailer
            </h3>
          </div>
          <Trailer url={item.trailer.embed_url} />
        </>
      )}

      {/* SECTION RECOMMANDATIONS */}
      {/* SECTION RECOMMANDATIONS */}
{recommendations.length > 0 && (
  <div className="mt-16 p-4">
    <h2 className="text-5xl font-bold mb-10 text-amber-400 text-center">Recommandations similaires</h2>
    <div className="grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center">
      {recommendations.slice(0, 8).map((rec) => (
        <Link
          to={`/${type}details/${rec.entry.mal_id}`}
          key={rec.entry.mal_id}
          className="relative group overflow-hidden rounded-lg shadow-lg"
        >
          <img
            src={rec.entry.images?.jpg?.image_url}
            alt={rec.entry.title}
            className="size-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
          />

          {/* Overlay avec synopsis */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm
           opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <p className="text-sm text-gray-300 line-clamp-5 mb-2 text-center">
              {rec.entry.synopsis || "Cliquer pour voir details !"}
            </p>
            <p className="text-center text-amber-400 font-semibold mt-2">
              {rec.entry.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </div>
)}

    </div>
  )
}
