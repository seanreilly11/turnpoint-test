import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import AddUserForm from "./components/AddUserForm";
import UserList from "./components/UserList";

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <div className="container mx-auto my-4">
                <h1 className="text-xl mb-8">
                    TurnPoint code test - Sean Reilly
                </h1>
                <div className="flex flex-col sm:flex-row gap-x-8">
                    <AddUserForm />
                    <UserList />
                </div>
            </div>
        </QueryClientProvider>
    );
}

export default App;
