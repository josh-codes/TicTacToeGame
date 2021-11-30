// This uses some ango i found online (same one as google)

const genArea = (grid, updateY, updateX, mark) => {
	const newGrid = [
		[grid[0][0], grid[0][1], grid[0][2]],
		[grid[1][0], grid[1][1], grid[1][2]],
		[grid[2][0], grid[2][1], grid[2][2]],
	];
	newGrid[updateY][updateX] = mark;
	return newGrid;
}

const checkGame = (grid) => {
	const checkWin = (lookFor) => {
		let win = false;
		if (grid[0][0] === lookFor && grid[1][1] === lookFor && grid[2][2] === lookFor) {
			return true;
		} else if (grid[0][2] === lookFor && grid[1][1] === lookFor && grid[2][0] === lookFor) {
			return true;
		}
		grid.forEach((item, index)=>{
			if (item[0] === lookFor && item[1] === lookFor && item[2] === lookFor) {
				win = true;
				return;
			}
			if (grid[0][index] === lookFor && grid[1][index] === lookFor && grid[2][index] === lookFor) {
				win = true;
				return;
			}
		});
		return win;
	}
	const filled = () => {
		let filled = true;
		grid.forEach((items)=>{
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
		return 0;
	} else if (checkWin(2)) {
		return 2;
	} else if (filled()) {
		return 1;
	}
	return -1;
}

const hardPlace = (grid) => {
	const move = { score: Number.NEGATIVE_INFINITY, pos: [0, 0], canPlace: false };
	const max = (grid) => {
		const gameGridStatus = checkGame(grid);
		if (gameGridStatus !== -1) {
			return gameGridStatus-1;
		}
		let move = Number.NEGATIVE_INFINITY;
		grid.forEach((items, outerIndex) => {
			items.forEach((item, index) => {
				if (item === 0) {
					const simulatedGrid = genArea(grid, outerIndex, index, 2);
					const simulatedMove = min(simulatedGrid);
					if (simulatedMove > move) {
						move = simulatedMove;
					}
				}
			});
		});
		return move;
	}
	const min = (grid) => {
		const gameGridStatus = checkGame(grid);
		if (gameGridStatus !== -1) {
			return gameGridStatus-1;
		}
		let move = Number.MAX_VALUE;
		grid.forEach((items, outerIndex) => {
			items.forEach((item, index) => {
				if (item === 0) {
					const simulatedGrid = genArea(grid, outerIndex, index, 1);
					const simulatedMove = max(simulatedGrid);
					if (simulatedMove < move) {
						move = simulatedMove;
					}
				}
			});
		});
		return move;
	}
	grid.forEach((items, outerIndex) => {
		items.forEach((item, index) => {
			if (item === 0) {
				const simulatedGrid = genArea(grid, outerIndex, index, 2);
				const simulatedMove = min(simulatedGrid);
				if (simulatedMove > move.score) {
					move.canPlace = true;
					move.score = simulatedMove;
					move.pos = [outerIndex, index];
				}
			}
		});
	});
	return [...move.pos, move.canPlace];
}
export default hardPlace;