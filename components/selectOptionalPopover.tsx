import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverClose,
} from "@/components/ui/popover";
import AddIcon from "../public/orangeAdd.png";
import { ScrollArea } from "./ui/scroll-area";

const SelectOptionalPopover = ({ years, coursesCode, localStorage, semesters }) => {
    const [open, setOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");

    const [value, setValue] = useState("");
    const onClick = (course, ay, sem) => {
        localStorage.addCourseCompleted(
            course,
            ay,
            sem,
        );
    };
    const handleSubmit = () => {
        if (selectedYear && selectedSemester) {
            onClick(
                selectedCourse.toUpperCase(),
                selectedYear,
                selectedSemester
            );
        }
    };
    return (
        <Popover open={open} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    className="text-orange rounded-2xl bg-transparent hover:bg-gray-100 whitespace-normal font-bold"
                >
                    <Image
                        className="mr-2"
                        src={AddIcon}
                        alt="Audit Report"
                        height="23"
                        width="23"
                    />
                    Click here to add a course
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-1/8 tablet:w-96">
                <Command className="space-y-2">
                    <div className="text-xs tablet:text-sm text-left">
                        <div className="text-gray-700">Add a course</div>
                    </div>
                    <CommandEmpty>No course found.</CommandEmpty>
                        <ScrollArea>
                            <CommandGroup>
                                <div className="border border-gray-400 rounded-xl divide-y-2 divide-gray-400">
                                    {coursesCode?.map((course) => (
                                        <CommandItem
                                            key={course.value}
                                            value={course.value}
                                            className="text-gray-700"
                                            onSelect={(currentValue) => {
                                                setValue(
                                                    currentValue === value
                                                        ? ""
                                                        : currentValue
                                                );
                                                setSelectedCourse(currentValue);
                                            }}
                                        >
                                            {course.label}
                                        </CommandItem>
                                    ))}
                                </div>
                            </CommandGroup>
                        </ScrollArea>
                    </Command>
                    <Command>
                        <div className="text-xs tablet:text-sm text-left pt-2 pl-2 text-gray-700">
                            Select a year
                        </div>
                        <CommandGroup>
                            <div className="border border-gray-400 rounded-xl divide-y-2 divide-gray-400">
                                {years.map((year) => (
                                    <CommandItem
                                        key={year.value}
                                        value={year.value}
                                        className="text-gray-700"
                                        onSelect={() => {
                                            setSelectedYear(year.value);
                                        }}
                                    >
                                        {year.label}
                                    </CommandItem>
                                ))}
                            </div>
                        </CommandGroup>
                    </Command>
                    <Command>
                        <div className="text-xs tablet:text-sm pt-2 pl-2 text-left text-gray-700">
                            Select a semester
                        </div>
                        <CommandGroup>
                            <div className="border border-gray-400 rounded-xl divide-y-2 divide-gray-400">
                                {semesters.map((semester) => (
                                    <CommandItem
                                        key={semester.value}
                                        value={semester.value}
                                        className="text-gray-700"
                                        onSelect={() => {
                                            setSelectedSemester(semester.value);
                                        }}
                                    >
                                        {semester.label}
                                    </CommandItem>
                                ))}
                            </div>
                        </CommandGroup>
                    </Command>
                <Button onClick={handleSubmit}>Submit</Button>
                <PopoverClose className="text-orange rounded-2xl bg-transparent hover:bg-gray-100 absolute top-0 right-2 m-3">
                    X
                </PopoverClose>
            </PopoverContent>
        </Popover>
    );
};

export default SelectOptionalPopover;
