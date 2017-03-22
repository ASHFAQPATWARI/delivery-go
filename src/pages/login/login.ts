import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

import { RegisterPage } from '../register/register';
import { HomepagePage } from '../homepage/homepage';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  loginCredentials = {
    username: '',
    password: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    setTimeout(() => {
      this.loading.dismiss();
      this.navCtrl.setRoot(HomepagePage);
    }, 1000);
  }

  createAccount() {
    this.navCtrl.push(RegisterPage);
  }

}
