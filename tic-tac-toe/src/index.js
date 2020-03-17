import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class Square extends React.Component {
    render() {
      return (
          //when a Square is clicked, the onClick function provided by the Board is called
        <button className="square" 
        onClick={() => this.props.onClick()}
        >
          {this.props.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    //using this constructor passes a prop to tell each square what to display
    //This is Lifting State Up to the parent component
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    //create the handleClick function
    handleClick(i){
        //calls .slice() to create a copy of the squares array to modify instead of modifying the existing array
        //this is immutability; makes "time travel" possible
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({squares: squares});
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
      const status = 'Next player: X';
  
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
  