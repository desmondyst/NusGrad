"use client";

import { Button } from "@/components/ui/button";
import { Link as ScrollLink, animateScroll } from "react-scroll";

const LandingPageContent = () => {
    return (
        <div className="text-center p-2 m-4 mt-10 phone:mt-16 pt-16 tablet:pt-24 lg:pt-16 xl:pt-24 xl:mt-16 tracking-wider flex flex-col">
            <div className="text-4xl tablet:text-5xl xl:text-6xl tablet:w-3/4 lg:w-3/4 xl:w-1/2 font-black mx-auto">
                The <span className="text-orange">easier</span> way to track
                your graduation requirements
            </div>
            <div className="mt-8 p-2 text-md tablet:text-lg tablet:w-3/4 lg:w-3/4 xl:w-1/3 xl:text-lg font-bold mx-auto phone:leading-10 lg:leading-none">
                <span className="text-orange">NUS-GRAD </span>{" "}
                <span className="text-text_gray">
                    is your all-in-one solution for seamless tracking of your
                    academic progress and the graduation requirements that need
                    to be fulfilled.
                </span>
            </div>

            {/* container for action */}
            <div className="tablet:w-1/2 lg:w-2/5 xl:w-1/4 mt-28 phone:mt-56 tablet:mt-32 lg:mt-14 xl:mt-48 mx-auto flex flex-col space-y-3">
                <div className="p-3 text-md tablet:text-lg text-text_gray font-bold mb-3">
                    Get started by choosing your Degree and Intake.
                </div>
                {/* button container */}
                <div className="flex flex-col justify-center items-center h-full space-y-2">
                    {/* remove rounded-2xl */}

                    <ScrollLink
                        to="tracker-form"
                        smooth={true}
                        offset={-100}
                        duration={1000}
                        className="hover:text-[#e5e5fb] cursor-pointer"
                    >
                        <Button className="w-full xl:w-48 rounded-2xl bg-[#FF5138]">
                            Get Started
                        </Button>
                    </ScrollLink>
                    <div className="text-text_gray text-sm">
                        No sign in required
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPageContent;
