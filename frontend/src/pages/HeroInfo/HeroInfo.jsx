import { useLocation, useNavigate } from "react-router-dom";
import css from './HeroInfo.module.css';
import axiosInstance from '../../utils/axiosInstance';
import { useState } from "react";
import UpdateHero from "../../components/UpdateHero/UpdateHero";
import { useForm } from "react-hook-form";

const HeroInfo = () => {

    const [isUpdate, setIsUpdate] = useState(false);
    let { state: hero } = useLocation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm();

    const deleteHero = async (heroId) => {
        try {
            const response = await axiosInstance.delete(`deleteHero/${heroId}`);

            if (response) {
                navigate('/');
            }
        } catch (error) {
            console.error("An unexpected error occured. Please try again", error.message);
        }
    }

    const onSubmit = async (data) => {

        const formData = new FormData();
        data.nickname !== '' ? formData.append('nickname', data.nickname) : hero.nickname;
        data.real_name !== '' ? formData.append('real_name', data.real_name) : hero.real_name;
        data.origin_description !== '' ? formData.append('origin_description', data.origin_description) : hero.origin_description;
        data.superpowers !== '' ? formData.append('superpowers', data.superpowers) : hero.superpowers;
        data.catch_phrase !== '' ? formData.append('catch_phrase', data.catch_phrase) : hero.catch_phrase;
        data.images.length !== 0 ? formData.append('images', data.images[0]) : hero.images;
        
        try {
            const isFormDataEmpty = !Array.from(formData.keys()).length;
            if (isFormDataEmpty) {
                setError("root", {
                    message: "You need enter some data into field"
                })
            } else {
                const response = await axiosInstance.put(`/updateHero/${hero._id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });

                if (response) {
                    navigate('/');
                }
            }
            
        } catch (error) {
            console.error("An unexpected error occured. Please try again", error.message)
        }
    }

    return (
        <>
            {isUpdate === true ?  
            (<UpdateHero 
                register={register} 
                handleSubmit={handleSubmit} 
                onSubmit={onSubmit}
                errors={errors} 
                isSubmitting={isSubmitting} 
                onClose={() => setIsUpdate(false)}
            />)
            : (
            <>
                <div className={css.header}>
                    <h1 className={css.text}>Hero info</h1>
                    <button onClick={() => navigate('/')}>Home</button>
                </div>

                <div className={css.heroCard}> 
                    <img src={hero.images} />
                    <p className={css.nickname}>{hero.nickname}</p>
                    <p className={css.realname}>{hero.real_name}</p>
                    <p className={css.desc}><i>Desc: {hero.origin_description}</i></p>
                    <p className={css.powers}>Superpowers: {hero.superpowers}</p>
                    <p className={css.phrase}>Catch phrase: {hero.catch_phrase}</p>
                </div>
                <div className={css.buttonsContainer}>
                    <button onClick={() => setIsUpdate(true)}>Update Info</button>
                    <button onClick={() => deleteHero(hero._id)}>Delete hero</button>
                </div>
            </>
            )
        }
        </>
    )
};

export default HeroInfo;