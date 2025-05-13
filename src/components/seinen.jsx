import { getSeinen } from "../API/jikan"
import AfficherAnime from "./AfficherAnime"

export default function Seinen({type='anime'}) {


    return (
            <AfficherAnime fetchingAnime = {getSeinen} type={type}/>
        )
}