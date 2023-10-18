// build your `Resource` model here
const db = require('../../data/dbConfig')

const getAll = () => {
    return db('resources')
}

const getById = (resource_id) => {
    return db('resources').where('resource', resource_id).first()
}

const create = resource => {
    return db('resources').insert(resource)
}

module.exports = {
    getAll, 
    getById, 
    create
}