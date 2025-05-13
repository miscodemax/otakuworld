import Mangakas from "../components/Mangakas"
import { useState } from "react";
import { Link } from "react-router-dom";
import Shonen from "../components/shonen";
import { Outlet } from "react-router-dom";


export default function Manga() {

    const [visible, setVisible] = useState('');
    const HandleClick = () => setVisible('hidden');


    return (
        <section className="flex-grow grid grid-cols-1 justify-items-center gap-10">
            <Mangakas/>
             <div className="w-full grid justify-items-center py-10 gap-10">
    <div className="flex flex-col justify-center items-center gap-10 w-full bg-gray-900 border-b h-64">
        <h2 className="text-5xl text-center text-gray-500 font-extrabold hover:text-amber-500 transition-all duration-200">Vous preferez quoi comme style d'animé ?</h2>
        <div className="flex gap-10 justify-center text-4xl font-extrabold py-5 w-full">
            <Link to='/manga/shonen' onClick={HandleClick} className="cursor-pointer transition-all duration-200 hover:text-gray-700 hover:underline">Shonen</Link>
            <Link to='/manga/seinen' onClick={HandleClick} className="cursor-pointer transition-all duration-200 hover:text-gray-700 hover:underline">Seinen</Link>
            <Link to='/manga/shojo' onClick={HandleClick} className="cursor-pointer transition-all duration-200 hover:text-gray-700 hover:underline">Shojo</Link>
        </div>
    </div>


      <Shonen visibility={visible} type="manga"/>
      <Outlet />
      </div>
        </section>

    )
}