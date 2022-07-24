const Datasource= require('../datasources/Datasource')
const asyncHandler = require('../middlewares/async')

exports.postDataCV = asyncHandler(async (req,res,next)=>{
    console.log(req.body)
    const nama_lengkap =req.body.cv.namalengkap
    const nomortelepon = req.body.cv.nomortelpon
    const email=req.body.cv.email
    const linkedin= req.body.cv.linkedin
    const gender = req.body.cv.gender
    const alamat = req.body.cv.alamat
    const summary = req.body.cv.summary
    const education = req.body.education
    const experience = req.body.experience
    const result = await Datasource().CVDatasource.postDataCV(nama_lengkap,nomortelepon,email,linkedin,gender,alamat,summary,education,experience)
    res.status(200).json({
        success:true,
        data:result
    })
})

exports.getDataCV = asyncHandler(async (req,res,next)=>{
    const result =await Datasource().CVDatasource.getAllDataCV()
    res.status(200).json({
        success:true,
        data:result
    })
})

exports.getDetailDataCV = asyncHandler(async (req,res,next)=>{
    const id = req.params.id
    console.log(req.params)
    const result =await Datasource().CVDatasource.getDetailDataCV(id)
    res.status(200).json({
        success:true,
        data:result
    })
})

exports.updateDataCV = asyncHandler(async (req,res,next)=>{
    
})

exports.deleteDataCV = asyncHandler(async (req,res,next)=>{
    const id = req.params.id
    console.log(req.params)
    const result =await Datasource().CVDatasource.deleteDataCV(id)
    res.status(200).json({
        success:true,
        data:result
    })
})
