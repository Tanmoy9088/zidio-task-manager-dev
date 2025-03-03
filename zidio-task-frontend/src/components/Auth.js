// import { motion } from "framer-motion";
// import { signInWithGoogle } from "../firebaseConfig";
// import { useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import { useState } from "react";

// const Login = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const handleGoogleLogin = async () => {
//     setLoading(true);
//     const user = await signInWithGoogle();
//     setLoading(false);
    
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//       navigate("/dashboard");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500">
//       <motion.div
//         className="bg-white shadow-lg rounded-lg p-8 w-96 text-center"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <h1 className="text-2xl font-bold text-gray-900 mb-4">Login to Task Manager</h1>
//         <p className="text-gray-600 mb-6">Organize your tasks efficiently!</p>

//         <motion.button
//           onClick={handleGoogleLogin}
//           className="flex items-center justify-center w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           disabled={loading}
//         >
//           {loading ? "Signing in..." : (
//             <>
//               <FcGoogle className="text-2xl mr-2" />
//               Sign in with Google
//             </>
//           )}
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;
