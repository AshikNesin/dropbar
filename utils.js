const electron = require('electron');

const {Notification} = electron;

function showNotification({title, body, onClick}) {
	const notification = new Notification({
		title,
		body
	});
	if (onClick) {
		notification.on('click', () => onClick());
	}
	notification.show();
}

module.exports = {
	showNotification
};
