import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

const pieceImages: { [key: string]: string } = {
    'wp': '/pieces/wp.png',
    'wr': '/pieces/wr.png',
    'wn': '/pieces/wn.png',
    'wb': '/pieces/wb.png',
    'wq': '/pieces/wq.png',
    'wk': '/pieces/wk.png',
    'bp': '/pieces/bp.png',
    'br': '/pieces/br.png',
    'bn': '/pieces/bn.png',
    'bb': '/pieces/bb.png',
    'bq': '/pieces/bq.png',
    'bk': '/pieces/bk.png',
};

export const MOVE = 'move';

export const Chessboard = ({ chess,setBoard,board, socket }: 
    {
        chess:Chess;
        setBoard:any;
         board: () => (
            { square: Square; 
                type: PieceSymbol; 
                color: Color; } | null)[][]; 
                socket: WebSocket; }) => 
            {
    const [from, setFrom] = useState<null | Square>(null);
    const [to, setTo] = useState<null | Square>(null);

    return (
        <div className="grid grid-cols-8 gap-0.5">
            {board().map((row, i) => (
                row.map((square, j) => {
                    const squareRepresentation=String.fromCharCode(97+(j%8))+""+(8-Math.floor(i)) as Square;
                    const isDarkSquare = (i + j) % 2 === 1;
                    const squareColor = isDarkSquare ? 'bg-gray-700' : 'bg-gray-300';
                    const piece = square ? pieceImages[`${square.color}${square.type}`] : null;

                    return (
                        <div
                            key={`${i}-${j}`}
                            className={`w-16 h-16 flex justify-center items-center ${squareColor}`}
                            onClick={() => 
                            {
                                if(!from)
                                {
                                    setFrom(squareRepresentation);
                                }
                                else
                                {
                                    socket.send(JSON.stringify({
                                        type: MOVE,
                                        payload: {
                                            move: {
                                            from,
                                            to: squareRepresentation
                                        }
                                    }}));
                                }
                                if(from)
                                {
                                    setFrom(null);
                                }

                                if (from) {
                                    chess.move({
                                        from,
                                        to: squareRepresentation
                                    });
                                }
                                setBoard(chess.board());
                                console.log({
                                    from,
                                    to: squareRepresentation
                                })

                            }
                            }
                        >
                            {piece && <img src={piece} alt={`${square?.color}${square?.type}`} className="w-12 h-12" />}
                        </div>
                    );
                })
            ))}
        </div>
    );
};