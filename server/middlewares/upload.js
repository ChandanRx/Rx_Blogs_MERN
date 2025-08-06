const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'profiles',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

const uploadProfiles = multer({ storage: profileStorage });

const coverStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'covers',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 1200, height: 600, crop: 'limit' }],
  },
});

const uploadCovers = multer({ storage: coverStorage });

module.exports = { uploadCovers , uploadProfiles};
