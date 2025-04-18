import { FaArrowRight } from 'react-icons/fa6';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../utils';

const Dashboard = () => {
  const [input, setInput] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getResult = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${baseURL}/summary`,
        { content: input },
        {
          withCredentials: true,
        }
      );
      setData(res.data);
    } catch (error) {
      console.log('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: any) => {
    if (!input.trim()) return;
    getResult();
  };

  return (
    <div className="flex p-2 flex-col lg:flex-row min-h-screen ">
      <div className="lg:w-[15%] mb-4 lg:mb-0 w-full">
        <Sidebar />
      </div>
      <div className="w-full lg:w-[85%] rounded-lg">
        <div className="border border-gray-800 min-h-screen flex flex-col justify-between p-4 h-full rounded-lg ">
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

          <div className="border-2">
            {data && (
              <div>
                <h2>Summary:</h2>
                <p>{data.summary}</p>

                <h3>Search Results:</h3>
                <ul>
                  {data.searchResults?.map((item, index) => (
                    <li key={index}>
                      <a href={item.link} target="_blank" rel="noreferrer">
                        {item.title}
                      </a>
                      <p>{item.snippet}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex justify-center items-center mt-6 gap-6">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search..."
              type="text"
              className="w-full max-w-xl border border-gray-800 transition-transform duration-200 hover:scale-105 bg-gray-900 px-4 py-2 rounded-4xl outline-none"
            />
            <span
              onClick={handleSubmit}
              className="rounded-4xl border border-gray-800 transition-transform duration-200 hover:bg-pink-500 hover:scale-110 p-3"
            >
              <FaArrowRight />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
