"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.movecount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.timestamp = new Date();
        this.player1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: 'white',
                board: this.board.fen()
            }
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: 'black',
                board: this.board.fen()
            }
        }));
        console.log('Game started');
    }
    makeMove(player, move) {
        //Validations
        try {
            console.log('Making move');
            this.board.move({ from: move.from, to: move.to });
        }
        catch (e) {
            console.log(e);
            return;
        }
        if (this.movecount % 2 === 0) {
            this.movecount++;
            console.log('Player 1 making move');
            this.player2.send(JSON.stringify({
                type: messages_1.MOVE,
                payload: move
            }));
            console.log(this.board.fen());
        }
        else {
            this.movecount++;
            console.log('Player 2 making move');
            this.player1.send(JSON.stringify({
                type: messages_1.MOVE,
                payload: move
            }));
            console.log(this.board.fen());
        }
    }
}
exports.Game = Game;
