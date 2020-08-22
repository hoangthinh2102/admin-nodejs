const model = require('./model')
const mongoose = require('mongoose')

const handlers = {

    /**
     * 
     * @description: query: 
     *  pageIndex: Number
        pageSize: Number
        count: Boolean
        sort: '1' | 'asc' | '-1' | 'desc'
        sortBy: field name (ex: 'title')
        filter & search: String
     */
    async findMany(req, res, next) {
        try {
            let {
                pageIndex = 1,
                pageSize = 5,
                count,
                sort = 'asc',
                sortBy = 'title',
                search = '',
                categoryId  // ex : filter by categoryId
            } = req.query

            pageIndex = parseInt(pageIndex);
            pageSize = parseInt(pageSize);
            count = !!count;

            let skip = (pageIndex - 1) * pageSize;
            let limit = pageSize;
            let conditions = {};

            if (search) {
                // find item with title contains search string
                conditions.title = new RegExp(search, 'i')      // i : Không phân biệt chữ hoa / thường
            }

            if(categoryId){
                conditions.categories = mongoose.Types.ObjectId(categoryId)
            }

            if (count) {
                let count = await model.countDocuments(conditions)
                res.json({ count })
            }
            else {
                let items = await model
                    .find(conditions)
                    .skip(skip)
                    .limit(limit)
                    .sort({
                        [sortBy]: sort      // 
                    })
                    .populate('categories', 'title')

                res.json(items)
            }
        } catch (err) {
            next(err)
        }
    },
    async findOne(req, res, next) {
        try {
            let id = req.params.id
            let item = await model
                .findById(id)
                .populate('categories', 'title')
            // let item = await model.findOne({
            //     _id: id
            // })

            res.json(item)
        } catch (err) {
            next(err)
        }
    },
    async create(req, res, next) {
        try {
            let data = req.body
            let item = await model.create(data)

            res.json(item)
        } catch (err) {
            next(err)
        }
    },
    async update(req, res, next) {
        try {
            let data = req.body
            let id = data._id

            if (!id) {
                throw new Error('Missing item id!')
            }

            let item = await model.findByIdAndUpdate(
                id,
                data,
                {
                    new: true
                }
            )

            res.json(item)
        } catch (err) {
            next(err)
        }
    },
    async delete(req, res, next) {
        try {
            let id = req.params.id

            let item = await model.findByIdAndDelete(id)

            res.json(item)
        } catch (err) {
            next(err)
        }
    },
}


module.exports = handlers;