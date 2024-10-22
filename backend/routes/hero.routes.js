const express = require('express');
const multer = require('multer');
const { createHero, getAllHero, getHeroById, updateHeroById } = require('../controllers/hero.controller');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/createHero', upload.single('images'), createHero);
router.get('/allHeros', getAllHero);
router.get('/getHero/:id', getHeroById);
router.put('/updateHero/:id', upload.single('images'), updateHeroById)

module.exports = router;