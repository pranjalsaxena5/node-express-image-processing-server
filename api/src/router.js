const Router = require('express').Router;
const storage = require('multer').diskStorage({
    destination: 'api/uploads/',
    filename: filename
});
const router = Router();
const upload = storage({
    fileFilter: fileFilter(),
    storage: storage
});


function filename(request, file, callback) {
    callback(null, file.originalname);
}

function fileFilter(request, file, callback) {
    if (file.mimetype !== 'image/png') {
        request.fileValidationError = 'Wrong file type';
        callback(null, false, new Error('Wrong file type'))
    }
    else {
        callback(null, true);
    }
}

router.post('/upload', upload.single('photo'), (request, response) => {
    if (request.hasOwnProperty('fileValidationError')){
        return response.status(400).json({
            error: request.fileValidationError,
        })
    } else {
        return response.status(201).json({
            success: true
        })
    }
})
module.exports = router;
