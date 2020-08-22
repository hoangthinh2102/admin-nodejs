const model = require('./model')

const handlers = {
    async findMany(req, res, next) {
        try {
            let categories = await model.find({})
            res.json(categories)
        } catch (err) {
            next(err)
        }
    },
    async findOne(req, res, next) {
        try {
            let id = req.params.id
            let category = await model.findById(id)
            res.json(category)
        } catch (err) {
            next(err)
        }
    },
    async create(req, res, next) {
        try {
            let data = req.body

            let category = await model.create(data)
            res.json(category)
        } catch (err) {
            next(err)
        }
    },
    async update(req, res, next) {
        try {
            let data = req.body
            let id = data._id
            
            if(!id){
                throw new Error('Missing category id!')
            }

            let category = await model.findByIdAndUpdate(
                id,
                data,
                {
                    new: true
                }
            )

            res.json(category)
        } catch (err) {
            next(err)
        }
    },
    async delete(req, res, next) {
        try {
            let id = req.params.id
            
            let category = await model.findByIdAndDelete(id)
            res.json(category)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = handlers;