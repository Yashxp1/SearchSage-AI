import { FaArrowRight } from 'react-icons/fa6';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex p-2 flex-col lg:flex-row min-h-screen bg-gray-100">
      <div className="lg:w-[15%] mb-4 lg:mb-0 w-full">
        <Sidebar />
      </div>
      <div className="w-full lg:w-[85%] rounded-lg bg-white">
        <div className="border border-gray-300 min-h-screen flex flex-col justify-between p-4 h-full rounded-lg ">
          <div className="flex justify-center items-center mt-20">
            <div className="flex flex-col font-extrabold text-4xl md:text-5xl text-center">
              <span className="bg-gradient-to-t from-pink-400 to-purple-600 bg-clip-text text-transparent">
                Hello Yash,
              </span>
              <span className="text-gray-400  text-lg md:text-4xl">
                How can I help you today?
              </span>
            </div>
          </div>

          <div className="flex justify-center items-center mt-6 gap-6">
            <input
            placeholder='Search...'
              type="text"
              className="w-full max-w-xl border border-gray-300 transition-transform duration-200 hover:scale-105 bg-gray-100 text-black px-4 py-2 rounded-4xl outline-none"
            />
            <span className='rounded-4xl border border-gray-300 transition-transform duration-200 hover:bg-pink-500 hover:scale-110 p-3'>
              <FaArrowRight/>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
