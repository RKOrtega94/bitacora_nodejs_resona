const express = require('express')
const router = express.Router()

// Model Monitoring Category
var itemCategory = require('../model/item_category')
var Category = require('../model/category_monitoring')

router.get('/', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    switch (req.session.user.role) {
      case 'admin':
        itemCategory.findAll({
          raw: true,
          include: [{
            model: Category
          }]
        }).then(result => {
          Category.findAll({
            raw: true,
            where: {
              status: 'enabled'
            }
          }).then(category => {
            res.render('admin/category-items', {
              title: 'Items',
              name: req.session.user.username,
              result: JSON.stringify(result),
              category: JSON.stringify(category)
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
  itemCategory.create({
    item: req.body.txtItem,
    CategoryId: req.body.txtCategory,
    status: 'enabled'
  }).then(result => {
    if (result) {
      res.redirect('/monitoring/category/item')
    }
  }).catch(err => {
    res.redirect('/404')
  })
})

module.exports = router