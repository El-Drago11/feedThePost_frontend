import { useEffect, useState } from "react";
import { createSocketConnection } from "../Services/socket";
import { useSelector } from "react-redux";
import { SearchForTheTask, SortData } from "../helper/SortData";
import Pagination from "../common/Pagination";
import { getAllThePost } from "../Services/Operations/postApi";
import PostCard from "../common/PostCard";

const FeedThePost = () => {

    const { user } = useSelector((store) => store.auth)
    const getUserId = user?._id;

    const socket = createSocketConnection();

    const [tableData, setTableData] = useState([]);
    const [getSearch, setSearch] = useState([]);
    const [getSearchText, setSearchText] = useState("");
    const [getProduct, setProduct] = useState({});
    const [getPageData, setPageData] = useState(1);

    //Pagination
    const changePageNumber = (num) => {
        setPageData(num);
    }

    const getAllTheFeed = async () => {
        const res = await getAllThePost(getPageData)
        setProduct(res.data)
        setTableData(res.data.data)
    }

    const updateTable = async (data) => {
        const res = tableData.map((x) => x._id === data._id ? data : x)
        setTableData(res)
    }



    //Sorting function
    const sortTable = (prop) => {
        const sortedArray = SortData(tableData, prop);
        console.log('sortedArray : ',sortedArray)
        setTableData([...sortedArray])
    }

    //Search the table
    const searchTask = () => {
        const res = SearchForTheTask(tableData, getSearchText);
        setSearch([...res]);
        return;
    }

    //Debouncing effect
    useEffect(() => {
        const timeoutId = setTimeout(() => searchTask(), 500);
        return () => clearTimeout(timeoutId)
    }, [getSearchText])

    useEffect(() => {
        getAllTheFeed();
    }, [getPageData])

    useEffect(() => {

        socket.emit('join-room', { getUserId })

        socket.on('status-updates', (data) => {
            updateTable(data.data)
        });

        socket.on('update-task',(data)=>{
            console.log('update-task : ',data)
            updateTable(data.message)
        })

        return () => {
            socket.disconnect();
        }
    }, [socket])

    return (
        <div className='p-4 md:p-7 w-[100%] overflow-hidden'>
            <h1 className='text-4xl text-center font-extrabold'>Feed The Post</h1>
            <div className=" flex flex-row flex-wrap justify-center gap-2 items-start mt-5">
                <select className="w-auto rounded-md bg-slate-400 p-1" onChange={(e) => sortTable(e.target.value)} value={getSearchText}>
                    <option value='' selected>Sort According</option>
                    <option value='mostLiked'>Most Liked</option>
                    <option value='mostRecent'>Most Recent</option>
                </select>
                <div className="text-center">
                    <input placeholder="search..." name="seach" className="bg-white text-black rounded-md px-2 py-1" onChange={(e) => setSearchText(e.target.value)} value={getSearchText} />
                    {
                        (getSearchText.trim().length > 0 && getSearch.length === 0) ? (
                            <div className="py-1 text-red-500 font-bold">Nothing found!</div>
                        ) : null
                    }
                </div>
            </div>
            <div className="w-full mt-10">
                <div className="grid grid-col-1 md:grid-cols-2 px-2 w-full lg:w-11/12 gap-x-10 mx-auto">
                    {
                        (getSearch.length ? getSearch : tableData)?.map((data, index) => (
                            <>
                                <PostCard postDescription={data?.postDescription} postUrl={data?.postUrl} postUrlType={data?.postUrlType} hashTags={data?.hashTags} likedBy={data?.likedBy} createdAt={data?.createdAt} postId={data?._id} createdBy={data?.createdBy} key={index}/>
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
        </div>
    )
}

export default FeedThePost;