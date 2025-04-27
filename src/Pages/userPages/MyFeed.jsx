import { useEffect, useState } from "react";
import FormModal from '../../common/FormModal'
import { createdPostAPI} from "../../Services/Operations/postApi";
import { SortData } from "../../helper/SortData";
import Pagination from "../../common/Pagination";
import PostCard from "../../common/PostCard";


const MyFeed = () => {

    const [confirmationModal, setConfirmationModal] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [getSelectedTask, setSelectedTask] = useState(null);
    const [getProduct, setProduct] = useState({});
    const [getPageData, setPageData] = useState(1);

    const getCreatedPost = async () => {
        const res = await createdPostAPI(getPageData)
        setProduct(res?.data)
        setTableData(res?.data.data)
    }


    //Sorting function
    const sortTable = (prop) => {
        const sortedArray = SortData(tableData, prop);
        setTableData([...sortedArray])
    }

    //Pagination
    const changePageNumber = (num) => {
        setPageData(num);
    }



    useEffect(() => {
        getCreatedPost();
    }, [getPageData, confirmationModal])

  


    return (
        <div className='p-4 md:p-7 w-[100%] overflow-hidden'>
            <h1 className='text-2xl text-center font-bold uppercase'>Your Post</h1>
            <div className=" flex flex-row justify-evenly gap-2 md:justify-end items-start flex-wrap mt-5">
                <select className="w-auto rounded-md bg-slate-400 px-2 py-1" onChange={(e) => sortTable(e.target.value)}>
                    <option value='' selected>Sort According</option>
                    <option value='mostLiked'>Most Liked</option>
                    <option value='mostRecent'>Most Recent</option>
                </select>
                <button onClick={() => {
                    setSelectedTask(null)
                    setConfirmationModal({
                        text1: "Enter details",
                        btn1Text: "Save",
                        btn2Text: "Cancel",
                        btn2Handler: () => setConfirmationModal(null)
                    })
                }} className=' bg-red-600 px-4 py-1 rounded-md font-bold flex items-center justify-evenly gap-1 cursor-pointer'>
                    Post <span className="font-black">+</span>
                </button>
            </div>
            <div className="w-full mt-10">
                <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-4 px-2">
                    {
                        (tableData)?.map((data, index) => (
                            <>
                                <PostCard postDescription={data?.postDescription} postUrl={data?.postUrl} postUrlType={data?.postUrlType} hashTags={data?.hashTags} likedBy={data?.likedBy} createdAt={data?.createdAt} postId={data?._id} key={index} imageHeight={'50vh'}/>
                            </>
                        ))
                    }
                    {
                        tableData?.length == 0
                            ?
                            <div className="text-lg text-center w-full">NO Post Created</div>
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

            {confirmationModal && <FormModal modalData={confirmationModal} setConfirmationModal={setConfirmationModal} getSelectedTask={getSelectedTask} />}
        </div>
    )
}

export default MyFeed;