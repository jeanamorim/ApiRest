const multer = require('multer');



module.exports = (multer({


    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './C:/Users/jeana/Desktop/ApiComBabel/uploads');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now().toString() + '-' + file.originalname);

        }
    }),



}));


