"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

type RegistrationFormValues = {
    name: string;
    email: string;
    dob: string;
    gender: "male" | "female" | "other" | "prefer_not_to_say";
    accountType: "professional" | "personal";
    password: string;
    confirmPassword: string;
    avatar?: FileList;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Page() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<RegistrationFormValues>();

    const passwordValue = watch("password");

    const onSubmit = async (data: RegistrationFormValues) => {
        const payload = {
            ...data,
            avatar: data.avatar?.[0]?.name ?? null,
        };

        console.log("Registration payload:", payload);
    };

    return (
        <main className="min-h-screen bg-background text-foreground grid place-items-center p-4">
            <section className="w-full max-w-2xl rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
                    <p className="text-sm text-muted-foreground">Fill in your details to get started with TaskFlow</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2 sm:col-span-2">
                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Your full name"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                            {...register("name", {
                                required: "Name is required",
                                minLength: { value: 2, message: "Name must be at least 2 characters" },
                            })}
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: emailPattern, message: "Please enter a valid email" },
                            })}
                        />
                        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="dob" className="text-sm font-medium">Date of birth</label>
                        <input
                            id="dob"
                            type="date"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                            {...register("dob", {
                                required: "Date of birth is required",
                                validate: (value) => new Date(value) <= new Date() || "Date of birth cannot be in the future",
                            })}
                        />
                        {errors.dob && <p className="text-sm text-destructive">{errors.dob.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="gender" className="text-sm font-medium">Gender</label>
                        <select
                            id="gender"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                            defaultValue=""
                            {...register("gender", { required: "Gender is required" })}
                        >
                            <option value="" disabled>Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer_not_to_say">Prefer not to say</option>
                        </select>
                        {errors.gender && <p className="text-sm text-destructive">{errors.gender.message}</p>}
                    </div>

                    <fieldset className="space-y-2 sm:col-span-2">
                        <legend className="text-sm font-medium">Account type</legend>
                        <div className="flex flex-wrap items-center gap-3">
                            <label className="inline-flex items-center gap-2 text-sm">
                                <input
                                    type="radio"
                                    value="personal"
                                    className="accent-primary"
                                    {...register("accountType", { required: "Account type is required" })}
                                />
                                Personal
                            </label>
                            <label className="inline-flex items-center gap-2 text-sm">
                                <input
                                    type="radio"
                                    value="professional"
                                    className="accent-primary"
                                    {...register("accountType", { required: "Account type is required" })}
                                />
                                Professional
                            </label>
                        </div>
                        {errors.accountType && <p className="text-sm text-destructive">{errors.accountType.message}</p>}
                    </fieldset>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 8, message: "Password must be at least 8 characters" },
                            })}
                        />
                        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) => value === passwordValue || "Passwords do not match",
                            })}
                        />
                        {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                        <label htmlFor="avatar" className="text-sm font-medium">Avatar (optional)</label>
                        <input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:text-primary-foreground"
                            {...register("avatar", {
                                validate: (files) => {
                                    if (!files || files.length === 0) return true;
                                    const isImage = files[0]?.type.startsWith("image/");
                                    return isImage || "Avatar must be an image file";
                                },
                            })}
                        />
                        {errors.avatar && <p className="text-sm text-destructive">{errors.avatar.message}</p>}
                    </div>

                    <div className="sm:col-span-2 space-y-3 pt-2">
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Creating account..." : "Create account"}
                        </Button>
                        <p className="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </section>
        </main>
    );
}