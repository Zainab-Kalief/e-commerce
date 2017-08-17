import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { AmazonService } from '../amazon.service'
import { Product } from '../product'

@Component({
  selector: 'app-dialog',
  template: `
    <p md-dialog-title class='primary-color'><strong>Update Your Product</strong>  </p>
    <md-dialog-content class='accent-color'>
    <form >
    Title: <input type="text" name="title" [(ngModel)]='product.title'><br>
    Price: <input type="text" name="price" [(ngModel)]='product.price'><br>
    Description: <textarea name="description" rows="8" cols="80" [(ngModel)]='product.description'></textarea><br>
    Category: <select name="category" [(ngModel)]='product.category'><br>
      <option value="Electronics">Electronics</option>
      <option value="Home">Home</option>
      <option value="Fashion">Fashion</option>
      <option value="Books">Books</option>
      <option value="Others">Others</option>
    </select>
    </form>
    </md-dialog-content>
    <md-dialog-actions>
      <button md-raised-button color='primary' md-dialog-close (click)='cancelled()'>
        Cancel
      </button>
      <button md-raised-button color='success' md-dialog-close (click)='updated()'>
        Submit
      </button>
    </md-dialog-actions>
  `,
  styles: []
})
export class DialogComponent implements OnInit {
  public product: string
  public status = false
  title = ''
  description = ''
  constructor(private _service: AmazonService, private _router: Router, private _router2: ActivatedRoute) { }

  ngOnInit() {
  }
  cancelled() {
    console.log('cancelled')
  }
  updated() {
    this.status = true
    console.log(this.status)
  }

}
