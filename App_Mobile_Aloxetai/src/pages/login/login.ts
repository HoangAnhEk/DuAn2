import { Component } from '@angular/core';
import { NavController, AlertController, Events, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RegisterPage } from '../register/register';
import { User } from '../../providers/user';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
	providers: [User]
})
export class LoginPage {
	form: FormGroup;
	constructor(
		public navCtrl: NavController,
		public formBuilder: FormBuilder,
		public userService: User,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public events: Events
	) {
		this.form = this.formBuilder.group({
			phone: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	onSubmit() {
		let loader = this.loadingCtrl.create({
			content: "Xin chờ...",
			duration: 3000
		});
		loader.present();
		this.userService.login(this.form.value, () => {
			loader.dismiss();
		}, (error) => {
			loader.dismiss().then(() => {
				let alert = this.alertCtrl.create({
					title: 'Lỗi!',
					subTitle: error,
					buttons: ['Đóng']
				});
				alert.present();
			});
		});
	}

	toRegister() {
		this.navCtrl.push(RegisterPage);
	}
}
