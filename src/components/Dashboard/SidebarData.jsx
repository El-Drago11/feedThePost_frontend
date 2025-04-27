import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux'
import { NavLink, matchPath, useLocation } from 'react-router-dom'
import { setSideBarOpen } from '../../store/authReducer'

const SidebarData = ({element,iconName}) => {

    const Icon = Icons[iconName]
    const location = useLocation();
    const dispatch =  useDispatch();

    const matchRoute = (route)=>{
      return  matchPath({path:route},location.pathname)
    }
    
  return (
    <NavLink  to={element.path} className={`relative md:px-4 sm:px-0 py-2 text-sm font-medium text-richblack-5${matchRoute(element.path)? " bg-slate-600" : "bg-opacity-0"} cursor-pointer`} onClick={()=>dispatch(setSideBarOpen())}>
        <span className={`absolute top-0 left-0 h-full w-[0.2rem] bg-yellow-500  ${matchRoute(element.path) ? "opacity-100" : "opacity-0"}`}>

        </span>
        <div className='flex flex-row items-center gap-x-2 text-richblack-5 ml-2 md:ml-0 '>
            <Icon className="text-lg"/>
            <span>{element.name}</span>
        </div>
    </NavLink>
  )
}

export default SidebarData