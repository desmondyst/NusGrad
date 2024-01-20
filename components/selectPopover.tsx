import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverClose,
} from "@/components/ui/popover";
import AddIcon from "../public/orangeAdd.png";

const SelectPopover = ({ onClick }) => {
    return (
        <Popover>
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
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                            Choosing a course for
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            Set the dimensions for the layer.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <Button
                            type="button"
                            className="text-orange rounded-2xl bg-transparent hover:bg-gray-100"
                            onClick={onClick}
                        >
                            Select Course
                        </Button>
                    </div>
                </div>
                <PopoverClose className="text-orange rounded-2xl bg-transparent hover:bg-gray-100 absolute top-0 right-2 m-3">
                    X
                </PopoverClose>
            </PopoverContent>
        </Popover>
    );
};

export default SelectPopover;
