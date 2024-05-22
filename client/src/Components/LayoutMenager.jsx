<<<<<<< HEAD
import React, { useRef, useState } from 'react';
import { Menubar } from 'primereact/menubar';
=======

import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';  
>>>>>>> d59ca7aa569824bdeb372f16d324a0ded60c3b3a
import "primereact/resources/themes/lara-light-cyan/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import "primereact/resources/themes/lara-light-cyan/theme.css"
import { Outlet } from 'react-router-dom';
import { removeToken } from "../features/auth/authSlice"
<<<<<<< HEAD
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

=======
import { NavLink, useNavigate } from "react-router-dom"
import {  useDispatch } from "react-redux"
import apiSlice from "../App/apiSlice"
import { Button } from 'primereact/button';

export default function LayoutManeger() {
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
>>>>>>> d59ca7aa569824bdeb372f16d324a0ded60c3b3a
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
<<<<<<< HEAD
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
=======


            // items: [
            //     {
            //         label: 'Core',
            //         icon: 'pi pi-bolt',
            //         shortcut: '⌘+S',
            //         template: itemRenderer
            //     },
            //     {
            //         label: 'Blocks',
            //         icon: 'pi pi-server',
            //         shortcut: '⌘+B',
            //         template: itemRenderer
            //     },
            //     {
            //         label: 'UI Kit',
            //         icon: 'pi pi-pencil',
            //         shortcut: '⌘+U',
            //         template: itemRenderer
            //     },
            //     {
            //         separator: true
            //     },
            //     {
            //         label: 'Templates',
            //         icon: 'pi pi-palette',
            //         items: [
            //             {
            //                 label: 'Apollo',
            //                 icon: 'pi pi-palette',
            //                 badge: 2,
            //                 template: itemRenderer
            //             },
            //             {
            //                 label: 'Ultima',
            //                 icon: 'pi pi-palette',
            //                 badge: 3,
            //                 template: itemRenderer
            //             }
            //         ]
            //     }
            // ]
        },
        {
            label: 'About & Contant',
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
        
=======
    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
              <Button label='logout' className="w-8rem sm:w-auto" icon='pi pi-sign-out'onClick={handleLogoutClick} />
        </div>
    );

    return (
>>>>>>> d59ca7aa569824bdeb372f16d324a0ded60c3b3a
        <>
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
        <Outlet/>
<<<<<<< HEAD
        <StyledFooter >
        
        <div>
        <p>TiferetShlomo@gmail.com גמ"ח תפארת שלמה </p>
        </div>
      </StyledFooter>
=======
>>>>>>> d59ca7aa569824bdeb372f16d324a0ded60c3b3a
        </>
    )
}
        