import { Component } from '@angular/core';
import { Events, NavController, AlertController } from 'ionic-angular';
import { Notification } from '../../providers/notification';
import * as moment from 'moment';
import _ from "lodash";

@Component({
    selector: 'page-notify',
    templateUrl: 'notify.html',
    providers: [Notification]
})
export class NotifyPage {

    // infinite
    page: number = 1;
    lastPage: number;
    infiniteScroll: any = null;

    notifications: Array<{
        title: string,
        message: string,
        type: number,
        created_at: string
    }> = [];

    constructor(
        public navCtrl: NavController,
        public notificationService: Notification,
        public alertCtrl: AlertController,
        public events: Events
    ) {
        this.onLoadData(null);

        // events
        this.events.subscribe('notify.coin:add', () => {
            this.notifications = [];
            this.page = 1;
            if (this.infiniteScroll != null) {
                this.infiniteScroll.enable(true);
            }
            this.onLoadData(null);
        });
    }

    onLoadData(callback) {
        let alert = this.alertCtrl.create({
            title: 'Lỗi!',
            subTitle: 'Máy chủ tạm thời không phản hồi.',
            buttons: ['Đóng']
        });
        this.notificationService.list(this.page).subscribe((result) => {
            this.lastPage = result.lastPage
            _.forEach(result.data, (item) => {
                this.notifications.push({
                    title: item.title,
                    message: item.message,
                    type: item.type,
                    created_at: moment(item.created_at).fromNow()
                });
            });
            if (callback != null) {
                return callback();
            }
        }, () => alert.present());
    }

    doInfinite(infiniteScroll) {
        this.infiniteScroll = infiniteScroll;
        if (this.page === this.lastPage) {
            return this.infiniteScroll.enable(false);
        }
        this.page += 1;
        this.onLoadData(() => {
            this.infiniteScroll.complete();
        });
    }

    onNotify(notifyData) {

    }

}
