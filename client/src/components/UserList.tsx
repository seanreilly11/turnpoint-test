import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/users";
import UserItem from "./UserItem";
import { TUser } from "../utils/types";
import UserTableHeadings from "./UserTableHeadings";

type Props = {
    setEditUser: React.Dispatch<React.SetStateAction<TUser | null>>;
};

const UserList = ({ setEditUser }: Props) => {
    const { data: users, isLoading } = useQuery({
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
                    {isLoading ? (
                        <tr>
                            <td className="px-6 py-4">Loading...</td>
                        </tr>
                    ) : (
                        users?.map((user: TUser) => (
                            <UserItem
                                key={user.id}
                                user={user}
                                setEditUser={setEditUser}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
