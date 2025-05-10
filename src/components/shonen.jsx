
import { getShonen } from "../API/jikan"
import AfficherAnime from "./AfficherAnime"


export default function Shonen({visibility}) {


    return (
        <div className={visibility}>
            <AfficherAnime fetchingAnime = {getShonen}/>
        </div>

        )
}