export const Button = ({onClick,children}:{onClick:()=>void,children:React.ReactNode}) => {
    return (
    <button onClick={onClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-lg">
        {children}
    </button>
)}