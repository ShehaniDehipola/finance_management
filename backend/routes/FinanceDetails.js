const express = require('express')
const {
    getFinanceDetails,
    getFinanceDetail,
    createFinanceDetail,
    deleteFinanceDetail,
    updateFinanceDetail
} = require('../controllers/FinanceDetailsController')

const router = express.Router()

//GET all finance details
router.get('/', getFinanceDetails)

//GET a single detail
router.get('/:id', getFinanceDetail)

//POST a new detail
router.post('/', createFinanceDetail)

//DELETE a detail
router.delete('/:id', deleteFinanceDetail)

//UPDATE a detail
router.patch('/:id', updateFinanceDetail)

module.exports = router