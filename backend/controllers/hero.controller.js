const Hero = require("../models/hero.model");
const { uploadToCloudinary, deleteFromCloudinary } = require("../utils/fileUpload");

const createHero = async (req, res) => {
    try {
        const { 
            nickname, 
            real_name, 
            origin_description, 
            superpowers, 
            catch_phrase
        } = req.body;

        if (!nickname) return res.status(404).json({ error: "Nickname is required" });
        if (!real_name) return res.status(404).json({ error: "Real name is required" });
        if (!origin_description) return res.status(404).json({ error: "Origin description is required" });
        if (!superpowers) return res.status(404).json({ error: "Superpowers is required" });
        if (!catch_phrase) return res.status(404).json({ error: "Catch phrase is required" });
        if (!req.file) return res.status(404).json({ error: "No file uploaded" });

        const uploadImg = await uploadToCloudinary(req.file);

        const newHero = new Hero({
            nickname,
            real_name,
            origin_description, 
            superpowers, 
            catch_phrase,
            images: uploadImg.secure_url,
        });

        await newHero.save();
        res.status(200).json(newHero);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getAllHero = async (req, res) => {
    try {
        const heros = await Hero.find();

        if (heros.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json({ heros });

    } catch (error) {
        console.error("Error in getAllHero controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getHeroById = async (req, res) => {
    try {
        const heroId = req.params.id;

        const hero = await Hero.findById(heroId);

        if (!hero) {
            return res.status(404).json({ error: "Hero not found" });
        }

        res.status(200).json(hero);

    } catch (error) {
        console.error("Error in getHeroById controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateHeroById = async (req, res) => {
    try {
        const heroId = req.params.id;
        const {
            nickname, 
            real_name, 
            origin_description, 
            superpowers, 
            catch_phrase,
        } = req.body;

        if (!nickname && !real_name && !origin_description && !superpowers && !catch_phrase && !req.file) {
            return res.status(400).json({ error: "No changes provided" });
        }

        const hero = await Hero.findById(heroId);

        if (!hero) {
            return res.status(404).json({ error: "Hero not found" });
        }

        if (nickname) hero.nickname = nickname;
        if (real_name) hero.real_name = real_name;
        if (origin_description) hero.origin_description = origin_description;
        if (superpowers) hero.superpowers = superpowers;
        if (catch_phrase) hero.catch_phrase = catch_phrase;
        if (req.file) {
            if (hero.images) {
                const publicId = 'hero_pics/' + hero.images.split('/').pop().split('.')[0];
                await deleteFromCloudinary(publicId);
            }
            const uploadedImg = await uploadToCloudinary(req.file);
            hero.images = uploadedImg.secure_url;
        }

        await hero.save();

        res.status(200).json(hero);

    } catch (error) {
        console.error("Error in updateHeroById controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteHeroById = async (req, res) => {
    try {
        const heroId = req.params.id;

        const hero = await Hero.findById(heroId);

        if (!hero) {
            return res.status(404).json({ error: "Hero not found" });
        }

        if (hero.images) {
            const publicId = 'hero_pics/' + hero.images.split('/').pop().split('.')[0];
            await deleteFromCloudinary(publicId);
        }

        await Hero.deleteOne({ _id: hero._id });


        return res.status(200).json({ message: "Hero deleted successfully" });

    } catch (error) {
        console.error("Error in deleteHeroById controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { createHero, getAllHero, getHeroById, updateHeroById, deleteHeroById };