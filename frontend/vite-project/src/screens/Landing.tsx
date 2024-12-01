import { useNavigate } from "react-router";

export const Landing = () => {
    const navigate=useNavigate();
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="mt-2"> 
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex justify-center">
                        <img src={"/Chessboard.jpeg"} alt="Chessboard" className="w-64 h-64 md:w-96 md:h-96" />
                    </div>
                    <div className=" ml-7 flex flex-col justify-center items-center">
                        <h1 className="text-4xl font-bold mb-6">Ready for a checkMate!!</h1>
                        <button onClick={()=>navigate("/game")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-lg">
                            Let's play
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}