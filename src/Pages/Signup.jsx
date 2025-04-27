
import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { signUp } from '../Services/Operations/authApi';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const tabsName = ["User","Admin"]

const Signup = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [accountType , setAccountType] = useState(location?.state?.accountType || tabsName[0])

    const whoIsLogin = (value) => {
        setAccountType(value);
    }
    const userDataSubmission = (e) => {
        e.preventDefault();

        if(!firstName.trim().length ||!lastName.trim().length ||!email.trim().length ||!password.trim().length ||!confirmPassword.trim().length ||!accountType.trim().length){
            toast.error("All field are required");
            return;
        }

        if (password != confirmPassword) {
            toast.error("Password doen't match");
            return;
        }
        dispatch(signUp(firstName.trim(),lastName.trim(),email.trim(),password.trim(),confirmPassword.trim(),accountType.trim(),navigate))
    }

    return (
        <div className='flex flex-col-reverse lg:flex-row items-center w-11/12 justify-center max-w-maxContent gap-7 lg:gap-20 min-h-screen mx-auto'>
            <div className='flex flex-col p-4 gap-4 w-11/12 lg:w-[40%]'>
                <div className='text-4xl text-slate-100'>SignUp</div>
                <div className=' bg-richblack-600 p-1 rounded-full w-fit'>
                    <ul className='flex flex-row gap-4 text-richblack-100'>
                        {tabsName?.map((element, index) => (
                            <li className={`hover:bg-slate-500 hover:text-yellow-25 rounded-full px-2 cursor-pointer ${element === accountType ? "bg-slate-700 text-yellow-25" : ""}`} key={index} onClick={() => { whoIsLogin(element) }}>
                                {element}
                            </li>
                        ))}
                    </ul>
                </div>
                <form onSubmit={userDataSubmission}>
                    <label>
                        <p className=' text-slate-50 mt-4'>First Name</p>
                        <input required type='First Name' name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' className='p-2 bg-slate-800 w-full rounded-md py-2' id="firstName" />
                    </label>
                    <label>
                        <p className='text-slate-50 mt-4'>Last Name</p>
                        <input required type='Last Name' name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' className='p-2 bg-slate-800 w-full rounded-md py-2' id="lastName" />
                    </label>
                    <label>
                        <p className=' text-slate-50 mt-4'>Email Address</p>
                        <input required type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email address' className='p-2 bg-slate-800 w-full rounded-md py-2' id="userEmail" />
                    </label>
                    <label>
                        <p className='text-slate-50 mt-4'>Password</p>
                        <input required type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' className='p-2 bg-slate-800 w-full rounded-md py-2' id="userPassword" />
                    </label>
                    <label>
                        <p className='text-slate-50 mt-4'>Confirm Password</p>
                        <input required type='password' name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm-Password' className='p-2 bg-slate-800 w-full rounded-md py-2' id="userConfirmPassword" />
                    </label>
                    <div className='text-sm text-white font-extrabold text-right mt-4 hover:text-amber-400'><Link to={"/"}>Login ?</Link></div>
                    <button
                        type="submit"
                        className="bg-yellow-400 text-black w-full mt-4 py-2 px-4 rounded-full  hover:bg-yellow-500 transition-all duration-300 hover:cursor-pointer">
                        Create Account
                    </button>
                </form>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Signup