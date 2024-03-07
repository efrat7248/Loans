import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import AddRequest from './addRequest';
import { PrimeIcons } from 'primereact/api';
import { useGetRequestsByIdQuery, useDeleteRequestItemMutation } from './requestsApiSlice';
import PromissoryNote from '../loan/promissoryNote';
import Confirmation from '../../Components/confirmation';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';


export default function RequestList() {
    const [visible, setVisible] = useState(false);
    const [visibleLoan, setVisibleLoan] = useState(false);
    const [state1, setState1] = useState(false)
    const [state2, setState2] = useState(false)
    const [state3, setState3] = useState(false)
    const [viewConfi, setViewConfi] = useState(false)
    const [id, setId] = useState('')

    const items = [
        {
            label: 'File',
            items: [
                { label: 'New', icon: PrimeIcons.PLUS },
            ]
        }
    ];

const handleViewCon=(id)=>{
    setId(id);
    confirmDialog({
        group: 'headless',
        mahmut: 'mahmut',
        message: "Are you sure you want to delete this request?",
        header: 'Delete Confirmation',
        icon: 'pi pi-exclamation-triangle',
        defaultFocus: 'accept',
        // accept,
        // reject
    });
    setViewConfi(true)
}
    const handleClickOpen = () => {
        setVisible(true);
    };
    
    const handleClose = () => {
        setState2(false)
        setState1(false)
        setState3(false)
        setVisible(false);
        setVisibleLoan(false)

    };
    const [delFunc] = useDeleteRequestItemMutation()

    const handleDelRequest = (id) => {
        delFunc({ id: id })
    }
    const handleCloseLoan=()=>{ 
         setState3(false)
        setVisibleLoan(false)
    }
    const handlePutRequest = (id) => {
        console.log(id);
        handleClickOpen()
        setState2(true)
        setId(id);
    }
    const handleAddRequest = () => {
        handleClickOpen()
        setState1(true)
    }
    const handleAddLoan = (id) => {
        setVisibleLoan(true)
        setState3(true)
        setId(id)
    }

    const { data: requests, isLoading, isError, error } = useGetRequestsByIdQuery()
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>
    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" label="ADD REQUEST" outlined onClick={handleAddRequest} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                </span>
                {state1 ? <><AddRequest visible={visible}
                    handleClose={handleClose}
                    type={"Create"}></AddRequest></> : <></>}
            </div>
        );
    };


    // const verifiedBodyTemplate = (rowData) => {
    //     return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.status, 'text-red-500 pi-times-circle': !rowData.status })}></i>;
    // };

    const actionButtons = (rowData) => {
        return (<>
         {console.log(state3+" "+ visibleLoan)}
            {!rowData.status ? <div >
                <Button icon='pi pi-refresh' onClick={() => handlePutRequest(rowData._id)}></Button>
                <span>  </span><span>  </span><span>  </span><span>  </span>
                <Button icon='pi pi-trash' onClick={() =>handleViewCon(rowData._id)}></Button>
                {viewConfi?<Confirmation func={handleDelRequest} id={id}  confirmDialog={confirmDialog}></Confirmation>:<></>}
                {state2 ? <>  <AddRequest visible={visible}
                    handleClose={handleClose}
                    type={"Update"}
                    idReq={id} /></> : <></>}
            </div> :
                <div >
                    <Button icon='pi pi-upload' onClick={()=>handleAddLoan(rowData._id)}></Button>
                    {console.log('aaaaaaaaaaaa')}
                    {console.log(visibleLoan)}

                    {state3?<><PromissoryNote visibleLoan={visibleLoan}
                        handleCloseLoan={handleCloseLoan}        
                        idLoan={id} /></>:<></>}
                </div>
            }
        </>)
    }

    const checkStatus = (rowData) => {
        return (<>
            {!rowData.status ? <div >
                <Button icon='pi pi-times-circle' ></Button>
            </div> :
                <>
                    <div > <Button icon='pi pi-check-circle' ></Button></div>
                </>}
        </>)
    }
    const header = renderHeader();
    return (
        <div className="card">
            <DataTable value={requests} paginator showGridlines rows={10} dataKey="id" header={header} emptyMessage="No customers found.">
                <Column field="createdAt" header="Create date" style={{ minWidth: '12rem' }} dataType="date" />
                <Column field="updatedAt" header="Update date" dataType="date" style={{ minWidth: '12rem' }} />
                <Column field="count" header="Count" style={{ minWidth: '14rem' }} />
                <Column field="status" header="Status" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' }} body={checkStatus} />
                <Column header="Action" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' }} body={actionButtons} />
            </DataTable>
        </div>
    );
}