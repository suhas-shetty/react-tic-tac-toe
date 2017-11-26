import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

function Square(props){
    return(
        <button className="square" onClick={ props.onClick }>
            { props.value }
        </button>
    );
}

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        };
    }

    handelClick(i){
        const squares = this.state.squares.slice();
        if(squares[i] || calculateTheWinner(squares)){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        const nextPlayer = !this.state.xIsNext;
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }

    renderSquare(i){
        return (
            <Square 
                value = { this.state.squares[i] }
                onClick = {() => this.handelClick(i)}
            />
        );
    }

    render(){
        const winner = calculateTheWinner(this.state.squares);
        const status = winner ? "The winner is " + winner : "Next player: " + (this.state.xIsNext? 'X' : 'O');

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render(){
        return(
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

function calculateTheWinner(squares){
    const winningLines = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6]
    ];

    for(let i=0; i<winningLines.length; i++){
        const [a, b, c] = winningLines[i];
        if(squares[a] && squares[a] == squares[b] && squares[a] == squares[c]){
            return squares[a];
        }
    }
};

//==========

ReactDom.render(
    <Game />,
    document.getElementById('root')
);