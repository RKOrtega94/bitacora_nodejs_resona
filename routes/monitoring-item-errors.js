const express = require('express')
const router = express.Router()

// Model Monitoring Category
var errorItem = require('../model/error_item')
var itemCategory = require('../model/item_category')

router.get('/', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    switch (req.session.user.role) {
      case 'admin':
        errorItem.findAll({
          raw: true,
          include: [{
            model: itemCategory
          }]
        }).then(result => {
          itemCategory.findAll({
            raw: true,
            where: {
              status: 'enabled'
            }
          }).then(category => {
            res.render('admin/items-errors', {
              title: 'Items',
              name: req.session.user.username,
              result: JSON.stringify(result),
              items: JSON.stringify(category)
            })
          })
        })
        break
      default:
        res.redirect('/404')
    }
  } else {
    res.redirect('/login')
  }
})

router.post('/', (req, res) => {
  errorItem.create({
    error: req.body.txtError,
    ItemCategoryId: req.body.txtItem,
    peso: req.body.txtPeso,
    ecac: req.body.txtEcac,
    ecan: req.body.txtEcan,
    ecuf: req.body.txtEcuf,
    status: 'enabled'
  }).then(result => {
    if (result) {
      res.redirect('/monitoring/category/item/errors')
    }
  }).catch(err => {
    res.redirect('/404')
  })
})

module.exports = router