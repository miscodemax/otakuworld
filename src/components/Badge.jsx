

export default function Badge({children, color, onClick}) {

    

    return (
        <button type="button" onClick={onClick} className={color + ' w-16 px-1 py-2 md:w-56 md:px-4 md:py-2 rounded-2xl line-clamp-5 text-sm text-center md:text-lg font-bold hover:opacity-85 hover:text-amber-700 active:scale-90 transition-all duration-300'}>{children}</button>
    )
}