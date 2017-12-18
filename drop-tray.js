const electron = require('electron');

const {app, Tray, Menu} = electron;

class DropTray extends Tray {
	constructor(iconPath, mainWindow) {
		super(iconPath);
		this.mainWindow = mainWindow;
		this.on('click', this.onClick.bind(this));
		this.on('right-click', this.onRightClick.bind(this));
	}

	onClick(event, bounds) {
		// Click event bounds
		const {x, y} = bounds;

		// Window height and width
		const {height, width} = this.mainWindow.getBounds();

		const yPostion = process.platform === 'darwin' ? y : y - height;

		this.mainWindow.setBounds({
			x: x - width / 2,
			y: yPostion,
			height,
			width
		});

		// Toggle mainWindow
		if (this.mainWindow.isVisible()) {
			this.mainWindow.hide();
		} else {
			this.mainWindow.show();
		}
	}

	onRightClick() {
		const menuConfig = Menu.buildFromTemplate([
			{
				label: 'Quit',
				click: () => app.quit()
			}
		]);

		this.popUpContextMenu(menuConfig);
	}
}

module.exports = DropTray;
