import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { ResetPasswordPage } from '../reset-password/reset-password';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loginForm;
  loading: any;

  constructor(public navCtrl: NavController, public authData: AuthData,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public formBuilder: FormBuilder) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage'); // TODO: Remove in final sweep
  }

  /**
 * If the form is valid it will call the AuthData service to log the user
 in displaying a loading component while
 * the user waits.
 *
 * If the form is invalid it will just log the form value, feel free to
 handle that as you like. 
 */

  loginUser(): void {
    if (!this.loginForm.valid) {
      console.log('The login form is not valid', this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then((authData) => {
          loading.dismiss().then(() => {
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


  // loginUser(): void {
  //   if (!this.loginForm.valid) {
  //     console.log(this.loginForm.value);
  //   } else {
  //     this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(authData => {
  //       this.loading.dismiss().then(() => {
  //         this.navCtrl.setRoot(HomePage);
  //       });
  //     }, error => {
  //       this.loading.dismiss().then(() => {
  //         let alert = this.alertCtrl.create({
  //           message: error.message,
  //           buttons: [
  //             {
  //               text: "Ok",
  //               role: 'cancel'
  //             }
  //           ]
  //         });
  //         alert.present();
  //       });
  //     });

  //     this.loading = this.loadingCtrl.create();
  //     this.loading.present();
  //   }
  // }


  //go to signup page
  goToSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  //go to resetpassword page
  goToResetPassword(): void {
    this.navCtrl.push(ResetPasswordPage);
  }





}
