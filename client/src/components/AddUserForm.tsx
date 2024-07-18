import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fundingOptions, languageOptions, TUser } from "../utils/types";
import { addUser, updateUser } from "../services/users";

type Props = {
    editUser: TUser | null;
    setEditUser: React.Dispatch<React.SetStateAction<TUser | null>>;
};

type Inputs = {
    firstname: string;
    lastname: string;
    dob: string;
    primaryLanguage: string;
    secondaryLanguages: string[];
    funding: string;
};

const AddUserForm = ({ editUser, setEditUser }: Props) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (user: TUser) =>
            editUser?.id ? updateUser(editUser.id, user) : addUser(user),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["users"],
            });
            setEditUser(null);
            reset();
        },
    });
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({ values: makeEditUserValues() });
    const onSubmit: SubmitHandler<Inputs> = (data) =>
        mutation.mutate(formatUserData(data));

    const formatUserData = ({
        dob,
        firstname,
        funding,
        lastname,
        primaryLanguage,
        secondaryLanguages,
    }: Inputs) => {
        const user: TUser = {
            firstname,
            lastname,
            dob,
            funding,
            languages: [...new Set([primaryLanguage, ...secondaryLanguages])],
        };
        return user;
    };

    const todaysDate = () => {
        const now = new Date();
        const today = `${now.getFullYear()}-${
            now.getMonth() + 1 < 10
                ? "0" + (now.getMonth() + 1)
                : now.getMonth() + 1
        }-${now.getDate()}`;
        return today;
    };

    function makeEditUserValues() {
        if (editUser) {
            const { firstname, lastname, dob, languages, funding } =
                editUser as TUser;
            return {
                firstname,
                lastname,
                dob,
                primaryLanguage: languages[0],
                secondaryLanguages: [...languages.slice(1)],
                funding,
            };
        }
        return;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        First Name
                    </label>
                    <input
                        className={
                            "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" +
                            (errors.firstname ? " border-red-500" : "")
                        }
                        type="text"
                        placeholder="Jane"
                        {...register("firstname", { required: true })}
                    />
                    {errors.firstname ? (
                        <p className="text-red-500 text-xs italic">
                            Please fill out this field.
                        </p>
                    ) : null}
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Last Name
                    </label>
                    <input
                        className={
                            "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" +
                            (errors.lastname ? " border-red-500" : "")
                        }
                        type="text"
                        placeholder="Doe"
                        {...register("lastname", { required: true })}
                    />
                    {errors.lastname ? (
                        <p className="text-red-500 text-xs italic">
                            Please fill out this field.
                        </p>
                    ) : null}
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6 gap-y-4">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        max={todaysDate()}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        {...register("dob", { required: true })}
                    />
                    {errors.dob ? (
                        <p className="text-red-500 text-xs italic">
                            Please fill out this field.
                        </p>
                    ) : null}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Funding
                    </label>
                    <div className="relative">
                        <select
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            {...register("funding", { required: true })}
                        >
                            {fundingOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Primary language
                    </label>
                    <div className="relative">
                        <select
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            {...register("primaryLanguage", { required: true })}
                        >
                            {languageOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Secondary languages
                    </label>
                    <div className="relative">
                        <select
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            {...register("secondaryLanguages")}
                            multiple
                        >
                            {languageOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                    <i className="text-xs">ctrl + click for multiple</i>
                </div>
            </div>
            <div className="flex gap-x-4">
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    {editUser
                        ? mutation.isPending
                            ? "Updating user..."
                            : "Update user"
                        : mutation.isPending
                        ? "Adding user..."
                        : "Add user"}
                </button>
                <button
                    type="reset"
                    onClick={() => reset()}
                    className="bg-transparent text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                >
                    Reset form
                </button>
            </div>
        </form>
    );
};

export default AddUserForm;
