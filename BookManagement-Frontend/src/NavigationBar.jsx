import back from './assets/back.svg';
import avatar from './assets/avatar.svg';
import fileaddition from './assets/file-addition.svg';
import logout from './assets/logout.svg'

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");

    const [lastClickTime, setLastClickTime] = useState(0);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
    };

    const handleClick = () => {
        const now = Date.now();
        if (now - lastClickTime < 2000) {
          handleLogout();
        } else {
          setLastClickTime(now);
        }
      };

    return (
        <div className="bg-blue-500 w-full h-16 flex justify-between items-center px-6">
            <div className="space-x-4" onClick={() => navigate(-1)}>
                <img src={back} alt="back" onClick={() => navigate(-1)} />
            </div>
                {token && <h1 className='text-xl font-bold text-white'>Hi Admin</h1>}
            <div className="space-x-4 flex items-center h-auto w-auto">
                {token && <Link to="/addbooks"><img src={fileaddition} alt="fileaddition" /></Link>}
                {!token && <Link to="/login"><img src={avatar} alt="avatar" /></Link>}
                {token && <img src={logout} alt="logout" onClick={handleClick} />}
            </div>
        </div>

    )
}