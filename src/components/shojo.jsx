import AfficherAnime from "./AfficherAnime";
import {getShojo} from '../API/jikan.js'


export default function Shojo({type='anime'}) {


    return (
        <AfficherAnime fetchingAnime = {getShojo} type={type}/>
    )
}