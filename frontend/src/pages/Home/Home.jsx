import Heros from "../../components/Heros/Heros";
import css from './Home.module.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate()

    const createNewHero = () => {
        navigate("/createHero")
    }
    
    return (
        <main className={css.main}>
            <div className={css.header}>
                <h1 className={css.title}>Superhero database</h1>
                <button onClick={createNewHero}>Create new Hero</button>
            </div>
            <Heros />
        </main>
    )
}

export default Home;