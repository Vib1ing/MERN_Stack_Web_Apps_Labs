const express = require("express")
const contactsRouter = express.Router()
const Contact = require("../models/contact")

contactsRouter.post("/", async (req, res, next) => {
    try {
        const { name, email } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        } else {
            const contact= new Contact({ name, email })
            const contactMovie = await contact.save();
            res.json(contactMovie);
        }
    } catch (error) {
        next(error);
    }
});

contactsRouter.get("/", async (req, res) => {
    const contacts = await Contact.find({});
    console.log(contacts);
    res.json(contacts);
});

contactsRouter.get("/:id", async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(404).json({ error: "Contact not found" });
        } else {
            res.json(contact);
        }
    } catch (error) {
        next(error);
    }
});

contactsRouter.delete("/:id", async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            res.status(404).json({ error: "Contact not found!" });
        } else {
            res.status(200).json({ message: `The Contact [${contact.name}] deleted successfully` });
        }
    }
    catch (error) {
        next(error)
    }
});
contactsRouter.put("/:id", async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, { title, watchlist }, { new: true, runValidators: true });
        if (updatedContact) {
            res.status(200).json(updatedContact);

        }
        else {
            res.status(404).json({ error: "Contact not Found you silly willy" });

        }
    } catch (error) {
        next(error)
    }
})
module.exports = contactsRouter;