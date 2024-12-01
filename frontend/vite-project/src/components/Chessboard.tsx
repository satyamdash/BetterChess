import { Color, PieceSymbol, Square } from "chess.js";

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

export const Chessboard = ({ board }: { board: () => ({ square: Square; type: PieceSymbol; color: Color; } | null)[][]; }) => {
    return (
        <div className="grid grid-cols-8 gap-0.5">
            {board().map((row, rowIndex) => (
                row.map((square, squareIndex) => {
                    const isDarkSquare = (rowIndex + squareIndex) % 2 === 1;
                    const squareColor = isDarkSquare ? 'bg-gray-700' : 'bg-gray-300';
                    const piece = square ? pieceImages[`${square.color}${square.type}`] : null;

                    return (
                        <div key={`${rowIndex}-${squareIndex}`} className={`w-16 h-16 flex justify-center items-center ${squareColor}`}>
                            {piece && <img src={piece} alt={`${square?.color}${square?.type}`} className="w-12 h-12" />}
                        </div>
                    );
                })
            ))}
        </div>
    );
}