import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [resetEmail, setResetEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const auth = getAuth();
    const db = getFirestore();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const role = userDoc.exists() ? userDoc.data().role : "user";

      toast.success("Login successful!");
      setTimeout(() => {
        if (role === "admin") {
          navigate('/admin-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      }, 1000);
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  const handlePasswordReset = async () => {
    const auth = getAuth();
    if (!resetEmail) {
      toast.warning("Please enter your email to reset password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Password reset email sent. Check your inbox.");
    } catch (error) {
      toast.error(error.message || "Failed to send reset email");
    }
  };

  return (
    <div className="mx-auto p-6 max-w-md">
      <ToastContainer />
      <h1 className="mb-4 font-bold text-emerald-600 text-2xl">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('email')}
          placeholder="Email"
          className="px-4 py-2 border w-full"
          onChange={(e) => setResetEmail(e.target.value)}
        />

        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="px-4 py-2 pr-10 border w-full"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="top-2.5 right-3 absolute text-gray-600 cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button className="bg-emerald-600 hover:bg-emerald-700 py-2 rounded w-full text-white cursor-pointer">Login</button>
      </form>

      <div className="flex justify-between items-center mt-4 text-xs sm:text-sm md:text-base whitespace-nowrap">
        <button
          type="button"
          onClick={handlePasswordReset}
          className="text-emerald-600 hover:underline cursor-pointer"
        >
          Forgot Password?
        </button>

        <div className="flex items-center space-x-1">
          <span className="text-[11px] text-gray-600">Don't have an account?</span>
          <Link to="/register" className="font-semibold text-emerald-600 hover:underline cursor-pointer">
            Register
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Login;
