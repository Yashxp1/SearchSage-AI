import { useNavigate } from 'react-router-dom';
import { signup } from '../store/apiStore';
import { useState } from 'react';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(formData.name, formData.username, formData.password);
  };

  return (
    <form onSubmit={handleSumbit}>
      <div className="font-zilla">
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="py-12 rounded-lg border-pink-600 px-8">
            <h1 className="text-center text-xl font-semibold sm:text-2xl md:text-4xl my-5 lg:text-6xl text-pink-500">
              Signup
            </h1>

            <div className="flex flex-col min-w-xs">
              <input
                value={formData.name}
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Name"
                className="py-1 rounded-sm px-2 border-2  bg-pink-900 border-pink-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 outline-none transition m-2"
              />
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                type="text"
                placeholder="username"
                className="py-1 rounded-sm px-2 border-2  bg-pink-900 border-pink-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 outline-none transition m-2"
              />
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Password"
                className="py-1 rounded-sm px-2 border-2  bg-pink-900 border-pink-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 outline-none transition m-2"
              />
            </div>

            <div className="flex gap-3 justify-center items-center my-4 ">
              <button
                type="submit"
                className="border-2 cursor-pointer bg-pink-400 hover:bg-pink-600 py-1 rounded-sm px-10 border-pink-400 "
              >
                Signup
              </button>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="border-2 cursor-pointer bg-pink-400 hover:bg-pink-600 py-1 rounded-sm px-10 border-pink-400 "
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;
