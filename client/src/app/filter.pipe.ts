import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(product_list: Array<any>, user_search: string, search_by: string): any {
    if(!user_search) return product_list
    var new_list = []
    if(search_by == 'name') {
      for(let product of product_list) {
        if(product.title.toLowerCase().includes(user_search.toLowerCase())) {
          new_list.push(product)
        }
      }
    }
    if(search_by == 'category') {
      for(let product of product_list) {
        if(product.category.toLowerCase().includes(user_search.toLowerCase())) {
          new_list.push(product)
        }
      }
    }    
    return new_list;
  }

}
