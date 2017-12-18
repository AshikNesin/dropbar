const electron = require('electron');
const path = require('path');
const DropTray = require('./drop-tray');

const {app, BrowserWindow} = electron;

const iconPath = path.join(__dirname, 'static/IconTray.png');

// Prevent window being garbage collected
let mainWindow;

const onClosed = () => {
	// Dereference the window
	// For multiple windows store them in an array
	mainWindow = null;
};

const onBlur = () => {
	mainWindow.hide();
};

function createMainWindow() {
	const win = new BrowserWindow({
		title: 'DropBar',
		width: 400,
		height: 300,
		frame: false,
		resizable: false,
		show: false,
		webPreferences: {
			backgroundThrottling: false
		}
	});

	win.loadURL(`file://${__dirname}/main.html`);
	win.on('closed', onClosed);
	win.on('blur', onBlur);
	return win;
}

app.on('ready', () => {
	mainWindow = createMainWindow();
	// Prevent tray being garbage collected
	const tray = new DropTray(iconPath, mainWindow); // eslint-disable-line no-unused-vars

	// Hide Dock Icon
	app.dock.hide();
});
