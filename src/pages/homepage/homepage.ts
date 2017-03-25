import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { OrderonmapPage } from '../orderonmap/orderonmap';
import { OrdersPage } from '../orders/orders';
import { DeliveredOrdersPage } from '../delivered-orders/delivered-orders';
import { AssignedOrdersPage } from '../assigned-orders/assigned-orders';

declare const cordova: any;

/*
  Generated class for the Homepage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-homepage',
  templateUrl: 'homepage.html'
})
export class HomepagePage {

  orderOnMapTab: any = OrderonmapPage;
  ordersTab: any = OrdersPage;
  deliveredOrders: any = DeliveredOrdersPage;
  assignedOrders: any = AssignedOrdersPage;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams) { }

  ionViewDidLoad() {
    cordova.plugins.diagnostic.isGpsLocationEnabled((enabled) => {

      if (!enabled) {
        let prompt = this.alertCtrl.create({
          title: 'Location Services Disabled',
          message: "Please enable location services.",
          buttons: [
            {
              text: 'Ok',
              handler: data => {
                cordova.plugins.diagnostic.switchToLocationSettings();
              }
            }
          ]
        });
        prompt.present();


      }

    }, function (error) {
      alert("The following error occurred: " + error);
    });
  }

}
