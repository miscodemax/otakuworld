import { useState, useEffect } from "react";
export default function Footer() {


    const [liens, setLiens] = useState([])
    
    useEffect(() => {
        setLiens(['Accueil', 'Animes', 'Mangas', 'Series']);
    }, []);
    

    return (
        // components/Footer.jsx

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 justify-items-center gap-8 text-sm">
          
          {/* Logo et description */}
          <div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
              Otakuworld
            </h2>
            <p className="mt-2 text-gray-400">
              Site de recommandation d’animes, mangas et séries pour les vrais passionnés de culture japonaise.
            </p>
          </div>
  
          {/* Liens utiles */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Liens utiles</h3>
            <ul className="space-y-1">
                {liens.map((lien) => (
                    <li key={lien}><a href="/series" className="hover:text-yellow-400">{lien}</a></li>
                ))}
              
            </ul>
          </div>
  
          {/* Réseaux sociaux */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Suivez-nous</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-yellow-400">Instagram</a></li>
              <li><a href="#" className="hover:text-yellow-400">X (Twitter)</a></li>
              <li><a href="#" className="hover:text-yellow-400">Discord</a></li>
            </ul>
          </div>
  
        </div>
  
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Otakuworld. Tous droits réservés.
        </div>
      </footer>
    
  
  

       
    )
}