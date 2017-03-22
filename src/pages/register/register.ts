import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { HomepagePage } from '../homepage/homepage';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  
  loading: Loading;
  registerCredentials = {
    driverName: '',
    driverUsername: '',
    driverId: '',
    driverPassword: '',
    driverConfirmPassword: '',
    adminPassword: '',
    apiUrl: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
   private loadingCtrl: LoadingController, private toastCtrl: ToastController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  goTologin() {
    this.navCtrl.setRoot(LoginPage);
  }

  register() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    setTimeout(() => {
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
        message: `New Driver ${this.registerCredentials.driverName} was added successfully`,
        duration: 3000
      });
      toast.present();
      this.navCtrl.setRoot(HomepagePage);
    }, 3000);
  }

}
