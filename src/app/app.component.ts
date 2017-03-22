import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, LoadingController, Loading } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AlertController } from 'ionic-angular';

import { HomepagePage } from '../pages/homepage/homepage';
import { AppsettingsPage } from '../pages/appsettings/appsettings';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;
  loading: Loading;

  constructor(public platform: Platform, public alertCtrl: AlertController, public modalCtrl: ModalController,
    public loadingCtrl: LoadingController, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home Page', component: HomepagePage }
      // { title: 'Page Two', component: Page2 }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openAdminAlert() {
    let prompt = this.alertCtrl.create({
      title: 'Admin Credentials',
      message: "Enter Admin Credentials to change Settings.",
      inputs: [
        {
          name: 'Admin_credentials',
          placeholder: 'Admin Credentials'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.loading = this.loadingCtrl.create();
            this.loading.present();
            setTimeout(() => {
              this.loading.dismiss();
              this.openSettings();
            }, 1000);
          }
        }
      ]
    });
    prompt.present();

  }

  openSettings() {
    let modal = this.modalCtrl.create(AppsettingsPage);
    modal.present();
  }

}
