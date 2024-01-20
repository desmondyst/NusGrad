"use client";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useLocalStorage from "@/components/hooks/useLocalStorage";
import { cn } from "@/lib/utils";

const formSchema = z.object({
    degree: z.string().min(1, { message: "Please select a degree." }),
    specialisation: z
        .string()
        .min(1, { message: "Please select a specialisation." }),
    intake: z.string().min(1, { message: "Please select an intake." }),
});

const degrees = [
    {
        label: "Bachelor of Computing in Computer Science",
        value: "Bachelor of Computing in Computer Science",
    },
] as const;

const specialisations = [
    {
        label: "Networking",
        value: "Networking",
    },
    {
        label: "AI",
        value: "AI",
    },
] as const;

const intakes = [
    {
        label: "2021/2022 Normal Intake",
        value: "2021/2022 Normal Intake",
    },
    {
        label: "2022/2023 Normal Intake",
        value: "2022/2023 Normal Intake",
    },
] as const;

const TrackerForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            degree: "",
            specialisation: "",
            intake: "",
        },
    });

    const localStorage = useLocalStorage();
    const savedUserDetails = localStorage.saved_data["userDetails"];

    useEffect(() => {
        if (savedUserDetails) {
            form.reset(savedUserDetails);
        }
    }, [savedUserDetails]);

    const router = useRouter();

    // 2. Define a submit handler.
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        localStorage.addUserDetails(values);
        router.push("/audit");
    };

    return (
        <div
            id="tracker-form"
            className="w-full flex justify-center items-center mt-48 tablet:mt-56 pb-64 phone:pb-[27rem] xl:mt-96 lg:pb-80"
        >
            <div className="w-3/4 lg:w-1/4 flex flex-col items-center">
                <div className="text-center lg:text-4xl font-black">
                    Set up your <span className="text-orange">Tracker</span>
                </div>
                {/* form container */}
                <div className="lg:mt-12">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-84 lg:w-96"
                        >
                            <div className="mb-8 space-y-3  w-full">
                                <FormField
                                    control={form.control}
                                    name="degree"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Degree</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                "justify-between w-full",
                                                                !field.value &&
                                                                    "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value
                                                                ? degrees.find(
                                                                      (
                                                                          language
                                                                      ) =>
                                                                          language.value ===
                                                                          field.value
                                                                  )?.label
                                                                : "Select degree"}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Select Degree..." />
                                                        <CommandEmpty>
                                                            No degree found.
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {degrees.map(
                                                                (degree) => (
                                                                    <CommandItem
                                                                        value={
                                                                            degree.label
                                                                        }
                                                                        key={
                                                                            degree.value
                                                                        }
                                                                        onSelect={() => {
                                                                            form.setValue(
                                                                                "degree",
                                                                                degree.value
                                                                            );
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                degree.value ===
                                                                                    field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                        {
                                                                            degree.label
                                                                        }
                                                                    </CommandItem>
                                                                )
                                                            )}
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="specialisation"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>
                                                Specialisation
                                            </FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                "w-full justify-between",
                                                                !field.value &&
                                                                    "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value
                                                                ? specialisations.find(
                                                                      (
                                                                          language
                                                                      ) =>
                                                                          language.value ===
                                                                          field.value
                                                                  )?.label
                                                                : "Select specialisation"}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search specialisation..." />
                                                        <CommandEmpty>
                                                            No specialisation
                                                            found.
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {specialisations.map(
                                                                (
                                                                    specialisation
                                                                ) => (
                                                                    <CommandItem
                                                                        value={
                                                                            specialisation.label
                                                                        }
                                                                        key={
                                                                            specialisation.value
                                                                        }
                                                                        onSelect={() => {
                                                                            form.setValue(
                                                                                "specialisation",
                                                                                specialisation.value
                                                                            );
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                specialisation.value ===
                                                                                    field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                        {
                                                                            specialisation.label
                                                                        }
                                                                    </CommandItem>
                                                                )
                                                            )}
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="intake"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Intake</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                "w-full justify-between",
                                                                !field.value &&
                                                                    "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value
                                                                ? intakes.find(
                                                                      (
                                                                          language
                                                                      ) =>
                                                                          language.value ===
                                                                          field.value
                                                                  )?.label
                                                                : "Select intake"}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search intake..." />
                                                        <CommandEmpty>
                                                            No intake found.
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {intakes.map(
                                                                (intake) => (
                                                                    <CommandItem
                                                                        value={
                                                                            intake.label
                                                                        }
                                                                        key={
                                                                            intake.value
                                                                        }
                                                                        onSelect={() => {
                                                                            form.setValue(
                                                                                "intake",
                                                                                intake.value
                                                                            );
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                intake.value ===
                                                                                    field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                        {
                                                                            intake.label
                                                                        }
                                                                    </CommandItem>
                                                                )
                                                            )}
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-orange rounded-2xl"
                            >
                                Start Tracking
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default TrackerForm;
