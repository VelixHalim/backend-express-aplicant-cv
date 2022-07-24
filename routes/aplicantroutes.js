const express = require('express')
const {postDataCV, getDataCV, getDetailDataCV,updateDataCV,deleteDataCV}=require('../controllers/cv') 
const router = express.Router()

router
    .route('/postDataCV')
    .post(postDataCV)

router 
    .route('/getAllDataCV')
    .get(getDataCV)

router
    .route('/getDetailDataCV/:id')
    .get(getDetailDataCV)

router
    .route('/updateDataCV')
    .put(updateDataCV)

router
    .route('/deleteDataCV/:id')
    .delete(deleteDataCV)

module.exports = router