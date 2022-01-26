import express from 'express';

import notificationsRoute from './notifications.js';
import notificationTypesRoute from './notification_types.js';
import attachmentsRoute from './attachments.js';
import { verifyJWT } from '../controllers/auth';
import authRoute from './auth.js';

require("dotenv-safe").config();

const router = express.Router();

router.use('/auth', authRoute);
router.use('/api/notifications',          verifyJWT,    notificationsRoute);
router.use('/api/attachments',            verifyJWT,    attachmentsRoute);
router.use('/api/notification_types',     verifyJWT,    notificationTypesRoute);
router.get('/', (req, res, next) => res.send('Welcome to crypto dashboard'));


export default router;

