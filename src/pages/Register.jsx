import { useForm } from 'react-hook-form';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const auth = getAuth();
    const db = getFirestore();
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      // Store user info and role in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: data.name,
        email: data.email,
        role: "user" // default role
      });
      navigate('/user-dashboard'); // or wherever you want to redirect
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="mx-auto p-6 max-w-md">
      <h1 className="mb-4 font-bold text-emerald-600 text-2xl">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('name')} placeholder="Full Name" className="px-4 py-2 border w-full" />
        <input {...register('email')} placeholder="Email" className="px-4 py-2 border w-full" />
        <input {...register('password')} type="password" placeholder="Password" className="px-4 py-2 border w-full" />
        <button className="bg-emerald-600 hover:bg-emerald-700 py-2 rounded w-full text-white cursor-pointer hover:">Register</button>
      </form>
    </div>
  );
};

export default Register;