import { Router } from "express";
import express from 'express';
import { getUrl, shortenUrl } from "../controller/urlShorten.controller.js";
// import Url from '../models/schema';

const router = Router();

router.route("/geturl").get(getUrl);
router.route("/shortenurl").post(shortenUrl);

export default router;

