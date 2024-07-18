import { Router } from "express";
const router = Router();
import {
    getUsers,
    getUserByID,
    addUser,
    updateUser,
    deleteUser,
} from "../controllers/users";

router.route("/").get(getUsers).post(addUser);

router.route("/:id").get(getUserByID).put(updateUser).delete(deleteUser);

export default router;
