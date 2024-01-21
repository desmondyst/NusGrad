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

const courses = [
    {
        value: "Course 1",
        label: "Course 1",
    },
    {
        value: "Course 2",
        label: "Course 2",
    },
    {
        value: "Course 3",
        label: "Course 3",
    },
    // Add more courses as needed
];

const SelectPopover = ({ coursesCode, onClick }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

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
            <PopoverContent className="w-1/8 tablet:w-96 h-64">
                <Command className="space-y-2">
                    <div className="text-xs tablet:text-sm text-left">
                        <div className="text-gray-700">Add a course</div>
                    </div>
                    <CommandInput placeholder="Search course..." />
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
                                            setOpen(false);
                                            onClick(currentValue);
                                        }}
                                    >
                                        {course.label}
                                    </CommandItem>
                                ))}
                            </div>
                        </CommandGroup>
                    </ScrollArea>
                </Command>
                <PopoverClose className="text-orange rounded-2xl bg-transparent hover:bg-gray-100 absolute top-0 right-2 m-3">
                    X
                </PopoverClose>
            </PopoverContent>
        </Popover>
    );
};

export default SelectPopover;
