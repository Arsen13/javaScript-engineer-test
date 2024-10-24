import Hero from "../Hero/Hero";
import css from "./Heros.module.css";

const Heros = ({ herosList }) => {

    return (
        <div className={css.heros}>
            {herosList.map((hero) => (
                <Hero 
                    key={hero._id}
                    nickname={hero.nickname}
                    image={hero.images}
                />
            ))}
        </div>
    )
};

export default Heros;