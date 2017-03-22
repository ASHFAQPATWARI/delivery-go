import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, Loading } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { OrderDetailPage } from '../order-detail/order-detail';

/*
  Generated class for the Orders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html'
})
export class OrdersPage {
  loading: Loading;
  ordersList = [
    {
      customerName: 'Ashfaq',
      mobNo: 96692953,
      invoiceNo: 34575685
    },
    {
      customerName: 'Hussain',
      mobNo: 96692953,
      invoiceNo: 34575685
    },
    {
      customerName: 'Ramesh Raju',
      mobNo: 96692953,
      invoiceNo: 34575685
    },
    {
      customerName: 'Geeta Basra',
      mobNo: 96692953,
      invoiceNo: 34575685
    },
    {
      customerName: 'Yuvraj Singh',
      mobNo: 96692953,
      invoiceNo: 34575685
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
    public loadingCtrl: LoadingController, private geolocation: Geolocation) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

  getCoordinates(order) {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.loading.dismiss();
      alert('coordinates: lat= ' + resp.coords.latitude + '  long= ' + resp.coords.longitude);
      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
      this.loading.dismiss();
      alert('Error getting location' + error.message);
    });
  }

  showOrderDetails(order) {
    let modal = this.modalCtrl.create(OrderDetailPage, { order: order });
    modal.present();
  }

}
