import { WebSocket } from "ws";
import {INIT_GAME,MOVE }from "./messages";
import { Game } from "./Game";
export class GameManager{
    private games: Game[] = [];
    private pendingUser: WebSocket | undefined = undefined;
    private Users: WebSocket[] = [];


    constructor()
    {
        this.games = [];
        this.pendingUser = undefined;
        this.Users = [];
    }

    addPlayer(ws: WebSocket)
    {
        this.Users.push(ws);
        this.addHandler(ws);
    }

    removePlayer(ws: WebSocket)
    {
        this.Users = this.Users.filter(user => user !== ws);
    }

    addHandler(ws: WebSocket)
    {
        ws.on('message', (data) => {
            const message = JSON.parse(data.toString());
            if(message.type === INIT_GAME)
            {
                if(this.pendingUser)
                {
                    const game=new Game(this.pendingUser,ws);
                    this.games.push(game);
                    this.pendingUser=undefined;
                }
                else
                {
                  this.pendingUser= ws;
                }
            }
            if(message.type === MOVE)
            {
                const game = this.games.find(game => game.player1 === ws || game.player2 === ws);
                if(game)
                {
                    game.makeMove(ws, message.move);
                }
            }
        });
    }
}