import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Constants }  from '../app/app.constants';
import { LocalStorageService } from 'ng2-webstorage';
import 'rxjs/add/operator/map';

@Injectable()
export class Profile {

    PROFILE_URL: string = `${Constants.HOST}/api/profile`;
    CHANGEPASS_URL: string = `${Constants.HOST}/api/changepassword`;

    // ...
    contentHeader: Headers = new Headers({ "Content-Type": "application/json" });

	constructor(
        public http: Http,
        public storage: LocalStorageService
    ) {
        const jwtToken = 'Bearer ' + this.storage.retrieve('token');
        this.contentHeader.append('Authorization', jwtToken);
    }

    profile() {
		return this.http.get(this.PROFILE_URL, {
			headers: this.contentHeader
		}).map(res => res.json());
    }

    changePassword(data) {
		return this.http.post(this.CHANGEPASS_URL, data, {
            headers: this.contentHeader
		}).map(res => res.json());
    }

}
