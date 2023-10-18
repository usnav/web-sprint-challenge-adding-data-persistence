// build your `Task` model here
const db = require('../../data/dbConfig')

const getAll = () => {
    return db('tasks as t').join('projects as p', 't.project_id', 'p.project_id')
}

const getById = (task_id) => {
    return db('tasks').where('task_id', task_id).first()
}

const create = task => {
    return db('tasks').insert(task)
    .then(([id]) => {
        return getById(id)
    })
}

module.exports = {
    getAll, 
    getById, 
    create
}