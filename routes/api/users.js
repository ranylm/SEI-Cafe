const router = require("express").Router();
const usersCtrl = require("../../controllers/api/users");

router.post("/", usersCtrl.create);

router.post("/login", usersCtrl.login);

router.use(require("../../config/ensureLoggedIn"));
router.get("/check-token", usersCtrl.checkToken);

module.exports = router;
