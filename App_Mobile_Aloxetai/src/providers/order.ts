import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Constants } from '../app/app.constants';
import { LocalStorageService } from 'ng2-webstorage';
import 'rxjs/add/operator/map';

@Injectable()
export class Order {

	ORDER_URL: string = `${Constants.HOST}/api/orders`;

	// ...
	contentHeader: Headers = new Headers({ "Content-Type": "application/json" });

	constructor(
		public http: Http,
		public storage: LocalStorageService
	) {
		const jwtToken = 'Bearer ' + this.storage.retrieve('token');
		this.contentHeader.append('Authorization', jwtToken);
	}

	list(status, page) {
		return this.http.get(`${this.ORDER_URL}?status=${status}&page=${page}`, {
			headers: this.contentHeader
		}).map(res => res.json());
	}

}
