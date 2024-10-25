import css from './LinkList.module.css';

const LinkList = ({ pages, navigatePrev, navigateNext, handleCurrentPage }) => {

    return (
        <>
            <p className={css.pageContainer}>
                <span onClick={navigatePrev}>Prev</span>
                {pages.map(page => (
                    <span key={page} onClick={() => handleCurrentPage.call(null, page)}>{page}</span>
                ))}
                <span onClick={navigateNext}>Next</span>
            </p>
        </>
    )
};

export default LinkList;