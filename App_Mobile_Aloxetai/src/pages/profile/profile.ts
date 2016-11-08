import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Events } from 'ionic-angular';
import { Profile } from '../../providers/profile';
import { User } from '../../providers/user';
import _ from "lodash";

@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
	providers: [Profile, User]
})
export class ProfilePage {

	data: Array<{
		note: String,
		value: String
	}> = [];

	coin: string = '0';

	constructor(
		public navCtrl: NavController,
		public profileService: Profile,
		public userService: User,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public events: Events
	) {
		this.onLoadData();
		// events
		this.events.subscribe('notify.coin:add', () => {
			this.onLoadData();
		});
	}

	onLoadData() {
		let loader = this.loadingCtrl.create({
			content: "Xin chờ...",
			duration: 3000
		});
		loader.present();
		this.fetchData(() => {
			loader.dismiss();
		});
	}

	fetchData(success) {
		let alert = this.alertCtrl.create({
			title: 'Lỗi!',
			subTitle: 'Máy chủ tạm thời không phản hồi.',
			buttons: ['Đóng']
		});
		this.profileService.profile().subscribe((data) => {
			this.data = [];
			_.forEach(data, (item, key) => {
				let note = '';
				let value = item;
				switch (key) {
					case 'first_name': note = 'Tên'; break;
					case 'last_name': note = 'Họ & tên đệm'; break;
					case 'phone': note = 'Số điện thoại'; break;
					case 'birthday': note = 'Ngày sinh'; break;
					case 'address': note = 'Địa chỉ'; break;
					case 'identification': note = 'Chứng minh thư'; break;
					case 'driving_license': note = 'Giấy phép lái xe'; break;
					case 'license_plate': note = 'Biển kiểm soát'; break;
					case 'weight': {
						note = 'Trọng tải xe';
						value = item.weight;
						break;
					}
					// ...
					case 'coin': this.coin = value; break;
				}
				if (note) {
					this.data.push({
						note: note,
						value: value
					});
				}
			});
			return success();
		}, (error) => alert.present());
	}

	changePassDialog() {
		let loader = this.loadingCtrl.create({
			content: "Xin chờ...",
			duration: 3000
		});
		let alert = this.alertCtrl.create({
			title: 'Lỗi!',
			buttons: ['Đóng']
		});
		let prompt = this.alertCtrl.create({
			title: 'Đổi mật khẩu',
			message: "Nhập mật khẩu cũ và mật khẩu mới mà bạn muốn đổi.",
			inputs: [
				{
					name: 'old_password',
					placeholder: 'Mật khẩu cũ',
					type: 'password'
				}, {
					name: 'password',
					placeholder: 'Mật khẩu mới',
					type: 'password'
				}
			],
			buttons: [
				{
					text: 'Hủy bỏ',
					handler: data => {
						prompt.dismiss();
					}
				},
				{
					text: 'Lưu',
					handler: data => {
						if (data.old_password === '' || data.password === '') {
							return;
						}
						loader.present();
						this.profileService.changePassword(data).subscribe((data) => {
							loader.dismiss().then(() => {
								if (data.error) {
									alert.setSubTitle(data.error);
									alert.present();
								}
							});
						});
					}
				}
			]
		});
		prompt.present();
	}

	doLogout() {
		this.userService.logout();
	}

}
