import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string, firstname: string, lastname: string): Promise<any> {
    console.log(email,password);
    return firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        console.log(newUser);
        firebase
          // .database()     //stores the infomation inside the realtime database
          // .ref('/USER')
          // .child(newUser.uid)
          // .set({ email: email, firstname: firstname, lastname: lastname });
          .firestore()       //stores the information inside the cloud firestore
          .collection('USER')
          .doc(newUser.uid)
          .set({ userUid: newUser.uid, email: email, password: password, firstname: firstname, lastname: lastname });
      });
  }
  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }
  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }
}
