import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { AloXeTai } from './app.component';
import { NotifyPage } from '../pages/notify/notify';
import { ProfilePage } from '../pages/profile/profile';
import { OrderPage } from '../pages/order/order';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
	declarations: [
		AloXeTai,
		NotifyPage,
		ProfilePage,
		OrderPage,
		LoginPage,
		RegisterPage,
		TabsPage
	],
	imports: [
		FormsModule,
		BrowserModule,
		Ng2Webstorage,
		IonicModule.forRoot(AloXeTai, {
			mode: 'wp',
		})
	],
	bootstrap: [IonicApp],
	entryComponents: [
		AloXeTai,
		NotifyPage,
		ProfilePage,
		OrderPage,
		LoginPage,
		RegisterPage,
		TabsPage
	],
	providers: []
})
export class AppModule { }
