import { useState } from "react";

// 定义子组件 Square
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

// 定义主组件 Board
export default function Board() {
  //声明一个名为 xIsNext 的 state 变量，来设置第一次点击标记为 X，每次玩家落子时，xIsNext 将被翻转以确定下一个玩家
  const [xIsNext, setXIsNext] = useState(true);
  // 声明一个名为 squares 的 state 变量，该变量默认为对应于 9 个方块的 9 个空值数组，setSquares 函数用来刷新 squares值
  const [squares,setSquares]=useState(Array(9).fill(null))

  // 定义 handleClick 函数来更新并保存棋盘 state 的 squares 数组
  function handleClick(i) {

    // 检查方块是否已经有 X 或 O，如果不为 null，不更新 squares
    if (squares[i]) {
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
    // 调用 setSquares 函数让 React 知道组件的 squares state 已经改变
    setSquares(nextSquares);
    // 翻转布尔值
    setXIsNext(!xIsNext);
  }
   

  return (
    <>
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
