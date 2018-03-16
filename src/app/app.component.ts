import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { PropertyPage } from '../pages/property/property';

import { environment } from '../environments/environment';
import firebase from 'firebase';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ParticipantPage } from '../pages/participant-survey/participant-survey';
import { ManageSurveyPage} from '../pages/manage-survey/manage-survey';

import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-app',
  templateUrl: 'app.html'
})
export class MyApp {
  User: {}[];
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  private username: string;

  constructor(public menuCtrl: MenuController,public platform: Platform, 
    public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Quickpoll', component: ManageSurveyPage},
      { title: 'Logout', component: LoginPage }
    ];
    //1
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = LoginPage;
        unsubscribe();
      } else {
        this.rootPage = HomePage;
        unsubscribe();        
      }
      this.username = user.email;
    });
   
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(environment.firebase);
  }

  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  // }

  goLogin() {
    this.nav.setRoot(LoginPage);
    this.menuCtrl.close();
    this.menuCtrl.swipeEnable( false );
  }
}
