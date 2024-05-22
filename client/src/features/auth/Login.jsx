import React, { useEffect, useState, useRef } from 'react';
import { useLoginMutation } from './authApiSlice';
import { setToken } from './authSlice';
import { useDispatch } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import Register from './Register';

export default function Login() {
    const [visible, setVisible] = useState(false);
    const [visibleReg, setVisibleReg] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginFunc, { isError, error, isSuccess, data }] = useLoginMutation()
    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
            if (localStorage.getItem('role') === 'user')
                navigate("/layoutUser")
            if (localStorage.getItem('role') === 'edmit')
                navigate("/layoutManeger")
        }
        if (isError) {
            setVisibleReg(true)
        }
    }, [isSuccess, isError])

    const toast = useRef(null);
    const handleOpenLogin = () => {
        setVisible(true)
    }

    const defaultValues = {
        identity: '',
        password: ''
    };
    const {
        control,
        formState: { errors },
        handleSubmit,
        reset, 
        register,
        watch,
    } = useForm({ defaultValues });

    const onSubmitLogin = (data) => {
        console.log(data)
        loginFunc(data);
        reset();
    };
    const onRegister = () => {
        setVisibleReg(false);
    };
    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };
    
    return (

        <>
<div style={{"background":"url(./111.jpg)","height":"900px","backgroundRepeat":"repeat-y", "backgroundSize":"cover"}}>
        <div  style={{textAlign:"center"}}>
        
            <Button label="Login" icon="pi pi-user" onClick={() => setVisible(true)} style={{backgroundColor:"#4D749A", borderColor:"#4D749A", marginLeft:"30px",marginRight:"5px", marginTop:"80px"}}/> 
            <span></span>
             <Button label="Register" icon="pi pi-user-plus" onClick={() => setVisibleReg(true)} style={{backgroundColor:"#4D749A", borderColor:"#4D749A"}}/>
            {visibleReg?<Register visibleReg={visibleReg} setRegister={onRegister} handleOpenLogin={handleOpenLogin} role='user'></Register>:<></>}
          

            <Dialog

                visible={visible}
                modal
                onHide={() => setVisible(false)}
                content={({ hide }) => (

                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top)' }}>

                        <Button label="Login" icon="pi pi-user" style={{backgroundColor:"#4D749A", borderColor:"#4D749A"}}/>

                        <div className="inline-flex flex-column gap-2">
                            <div className="card flex justify-content-center">
                                <form onSubmit={handleSubmit(onSubmitLogin)} className="flex flex-column gap-2">
                                    <Toast ref={toast} />
                                    <Controller
                                        name="identity"
                                        control={control}
                                        rules={{ required: 'Name - Surname is required.' }}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                                <span className="p-float-label">
                                                    <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })}
                                                        onChange={(e) => field.onChange(e.target.value)}
                                                        {...register("identity", {
                                                            maxLength: 9,
                                                            minLength: 9,
                                                            pattern: /^[0-9]+$/i,
                                                        })} />
                                                    <label htmlFor={field.name}>Name - Surname</label>
                                                    {errors?.identity?.type === "maxLength" && (
                                                        <p>Identity cannot exceed 9 characters</p>
                                                    )}
                                                    {errors?.identity?.type === "minLength" && (
                                                        <p>Identity cannot less than 9 characters</p>
                                                    )}
                                                    {errors?.identity?.type === "pattern" && (
                                                        <p>Namerical characters only</p>
                                                    )}
                                                </span>
                                                {getFormErrorMessage(field.name)}
                                            </>
                                        )}
                                    />
                                    <Controller
                                        name="password"
                                        control={control}
                                        rules={{ required: 'Password - is required.' }}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                                <span className="p-float-label">
                                                    <InputText id={field.name} value={field.value} type="password" className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                                    <label htmlFor={field.name}>Password</label>
                                                </span>
                                                {getFormErrorMessage(field.name)}
                                            </>
                                        )}
                                    />

                                    <Button label="Sign-In" type="submit" style={{backgroundColor:"#4D749A", borderColor:"#4D749A"}}/>
                                    <Button label="Cancel" type="submit" onClick={(e) => hide(e)} style={{backgroundColor:"#4D749A", borderColor:"#4D749A"}} ></Button>

                                </form>
                            </div>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>

        </div>
        </>

    )
}