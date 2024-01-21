import { useState } from "react";
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
import { Checkbox} from "./ui/checkbox";
import { Button } from "./ui/button";

const years = [
    {
        value: "AY 2022 / 2023",
        label: "AY 2022 / 2023",
    },
    {
        value: "AY 2023 / 2024",
        label: "AY 2023 / 2024",
    },
];

const semesters = [
    {
        value: "Semester 1",
        label: "Semester 1",
    },
    {
        value: "Semester 2",
        label: "Semester 2",
    },
    // Add more semesters as needed
];

const SelectDatePopover = ({ localStorage, setUnits, units, course }) => {
    const [ticked, setTicked] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");

    const handleSubmit = () => {
        if (selectedYear && selectedSemester) {
            console.log(selectedSemester)
            localStorage.addCourseCompleted(
                course.code,
                selectedYear,
                selectedSemester
            );
            setUnits(
                units +
                    course.credit
            );
            setOpen(false);
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Checkbox
                    className="mr-5"
                    checked = {localStorage.containCourseCompleted(course.code)}
                    onCheckedChange={(checked) => {
                        if (checked) {
                            setOpen(true);
                        } else {
                            localStorage.removeCourseCompleted(
                                course.code,
                                selectedYear,
                                selectedSemester
                            );
                            setUnits(
                                units -
                                    course.credit
                            );
                            setOpen(false);
                        }
                    }}
                />
            </PopoverTrigger>
            <PopoverContent className="w-1/8 tablet:w-96">
                <Command className="space-y-2">
                    <div className="text-xs tablet:text-sm text-left text-gray-700">
                        Select a year
                    </div>
                    {/* <CommandInput placeholder="Search year..." /> */}
                    <CommandEmpty>No year found.</CommandEmpty>
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
                <Command className="space-y-2">
                    <div className="text-xs tablet:text-sm text-left text-gray-700">
                        Select a semester
                    </div>
                    <CommandEmpty>No semester found.</CommandEmpty>
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

export default SelectDatePopover;
