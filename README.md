♟ This is a simple Tic-Tac-Toe game that simulates two players placing pieces on a 3x3 board. The first player to align three pieces in a row wins. 

🏗 This app is built using the React framework.

📂 V1.0 构建UI，每次点击Square显示X

   V2.0 前端看起来与v1.0并没有什么不同，但是引入了squares数组，每次点击Square时，创建 squares 数组的副本，支持撤消和重做某些操作

   V3.0 添加xIsNext布尔值以实现交替落子；添加避免已被填写的方块再次被改写的机制