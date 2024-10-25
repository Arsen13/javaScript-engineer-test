import css from './CreateUpdateForm.module.css';

const CreateUpdateForm = ({ register, handleSubmit, onSubmit, errors, isSubmitting, required }) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
                <input 
                    {...register("nickname", {
                        required: required,
                    })}
                    type="text" 
                    placeholder="Nick name" 
                    className={css.input}
                />
                {errors.nickname && <div className={css.error}>{errors.nickname.message}</div>}
                
                <input 
                    {...register("real_name", {
                        required: required,
                    })} 
                    type="text" 
                    placeholder="Real name" 
                    className={css.input}
                />
                {errors.real_name && <div className={css.error}>{errors.real_name.message}</div>}
                
                <input 
                    {...register("origin_description", {
                        required: required,
                    })}
                    type='text'
                    placeholder='Origin description'
                    className={css.input}
                />
                {errors.origin_description && <div className={css.error}>{errors.origin_description.message}</div>}

                <input 
                    {...register("superpowers", {
                        required: required,
                    })}
                    type='text'
                    placeholder='Superpowers'
                    className={css.input}
                />
                {errors.superpowers && <div className={css.error}>{errors.superpowers.message}</div>}
                
                <input 
                    {...register("catch_phrase", {
                        required: required,
                    })}
                    type='text'
                    placeholder='Catch phrase'
                    className={css.input}
                />
                {errors.catch_phrase && <div className={css.error}>{errors.catch_phrase.message}</div>}

                <input 
                    {...register("images", {
                        required: required,
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
    )
};

export default CreateUpdateForm;