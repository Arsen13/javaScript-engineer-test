const Hero = require("../models/hero.model");
const { uploadToCloudinary } = require("../utils/fileUpload");

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
}

module.exports = createHero;