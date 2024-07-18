// import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TUser } from "../utils/types";
import { deleteUser } from "../services/users";

type Props = {
    user: TUser;
    setEditUser: React.Dispatch<React.SetStateAction<TUser | null>>;
};

const UserItem = ({ user, setEditUser }: Props) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: () => deleteUser(user.id!),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });

    const handleEdit = () => {
        setEditUser({ ...user });
    };

    const handleDelete = () => {
        mutation.mutate();
    };

    if (!user) return;
    return (
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
                {user.firstname} {user.lastname}
            </th>
            <td className="px-6 py-4">{user.dob}</td>
            <td className="px-6 py-4">{user.funding}</td>
            <td className="px-6 py-4">{user.languages[0]}</td>
            <td className="px-6 py-4">
                {[...user.languages.slice(1)].join(", ")}
            </td>
            <td className="px-6 py-4">
                <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={handleEdit}
                >
                    Edit
                </button>
                <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default UserItem;
