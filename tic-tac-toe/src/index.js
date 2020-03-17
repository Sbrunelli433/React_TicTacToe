import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
    return(
        //when a Square is clicked, the onClick function provided by the Board is called
        <button className="square" onClick={props.onClick}>
        {props.value}
        </button>
    );
}

  
  class Board extends React.Component {
    //using this constructor passes a prop to tell each square what to display
    //This is Lifting State Up to the parent component
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            //Taking turns functionality
            xIsNext: true,
        };
    }

    //create the handleClick function
    handleClick(i){
        //calls .slice() to create a copy of the squares array to modify instead of modifying the existing array
        //this is immutability; makes "time travel" possible
        const squares = this.state.squares.slice();
        //check to see if there's a winner OR ignores a square that's already clicked
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        //this takes turns between X and O
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }
    ////puts numbers in each of the squares
    // renderSquare(i) {
    //   return <Square value={i}/>;
    // }
    renderSquare(i){
        return (
        <Square value={this.state.squares[i]}
        //function is called when a square is clicked
        onClick={() => this.handleClick(i)}
        />
        );
    }
  
    render() {
        //this changes the text at the top of the board and alternates between X and O
      const winner = calculateWinner(this.state.squares);
      //creates the status variable
      let status;
      //displays text to show the winner
      if(winner){
          status = 'Winner: ' + winner;
      } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
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
    render() {
      return (
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
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
//this helper function determines the winner
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }