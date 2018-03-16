import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { PagesAnwserFilterPipe } from '../../pipes/pages-anwser-filter/pages-anwser-filter';
import {
  FormGroup,
  FormControl

} from '@angular/forms';
/**
 * Generated class for the AnwserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface DATA {
  answers:Array<any>,
  author:any,
  name:string,
  surveyUid:string
}
@IonicPage({
  name:'answer-page'
})

@Component({
  selector: 'page-anwser',
  templateUrl: 'anwser.html',  
})
export class AnwserPage {
  answerForm;
  listanswer;
  survey:Array<object>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private firestore: AngularFirestore) {
    this.answerForm = new FormGroup({
      "listanswer": new FormControl({value: 'rust', disabled: false})
    });
  }
  doSubmit(event) {
    console.log('Submitting form', this.answerForm.value);
    event.preventDefault();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AnwserPage');
    let surveyId = this.navParams.get('id');
    const firestore = this.firestore.collection<DATA>('SURVEY');
    firestore.valueChanges().subscribe(res => {
      
      this.survey=this.getValueradio(res,surveyId);
      console.log(this.survey)
    })

  }
  getValueradio(dataAnswer: DATA[],surveyId:string) {
    let sourceAnswer = new Array<DATA>();


    dataAnswer.forEach(e => {
      sourceAnswer.push(e);
    });

    sourceAnswer=sourceAnswer.filter(ans => ans.surveyUid === surveyId )

    console.log(surveyId,sourceAnswer[0].answers);
    return sourceAnswer[0].answers;
  }

}
