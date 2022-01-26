const multer = require('multer')
const path = require('path');
const crypto = require('crypto');

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'public', 'static'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'public', 'static'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if(err) cb(err);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, fileName);
      })
    }
  }),
  // limits: {
  //   fileSize: 2 * 1024 * 1024.
  // },
  // fileFilter: (req, file, cb) => {
  //   const allowedMimes = [
  //     'audio/aac',
  //     'application/x-abiword',
  //     'application/octet-stream',
  //     'video/x-msvideo',
  //     'application/vnd.amazon.ebook',
  //     'application/octet-stream',
  //     'application/x-bzip',
  //     'application/x-bzip2',
  //     'application/x-csh',
  //     'text/css',
  //     'text/csv',
  //     'application/msword',
  //     'application/vnd.ms-fontobject',
  //     'application/epub+zip',
  //     'image/gif',
  //     'text/html',
  //     'image/x-icon',
  //     'text/calendar',
  //     'application/java-archive',
  //     'image/jpeg',
  //     'application/javascript',
  //     'application/json',
  //     'audio/midi',
  //     'video/mpeg',
  //     'application/vnd.apple.installer+xml',
  //     'application/vnd.oasis.opendocument.presentation',
  //     'application/vnd.oasis.opendocument.spreadsheet',
  //     'application/vnd.oasis.opendocument.text',
  //     'audio/ogg',
  //     'video/ogg',
  //     'application/ogg',
  //     'font/otf',
  //     'image/png',
  //     'application/pdf',
  //     'application/vnd.ms-powerpoint',
  //     'application/x-rar-compressed',
  //     'application/rtf',
  //     'application/x-sh',
  //     'image/svg+xml',
  //     'application/x-shockwave-flash',
  //     'application/x-tar',
  //     'image/tiff',
  //     'application/typescript',
  //     'font/ttf',
  //     'application/vnd.visio',
  //     'audio/x-wav',
  //     'audio/webm',
  //     'video/webm',
  //     'image/webp',
  //     'font/woff',
  //     'font/woff2',
  //     'application/xhtml+xml',
  //     'application/vnd.ms-excel',
  //     'application/xml',
  //     'application/vnd.mozilla.xul+xml',
  //     'application/zip',
  //     'video/3gpp',
  //     'video/3gpp2',
  //     'application/x-7z-compressed'
  //   ];

  //   if(allowedMimes.includes(file.mimetype)){

  //     cb(null, true);
  //   } else {
  //     cb(new Error('Invalid file type'));
  //   }
  // }
}