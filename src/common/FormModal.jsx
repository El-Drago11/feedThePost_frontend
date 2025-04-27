/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { createPostAPI} from "../Services/Operations/postApi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../store/authReducer";

const FromModaldata = ({ modalData, setConfirmationModal,getSelectedTask=null }) => {

    const {loading } = useSelector((store) => store.auth)
    const dispatch = useDispatch()

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const [selectedHashTag, setSelectedHashTag] = useState([])

    const assignHashTags = (e) => {
        const selectedValue = e.target.value.trim();
        if (!selectedValue) return
        setSelectedHashTag([...selectedHashTag, { value: selectedValue }]);
        e.target.value = "";
    }

    const removeHashTag = (tagName) => {
        const userlist = selectedHashTag.filter((curr) => curr.value != tagName)
        setSelectedHashTag([...userlist])
    }

    const userAssigment = async (data) => {
        dispatch(setLoading(true))
        if(!selectedHashTag.length){
            toast.error('Please enter atleast one hashTag');
            return;
        }
        data.list = [...selectedHashTag]
        await createPostAPI(data)
        setConfirmationModal(null)
        dispatch(setLoading(false))
        return;
    }


    useEffect(() => {
        if (!getSelectedTask) return;
        setValue('assigmnetName', getSelectedTask?.taskName || '');
        setValue('description', getSelectedTask?.taskDescription || '');
    }, [])

    return (
        <div className=' text-black'>
            <div className='modal-wrapper rounded-md'></div>
            <div className='modal-container text-2xl w-11/12 md:w-1/3 rounded-md'>
                <p className='font-extrabold text-4xl'>{modalData?.text1}</p>

                <form onSubmit={handleSubmit(userAssigment)}>
                    <label>
                        <textarea required type='description' name='description' placeholder='Enter Post description' className='px-2 bg-slate-400 w-full rounded-md py-1 mt-7' {...register('description', {
                            required: true,
                            validate: (value) => {
                                const val = value.trim().length;
                                return val > 0 || "Field cannot be empty";
                            },
                        })} />
                        {errors.description && <span className="text-red-500 text-sm">{errors.description.message || 'This field is required'}</span>}
                    </label>
                    <label>
                        <p className=' text-black text-sm mt-4 font-semibold'>HashTags<sup className="text-red-600 ml-1">Press Space to submit tag</sup></p>
                        <input type='text' name='hashTag' placeholder='Enter your hashtag' className='px-2 bg-slate-400 w-full rounded-md py-1' onKeyDown={(e)=>{
                            if(e.code==='Space'|| e.code==='Enter'){
                                assignHashTags(e)
                            }
                        }}/>
                        {
                            selectedHashTag.length != 0 ?
                                <div className="flex flex-row gap-2 mt-2 flex-wrap">
                                    {
                                        selectedHashTag?.map((data) => {
                                            return (
                                                <span className="flex items-center gap-2 rounded-full px-4 py-1 text-white bg-slate-600 capitalize">
                                                    {data?.value}
                                                    <div className="text-sm text-red-600 font-bold hover:cursor-pointer" onClick={() => removeHashTag(data?.value)}>X</div>
                                                </span>
                                            )
                                        })
                                    }
                                </div>
                                : <></>
                        }

                    </label>
                    <label>
                        <p className=' text-black text-sm mt-4 font-semibold'>Upload Video/Image</p>
                        <input type='file' name='mediaFile' accept='image/*,video/*' placeholder='Enter your media' className='px-2 bg-slate-400 w-full rounded-md py-1'{...register('mediaFile',{required:true})}/>
                        {errors.mediaFile && <span className="text-red-500 text-sm">{errors.mediaFile.message || 'This field is required'}</span>}
                    </label>
                    <button
                        type="submit"
                        className="bg-yellow-400 text-black w-full mt-10 py-1 px-4 rounded-full  hover:bg-yellow-500 transition-all duration-300 hover:cursor-pointer">
                        Save
                    </button>
                </form>

                <div className=' flex flex-row gap-5 mt-5 w-full'>
                    <button onClick={modalData?.btn2Handler} className='hover:cursor-pointer bg-yellow-400 hover:bg-yellow-500 rounded-full px-4 py-1 w-full'>{modalData?.btn2Text}</button>
                </div>
            </div>
        </div>
    )
}
export default FromModaldata