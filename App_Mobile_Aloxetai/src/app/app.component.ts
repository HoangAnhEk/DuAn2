import { Component } from '@angular/core';
import { Platform, Events, ToastController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LocalStorageService } from 'ng2-webstorage';
import * as io from 'socket.io-client';
import * as moment from 'moment';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { Constants }  from './app.constants';

@Component({
	template: `<ion-nav [root]="rootPage"></ion-nav>`,
	providers: [LocalStorageService]
})
export class AloXeTai {

	socket: any;
	socketHost: string = Constants.HOST;
	rootPage: any;

	// authentication
	userId: string;
    token: string;

	constructor(
		public platform: Platform,
		public events: Events,
		public toastCtrl: ToastController,
		public storage: LocalStorageService
	) {
		moment.locale('vi');
		platform.ready().then(() => {
			StatusBar.styleDefault();
			Splashscreen.hide();
		});

		this.userId = this.storage.retrieve('userId');
		this.token = this.storage.retrieve('token');
		this.rootPage = this.token && this.userId ? TabsPage : LoginPage;

		// init events
		this.events.subscribe('auth.login:success', () => {
			this.rootPage = TabsPage;
		});
		this.events.subscribe('auth.logout:success', () => {
			this.rootPage = LoginPage;
		});

		// socket events
		this.socket = io.connect(this.socketHost);
		this.socket.on("connect", (msg) => {
			console.info('Socket.IO', 'Kết nối thành công!');
		});
		this.socket.on("coin.add", (data, notification) => {
			if ((data.driver_id == this.userId) && notification.message) {
				this.presentToast(notification.message);
			}
			this.events.publish('notify.coin:add');
		});
	}

	presentToast(message) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'top'
		});
		toast.present();
	}
}
