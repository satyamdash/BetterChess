"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const messages_1 = require("./messages");
const Game_1 = require("./Game");
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUser = undefined;
        this.Users = [];
        this.games = [];
        this.pendingUser = undefined;
        this.Users = [];
    }
    addPlayer(ws) {
        this.Users.push(ws);
        this.addHandler(ws);
    }
    removePlayer(ws) {
        this.Users = this.Users.filter(user => user !== ws);
    }
    addHandler(ws) {
        ws.on('message', (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === messages_1.INIT_GAME) {
                if (this.pendingUser) {
                    const game = new Game_1.Game(this.pendingUser, ws);
                    this.games.push(game);
                    this.pendingUser = undefined;
                }
                else {
                    this.pendingUser = ws;
                }
            }
            if (message.type === messages_1.MOVE) {
                const game = this.games.find(game => game.player1 === ws || game.player2 === ws);
                if (game) {
                    game.makeMove(ws, message.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
