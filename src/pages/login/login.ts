import { Component } from '@angular/core';
import {
  IonicPage,
  LoadingController,
  NavController,
  AlertController
} from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { ResetPasswordPage } from '../reset-password/reset-password';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { ParticipantPage } from '../participant-survey/participant-survey';
@IonicPage({
  name: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: any;
  loginForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder, public afauth: AngularFireAuth,

  ) 
  {
    this.loginForm = formBuilder.group({
      email: ['',
        Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['',
        Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }
  loginUser(): void {
    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      console.log(this.loginForm.value);
      this.authProvider.loginUser(this.loginForm.value.email,
        this.loginForm.value.password)
        .then(authData => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(HomePage);
          });
        },
         error => {
          this.loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
   async loginGoogle(){
     try{
       const result =  await this.afauth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
       if(result)
       this.navCtrl.setRoot(HomePage);
     }catch(e){
        console.log(e);
     }
   
    }
  async loginFace() {
    try {
      const result = await this.afauth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
      if (result)
        this.navCtrl.setRoot(HomePage);
    } catch (e) {
      console.log(e);
    }

  }
  
  goToSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  goToResetPassword(): void {
    this.navCtrl.push(ResetPasswordPage);
  }

}