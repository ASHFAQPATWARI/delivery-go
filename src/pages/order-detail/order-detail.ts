import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import {
  GoogleMaps,
  GoogleMap,
  //GoogleMapsMapTypeId,
  GoogleMapsEvent,
  LatLng,
  AnimateCameraOptions,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html'
})
export class OrderDetailPage {
  order: any;
  map: GoogleMap;
  @ViewChild('orderDetailMap') mapElement: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, private googleMaps: GoogleMaps, public geolocation: Geolocation) {
    this.order = this.navParams.get('order');
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.loadMap();
    });
  }

  loadMap() {
    let picklatLng = new LatLng(29.372569, 47.986742);
    let droplatLng = new LatLng(29.326953, 48.000415);

    this.map = this.googleMaps.create(this.mapElement.nativeElement);
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      let position: AnimateCameraOptions = {
        target: picklatLng,
        zoom: 11,
        duration: 2000
      };

      // move the map's camera to position
      this.map.animateCamera(position);

      let markerOptions: MarkerOptions = {
        position: picklatLng,
        icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
        title: 'Pickup'
      };
      //const marker: Marker = 
      this.map.addMarker(markerOptions)
        .then((marker: Marker) => {
          marker.showInfoWindow();
        });

      let dropMarkerOptions: MarkerOptions = {
        position: droplatLng,
        title: 'DropUp'
      };
      //const marker: Marker = 
      this.map.addMarker(dropMarkerOptions)
        .then((marker: Marker) => {
          marker.showInfoWindow();
        });

    });

  }

  dismiss() {
    this.map.clear();
    this.viewCtrl.dismiss();
  }

}
