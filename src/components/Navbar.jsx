import { useState, useEffect } from "react";

export default function Navbar() {

    const [liens, setLiens] = useState([])

    useEffect(() => {
        setLiens(['Accueil', 'Animes', 'Mangas', 'Series']);
    }, []);




    return (
        <nav className="bg-gray-900 text-white py-4 shadow-md">
            <div className="container mx-auto px-6 flex items-center justify-between">
                <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                    <a href="/" className="hover:text-yellow-400 transition-colors duration-300">Otakuworld</a>
                </div>
                <ul className="flex space-x-6">
                    {liens.map((lien) => (
                        <li key={lien}>
                            <a href="" 
                            className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium">
                                {lien}
                                </a>
                            
                            </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}