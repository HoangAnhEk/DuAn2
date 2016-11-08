import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, AlertController, LoadingController, Events } from 'ionic-angular';
import { Weight } from '../../providers/weight';
import { User } from '../../providers/user';
import _ from "lodash";

@Component({
	selector: 'page-register',
	templateUrl: 'register.html',
	providers: [Weight, User]
})
export class RegisterPage {

	weights: Array<{
		id: number,
		name: string
	}> = [];
	form: FormGroup;

	constructor(
		public navCtrl: NavController,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public events: Events,
		public formBuilder: FormBuilder,
		public weightService: Weight,
		public userService: User
	) {
		this.form = this.formBuilder.group({
			// ...
			first_name: ['', Validators.required],
			last_name: ['', Validators.required],
			birthday: ['', Validators.required],
			address: ['', Validators.required],
			identification: ['', Validators.required],
			weight_id: ['', Validators.required],
			driving_license: ['', Validators.required],
			license_plate: ['', Validators.required],
			// ...
			phone: ['', Validators.required],
			password: ['', Validators.required],
		});
		// lọc dữ liệu trọng tải
		weightService.list().subscribe((data) => {
			_.forEach(data, (item) => {
				this.weights.push({ id: item.id, name: item.weight });
			});
		});

		// events
		this.events.subscribe('user.register:success', () => {
			let alert = this.alertCtrl.create({
				title: 'Thông báo!',
				subTitle: 'Đăng ký thành công, chúng tôi sẽ liên lạc sau khi kích hoạt tài khoản của bạn.',
				buttons: [{
					text: 'Đồng ý',
					handler: data => {
						this.navCtrl.pop();
					}
				}]
			});
			alert.present();
		});
	}

	onSubmit() {
		let loader = this.loadingCtrl.create({
			content: "Xin chờ...",
			duration: 3000
		});
		loader.present();
		this.userService.register(this.form.value, () => {
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
}
