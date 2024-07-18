import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import AddUserForm from "./components/AddUserForm";
import UserTable from "./components/UserTable";
import { useState } from "react";
import { TUser } from "./utils/types";

function App() {
    const queryClient = new QueryClient();
    const [editUser, setEditUser] = useState<TUser | null>(null);
    return (
        <QueryClientProvider client={queryClient}>
            <div className="container mx-auto m-4">
                <h1 className="text-xl mb-8">
                    TurnPoint code test - Sean Reilly
                </h1>
                <div className="flex flex-col sm:flex-row gap-x-8">
                    <AddUserForm
                        editUser={editUser}
                        setEditUser={setEditUser}
                    />
                    <UserTable setEditUser={setEditUser} />
                </div>
            </div>
        </QueryClientProvider>
    );
}

export default App;
