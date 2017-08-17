import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(value: Array<any>, order: string): any {
    if(order == 'high') {
      return value.sort( (a, b) => {  return b.calculated_price - a.calculated_price  })
    } else{
      return value.sort( (a, b) => {  return a.calculated_price - b.calculated_price  })
    }

  }

}
