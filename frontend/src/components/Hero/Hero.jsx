import css from  './Hero.module.css'

const Hero = () => {
    return (
        <li className={css.hero}>
            <img className={css.image} src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"/>
            <p className={css.nickname}>Superhero name</p>
            <button>More info</button>
        </li>
    )
};

export default Hero;