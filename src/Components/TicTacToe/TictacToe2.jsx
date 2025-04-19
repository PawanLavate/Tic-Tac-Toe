import React, { useRef, useState } from 'react'
import './tictactoe.css'
import circle_icon from '../Assets/circle.png'
import cross_icon from '../Assets/cross.png'

let data = ["", "", "", "", "", "", "", "", ""]

const tictactoe = () => {
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);
  let box1 = useRef(null);
  let box2 = useRef(null);
  let box3 = useRef(null);
  let box4 = useRef(null);
  let box5 = useRef(null);
  let box6 = useRef(null);
  let box7 = useRef(null);
  let box8 = useRef(null);
  let box9 = useRef(null);

  let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  const won = (winner) => {
    setLock(true);
    if (winner === 'x') {
      titleRef.current.innerHTML = `AI Wins : <img src=${cross_icon}>`;
    } else {
      titleRef.current.innerHTML = `You Win : <img src=${circle_icon}>`;
    }
  }

  const reset = () => {
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    titleRef.current.innerHTML = `Tic Tac Toe in <span>React</span>`;
    box_array.forEach((box) => {
      box.current.innerHTML = '';
    });
  }

  const checkWin = () => {
    const winLines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let line of winLines) {
      const [a, b, c] = line;
      if (data[a] && data[a] === data[b] && data[b] === data[c]) {
        won(data[a]);
        return true;
      }
    }
    if (!data.includes("")) {
      titleRef.current.innerHTML = `It's a Draw!`;
      setLock(true);
      return true;
    }
    return false;
  }

  const handlePlayerMove = (e, num) => {
    if (lock || data[num] !== "") return;
    e.target.innerHTML = `<img src=${circle_icon}>`;
    data[num] = 'o';
    if (!checkWin()) {
      setTimeout(aiMove, 500); // small delay for realism
    }
  }

  const aiMove = () => {
    const best = findBestMove(data);
    if (best !== -1) {
      data[best] = 'x';
      box_array[best].current.innerHTML = `<img src=${cross_icon}>`;
      checkWin();
    }
  }

  const evaluate = (board) => {
    const winLines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let line of winLines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a] === 'x' ? +10 : -10;
      }
    }
    return 0;
  }

  const isMovesLeft = (board) => board.includes("");

  const minimax = (board, depth, isMax) => {
    let score = evaluate(board);
    if (score === 10 || score === -10) return score;
    if (!isMovesLeft(board)) return 0;

    if (isMax) {
      let best = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
          board[i] = 'x';
          best = Math.max(best, minimax(board, depth + 1, false));
          board[i] = "";
        }
      }
      return best;
    } else {
      let best = +Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
          board[i] = 'o';
          best = Math.min(best, minimax(board, depth + 1, true));
          board[i] = "";
        }
      }
      return best;
    }
  }

  const findBestMove = (board) => {
    let bestVal = -Infinity;
    let bestMove = -1;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = 'x';
        let moveVal = minimax(board, 0, false);
        board[i] = "";
        if (moveVal > bestVal) {
          bestMove = i;
          bestVal = moveVal;
        }
      }
    }
    return bestMove;
  }

  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>Tic Tac Toe in <span>React</span></h1>
      <div className="board">
        <div className="row1">
          <div className="box" ref={box1} onClick={(e) => handlePlayerMove(e, 0)}></div>
          <div className="box" ref={box2} onClick={(e) => handlePlayerMove(e, 1)}></div>
          <div className="box" ref={box3} onClick={(e) => handlePlayerMove(e, 2)}></div>
        </div>
        <div className="row2">
          <div className="box" ref={box4} onClick={(e) => handlePlayerMove(e, 3)}></div>
          <div className="box" ref={box5} onClick={(e) => handlePlayerMove(e, 4)}></div>
          <div className="box" ref={box6} onClick={(e) => handlePlayerMove(e, 5)}></div>
        </div>
        <div className="row3">
          <div className="box" ref={box7} onClick={(e) => handlePlayerMove(e, 6)}></div>
          <div className="box" ref={box8} onClick={(e) => handlePlayerMove(e, 7)}></div>
          <div className="box" ref={box9} onClick={(e) => handlePlayerMove(e, 8)}></div>
        </div>
      </div>
      <div>
        <button className='reset' onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default tictactoe;
