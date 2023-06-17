import { NavLink, Link } from 'react-router-dom';
import navLogoImg from '../img/logo.png';

const Navbar = ({
    searchQuery,
    setSearchQuery,
    searchHandaler,
    inputFildRef,
}) => {
    const navActive = ({ isActive }) => {
        return {
            color: isActive ? '#f43f5e' : null,
        };
    };

    return (
        <nav className="navbar flex justify-between items-center container mx-auto py-8 flex-col lg:flex-row gap-5 lg:gap-0">
            <Link
                className="logo text-2xl flex items-center gap-2 lowercase font-bold"
                to="/"
            >
                <img
                    src={navLogoImg}
                    alt="food"
                    className="w-12 overflow-hidden object-cover"
                />
                <span>Food</span>
                <span className="text-rose-500">Villa</span>
            </Link>
            <form className="search-bar" onSubmit={searchHandaler}>
                <input
                    ref={inputFildRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="search"
                    placeholder="Search recipe..."
                    required
                    className="bg-white/75 p-3 px-8 lg:w-96 rounded-full outline-none shadow-lg shadow-rose-100 focus:shadow-rose-200 duration-300"
                />
            </form>
            <ul className="menu flex gap-5">
                <li>
                    <NavLink
                        style={navActive}
                        end
                        to="/"
                        className="text-gray-400 hover:text-gray-600 duration-300"
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        style={navActive}
                        to="/favourites"
                        className="text-gray-400 hover:text-gray-600 duration-300"
                    >
                        Favourites
                        <span className="favourites-count font-bold text-sky-400">
                            (10)
                        </span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
