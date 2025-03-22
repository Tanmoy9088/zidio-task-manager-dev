import axios from "axios";

const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    window.open("http://localhost:4000/auth/google", "_self");
  };

  return (
    <button
      onClick={handleGoogleLogin}
      class="px-4 py-2 border flex gap-2 border-slate-500 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-950 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-blue-800 hover:shadow transition duration-150 justify-center bg-blue-100"
    >
      <img
        class="w-6 h-6"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="google logo"
      />
      <span>Login with Google</span>
    </button>
  );
};

export default GoogleLogin;
