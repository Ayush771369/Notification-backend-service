import {Router} from 'express';
const router = Router();

// Sample route
router.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to the Notification API'});
});

export default router;