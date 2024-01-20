"use client";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const formSchema = z.object({
    degree: z.string().min(1, { message: "Please select a degree." }),
    specialisation: z
        .string()
        .min(1, { message: "Please select a specialisation." }),
    intake: z.string().min(1, { message: "Please select an intake." }),
});

const TrackerForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            degree: "",
            specialisation: "",
            intake: "",
        },
    });

    useEffect(() => {
        const jsonUserDetails = localStorage.getItem("userDetails");
        if (jsonUserDetails) {
            const savedUserDetails = JSON.parse(jsonUserDetails);
            form.reset(savedUserDetails);
        }
    }, []);

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // save to local storage
        localStorage.setItem("userDetails", JSON.stringify(values));
    }

    return (
        <div
            id="tracker-form"
            className="w-full flex justify-center items-center mt-48 tablet:mt-56 pb-64 phone:pb-[27rem] xl:mt-96 lg:pb-80"
        >
            <div className="w-3/4 lg:w-1/4">
                <div className="text-center lg:text-4xl font-black">
                    Set up your <span className="text-orange">Tracker</span>
                </div>
                {/* form container */}
                <div className="lg:mt-12">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className=""
                        >
                            {/* form fields container */}
                            <div className="mb-8 space-y-3">
                                <FormField
                                    control={form.control}
                                    name="degree"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Degree</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Bachelor of Computing in Computer Science"
                                                    {...field}
                                                />
                                            </FormControl>
                                            {/* <FormDescription>
                                            This is your public display name.
                                        </FormDescription> */}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="specialisation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Specialization
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Networking, AI"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="intake"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Intake</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="2021/2022 Normal Intake"
                                                    {...field}
                                                />
                                            </FormControl>
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
