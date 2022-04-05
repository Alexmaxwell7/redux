const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUsers,
  getUserById,
  editUser,
  deleteUser,
} = require("../controller/emp");
router.get("/getemployee", getUsers);
router.get("/getemployeeId/:id", getUserById);
router.post("/addemployee", addUsers);
router.put("/editemployee/:id", editUser);
router.delete("/deleteemployee/:id", deleteUser);
module.exports = router;
