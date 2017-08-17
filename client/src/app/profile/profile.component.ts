import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { AmazonService } from '../amazon.service'
import { Product } from '../product'
import { MdDialog } from '@angular/material'
import { DialogComponent } from '../dialog/dialog.component'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  product: Product
  user = ''
  user_products = []
  constructor(public dialog: MdDialog, private _service: AmazonService, private _router: Router) { }

  ngOnInit() {
    this.product = new Product
    this._service.current_user()
      .then(data => {
        if(data.status) {
          this.user = data.name
        } else {
          this._router.navigate(['/'])
        }
      })
    this._service.user_selling()
      .then(data => {
        if(data.status) {
          this.user_products = data.data.selling
        }
      })

  }

  post_data() {
    this._service.create_product(this.product)
      .then(data => {
        if(data.status) {
          this.user_products.push(data.data)
        }
        this.product = new Product
      })
      .catch(error => console.log(error, '~~~~~~~~~~'))
  }

  open_dialog(product, id) {
  let box =  this.dialog.open(DialogComponent)
    box.componentInstance.product = product
    box.afterClosed()
      .subscribe(data => {
        if(box.componentInstance.status) {
          this._service.update_product(id, product)
            .then(data => {
              if(data.status) {
                console.log(data.data, true)
              }
            })
            .catch(error => console.log(error, '~~~~~~~~~~'))
        }
      })
  }


}
