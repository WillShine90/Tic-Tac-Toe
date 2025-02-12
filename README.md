# Brief Introduction
♟ This is a simple Tic-Tac-Toe game that simulates two players placing pieces on a 3x3 board. The first player to align three pieces in a row wins. 

🏗 This app is built using the React framework.

# Version Update
📂 V1.0 构建UI，每次点击Square显示X

   V2.0 前端看起来与v1.0并没有什么不同，但是引入了squares数组，每次点击Square时，创建 squares 数组的副本，支持撤消和重做某些操作

   V3.0 添加xIsNext布尔值以实现交替落子；添加避免已被填写的方块再次被改写的机制

   V4.0 1.判断获胜者  
        2.实现返回历史记录功能：新建高层级组件Game，引入与之对应的history数组，储存所有squares数组的历史记录

# Component & Data
Tic-Tac-Toe 代码中，主要组件和数据的对应关系如下：
组件
1. Square 组件  
   Props: 
   value: 表示当前方块的状态（null、"X" 或 "O"）。
   onSquareClick: 点击方块时调用的函数。
   功能: 渲染一个按钮，显示方块的状态，并处理点击事件。
2. Board 组件  
   Props:
   xIsNext: 布尔值，指示下一个玩家是 X 还是 O。
   squares: 当前棋盘的状态数组。
   onPlay: 函数，用于更新棋盘状态。
   功能: 渲染棋盘，包含多个 Square 组件，并处理方块的点击事件。
3. App（或 Game）组件  
   State:
   history: 数组，记录游戏的历史状态，每个元素是一个 squares 数组。
   currentMove: 当前查看的历史记录索引。
   Derived State:
   xIsNext: 计算下一个玩家是 X 还是 O。
   currentSquares: 当前棋盘的状态，来自 history[currentMove]。
   功能: 管理游戏的状态，处理玩家的落子，渲染 Board 组件和历史记录的按钮。
4. calculateWinner 函数  
   参数: squares，表示当前棋盘的状态。  
   功能: 检查当前棋盘状态是否有玩家获胜，返回获胜者的标识（"X" 或 "O"）或 null。    
数据  
1. squares  
   类型: 数组  
   描述: 表示棋盘上每个方块的状态，长度为 9。每个元素可以是 null、"X" 或 "O"。  
2. history
   类型: 数组
   描述: 记录游戏的历史状态。每个元素都是一个 squares 数组，表示每一步的棋盘状态。
3. currentMove
   类型: 数字
   描述: 当前查看的历史记录索引，指示玩家正在查看哪一步的棋盘状态。
4. xIsNext  
   类型: 布尔值  
   描述: 指示下一个玩家是 X 还是 O，基于 currentMove 的奇偶性计算得出。  
组件与数据的对应关系  
1. Square 组件:  
   使用 value 来显示方块的状态。  
   使用 onSquareClick 来处理点击事件，调用 Board 组件的 handleClick 函数。  
2. Board 组件:  
   接收 squares 来渲染每个方块的状态。  
   接收 onPlay 来更新棋盘状态。  
3. App 组件:  
   管理 history 和 currentMove，通过 handlePlay 更新 history。  
   计算 currentSquares 以传递给 Board 组件。  
   calculateWinner 函数:  
   在 Board 组件中调用，检查当前棋盘状态以确定是否有获胜者。  
总结  
这些组件和数据共同构成了 Tic-Tac-Toe 游戏的逻辑和界面，允许玩家交替落子并记录游戏状态。每个组件通过 props 和 state 进行数据传递和状态管理。