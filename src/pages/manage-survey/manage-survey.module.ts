import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageSurveyPage } from './manage-survey';

@NgModule({
  declarations: [
    ManageSurveyPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageSurveyPage),
  ],
})
export class ManageSurveyPageModule {}
