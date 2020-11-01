import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringFilter'
})
export class StringFilterPipe implements PipeTransform {

  transform(value: string): string {
    return value.length >= 35
      ? value.slice(0, 36) + '...'
      : value;
  }

}
