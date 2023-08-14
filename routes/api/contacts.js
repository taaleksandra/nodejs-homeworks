const express = require("express");
const uniqid = require("uniqid");
const Joi = require("joi");
const contacts = require("../../models/contacts");

const router = express.Router();

const responseSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  const data = await contacts.listContacts();
  res.json({ status: "success", code: 200, data: data });
});

router.get("/:contactId", async (req, res, next) => {
  const data = await contacts.getContactById(req.params.contactId);

  if (!data) {
    return res.json({ status: "error", code: 404, message: "Not found" });
  }

  res.json({
    status: "success",
    code: 200,
    data: data,
  });
});

router.post("/", async (req, res, next) => {
  try {
    const value = await responseSchema.validateAsync(req.body);

    const data = await contacts.addContact({
      id: uniqid(),
      ...value,
    });

    res.json({ status: "success", code: 201, data: data });
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const data = await contacts.removeContact(req.params.contactId);

  if (!data)
    return res.json({
      status: "error",
      code: 404,
      message: "Not found",
    });

  res.json({
    status: "succes",
    code: 200,
    message: "contact deleted successfully",
    data: data,
  });
});

router.put("/:contactId", async (req, res, next) => {
  if (!req.body)
    return res.json({
      status: "error",
      message: "missing fields",
      code: 400,
    });

  try {
    await schema.validateAsync(req.body);

    const existingContact = await contacts.getContactById(req.params.contactId);

    if (!existingContact)
      return res.json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    const { name, email, phone } = req.body;
    const data = await contacts.updateContact(req.params.contactId, {
      id: req.params.contactId,
      name,
      email,
      phone,
    });
    res.json({
      status: "success",
      code: 200,
      data: data,
    });
  } catch (error) {
    return res.json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
});

module.exports = router;
