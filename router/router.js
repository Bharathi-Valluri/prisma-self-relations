const user_controller = require('../controller/userController')
const router = require('express').Router()
router.post('/saveUserDetails', user_controller.savingUserData)
router.get('/fetchAll', user_controller.getUserData)
router.put('/updatingUser', user_controller.updateUserDetails)
router.delete('/deletingUser', user_controller.deletingUserData)
module.exports = router
