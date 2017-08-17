import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { AmazonService } from '../amazon.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements  OnInit {
  products = []
  user_id = ''
  price_order ='low'
  selected = 'name'
  status = true
  user_search = ''
  constructor(private _service: AmazonService, private _router: Router) { }

  ngOnInit() {
    this._service.current_user()
      .then(data => {
        if(!data.status){
          this._router.navigate(['/'])
        } else {
          this.user_id = data.data._id
        }
      })
    this._service.all_data()
        .then(data => {
          if(data.status) {
            for(let user of data.data) {
              for(let product of user.selling) {
                this.products.push({
                  seller: user.name, seller_id: user._id, product_id: product._id, title: product.title, price: product.price,
                  description: product.description, category: product.category, time: new Date(product.createdAt), status: false,
                  calculated_time: `${new Date(product.createdAt)}`.slice(8, 10) + `${new Date(product.createdAt)}`.slice(11,15)
                                + `${new Date(product.createdAt)}`.slice(16, 18) + `${new Date(product.createdAt)}`.slice(19, 21)
                                + `${new Date(product.createdAt)}`.slice(22, 24),

                })
              }
            }
          this.products.sort( (a,b) => { return Number(b.calculated_time) - Number(a.calculated_time)})
          }
          for(let product of this.products) {
            var val: any, arr = []
            for(let xter of product.price) {
              if(xter == '.') {
                break
              }
              if(!isNaN(xter) ) {
                arr.push(xter)
              }
            }
            val = arr.join('')
            product.calculated_price = Number(val)
          }
        })

  }
  expand(ind) {
    for(var i=0; i<this.products.length; i++) {
      if(ind == i) {
        this.products[i].status = !this.products[i].status
        return
      }
    }
  }
  confirm_delete(title, product_id, index) {
    var result = confirm(`Are you sure you want to delete ${title}?`)
    if(result) {
      this._service.delete_product(product_id)
        .then(data => {
          if(data.status) {
            this.products.splice(index, 1)
          }
        })
    }
  }

}
