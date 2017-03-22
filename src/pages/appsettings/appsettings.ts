import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the Appsettings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-appsettings',
  templateUrl: 'appsettings.html'
})
export class AppsettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppsettingsPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
