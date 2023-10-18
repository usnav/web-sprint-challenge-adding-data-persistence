// build your `/api/projects` router here
const router = require('express').Router()

 const Project = require('./model')

 router.get('/', (req, res, next) => {
    Project.getAll()
        .then(projects => {
            const allProjects = projects.map((e) => {
                return {...e, project_completed: e.project_completed ? true : false}
            })
            res.status(200).json(allProjects)
        })
        .catch(next)
 })

 router.post('/', (req, res, next) => {
    Project.create(req.body)
    .then(project => {
        const newProjects = {
            ...project, 
            project_completed: project.project_completed ? 
            true : false
        }
        res.status(201).json(newProjects)
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