import express from 'express'
import { getProfiles, createProfile, updateProfile, deleteProfile, getProfile, getProfilesByUser } from '../controllers/profile.js'

const router = express.Router()


router.get('/byid', getProfilesByUser)
router.get('/:id', getProfile)
router.get('/', getProfiles)
router.post('/', createProfile)
router.patch('/:id', updateProfile)
router.delete('/:id', deleteProfile)


export default router