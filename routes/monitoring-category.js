const express = require('express')
const router = express.Router()

// Model Monitoring Category
var monitoringCategory = require('../model/category_monitoring')

router.get('/', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    switch (req.session.user.role) {
      case 'admin':
        monitoringCategory.findAll({
          raw: true
        }).then(category => {
          var result = category
          res.render('admin-category-monitoring', {
            title: 'Categoría de monitoreos',
            name: req.session.user.username,
            result: JSON.stringify(result)
          })
        })
        break
      default:
        res.redirect('/')
    }
  } else {
    res.redirect('/login')
  }
})

router.post('/', (req, res) => {
  monitoringCategory.create({
    category: req.body.txtCategory
  }).then(result => {
    res.redirect('/monitoring/category')
  }).catch(err => {
    monitoringCategory.findAll({
      raw: true
    }).then(category => {
      var result = category
      res.render('admin-category-monitoring', {
        title: 'Categoría de monitoreos',
        name: req.session.user.username,
        result: JSON.stringify(result),
        msg: err
      })
    })
  })
})

module.exports = router