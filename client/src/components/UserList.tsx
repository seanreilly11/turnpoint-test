import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/users";
import UserItem from "./UserItem";
import { TUser } from "../utils/types";
import UserTableHeadings from "./UserTableHeadings";

const UserList = () => {
    const { data: users } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <UserTableHeadings />
                </thead>
                <tbody>
                    {users?.map((user: TUser) => (
                        <UserItem key={user.id} user={user} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
