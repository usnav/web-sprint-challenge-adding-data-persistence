// build your `/api/resources` router here

const router = require('express').Router()

const Resource = require('./model')


router.get('/', (req, res, next) => {
    Resource.getAll()
    .then(resources => {
        res.json(resources)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
   Resource.create(req.body)
   .then(e => {
    res.status(201).json(req.body)
   })
   .catch(next)
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        customMessage: 'something went wrong inside the project router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router