import { Router } from "express";
const router = Router();
import {
    getUsers,
    getUserByID,
    addUser,
    updateUser,
} from "../controllers/users";

router.route("/").get(getUsers).post(addUser);

router.route("/:id").get(getUserByID).patch(updateUser);

export default router;
