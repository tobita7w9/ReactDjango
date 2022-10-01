import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
function Square(props) {
    return (
        <button className='square' onClick={props.onClick}>
            {props.value}
        </button>
    );
}
  
  class Board extends React.Component {
    renderSquare(i) {
      return (<Square 
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i) } 
                key={i}
            />
      );
    }

    render() {
      return (
        <div>
            {Array(3).fill(0).map((row,i) => {
                return (
                    <div className='board-row' key={i} >{Array(3).fill(0).map((col,j) => {
                        return (this.renderSquare(i*3+j))
                    })}</div>
                );
            })}
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            history:[{
                squares:Array(9).fill(null),
            }],
            numhistory:[],
            stepnumber:0,
            xIsNext:true,
        };
    }

    handleClick(i){
        const history = this.state.history.slice(0,this.state.stepnumber+1);
        const current = history[history.length-1];
        const squares=current.squares.slice();
        const numhistory=this.state.numhistory;

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i]= this.state.xIsNext? 'X':'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            numhistory:numhistory.concat([i]),
            stepnumber: history.length,
            xIsNext: !this.state.xIsNext,
            
        });
    }

    jumpTo(step) {
        this.setState({
            stepnumber:step,
            xIsNext: (step % 2) ===0,
        });
    }

    render() {
    const history =this.state.history;
    const current = history[this.state.stepnumber];
    const winner = calculateWinner(current.squares);
    const numhistory=this.state.numhistory;
    const colrow=numhistory.map((i) =>  {
        const col=i%3+1;
        const row=Math.floor(i/3)+1;
        return ('('+ col + ',' + row +')');
    });
    
    const moves = history.map((step,move) => {
        const desc = move ?
            'Go to move #' + move  +' (col,row)=' +colrow[move-1] :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => this.jumpTo(move)} className={this.state.stepnumber === move ? 'bold' : ''} >{desc}</button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = 'Winner: ' +winner;
    } else {
        status ='Next player: '+(this.state.xIsNext ? 'X' : 'O');
    }

    return (
        <div className="game">
          <div className="game-board">
            <Board 
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
  
  function calculateWinner(squares) {
    const lines =[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i =0; i < lines.length; i++) {
        const [a,b,c]=lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c] && squares[c]) {
            return squares[a]
        }
    }
    return null;
  }

  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  