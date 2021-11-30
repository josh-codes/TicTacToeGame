const { app, BrowserWindow, Menu } = require("electron");

app.on("ready", ()=>{
	const isMac = process.platform === "darwin";
	const template = [
		{
			label: "File",
			submenu: [isMac ? { role: "close" } : { role: "quit" }],
		},
	];
	let window = new BrowserWindow({
		width:           750,
		height:          750,
		resizable:       false,
		icon:            __dirname+"/content/icon.icns",
		webPreferences: {
			sandbox:     true,
		}
	});
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
	window.loadFile(__dirname+'/dist/index.html');
});