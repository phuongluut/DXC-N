import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnwserPage } from './anwser';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    AnwserPage,
  ],
  imports: [
    IonicPageModule.forChild(AnwserPage),
    PipesModule
  ],
})
export class AnwserPageModule {}
