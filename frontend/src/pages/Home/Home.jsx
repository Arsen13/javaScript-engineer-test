import { useEffect, useState } from "react";
import Heros from "../../components/Heros/Heros";
import css from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const Home = () => {

    const navigate = useNavigate();
    const [herosList, setHerosList] = useState([]);
  
    const createNewHero = () => {
        navigate("/createHero")
    };

    const getAllHeros = async () => {
        try {
            const response = await axiosInstance.get("/allHeros");
            if (response.data.heros) {
                setHerosList(response.data.heros);
            }
        } catch (error) {
            console.log("An unexpected error occured. Please try again");
        }
    };

    useEffect(() => {
        getAllHeros();
    }, []);
    
    return (
        <main className={css.main}>
            <div className={css.header}>
                <h1 className={css.title}>Superhero database</h1>
                <button onClick={createNewHero}>Create new Hero</button>
            </div>
            
            <Heros herosList={herosList} />
        </main>
    )
}

export default Home;