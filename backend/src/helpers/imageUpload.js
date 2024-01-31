const multer= require('multer')

const imageUpload=multer({
    dest:'/upload',
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
            return cb(new Error('Invalid Image'))
        }

        cb(undefined,true)
    }
})

module.exports=imageUpload