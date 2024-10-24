import Hero from "../Hero/Hero";
import css from "./Heros.module.css"

const Heros = () => {
    return (
        <div className={css.heros}>
            <Hero />
            <Hero />
            <Hero />
            <Hero />
            <Hero />
            <Hero />
            <Hero />
            <Hero />
        </div>
    )
};

export default Heros;