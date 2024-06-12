const path = require('path')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        if (file.fieldname === 'insurance') {
            callBack(null, './uploads/rider/insurance')
        } else if (file.fieldname === 'license') {
            callBack(null, './uploads/rider/license')
        } else {
            callBack(new Error('Invalid field name ..'))
        }       
    },
    filename: (req, file, callBack) => {
        let ext = path.extname(file.originalname)
        callBack(null, Date.now() + ext)
    }
})

const upload = multer ({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = upload