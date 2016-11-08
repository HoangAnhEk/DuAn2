import { Component } from '@angular/core';

import { OrderPage } from '../order/order';
import { NotifyPage } from '../notify/notify';
import { ProfilePage } from '../profile/profile';

@Component({
	templateUrl: 'tabs.html'
})
export class TabsPage {
	tab1Root: any = OrderPage;
	tab2Root: any = NotifyPage;
	tab3Root: any = ProfilePage;
	constructor() { }
}
