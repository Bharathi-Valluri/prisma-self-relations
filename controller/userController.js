const { PrismaClient } = require('@prisma/client')
const { appConst } = require('../router/constants')
const prisma = new PrismaClient()

const savingUserData = async (req, res) => {
  try {
    const value = JSON.parse(JSON.stringify(req.body))
    const resp = await prisma.user.create({
      data: {
        name: value.name,
        successor: {
          create: {
            name: value.name1
          }
        }
      }
    })
    console.log(resp)
    res.status(200).json({
      status: appConst.status.saveData,
      response: resp,
      message: 'success'
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: 'failed'
    })
  }
}

const getUserData = async (req, res) => {
  try {
    const resp = await prisma.user.findMany({})

    console.log(resp)
    res.status(200).json({
      status: appConst.status.getData,
      response: resp,
      message: 'success'
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: 'failed'
    })
  }
}

const updateUserDetails = async (req, res) => {
  try {
    const resp = await prisma.user.update({
      where: {
        id: req.body.id
      },
      data: {
        name: req.body.name
      }
    })
    console.log(resp)
    res.status(200).json({
      status: appConst.status.updateData,
      response: resp,
      message: 'success'
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: 'failed'
    })
  }
}

const deletingUserData = async (req, res) => {
  try {
    const resp = await prisma.user.delete({
      where: {
        successorId: req.body.id
      }
    })

    const resp1 = await prisma.user.delete({
      where: {
        id: req.body.id1
      }
    })

    const transaction = prisma.$transaction([resp, resp1])
    console.log(transaction)
    res.status(200).json({
      status: appConst.status.deleteData,
      response: resp,
      message: 'success'
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: 'failed'
    })
  }
}

module.exports = {
  savingUserData,
  getUserData,
  updateUserDetails,
  deletingUserData
}
