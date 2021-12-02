const { app, BrowserWindow, Menu, autoUpdater, dialog } = require("electron");

const devMode = !app.isPackaged;

const updateUrl = `https://update.electronjs.org/josh-codes/TicTacToeGame/${process.platform}-${process.arch}/${app.getVersion()}`;

devMode || autoUpdater.setFeedURL(updateUrl);

setInterval(() => {
	devMode || autoUpdater.checkForUpdates();
}, 3600000)

app.setAboutPanelOptions({
	applicationName: "Tic Tac Toe",
	applicationVersion: app.getVersion(),
	copyright: "Copyright NullifiedSh 2022"
})

app.on("ready", ()=>{
	const isMac = process.platform === "darwin";
	let template = [
		{	
			label: "File",
			submenu: [
				{ role: "about" },
				isMac ? { role: "close" } : { role: "quit" }, 
				!devMode ? { label: "Check for updates", onclick: () => {
					devMode || autoUpdater.checkForUpdates();
				} } : { role: "toggleDevTools" },
				devMode ? { role: "reload" } : { role: 'forceReload' },
			],
		},
	];
	if (isMac) {
		template = [{
			label: app.name,
			submenu: [
				{ role: 'about' },
				{ type: 'separator' },
				{ role: 'services' },
				{ type: 'separator' },
				{ role: 'hide' },
				{ role: 'hideOthers' },
				{ role: 'unhide' },
				{ type: 'separator' },
				{ role: 'quit' }
		]}, ...template];
	}
	let window = new BrowserWindow({
		width:           750,
		height:          750,
		resizable:       false,
		icon:            __dirname+"/content/icon.png",
		webPreferences: {
			sandbox:     true,
		}
	});
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
	window.loadURL(`file//${__dirname}/index.html`);
});
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
	const dialogOpts = {
		type: 'info',
		buttons: ['Restart', 'Later'],
		title: 'Application Update',
		message: process.platform === 'win32' ? releaseNotes : releaseName,
		detail: 'A new version has been downloaded. Restart the application to apply the updates.'
	}

	dialog.showMessageBox(dialogOpts).then((returnValue) => {
		if (returnValue.response === 0) autoUpdater.quitAndInstall()
	})
})