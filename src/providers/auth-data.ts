import { Injectable } from '@angular/core';
import firebase from 'firebase';



@Injectable()
export class AuthData {

  public fireAuth: any;
  public userProfile: any;

  constructor() {
    console.log('Hello AuthData Provider'); // TODO: Remove in final sweep
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/userProfile');
  }

  /**
   * [loginUser We'll take an email and password and log the user into the firebase app]
   * @param  {string} email    [User's email address]
   * @param  {string} password [User's password]
   */
  loginUser(email: string, password: string): firebase.Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  /**
   * [signupUser description]
   * This function will take the user's email and password and create a new account on the Firebase app, once it does
   * it's going to log the user in and create a node on userProfile/uid with the user's email address, you can use
   * that node to store the profile information.
   * @param  {string} email    [User's email address]
   * @param  {string} password [User's password]
   */

  signupUser(email: string, password: string): any {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        this.userProfile.child(newUser.uid).set({
          email: email
        });
      });
  }

  resetPassword(email: string): firebase.Promise<any> {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  logoutUser(): any {
    return firebase.auth().signOut();
  }



}
