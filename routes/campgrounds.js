const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware')

router.route('/')
.get( catchAsync(campgrounds.index))
.post( validateCampground, isLoggedIn, catchAsync(campgrounds.createCampground))

router.get('/new', isLoggedIn, catchAsync(campgrounds.renderNewForm))

router.route('/:id')
.get( catchAsync(campgrounds.showCampground))
.put( isLoggedIn, validateCampground, isAuthor, catchAsync(campgrounds.updateCampground))
.delete( isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));





module.exports = router; 