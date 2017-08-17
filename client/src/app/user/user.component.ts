import { Component, OnInit } from '@angular/core';
import { User } from '../user'
import { Router, ActivatedRoute } from '@angular/router'
import { AmazonService } from '../amazon.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User
  logged_user: User
  access: any

  constructor(private _service: AmazonService, private _router: Router) { }

  ngOnInit() {
    this.user = new User
    this.logged_user = new User
    this.access = {
      status: false,
      count: 3,
      message: '',
    }
  }
  sign_up() {
    this._service.create_user(this.user)
      .then(data => {
        if(data.status) {
          this.user = new User
          this._router.navigate(['/home'])
        } else {
          this.user = new User
          this._router.navigate(['/'])
        }
      })
      .catch(error => console.log(error, '~~~~~~~~~~~'))
  }
  log_in() {
    this._service.validate_user(this.logged_user)
      .then(data => {
        if(data.status) {
          this.logged_user = new User
          this._router.navigate(['/home'])
        } else {
          this.logged_user = new User
          this.access.count -= 1
          this.logged_user = new User
          if(this.access.count == 0) {
            this.access.status = true
            this.access.message = 'Nice try hacker'
          }
        }
      })
  }

}
