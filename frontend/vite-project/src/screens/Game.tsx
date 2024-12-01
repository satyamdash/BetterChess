import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Chessboard } from "../components/Chessboard"
import { UseSocket } from "../hooks/UseSocket"
import { Chess } from "chess.js";

export const INIT_GAME = 'init_game';
export const JOIN = 'join';
export const MOVE = 'move';
export const GAME_OVER='game_over';


export const Game = () => {
    const socket = UseSocket();
    const [chess,setChess] = useState(new Chess());
    const [board,setBoard] = useState(() => chess.board());
    useEffect(()=>
    {
        if(socket === null)
        {
            return;
        }
        socket.onmessage = (event) => 
        {
            const message = JSON.parse(event.data);
            console.log(message);
            switch(message.type)
            {
                case INIT_GAME:
                    setChess(new Chess());
                    setBoard(chess.board());
                    console.log("Game initialized");
                    break;
                case JOIN:
                    console.log("Player joined");
                    break;
                case MOVE:
                    const move = message.payload;
                    chess.move({from: move.from, to: move.to});
                    setBoard(chess.board());
                    console.log("Player moved");
                    break;
                case GAME_OVER:
                    console.log("Game over");
                    break;
            }
        }
    },[socket])

        if(socket === null)
        {
            return <div>Connecting...</div>
        }
    return (
        <div className="justify-center flex">
            <div className="pt-8 max-w-screen-lg">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <div className="grid-cols-span-4 bg-black-300">
                        <Chessboard board={() => board}/>
                    </div>
                        <Button onClick={()=>
                            {
                                socket.send(JSON.stringify(
                                    {
                                        type:INIT_GAME
                                    }
                                ))
                            }
                        }>
                        Play
                        </Button>
                </div>
 
            </div>

        </div>
    )   
}
