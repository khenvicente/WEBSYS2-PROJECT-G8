import { Router } from "express";
import {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
  // addFamiliarToGroup,
  // removeFamiliarFromGroup
} from "../controllers/groupController";

const router = Router();

router.post("/", createGroup);
router.get("/", getAllGroups);
router.get("/:GroupID", getGroupById);
router.put("/:GroupID", updateGroup);
router.delete("/:GroupID", deleteGroup);

// router.post("/:GroupID/familiars", addFamiliarToGroup);
// router.delete("/:GroupID/familiars", removeFamiliarFromGroup);

export default router;
