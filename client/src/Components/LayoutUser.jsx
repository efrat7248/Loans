<<<<<<< HEAD
import React, { useRef, useState } from 'react';
=======
import React from 'react';
>>>>>>> d59ca7aa569824bdeb372f16d324a0ded60c3b3a
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';  
import "primereact/resources/themes/lara-light-cyan/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import "primereact/resources/themes/lara-light-cyan/theme.css"
import { Outlet } from 'react-router-dom';
import { Button } from 'primereact/button';
import { removeToken } from "../features/auth/authSlice"
import { NavLink, useNavigate } from "react-router-dom"
import {  useDispatch } from "react-redux"
import apiSlice from "../App/apiSlice"
<<<<<<< HEAD
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import styled from "styled-components";
import { Card } from 'primereact/card';
const StyledFooter = styled.footer`
  background-color: #f9fafb;
  color: #4B5563;
  text-align: center;
  padding: 10px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
`;
=======
>>>>>>> d59ca7aa569824bdeb372f16d324a0ded60c3b3a

export default function LayoutUser() {
const dispatch = useDispatch()
const navigate = useNavigate()
    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link" >
            <span className={item.icon+" 111111"} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );
    const items = [
        
        {
            label: 'Request',
            icon: 'pi pi-star',
            url:'/layoutUser/request'
        },
        {
            label: 'Loans',
            icon: 'pi pi-search',
            url:'/layoutUser/loan'
        },
        {
            label: 'private area',
            icon: 'pi pi-search',
            url:'/layoutUser/privateArea'
        },
        {
            label: 'About & Contant',
<<<<<<< HEAD
            icon: 'pi pi-home',
            url:'/layoutUser/about'

        }
    ];
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
    const buttonEl = useRef(null);

=======
            icon: 'pi pi-home'
        },
        // {
        //     label: 'Contact',
        //     icon: 'pi pi-envelope',
        //     badge: 3,
        //     template: itemRenderer
        // }
    ];
>>>>>>> d59ca7aa569824bdeb372f16d324a0ded60c3b3a
    const handleLogoutClick = () =>{
        dispatch(removeToken())
        dispatch(apiSlice.util.resetApiState())
        navigate("/")
    }
<<<<<<< HEAD
    const start = <img alt="logo" src="http://localhost:1300/logo.png" height="40" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            <Toast ref={toast} />
            <ConfirmPopup target={buttonEl.current} visible={visible} onHide={() => setVisible(false)} 
                message="Are you sure you want to proceed?" icon="pi pi-exclamation-triangle" accept={handleLogoutClick} />
            <Button ref={buttonEl}label='logout' className="w-8rem sm:w-auto" icon='pi pi-sign-out'onClick={()=>setVisible(true)} />
=======
    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            <Button label='logout' className="w-8rem sm:w-auto" icon='pi pi-sign-out'onClick={handleLogoutClick} />
>>>>>>> d59ca7aa569824bdeb372f16d324a0ded60c3b3a
          
        </div>
    );

    return (
        <>
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
<<<<<<< HEAD
        
        <Outlet/>
      
        <StyledFooter >
         
        <div>
          <p>TiferetShlomo@gmail.com גמ"ח תפארת שלמה </p>
        </div>
      </StyledFooter>
=======
        <Outlet/>
>>>>>>> d59ca7aa569824bdeb372f16d324a0ded60c3b3a
        </>
    )
}
        