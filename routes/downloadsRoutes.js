const { Router } = require('express');
const userController = require('../controllers/userController');
const upload = require('../middleware/MulterConfig');

const router = Router();

router.get('/upload', userController.downloadImage_get)
router.post('/upload', upload.single('profile-file'), userController.downloadImage)

module.exports = router;