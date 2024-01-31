const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require("../models/listing");
const { validateListing, isLoggedIn, isOwner } = require('../middleware.js');
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require('../cloudConfig.js');
const upload = multer({ storage});

router
    .route('/')
    .get(wrapAsync(listingController.index)) //Index route
    .post(
        isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.createListing) //Create route
    );



// Create new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route('/:id')
.get(wrapAsync(listingController.showListing)) //Show route
.put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing)  //Update route
)
.delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing) //Delete route
)

// Edit route
router.get('/:id/edit',
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);



module.exports = router;
