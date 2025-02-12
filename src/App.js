import { useState } from "react";

// 定义三级组件 Square
function Square({value,onSquareClick}){
  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}

// 定义二级组件 Board
function Board({ xIsNext, squares, onPlay }) {
  
  // 定义 handleClick 函数来更新并保存棋盘 state 的 squares 数组
  function handleClick(i) {

    // 检查方块是否已经有 X 或 O，如果不为 null，不更新 squares；检查是否有玩家获胜
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    // 声明 nextSquares 数组，用来储存更新的 squares 数组
    const nextSquares = squares.slice()
    
    if (xIsNext) {
      // 如果 xIsNext=true 将索引为 i 的 squares 内的元素从 null 更新为 X
      nextSquares[i] = "X"; 
    } else {
      // 如果 xIsNext=false 将索引为 i 的 squares 内的元素从 null 更新为 O
      nextSquares[i] = "O"; 
    }
    // 调用 onplay 函数让 React 知道组件的 squares state 已经改变
    onPlay (nextSquares);
  }

  //如果游戏结束，将显示获胜者，如果游戏正在进行，将显示下一轮将会是哪个玩家
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
   

  return (
    <>
      {/* 显示下一位玩家或游戏结果  */} 
      <div className="status">{status}</div>

      <div className="board-row">
        <Square 
          // 将 square 数组的第i个值传递给对应 Square 的 props
          value={squares[0]} 
          // 将 handleClick 函数传递给对应 Square 的 props
          onSquareClick={() => handleClick(0)} 
        >
        </Square>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}

// 定义一级组件 Game
export default function Game() {
  
  // 玩家的落子历史，声明一个名为 history 的 state 变量，该变量默认为对应于 9 个方块的 9 个空值数组，setHistory 函数用来刷新 history值
  const [history, setHistory] = useState([Array(9).fill(null)]);

  // 定义一个名为 currentMove 的新state变量，记录用户当前正在查看哪条历史记录
  const [currentMove, setCurrentMove] = useState(0);

  // 声明一个名为 xIsNext 的 state 变量，来设置第一次点击标记为 X，每次玩家落子时，xIsNext 将被翻转以确定下一个玩家
  const xIsNext = currentMove % 2 === 0;
  
  // 渲染当前选定的历史记录
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {

    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    
  }

  // 跳回历史
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });


  return (
    <div className="game">
      <div className="game-board">

        {/* xIsNext、currentSquares 和 handlePlay 作为 props 传递给 Board 组件 */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />

      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// 检查玩家获胜的函数
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
