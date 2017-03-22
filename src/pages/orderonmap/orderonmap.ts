import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-orderonmap',
  templateUrl: 'orderonmap.html'
})
export class OrderonmapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  loading: Loading;
  ordersList = [
    {
      customerName: 'Ashfaq',
      mobNo: 96692953,
      invoiceNo: 34575685,
      coords: {
        lat: 29.3276536,
        lng: 48.0690358
      }
    },
    {
      customerName: 'Hussain',
      mobNo: 96692953,
      invoiceNo: 34575685,
      coords: {
        lat: 29.4276536,
        lng: 48.1690358
      }
    },
    {
      customerName: 'Ramesh Raju',
      mobNo: 96692953,
      invoiceNo: 34575685,
      coords: {
        lat: 29.3676536,
        lng: 48.1290358
      }
    }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public geolocation: Geolocation) { }

  ionViewDidLoad() {
    console.log('in map vieewer');
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('cordinates got');
      this.loading.dismiss();
      this.loadMap(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      console.log('cordinates error', error);
      this.loading.dismiss();
    });
  }

  loadMap(lat, lang) {
    let latLng = new google.maps.LatLng(lat, lang);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    for (var i = 0; i < this.ordersList.length; i++) {
      let marker = new google.maps.Marker({
        position: this.ordersList[i].coords,
        map: this.map
      });
    }
  }


}
