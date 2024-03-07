import React, { useState, useEffect } from 'react';
import { ProductService } from './viewOneUser';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { useGetUsersQuery } from './userApiSlice';
import Register from '../auth/Register';
export default function ListUsers() {
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const { data: allUsers, isLoading, isError, error } = useGetUsersQuery()
    const [visible,setVisible]=useState(false)
    const [view,setView]=useState(false)

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data.slice(0, 12)));
    }, []);

    // const getSeverity = (product) => {
    //     switch (product.inventoryStatus) {
    //         case 'INSTOCK':
    //             return 'success';

    //         case 'LOWSTOCK':
    //             return 'warning';

    //         case 'OUTOFSTOCK':
    //             return 'danger';

    //         default:
    //             return null;
    //     }
    // };

    const listItem = (user, index) => {
        return (
            <div className="col-12" key={user.identity}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        <div className="flex align-items-center gap-2">
                                <i className="pi pi-user"></i>
                                <span className="font-semibold">{user.identity}</span>
                            </div>
                            <div className="flex align-items-center gap-2">
                                <span className="font-semibold">{user.role}</span>
                            </div>
                            <div className="text-3xl font-bold text-900">{user.name}</div>
                            <div className="text-0.5xl font-bold">{user.address}</div>

                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold"> {user.phone} <i className="pi pi-phone"></i></span>
                            <span className="text-1.5xl font-semibold"> {user.email} <i className="pi pi-envelope"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (user) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-3 p-2" key={user.identity}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-user"></i>
                            <span className="font-semibold">{user.identity}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <span className="font-semibold">{user.role}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <div className="text-2xl font-bold">{user.name}</div>
                        <div className="text-0.5xl font-bold">{user.address}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-1xl font-semibold"><i className="pi pi-envelope"></i>  {user.email}</span>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold"><i className="pi pi-phone"></i>  {user.phone} </span>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (user, layout, index) => {
        if (!user) {
            return;
        }

        if (layout === 'list') return listItem(user, index);
        else if (layout === 'grid') return gridItem(user);
    };

    const listTemplate = (allUsers, layout) => {
        return <div className="grid grid-nogutter">{allUsers.map((user, index) => itemTemplate(user, layout, index))}</div>;
    };
    const handleClose=()=>{
        console.log("000000000");
        setView(false)
        setVisible(false)
    }
    const handleAddEdmit = () => {
        // handleClickOpen()
        setVisible(true)
        setView(true)
    }

    const header = () => {
        return (
            <>
                <DataViewLayoutOptions className="flex justify-content-end" layout={layout} onChange={(e) => setLayout(e.value)} />
                <Button className="flex justify-content-start" type="button" label="ADD EDMIT"  onClick={()=>handleAddEdmit()} />
                {console.log(visible)}
                {setView?<><Register 
                    visibleReg={visible}
                    setRegister={handleClose}
                    type={"Create"}
                    role='edmit'></Register></>:<></>} 
           </>
        );
    };


    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>
    return (
        <div className="card">
            <DataView value={allUsers} listTemplate={listTemplate} layout={layout} header={header()} />
        </div>
    )
}