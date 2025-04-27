import React, { useEffect, useRef, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { getComments, postTheComments } from '../Services/Operations/postApi';
import toast from 'react-hot-toast';

const Comments = ({setShowComments,postId}) => {

    const commentRef = useRef('')

    const[getCommentList ,setCommentList] = useState([])

    const CommentsPost = async(postId)=>{
        const commentList = await getComments(postId);
        setCommentList(commentList.data.data)
        return;
    }

    const submitTheComment = async()=>{
        const userComment = commentRef?.current?.value?.trim();
        if(!userComment.length){
            toast.error('Comment cannot be empty');
            return;
        }
        await postTheComments(postId,userComment);
        commentRef.current.value=''
        CommentsPost(postId);
        return;
    }

    useEffect(()=>{
        CommentsPost(postId);
    },[postId])

  return (
    <div className=' text-black'>
        <div className='modal-wrapper rounded-md'></div>
        <div className='modal-container text-2xl w-11/12 md:w-2/3 lg:w-1/3 rounded-md relative'>
            <span className=' text-2xl font-extrabold absolute top-1 right-1 hover:cursor-pointer' onClick={()=>setShowComments(false)}><CgClose/></span>
            <p className='font-semibold text-lg'>Comments</p>
            <div className=' flex flex-wrap justify-evenly my-2 gap-2'>
                <input className='border-2 border-slate-500 rounded-md py-1 px-2 text-sm w-full lg:w-2/3' placeholder='enter your comment...' ref={commentRef} onChange={()=>console.log(commentRef.current.value)}/>
                <button type='submit' className='text-sm border-none bg-green-400 px-2 py-1 rounded-md text-white font-bold' onClick={()=>submitTheComment()}>Submit</button>

            </div>
            <div className='min-h-[100px] max-h-[50dvh] mt-2 px-2 overflow-y-auto flex flex-col gap-2'>
                {
                    getCommentList.length 
                    ? 
                    getCommentList.map((curr,index)=>{
                        return(
                            <div className='flex flex-col gap-1 capitalize text-sm mb-2'>
                                <div className=' flex items-center gap-1'>
                                    <img src={curr?.createdBy?.image} className='h-4 w-auto rounded-full'/>
                                    {curr?.createdBy?.firstName+' '+curr?.createdBy?.lastName}
                                </div>
                                <div key={index} className='font-semibold ml-4'>{curr?.text}</div>
                                <div className=' flex gap-2'>
                                    <span className='font-sans'>Reply..</span>
                                </div>
                            </div>
                        )
                    }) 
                    :
                    <div className='text-slate-400 text-sm'>No comment yet!</div>
                }
            </div>
        </div>
    </div>
  )
}

export default Comments