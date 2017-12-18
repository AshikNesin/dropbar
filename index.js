const electron = require('electron');

const { app, BrowserWindow } = electron;

// Prevent window being garbage collected
let mainWindow;

const onClosed = () => {
	// Dereference the window
	// For multiple windows store them in an array
	mainWindow = null;
};

function createMainWindow() {
	const win = new BrowserWindow({
		width: 600,
		height: 400,
		title: 'DropBar'
	});

	win.loadURL(`file://${__dirname}/main.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('ready', () => {
	mainWindow = createMainWindow();
});
