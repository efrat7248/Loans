import React, { useEffect, useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';
import userAuth from '../auth/userAuth'
import { useUpdateUserItemMutation, useDeleteUserItemMutation } from '../user/userApiSlice'
import { confirmDialog } from 'primereact/confirmdialog';
import Confirmation from '../../Components/confirmation';
<<<<<<< HEAD
=======
// import Login from './Login';
>>>>>>> e12cb346414aa156282bfc96cd7c38786ba5a430
export default function PrivateArea({ visibleReg, setRegister, handleOpenLogin, role }) {
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false);
    const user = userAuth();  
    const { _id, identity, name, address, email, phone, role: userRole, active: act } = user;
    const [updateUser, { isError: isErrorUser, isSuccess: isSuccessUser, isLoading: isLoadinguser, data: dataUser, error: erroUserr }] = useUpdateUserItemMutation()
    const [idUser, setIdUser] = useState(null)
    const [delUserFunc] = useDeleteUserItemMutation()
    const defaultValues = {
        name: name || '',
        identity: identity || '',
        email: email || '',
        phone: phone || '',
        address: address || '',
<<<<<<< HEAD
        role: userRole || role, 
        password: ''
    };
    const handleDeleteUser = async (idus) => {
=======
        role: userRole || role, // fallback to prop if no role in user data
        password: ''
    };
    const handleDeleteUser = async (idus) => {
        // console.log(idL);
      //  setIdUser(idus)
        // console.log(idus + " 00000");
>>>>>>> e12cb346414aa156282bfc96cd7c38786ba5a430
        await delUserFunc({ id: idus })
        navigate("/")
        setIdUser(null)
    }

    const handleViewCon = (rowData, text) => {
        confirmDialog({
            group: 'headless',
            mahmut: 'mahmut',
            message: text,
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
        });
        console.log(rowData);
        setIdUser(rowData);

    }
    const {
        control,
        formState: { errors },
        reset,
        register,
        handleSubmit,
        watch,
    } = useForm({ defaultValues });

    const onSubmit = (data) => {
        updateUser(data)
    };
    const toast = useRef(null);

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <>
            <Confirmation func={handleDeleteUser} id={idUser}></Confirmation>
            <div className="card">
                <Card title="Update user">
                    <div className="card flex justify-content-center">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue={defaultValues.name} 
                                rules={{ required: 'Name is required.' }}
                                render={({ field, fieldState }) => (
                                    <>
<<<<<<< HEAD
                                       
=======
                                        {/* <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label> */}
>>>>>>> e12cb346414aa156282bfc96cd7c38786ba5a430
                                        <div style={{ marginTop: '1em' }}>
                                            <span className="p-float-label">
                                                <InputText id={field.name} value={field.value} text={defaultValues.name} className={classNames({ 'p-invalid': fieldState.error })}
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
                                defaultValue={defaultValues.identity} 
                                rules={{ required: 'Identity is required.' }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                        <div style={{ marginTop: '1em' }}>
                                            <span className="p-float-label">
                                                <InputText id={field.name} value={field.value} placeholder={identity} className={classNames({ 'p-invalid': fieldState.error })}
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
                                defaultValue={defaultValues.phone} 
                                control={control}
                                rules={{ required: 'Phone is required.' }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                        <div style={{ marginTop: '1em' }}>

                                            <span className="p-float-label">
                                                <InputText id={field.name} value={field.value} placeholder={phone} className={classNames({ 'p-invalid': fieldState.error })}
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
                                defaultValue={defaultValues.address} 
                                rules={{ required: 'Address is required.' }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                        <div style={{ marginTop: '1em' }}>

                                            <span className="p-float-label">
                                                <InputText id={field.name} value={field.value}  className={classNames({ 'p-invalid': fieldState.error })}
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
                                defaultValue={defaultValues.email} 
                                render={({ field, fieldState }) => (
                                    <>
                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                        <div style={{ marginTop: '1em' }}>
                                            <span className="p-float-label">
                                                <InputText id={field.name} value={field.value} placeholder={email} className={classNames({ 'p-invalid': fieldState.error })}
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
                                defaultValue={defaultValues.password} 
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

                                <Button label="Update" type="submit" style={{ marginRight: '1em', marginTop: '2em' }} />

                            </div>
                        </form>
                    </div>
                   {console.log(act)} 
                    {!act ?
                        <Button label="Delete register" type="submit" onClick={() => { handleViewCon(_id, "Are you sure you want to delete this user?") }}></Button>
                        : <></>}
                </Card>
            </div></>
    )
}