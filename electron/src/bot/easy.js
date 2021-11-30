// This uses random placements

const easyPlace = (grid) => {
	const options = [];
	grid.forEach((items, outerIndex) => {
		items.forEach((item, index) => {
			if (item === 0) {
				options.push([outerIndex, index]);
			}
		});
	});
	if (options.length === 0) {
		return [0, 0, false]
	}
	return [...options[Math.floor(Math.random() * (options.length-1))], true];
}
export default easyPlace;