import React, { useEffect, useState } from 'react'

const Pagination = ({total=1,changePageNumber}) => {

    const[getTotalPage,setTotalPage] = useState(1);
    const[getCurrentPage,setCurrentPage] = useState(1);
    const[getFirst,setFirst] = useState(0);

    const getNextData = ()=>{
        if(getCurrentPage>=getTotalPage) return;

        if(getCurrentPage==0){
            setFirst(getFirst+1)
        }
        setCurrentPage(getCurrentPage+1)
        changePageNumber(getCurrentPage+1)
    }

    const getPrevData = ()=>{
        if(getCurrentPage<=1) return;

        if((getCurrentPage-1)==0){
            setFirst(getFirst-1)
        }

        setCurrentPage(getCurrentPage-1)
        changePageNumber(getCurrentPage-1)
    }

    useEffect(()=>{
        setTotalPage(total)
    },[total])


    return (
        <>
            <div className={`bg-slate-600 hover:bg-slate-700 py-1 px-2 rounded-md cursor-pointer select-none`} onClick={()=>getPrevData()}>Prev</div>
            {[...Array((getTotalPage - getFirst*10)<10 ? (getTotalPage - getFirst*10) : 10)]?.map((_, i) => {
                return (
                    <div className={`bg-slate-600 hover:bg-slate-700 py-1 lg:py-2 px-1 md:px-4 rounded-md cursor-pointer select-none ${getCurrentPage-(getFirst*10)==i+1 ? 'bg-slate-900':""}`} onClick={()=>{
                        changePageNumber(getFirst*10+i+1)
                        setCurrentPage(getFirst*10+i+1)
                    }}>
                        {getFirst*10+i+ 1}
                    </div>
                )
            })}
            <div className="bg-slate-600 hover:bg-slate-700 py-1 px-2 rounded-md cursor-pointer select-none" onClick={()=>getNextData()}>Next</div>
        </>
    )
}

export default Pagination