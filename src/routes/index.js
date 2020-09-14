const admin = require('firebase-admin');

let serviceAccount = require('../../crud-node-firebase150396-firebase-adminsdk-g5j5v-137a63dd8f.json');
const { database } = require('firebase-admin');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://crud-node-firebase150396.firebaseio.com"
});


const db = admin.database();




const { Router } = require('express');

const router = Router();




router.get('/', (req,res) => {
    db.ref('contacs').once('value',(snapshot)=>{
        data=snapshot.val()
        res.render('index', {contacs:data})
    })

})


router.post('/new-contact',async (req,res)=>{
    // Dar de alta un Contacto
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        number:req.body.number
    }
    await db.ref('contacs').push(newContact)
    res.redirect('/')
})

router.get('/delete-contact/:id', (req,res)=>{
    //borrar un contacto
    db.ref('contacs/' + req.params.id).remove()
    res.redirect('/')
})









module.exports = router
