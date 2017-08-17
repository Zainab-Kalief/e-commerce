var mongoose = require('mongoose')
var User = mongoose.model('User')
var Product = mongoose.model('Product')

module.exports = {
  create_user: (request, response) => {
    User.findOne({name: request.body.name})
      .then(data => {
        if (data) {
          response.json({data: 'Username is taken', status: false})
        } else {
          var user = new User({name: request.body.name, password: request.body.password})
          user.save()
            .then(data => {
              request.session.user_id = data._id
              response.json({data: data, status: true})
            })
            .catch(error => response.json({data: error, status: false}))
        }
      })
  },
  validate_user: (request, response) => {
    User.findOne({name: request.body.name, password: request.body.password})
      .then(data => {
        if(data) {
          request.session.user_id = data._id
          response.json({data: data, status: true})
        } else {
          response.json({data: 'Invalid Credentials', status: false})
        }
      })
  },
  log_out: (request, response) => {
    request.session.destroy()
    response.redirect('/')
  },
  create_product: (request, response) => {
    User.findOne({_id: request.session.user_id})
      .then(user => {
        if(user) {
          var product = new Product({title: request.body.title, price: request.body.price, category: request.body.category,
                                        description: request.body.description, _seller: user._id})
          product.save()
            .then(data => {
              user.selling.push(product)
              user.save()
                .then(saved => {
                  response.json({data: data, status: true})
                })
                .catch(error => response.json({data: error, status: false}))
            })
            .catch(error => response.json({data: error, status: false}))
        } else {
          response.redirect('/')
        }
      })
  },
  user_selling: (request, response) => {
    User.findOne({_id: request.session.user_id})
      .populate('selling')
      .exec()
      .then(data => {
        if(data) {
          response.json({data: data, status: true})
        } else {
          response.json({data: 'No user', status: false})
        }
      })

  },
  current_user: (request, response) => {
    User.findOne({_id: request.session.user_id})
    .then(data => {
      if(data) {
        response.json({data: data, status: true})
      } else {
        response.json({data: 'No user', status: false})
      }
    })
  },
  all: (request, response) => {
    User.find()
    .populate('selling')
    .exec()
    .then(data => {
      if(data) {
        response.json({data: data, status: true})
      } else {
        response.json({data: 'No user', status: false})
      }
    })
  },
  delete_product: (request, response) => {
    Product.remove({_id: request.params.id})
      .then(data => response.json({data: 'Successful', status: true}))
      .catch(error => response.json({data: 'Unsuccesful', status: false}))
  },
  update_product: (request, response) => {
    Product.update({_id: request.params.id}, {$set: {title: request.body.title, price: request.body.price, category: request.body.category, description: request.body.description}})
      .then(data => response.json({data: data, status: true}))
      .catch(error => response.json({data: 'Unsuccesful', status: false}))
  }

}
