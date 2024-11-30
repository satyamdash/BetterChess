import { WebSocket } from "ws";
import { Chess } from 'chess.js';
import { INIT_GAME,GAME_OVER ,MOVE} from "./messages";

export class Game
{
    public player1: WebSocket;
    public player2: WebSocket;
    public board: any;
    private timestamp: Date;
    private movecount: number = 0;
 
    constructor(player1: WebSocket, player2: WebSocket)
    {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.timestamp = new Date();
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: 'white',
                board: this.board.fen()
            }
        }));
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: 'black',
                board: this.board.fen()
            }
        }));
        console.log('Game started');
    }

    makeMove(player: WebSocket, move: {from: string, to: string})
    {
        //Validations
        try
        {
            console.log('Making move');
         this.board.move({from: move.from, to: move.to});

        }
        catch(e)
        {
            console.log(e);
            return;
        }

        if(this.movecount %2 === 0)
        {
            this.movecount++;
            console.log('Player 1 making move');
        this.player2.send(JSON.stringify({
            type: MOVE,
            payload: move
        }));
        console.log(this.board.fen());
        }
        else
        {
            this.movecount++;
            console.log('Player 2 making move');
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }));
            console.log(this.board.fen());
        }
    }
}