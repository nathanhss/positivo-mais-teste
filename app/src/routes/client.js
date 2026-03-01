import ClientController from "../controllers/client.js";
import express from "express";
import { validate } from "../middlewares/validator.js";
import { validationResult } from "express-validator";

const router = express.Router();

router.get("/clients", async (req, res) => {
    const clients = await ClientController.getAll();
    res.status(200).json(clients);
});

router.post("/clients", validate("create"), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const data = req.body;
        console.log("data", data);
        const client = await ClientController.create(data);
        res.status(201).json(client);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.get("/clients/:id", validate("get"), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const id = req.params.id;
        const client = await ClientController.getById(id);
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.put("/clients/:id", validate("update"), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const id = req.params.id;
        const data = req.body;
        const client = await ClientController.update(id, data);
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// router.patch("/clients/:id", async (req, res) => {
//   const id = req.params.id;
//   const data = req.body;
//   const client = await ClientController.patch(id, data);
//   res.status(200).json(client);
// });

router.delete("/clients/:id", validate("delete"), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const id = req.params.id;
        const client = await ClientController.delete(id);
        res.status(client.status).json(client);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

export default router;
