import { useLocation, useNavigate } from "react-router-dom";
import css from './HeroInfo.module.css';
import axiosInstance from '../../utils/axiosInstance';

const HeroInfo = () => {

    const { state: hero } = useLocation();
    const navigate = useNavigate();

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

    return (
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
                <button>Update Info</button>
                <button onClick={() => deleteHero(hero._id)}>Delete hero</button>
            </div>
        </>
    )
};

export default HeroInfo;