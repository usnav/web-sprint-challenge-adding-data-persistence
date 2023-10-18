// build your `/api/tasks` router here
const router = require('express').Router()

const Task = require('./model')


router.get('/', (req, res, next) => {
    Task.getAll()
        .then(task => {
            const allTasks = task.map((e) => {
                return {...e, task_completed: e.task_completed ? true : false}
            })
            res.status(200).json(allTasks)
        })
        .catch(next)
 })

 router.post('/', (req, res, next) => {
    Task.create(req.body)
    .then(task => {
        const newTasks = {
            ...task, 
            task_completed: task.project_completed ? 
            true : false
        }
        res.status(201).json(newTasks)
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