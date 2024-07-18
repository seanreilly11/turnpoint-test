import { TUser } from "../utils/types";

export const getUsers = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/v1/users");
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export const getUser = async (id: number) => {
    try {
        const res = await fetch(`http://localhost:3000/api/v1/users/${id}`);
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export const addUser = async (body: TUser) => {
    try {
        const res = await fetch(`http://localhost:3000/api/v1/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export const updateUser = async (id: number, body: TUser) => {
    try {
        const res = await fetch(`http://localhost:3000/api/v1/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export const deleteUser = async (id: number) => {
    try {
        const res = await fetch(`http://localhost:3000/api/v1/users/${id}`, {
            method: "DELETE",
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};
