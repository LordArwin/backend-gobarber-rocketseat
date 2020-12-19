import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const filepath = path.resolve(__dirname, '..', '..', 'tmp');
export default {
  filepath,
  storage: multer.diskStorage({
    destination: filepath,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName);
    },
  }),
};
