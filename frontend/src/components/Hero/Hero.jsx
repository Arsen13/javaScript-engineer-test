import css from  './Hero.module.css'

const Hero = ({ nickname, image, moreInfo, heroId }) => {
    return (
        <li className={css.hero}>
            <img className={css.image} src={image} />
            <p className={css.nickname}>{nickname}</p>
            <button onClick={() => moreInfo(heroId)}>More info</button>
        </li>
    )
};

export default Hero;