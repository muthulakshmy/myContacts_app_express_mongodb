const express = require("express");
const router = express.Router();
const {getContacts ,createContact , getContact ,updateContact, deleteContact,getData,getPost,getDataById,updateDataById,deleteDataById}= require("../controllers/contactController")

router.route("/").get(getContacts).post(createContact);

router.route('/machineDetails').get(getData).post(getPost);

router.route('/machineDetail/:id').get(getDataById).put(updateDataById).delete(deleteDataById)

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);



module.exports = router;
