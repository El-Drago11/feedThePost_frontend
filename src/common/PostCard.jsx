import { BsHeartFill } from "react-icons/bs";
import { postLikeAPI } from "../Services/Operations/postApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaRegComment } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import { timeAgo } from "../helper/PostTime";

const PostCard = ({ postDescription, postUrl, postUrlType, hashTags, likedBy: initialLikedBy, createdAt, postId,createdBy=null }) => {

  const { user } = useSelector((store) => store.auth)

  const [showComments, setShowComments] = useState(false);
  const [likedBy, setLikedBy] = useState(initialLikedBy);

  const likeThePost = async (postId) => {
    if (likedBy.includes(user._id)) {
      toast.error('This post is already liked by you');
      return;
    }
    setLikedBy((prev) => [...prev, user._id]);
    try {
      await postLikeAPI(postId)
    } catch (error) {
      console.log(error)
      setLikedBy((prev) => prev.filter((id) => id !== user._id));
      toast.error('Failed to like the post !');
    }
    return;
  }
  const CommentsPost = async () => {
    setShowComments(!showComments)
    return;
  }

  useEffect(() => {
    setLikedBy(initialLikedBy);
  }, [initialLikedBy]);


  return (
    <>
      <div className="mb-10 bg-slate-100 text-black p-4 rounded-md hover:shadow-lg hover:shadow-slate-300 hover:scale-105 transition-all shadow-md flex flex-col justify-center" key={postId}>
        {createdBy &&
          <div className='flex items-center gap-2 mb-4 font-serif'>
          <img src={createdBy?.image} className='h-10 w-auto rounded-full' alt="userProfile" loading="lazy"/>
          {createdBy?.firstName + ' ' + createdBy?.lastName}
        </div>
        }
        <img
          src={postUrl}
          alt={`product${postUrlType}`}
          className={`h-auto max-h-[200px] w-auto max-w-full rounded-xl`}
          loading="lazy"
        />
        <p className="font-semibold capitalize text-lg mt-4">{postDescription}</p>
        <div className="flex gap-1">
          <span className="flex gap-1">
            {JSON.parse(hashTags).map((curr, i) => (
              <span key={i} className="text-blue-600">#{curr}</span>
            ))}
          </span>
        </div>
        <p className="capitalize flex justify-start gap-1.5 items-center">
          <div className="cursor-pointer" onClick={() => likeThePost(postId)}><BsHeartFill color={likedBy.length ? 'red' : 'grey'} /></div>
          <div className="font-bold flex items-start">{likedBy.length}</div>
          <div className="cursor-pointer ml-2" onClick={() => CommentsPost(postId)}><FaRegComment /></div>
        </p>
        <p className="text-richblack-5 text-sm font-extralight">
          {timeAgo(createdAt)}
        </p>
      </div>
      {
        showComments && (
          <Comments setShowComments={setShowComments} postId={postId} />
        )
      }
    </>
  );
};

export default PostCard;
