import { Pipe } from '@angular/core';
import * as moment from 'moment';
/**
 * Generated class for the MomentPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'moment',
})
export class MomentPipe  {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, args) {
    let m = moment().lang('es').format('LLLL');
    return m;
  }
}
