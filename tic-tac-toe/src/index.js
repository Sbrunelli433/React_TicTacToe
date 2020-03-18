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
    renderSquare(i){
        return (
          //passes through props from the Game component
        <Square value={this.props.squares[i]}
        //function is called when a square is clicked
        onClick={() => this.props.onClick(i)}
        />
        );
    }
  
    render() {
      return (
        <div>
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
    //Top-level component to display the list of past moves as History as an array of the 9 squares
    //putting this array here is lifting up from the board component
    //gives the Game component control over the board's data and lets the Board render to previous turns from the history
    constructor(props){
      super(props);
      this.state ={ 
        history: [{
          squares: Array(9).fill(null),
        }],
      xIsNext: true,
    };
  }

  handleClick(i){
    //this is immutability; makes "time travel" possible
    const history = this.state.history;
    const current = history[history.length -1];
    //calls .slice() to create a copy of the squares array to modify instead of modifying the existing array
    const squares = current.squares.slice();
    //check to see if there's a winner OR ignores a square that's already clicked
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    //this takes turns between X and O
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history:history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
    
    render() {
      //Game component Render is given the history array. Current state of history and calculates the winner
      const history = this.state.history;
      const current = history[history.length -1];
      //this changes the text at the top of the board and alternates between X and O
      const winner = calculateWinner(current.squares);

      //map over the history
      const moves = history.map((step,move) => {
        const desc = move ?
          'Go to move #' + move:
          'Go to game start';
          return (
            <li>
              <button onclick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          );
      });

      //creates the status variable
      let status;
      //displays text to show the winner
      if(winner){
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
            //below the Board component's handleClick function is being controlled by the Game component
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
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