import Hero from "../Hero/Hero";
import css from "./Heros.module.css";

const Heros = ({ herosList, moreInfo }) => {

    return (
        <div className={css.heros}>
            {herosList.map((hero) => (
                <Hero 
                    key={hero._id}
                    nickname={hero.nickname}
                    image={hero.images}
                    moreInfo={moreInfo}
                    heroId={hero._id}
                />
            ))}
        </div>
    )
};

export default Heros;