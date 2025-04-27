import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';

const MyProfile = () => {
    const {user} = useSelector((store)=>store.auth)
    // eslint-disable-next-line no-unused-vars
    const[imgErr , setImgErr] = useState(false);

    useEffect(()=>{

    },[user])
    return (
        <div className='p-4 md:p-7 w-[100%] overflow-hidden'>
            <h1 className='text-richblack-5 text-4xl'>My Profile</h1>

            <div className='grid md:grid-cols-2  sm:grid-cols-1 mt-10 w-11/12 gap-4 bg-richblack-800 rounded-md p-6'>
                <div className='flex md:flex-row items-center gap-7 flex-col'>
                    {imgErr || !user?.image ?  (<FaUser className='h-10 w-10 text-white' />)
                     : (<img src={user?.image} alt={user?.firstName} className='rounded-full h-16'/>) }
                    <div className='flex flex-col'>
                        <p className='text-richblack-5'>{user?.firstName}</p>
                        <p className=' text-richblack-300'>{user?.email}</p>
                    </div>
                </div>
            </div>

            {/* Personal details */}
            <div className='flex flex-col mt-4 w-11/12 bg-slate-900 rounded-md p-6 text-ellipsis overflow-hidden'>
                <div className='flex flex-col  w-[100%] gap-7 mt-2 items-start'>
                    <div className=' grid md:grid-cols-2 sm:grid-cols-1 gap-4 w-11/12 capitalize'>
                        <div className=' flex flex-col'>
                            <p className=''>first Name</p>
                            <p className=''>{user?.firstName}</p>
                        </div>
                        <div className=' flex flex-col'>
                            <p className=''>last Name</p>
                            <p className=''>{user?.lastName}</p>
                        </div>
                    </div>
                    <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-4 w-11/12'>
                        <div className=' flex flex-col'>
                            <p className=''>Email</p>
                            <p className=''>{user?.email}</p>
                        </div>
                        <div className=' flex flex-col'>
                            <p className=''>Position</p>
                            <p className=''>{user?.accountType}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile