const router = require("express").Router();
const userController = require("../Controllers/userContrller");
const { verifyToken } = require("../Controllers/authController");

router.get("/", userController.getAllUsers);
router.get("/:id", verifyToken, userController.getSingleUser);
router.patch("/:id", verifyToken, userController.updateUser);
router.delete("/:id", verifyToken, userController.deleteUser);

module.exports = router;
