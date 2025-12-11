import { Router } from 'express'
import {
  createFamiliar,
  getAllFamiliars,
  getFamiliarById,
  getFamiliarsByGroup,
  updateFamiliar,
  deleteFamiliar
} from '../controllers/familiarController'

const router = Router()

router.post('/', createFamiliar)
router.get('/group/:GroupID', getFamiliarsByGroup)
router.get('/:FamiliarID', getFamiliarById)
router.get('/', getAllFamiliars)
router.put('/:FamiliarID', updateFamiliar)
router.delete('/:FamiliarID', deleteFamiliar)

export default router
