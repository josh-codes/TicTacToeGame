import React, { useState } from 'react';
import XO from './xo';
import easyPlace from './bot/easy';
import hardPlace from './bot/hard';
import mediumPlace from './bot/medium';

const Game = ({ callback, mode, home }) => {
	const [turn, setTurn] = useState(true);
	const [gameboard, setGameboard] = useState([[0,0,0],[0,0,0],[0,0,0]]);
	const pcPlay = () => {
		setTimeout(() => {
			const sendGameboard = [
				[gameboard[0][0], gameboard[0][1], gameboard[0][2]],
				[gameboard[1][0], gameboard[1][1], gameboard[1][2]],
				[gameboard[2][0], gameboard[2][1], gameboard[2][2]],
			];
			const [y, x, playable] = mode === 22? easyPlace([...sendGameboard]) : mode === 21? mediumPlace([...sendGameboard]) : hardPlace([...sendGameboard]);
			if (!playable) {
				return;
			} else {
				gameboard[y][x] = 2;
				setTurn(true);
				setGameboard(gameboard);
				checkGame();
			}
		}, 1000)
	}
	const checkGame = () => {
		const checkWin = (lookFor) => {
			let win = false;
			if (gameboard[0][0] === lookFor && gameboard[1][1] === lookFor && gameboard[2][2] === lookFor) {
				return true;
			} else if (gameboard[0][2] === lookFor && gameboard[1][1] === lookFor && gameboard[2][0] === lookFor) {
				return true;
			}
			gameboard.forEach((item, index)=>{
				if (item[0] === lookFor && item[1] === lookFor && item[2] === lookFor) {
					win = true;
					return;
				}
				if (gameboard[0][index] === lookFor && gameboard[1][index] === lookFor && gameboard[2][index] === lookFor) {
					win = true;
					return;
				}
			});
			return win;
		}
		const filled = () => {
			let filled = true;
			gameboard.forEach((items)=>{
				items.forEach((item)=>{
					if (!filled) {
						return;
					}
					filled = item !== 0;
				})
			});
			return filled;
		}
		if (checkWin(1)) {
			if (mode === 1) {
				callback(2, "X won!", "Good job X, you won. O, try harder next time, I know you can do this.");
				return;
			}
			callback(2, "You Won!",  mode === 22? "Good job! now try beating medium mode!" : mode === 21? "Nice! now try to beat hard mode! (you can't) 😈" : "How! Did you cheat? 😳😳😳");
		} else if (checkWin(2)) {
			if (mode === 1) {
				callback(2, "O won!", "Good job O, you won. X, try harder next time, I know you can do this.");
				return;
			}
			callback(1, "You lost!",  mode === 22? "Imagine losing in easy mode! Try harder next time." : mode === 21? "You might be able to win it, just practice some more!" : "This was inevitable! You can't beat hard mode!!!");
		} else if (filled()) {
			if (mode === 1) {
				callback(0, "Tie!", "Neither of you won, how sad! Try harder next time, I know one of you can win this.");
				return;
			}
			callback(0, "Tie!",  mode === 22? "Are you a noob or unlucky? The easy mode places O randomly." : mode === 21? "Nice try! I think you can win next time tho!" : "You are never going to be able to beat hard mode! It's imposible.");
		}
	}
	return (
		<div className="w-full h-full absolute top-0 left-0 z-0">
			<div className="w-full h-full overflow-hidden">
				<div className="h-10 w-full mt-5 mb-5 grid items-center pl-5 pr-5">
					<button onClick={home} className="absolute h-10 p-2 bg-pink-800 text-gray-50 rounded-md hover:bg-pink-900 transition-all ring-transparent ring ring-offset-4 ring-offset-gray-900 focus:ring-pink-800">
						<svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-gray-50">
							<path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"/>
						</svg>
					</button>
					<h1 className="text-gray-50 text-4xl w-full text-center font-bold">{mode === 1? turn? "X's turn.": "O's turn." : turn? "Your turn.": "Computery is thinking..."}</h1>
				</div>
				<div className="grid place-items-center w-full h-[calc(100%-5rem)] overflow-hidden">
					<div className="grid place-items-center w-full h-full" style={{aspectRatio: "1 / 1"}}>
						<div className="grid grid-cols-1 grid-rows-3 gap-2 w-[calc(100%-10rem)] h-[calc(100%-10rem)] p-20 pt-0 pb-40">
							{gameboard.map((items, outerIndex) => {
								return (
									<div key={outerIndex} className="grid grid-cols-3 gap-2">
										{items.map((item, index)=>{
											return (<div onClick={()=>{
												if (mode !== 1 && !turn) {
													return;
												}
												if (gameboard[outerIndex][index] !== 0) {
													return;
												}
												gameboard[outerIndex][index] = turn ? 1 : 2;
												setTurn(!turn);
												setGameboard(gameboard);
												checkGame();
												if (mode !== 1) {
													pcPlay();
												}
											}} className={(gameboard[outerIndex][index] !== 0 || (!turn && mode !== 1) ? "bg-gray-700 " : "bg-gray-800 cursor-pointer hover:bg-gray-700 ")+" rounded-md transition-all grid place-items-center"} key={index}>
												{item === 0 ? (<></>) : (<XO className="w-full h-full p-10 fill-current text-gray-50" type={item-1}/>)}
											</div>)
										})}
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Game;