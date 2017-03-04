import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';

import firebase from 'firebase';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  zone: NgZone;

  constructor(platform: Platform) {
    this.zone = new NgZone({});
    firebase.initializeApp({
      apiKey: "AIzaSyDeeXXoW6cu4ucPHhy19cLZiNdeKd1XqMk",
      authDomain: "eventtracker-15998.firebaseapp.com",
      databaseURL: "https://eventtracker-15998.firebaseio.com",
      storageBucket: "eventtracker-15998.appspot.com",
      messagingSenderId: "100256467985"
    });

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.zone.run(() => {
        if (!user) {
          this.rootPage = LoginPage;
          unsubscribe();
        } else {
          this.rootPage = HomePage;
          unsubscribe();
        }
      });
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
