import React, { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

export default function Confirmation({ func, id, nameAction }) {
    const toast = useRef(null);

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };

<<<<<<< HEAD
=======
    // const confirm1 = () => {
    //     confirmDialog({
    //         group: 'headless',
    //         mahmut: 'mahmut',
    //         message: text,
    //         header: 'Delete Confirmation',
    //         icon: 'pi pi-exclamation-triangle',
    //         defaultFocus: 'accept',
    //         accept,
    //         reject
    //     });
    // };

>>>>>>> d59ca7aa569824bdeb372f16d324a0ded60c3b3a
    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog
                group="headless"
                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                    <div className="flex flex-column align-items-center p-5 surface-overlay border-round">
                        <div className="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
                            <i className="pi pi-question text-5xl"></i>
                        </div>
                        <span className="font-bold text-2xl block mb-2 mt-4" ref={headerRef}>
                            {message.header}
                        </span>
                        <p className="mb-0" ref={contentRef}>
                            {message.message}
                        </p>
                        <div className="flex align-items-center gap-2 mt-4" ref={footerRef}>
                            <Button
                                label="Yes"
                                onClick={(event) => {
<<<<<<< HEAD
                                    hide(event);
                                    if(nameAction)
                                    func(nameAction ,id )
                                    else
                                    func(id)
=======
                                    hide(event); 
                                    if(nameAction)
                                    func(nameAction ,id )
                                    else
                                    func(id )
>>>>>>> d59ca7aa569824bdeb372f16d324a0ded60c3b3a
                                    accept();
                                }}
                                className="w-8rem"
                            ></Button>
                            <Button
                                label="No"
                                outlined
                                onClick={(event) => {
                                    hide(event);
                                    reject();
                                }}
                                className="w-8rem"
                            ></Button>
                        </div>
                    </div>
                )}
            />
<<<<<<< HEAD
=======
            {/* <div className="card flex flex-wrap gap-2 justify-content-center">
                <Button onClick={confirm1} icon="pi pi-check" label="Confirm"></Button>
            </div> */}
>>>>>>> d59ca7aa569824bdeb372f16d324a0ded60c3b3a
        </>
    )
}