import { GoFileSymlinkFile } from 'react-icons/go';
import { LuLibraryBig } from 'react-icons/lu';
import { MdOutlineExplore } from 'react-icons/md';

const sidebarMenu = [
  {
    icon: <MdOutlineExplore />,
    title: 'Explore',
  },
  {
    icon: <LuLibraryBig />,
    title: 'Library',
  },
  {
    icon: <GoFileSymlinkFile />,
    title: 'Files',
  },
];

const Sidebar = () => {
  return (
    <div className="">
      <div className="border border-gray-300 m-2 rounded-lg flex flex-col p-2">
        <span className="">
          {sidebarMenu.map((items, idx) => (
            <div key={idx} className='flex justify-start items-center gap-2 py-1'>
              <span className='text-lg'>{items.icon}</span>
              <span>{items.title}</span>
            </div>
          ))}
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
