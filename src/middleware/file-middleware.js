const multer = require('koa-multer');
const upload = multer({ dest: './uploads/avatar' });
const pictureUpload = multer({ dest: './uploads/pictures' })
const handleAvatar = upload.single('avatar')
const handlePicture = pictureUpload.array('picture', 10)
module.exports = { handleAvatar, handlePicture }
