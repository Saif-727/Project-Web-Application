const express=require('express')
const router=express.Router()
const {getTrainess,creatTrainess,updateTrainess,deleteTrainess}=require('../controller/trainessController')

const {permission}=require('../middleware/authPermission')

router.route('/').get(permission, getTrainess).post(permission, creatTrainess)

router.route('/:id').put(permission, updateTrainess).delete(permission, deleteTrainess)


module.exports=router