import { getSeinen } from "../API/jikan"
import AfficherAnime from "./AfficherAnime"

export default function Seinen() {


    return (
            <AfficherAnime fetchingAnime = {getSeinen}/>
        )
}