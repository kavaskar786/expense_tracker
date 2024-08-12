const router = require('express').Router()

router.get('/',(re,res)=>{
    res.send('hello world')
})

module.exports = router