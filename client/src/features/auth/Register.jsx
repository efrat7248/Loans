import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { useRegisterMutation } from './authApiSlice'
import { useAddUserMutation } from '../user/userApiSlice'
import { Password } from 'primereact/password';
import Login from './Login';
export default function Register({ visibleReg, setRegister, handleOpenLogin, role }) {
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false);
    const [registerFunc, { isError, isSuccess, isLoading, data, error }] = useRegisterMutation()

    const [userFunc, { isError:isErrorUser, isSuccess:isSuccessUser, isLoading:isLoadinguser, data:dataUser, error:erroUserr }] = useAddUserMutation()

    useEffect(() => {
        console.log("55555555555555555555555555" + isSuccessUser);
        if (isSuccess) {
            setRegister()

            handleOpenLogin()
        }
        if (isSuccessUser) {
            setRegister()
            console.log("222222222222");

        }
    }, [isSuccess,isSuccessUser])

    // useEffect(() => {
    //     setVisible(visibleReg)
    // }, [visibleReg])

    const defaultValues = {
        name: '',
        password: '',
        identity: '',
        email: '',
        phone: '',
        address: '',
        role: role
    };

    const {
        control,
        formState: { errors },
        reset,
        register,
        handleSubmit,
        watch,
    } = useForm({ defaultValues });

    const onSubmit = (data) => {
        if (role == 'user')
            registerFunc(data)
        else
            userFunc(data)
        reset();
    };
    const toast = useRef(null);

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <div className="card flex justify-content-center">
            <Dialog
                visible={visibleReg}
                modal
                onHide={() => setRegister(false)}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))', textAlign: 'center' }}>

                        <Button label="Register" icon="pi pi-user-plus" />

                        <div className="inline-flex flex-column gap-2">
                            <div className="card flex justify-content-center">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Controller
                                        name="name"
                                        control={control}
                                        rules={{ required: 'Name is required.' }}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                                <div style={{ marginTop: '1em' }}>
                                                    <span className="p-float-label">
                                                        <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })}
                                                            onChange={(e) => field.onChange(e.target.value)}
                                                            {...register("name", {

                                                                maxLength: 30,
                                                                pattern: /^[A-Za-z]+$/i,
                                                            })} />
                                                        <label htmlFor={field.name} style={{ marginLeft: '1em' }}>Name</label>
                                                        {errors?.name?.type === "maxLength" && (
                                                            <p> Name cannot exceed 30 characters</p>)}
                                                        {errors?.name?.type === "pattern" && (
                                                            <p>Alphabetical characters only</p>)}
                                                    </span>
                                                </div>
                                                {getFormErrorMessage(field.name)}
                                            </>
                                        )}
                                    />
                                    <Controller
                                        name="identity"
                                        control={control}
                                        rules={{ required: 'Identity is required.' }}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                                <div style={{ marginTop: '1em' }}>
                                                    <span className="p-float-label">
                                                        <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })}
                                                            onChange={(e) => field.onChange(e.target.value)}
                                                            {...register("identity", {
                                                                maxLength: 9,
                                                                minLength: 9,
                                                                pattern: /^[0-9]+$/i,
                                                            })} />
                                                        <label htmlFor={field.name} style={{ marginLeft: '1em' }}>Identity</label>
                                                        {errors?.identity?.type === "maxLength" && (
                                                            <p>Identity cannot exceed 9 characters</p>)}
                                                        {errors?.identity?.type === "minLength" && (
                                                            <p>Identity cannot less than 9 characters</p>)}
                                                        {errors?.identity?.type === "pattern" && (
                                                            <p>Namerical characters only</p>)}
                                                    </span>
                                                </div>
                                                {getFormErrorMessage(field.name)}
                                            </>
                                        )}
                                    />
                                    <Controller
                                        name="phone"
                                        control={control}
                                        rules={{ required: 'Phone is required.' }}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                                <div style={{ marginTop: '1em' }}>

                                                    <span className="p-float-label">
                                                        <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })}
                                                            onChange={(e) => field.onChange(e.target.value)}
                                                            {...register("phone", {
                                                                maxLength: 10,
                                                                minLength: 10,
                                                                pattern: /^[0-9]+$/i,
                                                            })} />
                                                        <label htmlFor={field.name} style={{ marginLeft: '1em' }}>Phone</label>
                                                        {errors?.phone?.type === "maxLength" && (
                                                            <p>phone cannot exceed 10 characters</p>)}
                                                        {errors?.phone?.type === "minLength" && (
                                                            <p>phone cannot less than 10 characters</p>)}
                                                        {errors?.phone?.type === "pattern" && (
                                                            <p>Namerical characters only</p>)}
                                                    </span>
                                                </div>
                                                {getFormErrorMessage(field.name)}
                                            </>
                                        )}
                                    />
                                    <Controller
                                        name="address"
                                        control={control}
                                        rules={{ required: 'Address is required.' }}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                                <div style={{ marginTop: '1em' }}>

                                                    <span className="p-float-label">
                                                        <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })}
                                                            onChange={(e) => field.onChange(e.target.value)} />
                                                        <label htmlFor={field.name} style={{ marginLeft: '1em' }}>Address</label>
                                                    </span>
                                                </div>
                                                {getFormErrorMessage(field.name)}
                                            </>
                                        )}
                                    />
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                                <div style={{ marginTop: '1em' }}>
                                                    <span className="p-float-label">
                                                        <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })}
                                                            onChange={(e) => field.onChange(e.target.value)}
                                                            aria-invalid={errors.mail ? "true" : "false"} />
                                                        <label htmlFor={field.name} style={{ marginLeft: '1em' }}>Email</label>
                                                        {errors.mail && <p role="alert">{errors.mail.message}</p>}
                                                    </span>
                                                </div>
                                                {getFormErrorMessage(field.name)}
                                            </>
                                        )}
                                    />
                                    <Controller
                                        name="password"
                                        control={control}
                                        rules={{ required: 'Password is required.' }}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                                <div style={{ marginTop: '1em' }}>
                                                    <span className="p-float-label">
                                                        <Password value={field.value} id={field.name} className={classNames({ 'p-invalid': fieldState.error })}
                                                            onChange={(e) => field.onChange(e.target.value)} toggleMask />
                                                        <label htmlFor={field.name}>Password</label>
                                                    </span>
                                                </div>
                                                {getFormErrorMessage(field.name)}
                                            </>
                                        )}
                                    />
                                    <div>

                                        <Button label="Sign-Up" type="submit" style={{ marginRight: '1em', marginTop: '2em' }} />
                                        <Button label="Cancel" type="submit" onClick={(e) => { hide(e) }}  ></Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                )}
            ></Dialog >
        </div >
    )
}