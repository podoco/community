const firebaseApp = require('../config/firebaseModule')
const express = require('express')
const cors = require('cors')
const { database } = require('firebase-functions/v1/firestore')

const Fauth = firebaseApp.auth()
const Fdatabase = firebaseApp.database()

const router = express.Router()
router.use(cors())
router.options('*',cors)

router.post('/users/new', (req,res,next) => {
  const {email, password,nickname} = req.body

  Fauth.createUser({
    email,
    password,
    displayname : nickname
  }).then(credential => {
    const{
      uid
    } = credential

    // 유저 프로필 데이터베이스를 만들어서 데이터베이스에 저장하기.

    Promise.all([
      Fdatabase.ref(`users/${uid}/profile`).set({
        email,
        nickname,
        timestamp : Date.now()
    }),
    Fdatabase.ref(`statics/nicknames/${uid}`).set(nickname)
  ]).then(() => {
    res.status(200).json({
      msg: '유저가 만들어 졌습니다'
    })
  }).catch(err =>{
    res.status(400).json({
      err
    })
  })   

  }).catch(err =>{
    res.status(400).json({
      err
    })
  })
  
})

router.get('/helloworld', (req,res,next) =>{
  res.json({
    msg : 'helloworld'
  })
})

module.exports = router