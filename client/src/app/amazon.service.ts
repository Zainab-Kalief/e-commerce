import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Rx';
import 'rxjs'
import { User } from './user'
import { Product } from './product'
import { DialogComponent } from './dialog/dialog.component';

@Injectable()
export class AmazonService {

  constructor(private _http: Http) {}




  create_user(user: User) {
    return this._http.post('/create_user', user)
      .map(data => data.json())
      .toPromise()
  }
  validate_user(user: User) {
    return this._http.post('/validate_user', user)
      .map(data => data.json())
      .toPromise()
  }
  create_product(product: Product) {
    return this._http.post('/create_product', product)
      .map(data => data.json())
      .toPromise()
  }
  user_selling() {
    return this._http.get('/user_selling')
      .map(data => data.json())
      .toPromise()
  }
  current_user() {
    return this._http.get('/current_user')
      .map(data => data.json())
      .toPromise()
  }
  all_data() {
    return this._http.get('/all_data')
      .map(data => data.json())
      .toPromise()
  }
  delete_product(id) {
    return this._http.get(`/delete_product/${id}`)
      .map(data => data.json())
      .toPromise()
  }
  update_product(id, product) {
    return this._http.post(`/update_product/${id}`, product)
      .map(data => data.json())
      .toPromise()
  }

}
