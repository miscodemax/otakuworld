
import { getShonen } from "../API/jikan"
import AfficherAnime from "./AfficherAnime"


export default function Shonen({visibility, type='anime'}) {


    return (
        <div className={visibility}>
            <AfficherAnime fetchingAnime = {getShonen} type={type}/>
        </div>

        )
}