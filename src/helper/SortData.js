export const SortData = (tableData,prop)=>{
    if(prop==='mostLiked'){
        tableData.sort((a,b)=>b.likedBy.length-a.likedBy.length)
    }

    if(prop==='mostRecent'){
        tableData.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
    }
    
    return tableData;
}

export const SearchForTheTask = (tableData,textVal) =>{
    textVal = textVal.trim().toLowerCase();
    const res = tableData.filter((curr)=>{
        if(curr?.postDescription?.toLowerCase().includes(textVal) || curr?.createdBy?.firstName.toLowerCase().includes(textVal) ||curr?.createdBy?.lastName.toLowerCase().includes(textVal)){
            return curr;
        }
    })
    return res;
}