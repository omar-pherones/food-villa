import { Link } from 'react-router-dom';
import FooterLogo from '../img/logo.png';
const Footer = () => {
    return (
        <footer className="py-8 flex flex-col gap-3 items-center bg-rose-200/75 opacity-75">
            <Link
                className="footerlogo text-2xl flex items-center gap-2 lowercase font-bold"
                to="/"
            >
                <img
                    src={FooterLogo}
                    alt="food"
                    className="w-12 overflow-hidden object-cover"
                />
                <span>Food</span>
                <span className="text-rose-500">Villa</span>
            </Link>
            <p>
                &copy; {new Date().getFullYear()} Foodverse. All rights
                reserved.
            </p>
        </footer>
    );
};

export default Footer;
