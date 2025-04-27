import React from 'react'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className=' text-black'>
        <div className='modal-wrapper rounded-md'></div>
        <div className='modal-container text-2xl w-11/12 md:w-1/3 rounded-md'>
            <p className='font-extrabold text-4xl'>{modalData?.text1}</p>
            <p className='mt-4'>{modalData?.text2}</p>
            <div className=' flex flex-row gap-5 mt-5'>
                <button onClick={modalData?.btn1Handler} className='bg-yellow-400 rounded-md p-2 hover:bg-yellow-500 hover:cursor-pointer'>{modalData?.btn1Text}</button>
                <button onClick={modalData?.btn2Handler} className='hover:cursor-pointer'>{modalData?.btn2Text}</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal