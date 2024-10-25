import { useForm } from 'react-hook-form';
import css from './CreateHero.module.css';
import { useNavigate } from 'react-router-dom';
import axiosIntance from '../../utils/axiosInstance';
import CreateUpdateForm from '../../components/CreateUpdateForm/CreateUpdateForm';

const CreateHero = () => {

    const { 
        register, 
        handleSubmit, 
        setError,
        formState: { errors, isSubmitting } 
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        
        const formData = new FormData();
        formData.append('nickname', data.nickname);
        formData.append('real_name', data.real_name);
        formData.append('origin_description', data.origin_description);
        formData.append('superpowers', data.superpowers);
        formData.append('catch_phrase', data.catch_phrase);
        formData.append('images', data.images[0]);

        try {
            const res = await axiosIntance.post(`/createHero`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            if (res) {
                navigate('/');
            }
        } catch (error) {
            setError("root", {
                message: "Something went wrong. Try again later",
            });
        }
    };

    return (
        <>
            <div className={css.header}>
                <h1 className={css.text}>Add new Hero</h1>
                <button onClick={() => navigate('/')}>Home</button>
            </div>

            <CreateUpdateForm 
                register={register} 
                handleSubmit={handleSubmit} 
                onSubmit={onSubmit}
                errors={errors} 
                isSubmitting={isSubmitting}
                required={'This field is required'}
            />    
        </>

    )
};

export default CreateHero;