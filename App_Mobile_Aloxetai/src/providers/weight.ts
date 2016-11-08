import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Constants }  from '../app/app.constants';
import 'rxjs/add/operator/map';

@Injectable()
export class Weight {

    WEIGHTS_URL: string = `${Constants.HOST}/api/weights`;

	constructor(public http: Http) { }

    list() {
		return this.http.get(this.WEIGHTS_URL).map(res => res.json());
    }

}
