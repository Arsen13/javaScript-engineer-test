import css from  './Hero.module.css'

const Hero = ({ nickname, image }) => {
    return (
        <li className={css.hero}>
            <img className={css.image} src={image} />
            <p className={css.nickname}>{nickname}</p>
            <button>More info</button>
        </li>
    )
};

export default Hero;