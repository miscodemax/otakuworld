

export default function Badge({children, color, onClick}) {

    

    return (
        <button type="button" onClick={onClick} className={color + ' w-56 px-4 py-2 rounded-2xl text-lg font-bold hover:opacity-85 hover:text-amber-700 active:scale-90 transition-all duration-300'}>{children}</button>
    )
}