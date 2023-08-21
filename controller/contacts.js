const service = require("../service/contacts");

const get = async (req, res, next) => {
  try {
    const results = await service.getContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await service.getContactById(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await service.addContact(id);
    res.json({
      status: "success",
      code: 200,
      data: { contact: result },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const results = await service.updateContact(id, body);
    if (body) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: results,
        },
      });
    } else {
      res.status(400).json({
        status: "error",
        code: 404,
        message: "missing field",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateFav = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;
    const results = await service.updateFavorite(id, favorite);
    if (body) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: results,
        },
      });
    } else {
      res.status(400).json({
        status: "error",
        code: 404,
        message: "missing field favorite",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.removeContact(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: {
          id,
          data: {
            contact: results,
          },
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  updateFav,
  remove,
};
