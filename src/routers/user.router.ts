import { Router } from "express";

import { userShape, loginShape, updateUserShape } from "../shapes/index";
import checkUniqueKeys from "../middlewares/checkUniqueKeys.middleware";
import userPermissions from "../middlewares/userPermissions.middleware";
import AttendantController from "../controllers/attendant.controller";
import validateShape from "../middlewares/validateShape.middleware";
import validateAuth from "../middlewares/validateAuth.middleware";
import UserController from "../controllers/user.controller";
import {
  addSectorOrRemoveSectorShape,
  attendantShape,
  updateAttendatShape,
} from "../shapes/attendants.shape";
import upload from "../config/multer";
import userExists from "../middlewares/userExists.middleware";
import attendantExists from "../middlewares/attendantExists.middleware";
import sectorExists from "../middlewares/sectorExists.middleware";
import adminPermissions from "../middlewares/adminPermissions.middleware";

const router = Router();

export default (): Router => {
  const usercontroller = new UserController();
  const attendantController = new AttendantController();

  router.post(
    "/users/signup",
    validateShape(userShape),
    checkUniqueKeys,
    usercontroller.create
  );
  router.post("/users/login", validateShape(loginShape), usercontroller.login);
  router.get("/users", validateAuth, adminPermissions, usercontroller.getUsers);
  router.get(
    "/users/info",
    validateAuth,
    adminPermissions,
    usercontroller.getInfo
  );
  router.get(
    "/users/info/:userId",
    validateAuth,
    userExists,
    userPermissions,
    usercontroller.getUserInfo
  );
  router.get(
    "/users/:userId",
    validateAuth,
    userExists,
    usercontroller.getUser
  );
  router.patch(
    "/users/:userId",
    validateShape(updateUserShape),
    validateAuth,
    userPermissions,
    usercontroller.update
  );

  router.post(
    "/users/attendant/:userId",
    upload.single("file"),
    validateShape(attendantShape),
    validateAuth,
    userPermissions,
    checkUniqueKeys,
    attendantController.createAttendant
  );

  router.post(
    "/attendant/login",
    validateShape(loginShape),
    attendantController.login
  );

  router.get(
    "/users/attendant/:attendantId",
    validateAuth,
    attendantExists,
    attendantController.getAttendant
  );

  router.get(
    "/attendants",
    validateAuth,
    userPermissions,
    attendantController.getAllAttendants
  );
  router.get(
    "/attendants/page",
    validateAuth,
    userPermissions,
    attendantController.getAllAttendantsPaginate
  );

  router.put(
    "/users/attendant/:attendantId",
    validateShape(updateAttendatShape),
    validateAuth,
    userPermissions,
    attendantExists,
    attendantController.putAttendant
  );
  router.patch(
    "/users/attendant/sector/:attendantId",
    validateShape(addSectorOrRemoveSectorShape),
    validateAuth,
    userPermissions,
    attendantExists,
    attendantController.addSectorOrRemoveSector
  );

  router.delete(
    "/users/attendant/:attendantId/delete",
    validateAuth,
    userPermissions,
    attendantExists,
    attendantController.deleteAttendant
  );

  return router;
};
