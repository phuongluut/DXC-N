import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the AnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'answer'
})
@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage {
  group: any;
  subgroups: any[];
  subgroup: any;
  public _COLL: string = '';
  public _DOC: string = '';
  public _CONTENT: any = '';
  private answerUid: string;
  private description: string;
  private quatity: number;
  public surveyUid: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this._COLL = 'ANSWER';
    this._CONTENT = {
      description: ''
    }
    // this.group = this.getJSON().group;
    this.subgroups = this.group.subgroups;
    this.subgroup = this.group.subgroups[0];
  }
  //when any list item is selected, move to the next list after saving selection
  radioClicked(val) {
    this.subgroup.selectedValue = val;
    this.Next();
  }

  //move to the previous list
  Prev() {
    let id = this.subgroup.id - 1;
    this.subgroup = this.subgroups.filter(x => x.id == id)[0];
  }

  //move to the next list
  Next() {
    let id = this.subgroup.id + 1;
    this.subgroup = this.subgroups.filter(x => x.id == id)[0];
  }

ionViewDidLoad() {
  console.log('ionViewDidLoad AnswerPage');
}

saveAnswer() {
}

}
