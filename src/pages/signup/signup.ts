import { Component, Injectable } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  public signupForm: any;

  constructor(public navCtrl: NavController, public authData: AuthData, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public formBuilder: FormBuilder) {

    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser(): void {
    if (!this.signupForm.valid) {
      console.log('There is an error in the form: ', this.signupForm.value);
    } else {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password)
        .then(() => {
          loading.dismiss().then(() => {
            console.log('Signup Successful');
            this.navCtrl.setRoot(HomePage);
          });
        })
        .catch((error) => {
          loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: 'Ok',
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });
      let loading = this.loadingCtrl.create();
      loading.present();
    }
  }
}
