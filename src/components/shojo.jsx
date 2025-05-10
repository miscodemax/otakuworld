import AfficherAnime from "./AfficherAnime";
import {getShojo} from '../API/jikan.js'


export default function Shojo() {


    return (
        <AfficherAnime fetchingAnime = {getShojo}/>
    )
}