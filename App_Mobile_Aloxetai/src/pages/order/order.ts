import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Order } from '../../providers/order';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    selector: 'page-order',
    templateUrl: 'order.html',
    providers: [Order]
})
export class OrderPage {

    page: number = 1;
    filter: Array<{
        type: string,
        label: string,
        value: string,
        checked: boolean
    }>;
    orders: Array<{
        name: string,
        phone: string,
        shipping_location: string,
        delivery_location: string,
        time: string,
        total_weight: string,
        weight: string,
        category: string,
        status: string,
        created_at: string,
    }> = [];

    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public orderService: Order
    ) {
        this.filter = [{
            type: 'checkbox',
            label: 'Đang chờ',
            value: '0',
            checked: true
        }, {
            type: 'checkbox',
            label: 'Đã Nhận',
            value: '1',
            checked: true
        }, {
            type: 'checkbox',
            label: 'Đã Xong',
            value: '2',
            checked: true
        }];
        this.onLoadData();
    }

    onLoadData() {
        let alert = this.alertCtrl.create({
            title: 'Lỗi!',
            subTitle: 'Máy chủ tạm thời không phản hồi.',
            buttons: ['Đóng']
        });
        const status = [];
        _.forEach(this.filter, (item) => {
            if (item.checked == true) {
                status.push(item.value);
            }
        });
        if (status.length) {
            this.orderService.list(_.join(status, ','), this.page).subscribe((result) => {
                _.forEach(result.data, (item) => {
                    this.orders.push({
                        name: item.name,
                        phone: item.phone,
                        shipping_location: item.shipping_location,
                        delivery_location: item.delivery_location,
                        time: item.time,
                        total_weight: item.total_weight,
                        weight: item.weight.weight,
                        category: item.category.name,
                        status: item.status,
                        created_at: moment(item.created_at).fromNow()
                    });
                });
            }, (error) => alert.present());
        }
    }

    getStatus(status) {
        switch (status) {
            case '1': return { text: 'Đã nhận', color: 'primary' };
            case '2': return { text: 'Đã xong', color: 'secondary' };
            default: return { text: 'Đang chờ', color: 'danger' };
        }
    }

    filterDialog() {
        let alert = this.alertCtrl.create();
        alert.setTitle('Lọc vận đơn theo trạng thái');
        _.forEach(this.filter, (item) => {
            alert.addInput(item);
        });
        alert.addButton('Đóng');
        alert.addButton({
            text: 'Lọc',
            handler: data => {
                this.orders = [];
                this.page = 1;
                _.forEach(this.filter, (item, idx) => {
                    this.filter[idx].checked = (_.indexOf(data, item.value) != -1) ? true : false;
                });
                this.onLoadData();
            }
        });
        alert.present();
    }

}
