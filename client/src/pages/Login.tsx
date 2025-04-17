import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../store/apiStore';

const Login = () => {
  const navigate = useNavigate();

  const auth = useAuth()

  if(!auth) {
    throw new Error('Auth context not available');
  }

  const { login } = auth; 


  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData.username, formData.password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="font-zilla">
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="py-12 rounded-lg border-pink-600 px-8">
            <h1 className="text-center text-xl font-semibold sm:text-2xl md:text-4xl my-5 lg:text-6xl text-pink-500">
              Login
            </h1>

            <div className="flex flex-col min-w-xs">
              <input
                value={formData.username}
                onChange={handleChange}
                name="username"
                type="text"
                placeholder="username"
                className="py-1 rounded-sm px-2 border-2  bg-pink-900 border-pink-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 outline-none transition m-2"
              />
              <input
                value={formData.password}
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Password"
                className="py-1 rounded-sm px-2 border-2  bg-pink-900 border-pink-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 outline-none transition m-2"
              />
            </div>

            <div className="flex gap-3 justify-center items-center my-4 ">
              <button className="border-2 cursor-pointer bg-pink-400 hover:bg-pink-600 py-1 rounded-sm px-10 border-pink-400 ">
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="border-2 cursor-pointer bg-pink-400 hover:bg-pink-600 py-1 rounded-sm px-10 border-pink-400 "
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
