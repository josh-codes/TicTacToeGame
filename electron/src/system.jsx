import React, { useState } from 'react';
import Game from './game';
import Icon from './icon';

const App = ({ returnHome, mode }) => {
	const modalCss = [["bg-gray-800", "text-gray-200"], ["bg-pink-700", "text-red-200"], ["bg-yellow-700", "text-yellow-200"]];
	//{theme: 2, title: "X won!", body: "Good job X, you won. O, try harder next time, we know you can do this.", isOpen: true, isUnmounted: false, mainCss: "animate-drop", boxCss: "animate-wait"}
	const [showGame, setShowGame] = useState(true);
	const [modalData, setModalData] = useState({theme: 2, title: "X won!", body: "Good job X, you won. O, try harder next time, we know you can do this.", isOpen: false, isUnmounted: true, mainCss: "animate-drop", boxCss: "animate-wait"});
	return (
		<div className="w-full h-full bg-gray-900 grid place-content-center">
			{showGame? (<Game mode={mode} home={returnHome} callback={(theme, title, body)=>{
				setModalData({
					theme: theme, 
					title: title, 
					body: body, 
					isOpen: true, 
					isUnmounted: false, 
					mainCss: "animate-drop", 
					boxCss: "animate-wait"
				});
			}}/>) : (<></>)}
			{modalData.isUnmounted? (<></>) : (
				<div className={`absolute top-0 left-0 ${modalData.mainCss} w-full h-full overflow-hidden backdrop-filter backdrop-blur flex items-center justify-center`}>
					<div className="absolute bg-gray-800 w-full h-full z-0 opacity-30 rounded">
					</div>
					<div className={`${modalData.boxCss} bg-gray-700 z-20 rounded-lg w-[26rem] h-52 overflow-hidden`}>
						<div className="bg-gray-700 w-full h-[9.5rem] p-5 flex flex-row">
							<div className="h-full w-min">
								<div className={"p-2 rounded-full w-min h-min "+modalCss[modalData.theme][0]}>
									<Icon type={modalData.theme} className={"w-8 h-8 fill-current "+modalCss[modalData.theme][1]}/>
								</div>
							</div>
							<div className="pl-4 w-full h-full">
								<h1 className="text-xl text-gray-50">{modalData.title}</h1>
								<p className="text-gray-50">{modalData.body}</p>
							</div>
						</div>
						
						<div className="w-full bg-gray-600 pt-2 pb-2 pr-4 pl-4 flex justify-end h-14">
							<button onClick={()=>{
								if (!modalData.isOpen) {return}
								const data = {...modalData};
								data.isOpen = false;
								data.boxCss = "animate-wait-out";
								setModalData(data);
								setTimeout(()=>{
									setModalData({...data, isUnmounted: true, mainCss: "animate-drop", boxCss: "animate-wait"});
									returnHome();
								}, 600);
							}}className="pb-2 pt-2 pl-3 pr-3 bg-gray-500 hover:bg-gray-400 rounded-md text-gray-50 transition-all ring-transparent ring ring-offset-4 ring-offset-gray-600 focus:ring-gray-500">Return Home</button>
							<button onClick={()=>{
								if (!modalData.isOpen) {return}
								const data = {...modalData};
								data.isOpen = false;
								data.mainCss = "animate-drop-out";
								data.boxCss = "animate-wait-out";
								setShowGame(false);
								setModalData(data);
								setTimeout(()=>{
									setModalData({...data, isUnmounted: true, mainCss: "animate-drop", boxCss: "animate-wait"});
								}, 1000);
								setTimeout(()=>{
									setShowGame(true);
								}, 10);		
							}} className="pb-2 pt-2 pl-3 pr-3 bg-pink-800 hover:bg-pink-900 rounded-md ml-4 text-gray-50 transition-all ring-transparent ring ring-offset-4 ring-offset-gray-600 focus:ring-pink-800">Play Again</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
export default App;