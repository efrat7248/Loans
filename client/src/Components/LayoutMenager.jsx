import React, { useRef, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import "primereact/resources/themes/lara-light-cyan/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import "primereact/resources/themes/lara-light-cyan/theme.css"
import { Outlet } from 'react-router-dom';
import { removeToken } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import apiSlice from "../App/apiSlice"
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: #f9fafb; 
  color: #4B5563; 
  text-align: center;
  padding: 10px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;`;

export default function LayoutManeger() {
    const icon = (<i className="pi pi-search"></i>)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const items = [
        {
            label: 'Users',
            icon: 'pi pi-users ',
            url:'/layoutManeger/user'
        },
        
        {
            label: 'Request',
            icon: 'pi pi-star',
            url:'/layoutManeger/request'
        },
        {
            label: 'Loans',
            icon: 'pi pi-search',
            url:'/layoutManeger/loan'
        },
        {
            label: 'private area',
            icon: 'pi pi-search',
            url:'/layoutManeger/privateArea'
        },

    ];
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
    const buttonEl = useRef(null);
    const handleLogoutClick = () =>{
        dispatch(removeToken())
        dispatch(apiSlice.util.resetApiState())
        navigate("/")
    }
    const start = <img alt="logo" src="http://localhost:1300/logo.png" height="50" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
        <Toast ref={toast} />
        <ConfirmPopup target={buttonEl.current} visible={visible} onHide={() => setVisible(false)} 
            message="Are you sure you want to proceed?" icon="pi pi-exclamation-triangle" accept={handleLogoutClick} />
        <Button ref={buttonEl}label='logout' className="w-8rem sm:w-auto" icon='pi pi-sign-out'onClick={()=>setVisible(true)} />
      
    </div>
    );

    return (
        
        <>
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
        <Outlet/>
        <StyledFooter >
        
        <div>
        <p>TiferetShlomo@gmail.com גמ"ח תפארת שלמה </p>
        </div>
      </StyledFooter>
        </>
    )
}
        