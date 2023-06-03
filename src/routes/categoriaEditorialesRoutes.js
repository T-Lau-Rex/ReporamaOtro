import { isLogedIn, isNotLogedIn } from "../lib/auth.js";

import { Router } from "express";
import passport from "passport";
import pool from "../config/database.js";

const router = Router()

export default router