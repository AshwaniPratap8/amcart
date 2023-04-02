import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberPipe'
})
export class NumberPipePipe implements PipeTransform {
  transform(value: any[]): any[] {
    return value.sort((n1, n2) => {
      return n1.name - n2.name;
    });
  }
}
