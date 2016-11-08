import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { Constants }  from '../app/app.constants';
import { LocalStorage, LocalStorageService } from 'ng2-webstorage';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class User {

    LOGIN_URL: string = `${Constants.HOST}/api/login`;
    REGISTER_URL: string = `${Constants.HOST}/api/register`;

	// ...
	contentHeader: Headers = new Headers({ "Content-Type": "application/json" });
	jwtHelper: JwtHelper = new JwtHelper();

	// ...
    @LocalStorage() userId: string;
	@LocalStorage() token: string;

	constructor(
		public http: Http,
		public events: Events,
		public storage: LocalStorageService
	) { }

    login(credentials, success, error) {
		this.http.post(this.LOGIN_URL, JSON.stringify(credentials), {
			headers: this.contentHeader
		}).map(res => res.json()).subscribe((data) => {
            if (data.error) {
                return error(data.error);
            }
			this.loginSuccess(data.userId, data.token);
			success();
		}, e => error('Máy chủ hiện tại không hoạt động, bạn vui lòng thử lại sau ít phút.'));
	}

    logout() {
		this.storage.clear('token');
		this.events.publish('auth.logout:success');
    }

    register(credentials, success, error) {
        this.http.post(this.REGISTER_URL, JSON.stringify(credentials), {
			headers: this.contentHeader
		}).map(res => res.json()).subscribe((data) => {
            if (data.error) {
                return error(data.error);
            }
			this.registerSuccess();
			success();
		});
    }

    loginSuccess(userId, token) {
        this.userId = userId;
		this.token = token;
		this.events.publish('auth.login:success');
    }

    registerSuccess() {
		this.events.publish('user.register:success');
    }

}
