import Link from "next/link";

const Header = () => {
    return (
        <div className="z-20 bg-bg_gray h-14 flex items-center w-full fixed top-0 lg:opacity-85 shadow border-b-2 border-gray-200">
            <Link href="/">
                <div className="pl-4 xl:pl-8 font-semibold text-xl xl:text-2xl text-orange">
                    NUS-GRAD
                </div>
            </Link>
        </div>
    );
};

export default Header;
