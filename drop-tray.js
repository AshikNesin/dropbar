const electron = require('electron');
const { uploadFile } = require('s3-bucket');

const { app, Tray, Menu, Notification } = electron;

class DropTray extends Tray {
	constructor(iconPath, mainWindow) {
		super(iconPath);
		this.mainWindow = mainWindow;
		this.on('click', this.onClick.bind(this));
		this.on('right-click', this.onRightClick.bind(this));
		this.on('drop-files', this.onDropFiles.bind(this));
	}

	onClick(event, bounds) {
		// Click event bounds
		const { x, y } = bounds;

		// Window height and width
		const { height, width } = this.mainWindow.getBounds();

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

	onDropFiles(event, files) {
		// Console.log(files[0]);
		const fileName = files[0].split('/').slice(-1)[0];
		// Console.log(fileName);
		uploadFile({
			filePath: files[0],
			Key: fileName
		})
			.then(res => {
				const uploadedURL = res.url;
				console.log(uploadedURL);
			})
			.catch(err => console.log(err));
	}
}

module.exports = DropTray;
