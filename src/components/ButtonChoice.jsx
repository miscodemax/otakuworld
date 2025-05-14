

export default function QuizzButton({ children, onClick, disabled, isSelected }) {

    
  return (
    <button
    onClick={onClick}
    disabled={disabled}
      className= {'w-full text-left px-5 py-3 rounded-xl font-medium text-lg transition-transform duration-200 border focus:outline-none focus:ring-offset-cyan-200' + (isSelected && ' bg-gray-950 text-white ring-amber-400 ring-2')}
    
    >
      {children}
    </button>
  );
}
