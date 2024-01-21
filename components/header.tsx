import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
    return (
        <div className="z-20 bg-bg_gray h-14 flex items-center w-full fixed top-0 lg:opacity-85 shadow border-b-2 border-gray-200">
            <div className="flex items-center w-full">
                <Link href="/">
                    <div className="pl-4 xl:pl-8 font-semibold text-xl xl:text-2xl text-orange">
                        NUS-GRAD
                    </div>
                </Link>
                <Link href="/#tracker-form" className="ml-auto mr-3 lg:mr-6">
                    <Button>Update profile</Button>
                </Link>
            </div>
        </div>
    );
};

export default Header;
