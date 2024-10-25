import CreateUpdateForm from "../CreateUpdateForm/CreateUpdateForm";
import css from './UpdateHero.module.css';

const UpdateHero = ({ register, handleSubmit, onSubmit, errors, isSubmitting, onClose }) => {
    return (
        <>
            <div className={css.header}>
                <h2>Update hero information</h2>
                <p>You can update as many field as you want</p>
                <button onClick={onClose}>Close</button>
            </div>
            
            <CreateUpdateForm 
                register={register} 
                handleSubmit={handleSubmit} 
                onSubmit={onSubmit}
                errors={errors} 
                isSubmitting={isSubmitting} 
            />
        </>
    )
};

export default UpdateHero;