import { useState } from "react";
import AfficherAnime from "./AfficherAnime";
import { getPopularAnimes } from "../API/jikan";
import { getCurrentSeasonAnimes } from "../API/jikan";



export default function NewTop() {

    const [mode, setMode] = useState(true);

    const newAnime = () => {
        setMode(true)
    }
    const topAnime = () => {
        setMode(false)
    }


    return (
        <div className="container flex flex-col items-center gap-10 py-20">
            <div className="w-full flex gap-10 items-center justify-center">
                <button type="button" onClick={newAnime} className="text-3xl font-bold transition-colors hover:text-amber-300 duration-200 border-b py-4">
                    Nouveautés
                </button>
                <button type="button" onClick={topAnime} className="text-3xl font-bold transition-colors hover:text-amber-300 duration-200 border-b py-4">
                    Top/Classement
                </button>
            </div>
            {mode ? (
                <AfficherAnime fetchingAnime = {() => getCurrentSeasonAnimes(15)}/>
            ) : (
                <AfficherAnime fetchingAnime = {() => getPopularAnimes(15)}/>
            )
            }
        </div>
    )

}