// import React from "react";
import { TUser } from "../utils/types";

type Props = {
    user: TUser;
};

const UserItem = ({ user }: Props) => {
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
                <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                    Edit
                </a>
            </td>
        </tr>
    );
};

export default UserItem;
