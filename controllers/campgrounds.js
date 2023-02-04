const { cloudinary } = require('../cloudinary');
const campground = require('../models/campground');
const Campground = require('../models/campground')


module.exports.index = async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
};


module.exports.renderNewForm = async (req, res) => {
    res.render('campgrounds/new')
};

module.exports.createCampground = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    campground.image= req.files.map(f=> ({filename: f.filename, url: f.path}));
    await campground.save();
    console.log(campground)
    req.flash('success', 'Successfully made a new campground')
    res.redirect(`/campgrounds/${campground._id}`)

};

module.exports.showCampground = async (req, res) => {
    const campgrounds = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campgrounds) {
        req.flash('error', 'Campground doesnt exist');
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { campgrounds });
};

module.exports.renderEditForm = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    if (!campground) {
        req.flash('error', 'Campground doesnt exist');
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', { campground });
};

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const campgrounds = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs= req.files.map(f=> ({filename: f.filename, url: f.path}))
    campgrounds.image.push(...imgs );
    await campgrounds.save();
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            cloudinary.uploader.destroy(filename)
        }
        await campgrounds.updateOne({$pull: {image:{ filename:{$in: req.body.deleteImages}}}})
        console.log(campgrounds)
    }
    req.flash('success', 'Successfully updated campground');
    res.redirect(`/campgrounds/${campgrounds._id}`)
};

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(req.params.id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds')
};