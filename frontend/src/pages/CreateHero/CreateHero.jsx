import { useForm } from 'react-hook-form';
import css from './CreateHero.module.css';
import { useNavigate } from 'react-router-dom';
import axiosIntance from '../../utils/axiosInstance';

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
            console.log("data:", data);
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
            <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
                <input 
                    {...register("nickname", {
                        required: 'Nickname is required',
                    })}
                    type="text" 
                    placeholder="Nick name" 
                    className={css.input}
                />
                {errors.nickname && <div className={css.error}>{errors.nickname.message}</div>}
                
                <input 
                    {...register("real_name", {
                        required: 'Real name is required'
                    })} 
                    type="text" 
                    placeholder="Real name" 
                    className={css.input}
                />
                {errors.real_name && <div className={css.error}>{errors.real_name.message}</div>}
                
                <input 
                    {...register("origin_description", {
                        required: "Origin description is required"
                    })}
                    type='text'
                    placeholder='Origin description'
                    className={css.input}
                />
                {errors.origin_description && <div className={css.error}>{errors.origin_description.message}</div>}

                <input 
                    {...register("superpowers", {
                        required: "Superpowers is required"
                    })}
                    type='text'
                    placeholder='Superpowers'
                    className={css.input}
                />
                {errors.superpowers && <div className={css.error}>{errors.superpowers.message}</div>}
                
                <input 
                    {...register("catch_phrase", {
                        required: "Catch phrase is required"
                    })}
                    type='text'
                    placeholder='Catch phrase'
                    className={css.input}
                />
                {errors.catch_phrase && <div className={css.error}>{errors.catch_phrase.message}</div>}

                <input 
                    {...register("images", {
                        required: "Image is required"
                    })}
                    type='file'
                    name='images'
                    className={css.inputFile}
                />
                {errors.images && <div className={css.error}>{errors.images.message}</div>}
                
                <button disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Loading..." : "Submit"}
                </button>
                {errors.root && <div className={css.error}>{errors.root.message}</div>}
            </form>        
        </>

    )
};

export default CreateHero;