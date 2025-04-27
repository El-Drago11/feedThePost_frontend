import { useEffect, useState } from "react";
import { VscDebug, VscEdit } from "react-icons/vsc";
import Pagination from "../../common/Pagination";
import {getUserList, updateUserStatus } from "../../Services/Operations/adminApi";
import ConfirmationModal from "../../common/ConfirmationModal";


const RegisterUsers = () => {

    const [confirmationModal, setConfirmationModal] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [getProduct, setProduct] = useState({});
    const [getPageData, setPageData] = useState(1);

    const editTaskDetails = (data) => {
        console.log(data)
    }

    const DeleteUserDetails = (data) => {
        setConfirmationModal({
            text1: "Are you sure ?",
            text2: "User All data will be deleted permanently!",
            btn1Text: "Sure",
            btn2Text: "Cancel",
            btn1Handler: () =>{
                console.log(data);
                setConfirmationModal(null)
            },
            btn2Handler: () => setConfirmationModal(null)
        })
    }

    const getAllUsers = async () => {
        const res = await getUserList(getPageData)
        setProduct(res.data)
        setTableData(res.data.data)
    }


    //Pagination
    const changePageNumber = (num) => {
        setPageData(num);
    }

    const toggleUserStatus = async(userId)=>{
        await updateUserStatus(userId)
        getAllUsers();
    }


    useEffect(() => {
        getAllUsers();
    }, [getPageData, confirmationModal])



    return (
        <div className='p-4 md:p-7 w-[100%] overflow-hidden'>
            <h1 className='text-2xl text-center'>Assignments</h1>
            <div className="flex flex-col items-center justify-around h-[97%]">
                <div className="overflow-auto w-full px-5">
                    <table className="w-full my-5 text-center">
                        <thead>
                            <tr className="border-2">
                                <th className="border-2 text-wrap px-1 py-2">Sno</th>
                                <th className="border-2 text-wrap px-1 py-2">Status(Toggle)</th>
                                <th className="border-2 text-wrap px-1 py-2">FirstName</th>
                                <th className="border-2 text-wrap px-1 py-2">LastName</th>
                                <th className="border-2 text-wrap px-1 py-2">Email</th>
                                <th className="border-2 text-wrap px-1 py-2">Profile</th>
                                <th className="border-2 text-wrap px-1 py-2">CreatedAt</th>
                                <th className="border-2 text-wrap px-1 py-2">Edit</th>
                                <th className="border-2 text-wrap px-1 py-2">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (tableData)?.map((data, index) => (
                                    <>
                                        <tr className="border-2" key={index}>
                                            <td className="border-2 text-wrap px-1 py-2">{index + 1}</td>
                                            <td className="border-2 text-wrap px-1 py-2 uppercase" onClick={()=>toggleUserStatus(data?._id)}>
                                                {data?.status == 'Block' ?
                                                    <span className={`rounded-full bg-red-500 px-2 py-0.5 text-sm font-bold cursor-pointer`}>
                                                        {'Blocked'}
                                                    </span>
                                                    :
                                                    <span className={`rounded-full bg-green-400 px-2 py-0.5 text-sm font-bold cursor-pointer`}>
                                                        {'Unblocked'}
                                                    </span>
                                                }
                                            </td>
                                            <td className="border-2 text-wrap px-1 py-2">{data?.firstName || 'Not Available'}</td>
                                            <td className="border-2 text-wrap px-1 py-2">{data?.lastName || 'Not Available'}</td>
                                            <td className="border-2 text-wrap px-1 py-2">{data?.email || "Not Available"}</td>
                                            <td className="border-2 text-wrap px-1 py-2"><img src={data?.image} loading="lazy" className="h-10 w-auto rounded-full mx-auto" /></td>
                                            <td className="border-2 text-wrap px-1 py-2">{data?.createdAt ? new Date(data.createdAt).toISOString().split("T")[0] : "Not Available"}</td>
                                            <td className="border-2 text-wrap px-1 py-2"><VscEdit className='mx-auto text-lg hover:text-green-500 hover:cursor-pointer' onClick={() => editTaskDetails(data?._id)} /></td>
                                            <td className="border-2 text-wrap px-1 py-2"><VscDebug className='mx-auto text-lg hover:text-red-500 hover:cursor-pointer' onClick={() => DeleteUserDetails(data?._id)} /></td>
                                        </tr>
                                    </>
                                ))
                            }
                        </tbody>
                    </table>
                    {
                        tableData.length == 0
                            ?
                            <div className="text-lg text-center w-full">NO Task Created</div>
                            :
                            <></>
                    }
                </div>
            </div>
            {
                getProduct?.totalPages > 1
                    ?
                    <div className='w-auto flex flex-row justify-evenly items-center mx-auto gap-1 py-2 rounded-lg mt-5'>
                        <Pagination total={getProduct?.totalPages} changePageNumber={changePageNumber} />
                    </div>
                    : <></>
            }

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default RegisterUsers;