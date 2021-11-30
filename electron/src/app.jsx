import React, { useState, useEffect } from 'react';
import System from './system';
import mp3 from './ES_hm.mp3';

const App = () => {
	const [type, setType] = useState(1);
	const [appState, setAppState] = useState(0);
	const [isPlaying, setIsPlaying] = useState(true);
	const [audio] = useState(new Audio(mp3));
	useEffect(() => {
		audio.loop = true;
		audio.play();
	}, []);
	return (
		<div className="w-full h-full bg-gray-900 grid place-items-center">
			{appState === 3? (
			<div className="grid place-items-center w-full">
				<h1 className="text-7xl text-gray-50 font-bold animate-size mb-20">TicTacToe</h1>
				<div className="flex flex-col rounded-lg overflow-hidden w-[60%] bg-pink-800 items-center">
					<button onClick={()=>{
						setType(20);
						setAppState(2);
					}} className="text-2xl p-4 pr-8 pl-8 bg-pink-800 text-gray-50 hover:bg-pink-900 transition-all w-full">Hard</button>
					<div className="w-full h-1 bg-pink-900"></div>
					<button onClick={()=>{
						setType(21);
						setAppState(2);
					}} className="text-2xl p-4 pr-8 pl-8 bg-pink-800 text-gray-50 hover:bg-pink-900 transition-all w-full">Medium</button>
					<div className="w-full h-1 bg-pink-900"></div>
					<button onClick={()=>{
						setType(22);
						setAppState(2);
					}} className="text-2xl p-4 pr-8 pl-8 bg-pink-800 text-gray-50 hover:bg-pink-900 transition-all w-full">Easy</button>
					<div className="w-full h-1 bg-pink-900"></div>
					<button onClick={()=>{
						setType(1);
						setAppState(1);
					}} className="text-2xl p-4 pr-8 pl-8 bg-pink-800 text-gray-50 hover:bg-pink-900 transition-all w-full">Back</button>
				</div>
			</div>) : appState === 2? (<System returnHome={()=>{setAppState(0)}} mode={type}/>) : appState === 1? 
			(<div className="w-full h-full grid place-items-center">
				<div className="grid place-items-center w-full">
					<h1 className="text-7xl text-gray-50 font-bold animate-size mb-20">TicTacToe</h1>
					<div className="flex flex-col rounded-lg overflow-hidden w-[60%] bg-pink-800 items-center">
						<button onClick={()=>{
							setType(20);
							setAppState(3);
						}} className="text-2xl p-4 pr-8 pl-8 bg-pink-800 text-gray-50 hover:bg-pink-900 transition-all w-full">Single Player Mode</button>
						<div className="w-full h-1 bg-pink-900"></div>
						<button onClick={()=>{
							setType(1);
							setAppState(2);
						}} className="text-2xl p-4 pr-8 pl-8 bg-pink-800 text-gray-50 hover:bg-pink-900 transition-all w-full">Multiplayer Mode</button>
						<div className="w-full h-1 bg-pink-900"></div>
						<button onClick={()=>{
							setType(1);
							setAppState(0);
						}} className="text-2xl p-4 pr-8 pl-8 bg-pink-800 text-gray-50 hover:bg-pink-900 transition-all w-full">Back</button>
					</div>
				</div>
			</div>) :
			(<div className="w-full h-full grid place-items-center">
				<div className="grid place-items-center">
					<h1 className="text-7xl text-gray-50 font-bold animate-size">TicTacToe</h1>
					<button onClick={()=>{
						setAppState(1);
					}} className="text-2xl p-4 pr-8 pl-8 bg-pink-800 text-gray-50 mt-20 rounded-lg hover:bg-pink-900 transition-all ring-transparent ring ring-offset-4 ring-offset-gray-900 focus:ring-pink-800">Play</button>
				</div>
			</div>)}
			<button onClick={()=>{
				if (audio) {
					setIsPlaying(!isPlaying);
					isPlaying || audio.play();
					isPlaying && audio.pause();
				}
			}} className="absolute top-5 right-5 h-10 p-2 bg-pink-800 text-gray-50 rounded-md hover:bg-pink-900 transition-all ring-transparent ring ring-offset-4 ring-offset-gray-900 focus:ring-pink-800 z-50">
				<svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-gray-50">
					{isPlaying ? /* Soud Playing Icon */ (<path d="M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L7 9H4c-.55 0-1 .45-1 1zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 4.45v.2c0 .38.25.71.6.85C17.18 6.53 19 9.06 19 12s-1.82 5.47-4.4 6.5c-.36.14-.6.47-.6.85v.2c0 .63.63 1.07 1.21.85C18.6 19.11 21 15.84 21 12s-2.4-7.11-5.79-8.4c-.58-.23-1.21.22-1.21.85z"/>) 
					/* Soud Muted Icon  */: (<path d="M3.63 3.63c-.39.39-.39 1.02 0 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"/>)}
				</svg>
			</button>
			<p className="absolute bottom-4 left-0 w-full text-center text-gray-50 z-50">Copyright 2022 NullifiedSh</p>
		</div>
	);
}
export default App;