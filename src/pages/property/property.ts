import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
/**
 * Generated class for the PropertyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-property',
  templateUrl: 'property.html',
})
export class PropertyPage {
  filterItems: any;
  private _COLL: string = '';
  private _DOC: string = '';
  private _CONTENT: any;
  public surveys: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _DB: DatabaseProvider, private _ALERT: AlertController) {
    this._COLL = "SURVEY";
    this._CONTENT = {
      name: "",
      author: "", 
      timeStart: "", 
      timeEnd: "",
      answers: ""
    } 
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  ionViewDidEnter() {
    this.retrieveCollection();
    console.log("show something!");
  }

  generateCollectionAndSurvey(): void {
    this._DB.createAndPopulateDocument(this._COLL,
      this._DOC, this._CONTENT)
      .then((data: any) => {
        console.dir(data); 
        console.log(data);
        
      })
      .catch((error: any) => {
        console.dir(error);
      });
  }

  retrieveCollection(): void {
    this._DB.getDocuments(this._COLL)
      .then((data) => {
        if (data.length === 0) {
          this.generateCollectionAndSurvey();
        }
        else {
          this.surveys = data;
          this.filterItems = data;         
        }    
      })
      .catch();
  }
  //function search
  getItems(input: any) {
    let searchKeyword = input.target.value;
    if (searchKeyword != null) {
      this.filterItems = this.surveys.filter(survey => survey.author.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1);
    }
    else {
      this.filterItems = this.surveys;
    }
  }
  addSurvey(): void {
    this.navCtrl.push('manage-survey');
  }

  updateSurvey(obj): void {
    let params: any = {
      collection: this._COLL,
      survey: obj
    };
    this.navCtrl.push('manage-survey', { record: params, isEdited: true });
  }

  deleteSurvey(obj): void {
    this._DB.deleteDocument(this._COLL,
      obj.id)
      .then((data: any) => {
        this.retrieveCollection();
        // this.displayAlert('Success', 'The survey ' + '"' + obj.name + '"' + ' was successfully removed');
      })
      .catch((error: any) => {
        this.displayAlert('Error', error.message);
      });
  }

  displayAlert(title: string, message: string): void {
    let alert: any = this._ALERT.create({
      title: title,
      subTitle: message,
      buttons: [{
        text: 'Got It!',
        handler: () => {
          this.retrieveCollection();
        }
      }]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PropertyPage');
  }

}
