const express = require('express');
const multer = require('multer');
const { createHero, getAllHero, getHeroById, updateHeroById, deleteHeroById } = require('../controllers/hero.controller');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/createHero', upload.single('images'), createHero);
router.get('/allHeros', getAllHero);
router.get('/getHero/:id', getHeroById);
router.put('/updateHero/:id', upload.single('images'), updateHeroById);
router.delete('/deleteHero/:id', deleteHeroById);

module.exports = router;