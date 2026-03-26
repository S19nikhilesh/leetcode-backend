import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; //FOR SCHEMA VALIDATION , react-hook form supports it
import { useDispatch ,useSelector} from 'react-redux';
import { registerUser } from '../authSlice';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

//schema validation for signup
const signupSchema = z.object({
  firstName: z.string().min(3, "Name should contain atleast 3 characters"),
  emailId: z.string().email(),
  password: z.string().min(8, "Password should contain atleast 8 characters")
})


//...regsiter ek object return karta hai isliye spread operator lagaya
//&& ka matlab agr firdt conditon true then return second , but if first false then return first
function Signup() 
{

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {isAuthenticated}=useSelector((state)=>state.auth)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  useEffect(()=>{
    if(isAuthenticated){
      navigate('/')
    }
  },[isAuthenticated,navigate])

  const onSubmit=(data)=>{
    console.log(data)
    dispatch(registerUser(data))
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl">LeetCode</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text">First Name</span>
              </label>
              <input 
                {...register('firstName')} 
                placeholder="John" 
                className={`input input-bordered ${errors.firstName ? 'input-error' : ''}`}
              />
              {errors.firstName && (
                <span className="text-error text-sm mt-1">{errors.firstName.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text">Email</span>
              </label>
              <input 
                {...register('emailId')} 
                placeholder="john@example.com" 
                className={`input input-bordered ${errors.emailId ? 'input-error' : ''}`}
              />
              {errors.emailId && (
                <span className="text-error text-sm mt-1">{errors.emailId.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text">Password</span>
              </label>
              <input 
                {...register('password')} 
                placeholder="********" 
                type='password'
                className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
              />
              {errors.password && (
                <span className="text-error text-sm mt-1">{errors.password.message}</span>
              )}
            </div>

            <button type='submit' className='btn btn-primary mt-4'>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;