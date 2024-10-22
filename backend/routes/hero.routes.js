const express = require('express');
const multer = require('multer');
const createHero = require('../controllers/hero.controller');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/createHero', upload.single('images'), createHero);
router.get('/', () => {});
router.get('/getHero', () => {});

module.exports = router;