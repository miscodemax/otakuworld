
import Topseiyus from "../components/Seiyuscarousel"
import { Link, Outlet } from "react-router-dom"
import Shonen from "../components/shonen"
import { useState } from "react"

export default function Animes() {

    const [visible, setVisible] = useState('')

    const HandleClick = () => {
        setVisible('hidden');
    }

    return (
        <section className="flex-grow grid grid-cols-1 justify-items-center gap-10 pt-5">
            <Topseiyus/>
            <div className="flex gap-10 justify-center text-3xl font-extrabold py-5 border-b w-full">
            <Link to='/animes/shonen' onClick={HandleClick} className="hover:text-amber-400 transition-all duration-200">Shonen</Link>
            <Link to='/animes/seinen' onClick={HandleClick} className="hover:text-amber-400 transition-all duration-200">Seinen</Link>
            <Link to='/animes/shojo' onClick={HandleClick} className="hover:text-amber-400 transition-all duration-200">Shojo</Link>
            </div>
            <Shonen visibility={visible}/>
            <Outlet/>
           
        </section>
    )
}