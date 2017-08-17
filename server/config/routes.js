var store = require('../controllers/methods.js')
var path = require('path')

module.exports = function (app) {
  app.post('/create_user', store.create_user)
  app.post('/validate_user', store.validate_user)
  app.get('/log_out', store.log_out)
  app.post('/create_product', store.create_product)
  app.get('/user_selling', store.user_selling)
  app.get('/current_user', store.current_user)
  app.get('/all_data', store.all)
  app.get('/delete_product/:id', store.delete_product)
  app.post('/update_product/:id', store.update_product)

  app.all('*', (request, response) => {
    response.sendFile(path.resolve('./client/dist/index.html'))
  })
}
