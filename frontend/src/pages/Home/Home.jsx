import { useEffect, useState } from "react";
import Heros from "../../components/Heros/Heros";
import css from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHeros, HerosAction } from '../../store/store';
import LinkList from "../../components/LinkList/LinkList";

const Home = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const heros = useSelector(state => state.heroStore.heros);

    const herosPerPage = useSelector(state => state.heroStore.herosPerPage);
    const currentPage = useSelector(state => state.heroStore.currentPage);

    const totalPages = Math.ceil(heros.length / herosPerPage);
    const pages = [...Array(totalPages + 1).keys()].slice(1);
    const indexOfLastHero = currentPage * herosPerPage;
    const indexOfFirstHero = indexOfLastHero - herosPerPage;

    const visibleHeros = heros.slice(indexOfFirstHero, indexOfLastHero);
  
    const createNewHero = () => {
        navigate("/createHero")
    };

    const moreInfo = async (heroId) => {
        try {
            const response = await axiosInstance.get(`/getHero/${heroId}`);
            
            if (response.data) {
                navigate("/infoAboutHero", { state: response.data });
            }
        } catch (error) {
            console.error("An unexpected error occured. Please try again", error.message);
        }
    };

    const navigatePrev = () => {
        if (currentPage !== 1) {
            dispatch(HerosAction.onNavigatePrev());
        }
    };

    const navigateNext = () => {
        if (currentPage !== totalPages) {
            dispatch(HerosAction.onNavigateNext());
        }
    };

    const handleCurrentPage = (page) => {
        dispatch(HerosAction.onClickCurrentPage(page));
    }
    
    useEffect(() => {
        dispatch(fetchAllHeros());
    }, [dispatch]);
    
    return (
        <main className={css.main}>
            <div className={css.header}>
                <h1 className={css.title}>Superhero database</h1>
                <button onClick={createNewHero}>Create new Hero</button>
            </div>

            <Heros herosList={visibleHeros} moreInfo={moreInfo} />
            <LinkList 
                pages={pages} 
                navigatePrev={navigatePrev} 
                navigateNext={navigateNext} 
                handleCurrentPage={handleCurrentPage}    
            />
        </main>
    )
}

export default Home;