import React, { useState, useEffect } from 'react';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { CustomerService } from '../../service/CustomerService';
import { useGetLoansByUserIdQuery, useUpdateLoanWeftsMutation } from './loanApiSlice'

export default function ShowWefts({setRowD, wefts, idLoan, dialogVisible, setDialogVisible, refetch, role }) {
    const [customers, setCustomers] = useState([]);
    const [loadId,setLoanId]=useState("");
    const { data: allLoans,isSuccess, isLoading, isError, error } = useGetLoansByUserIdQuery()
    useEffect(() => {
        CustomerService.getCustomersMedium().then((data) => setCustomers(data));
    }, [dialogVisible]);


    const dialogFooterTemplate = () => {
        return <Button label="Ok" icon="pi pi-check" onClick={() => { setDialogVisible() }} />;
    };
    const [products, setProducts] = useState(null);
    const [statuses] = useState(['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK']);

    const [putLoanWefts, { isErrorTake, isSuccessTake }] = useUpdateLoanWeftsMutation()



    const onRowEditComplete = (e) => {
        
        let _wefts = [...wefts];
        let { newData, index } = e;

        // _wefts[index] = newData;
        // setLoanId(idLoan)
        const weft = {
            id: idLoan,
            numWeft: e.index,
            name: e.newData.name,
            email: e.newData.email,
            phone: e.newData.phone,
            sign: e.newData.sign
            // updatedAt:new Date()
        };
        _wefts[index]=weft
        setRowD(_wefts)
        // debugger
        // setRowD(weft)
        putLoanWefts(weft)
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    // const statusEditor = (options) => {
    //     return (
    //         <Dropdown
    //             value={options.value}
    //             options={statuses}
    //             onChange={(e) => options.editorCallback(e.value)}
    //             placeholder="Select a Status"
    //             itemTemplate={(option) => {
    //                 return <Tag value={option} severity={getSeverity(option)}></Tag>;
    //             }}
    //         />
    //     );
    // };
    // const allowEdit = (rowData) => {
    //     return rowData.name !== 'Blue Band';
    // };
    return (
        <div className="card">

            <Dialog header="WEFTS" visible={dialogVisible} style={{ width: '75vw' }} maximizable
                modal contentStyle={{ height: '300px' }} onHide={() => setDialogVisible(false)} footer={dialogFooterTemplate}>
                <DataTable value={wefts} editMode="row" dataKey="_id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="name" header="Name" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="sign" header="sign" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="phone" header="phone" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="updatedAt" header="updatedAt" style={{ width: '20%' }}></Column>
                    {role ? <Column rowEditor={true} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column> : " "}
                </DataTable>
            </Dialog>
        </div>
    );

}



