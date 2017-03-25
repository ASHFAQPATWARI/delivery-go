import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsMapTypeId,
  GoogleMapsEvent,
  LatLng,
  //CameraPosition,
  AnimateCameraOptions,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';


//declare var google;
declare const cordova: any;


@Component({
  selector: 'page-orderonmap',
  templateUrl: 'orderonmap.html'
})
export class OrderonmapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
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
        lat: 29.3276536,
        lng: 48.0790358
      }
    },
    {
      customerName: 'Ramesh Raju',
      mobNo: 96692953,
      invoiceNo: 34575685,
      coords: {
        lat: 29.322390,
        lng: 48.000215
      }
    }
  ];

  retryLoadingMap = false;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public geolocation: Geolocation, private googleMaps: GoogleMaps) { }

  ionViewDidLoad() {

    cordova.plugins.diagnostic.isGpsLocationEnabled((enabled) => {

      if (!enabled) {
        this.retryLoadingMap = true;
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

      } else {
        this.getPositionAndLoadMap();
      }

    }, function (error) {
      alert("The following error occurred: " + JSON.stringify(error));
    });

  }

  getPositionAndLoadMap() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.geolocation.getCurrentPosition({ maximumAge: 30000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
      this.loading.dismiss();
      this.retryLoadingMap = false;
      this.loadMap(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      this.loading.dismiss();
      let prompt = this.alertCtrl.create({
        title: 'Error!!',
        message: "Please Check if location services are enabled and retry!",
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
    });
  }

  loadMap(lat, lang) {
    let latLng = new LatLng(lat, lang);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: GoogleMapsMapTypeId.ROADMAP
    }

    this.map = this.googleMaps.create(this.mapElement.nativeElement);
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      let position: AnimateCameraOptions = {
        target: latLng,
        zoom: 15,
        //tilt: 30,
        duration: 2000
      };

      // move the map's camera to position
      this.map.animateCamera(position);

      let markerOptions: MarkerOptions = {
        position: latLng,
        title: 'Me'
      };
      //const marker: Marker = 
      this.map.addMarker(markerOptions)
        .then((marker: Marker) => {
          marker.showInfoWindow();
        });

      for (var i = 0; i < this.ordersList.length; i++) {
        let latLng = new LatLng(this.ordersList[i].coords.lat, this.ordersList[i].coords.lng);
        let markerOptions: MarkerOptions = {
          position: latLng,
          title: this.ordersList[i].customerName
        };
        let marker = this.map.addMarker(markerOptions).then((marker: Marker) => {
          marker.showInfoWindow();
        });;
      }
    });

  }


}
