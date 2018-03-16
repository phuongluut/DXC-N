import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PagesAnwserFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'pagesAnwserFilter',
})
export class PagesAnwserFilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any) {
    if(value){
      console.log("pepepepeppepepep",value);
    }
    
    
    return value;
  }
}
