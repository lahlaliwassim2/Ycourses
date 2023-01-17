const asyncHandler = require('express-async-handler')
const {Organisation,validateCreateOrganisation } = require('../models/Organisation')
/**-------------------------------------
* @desc----Create new Organisation
* @route --- /api/organisation
* @methode - POST
* @acces  private (only Admin)
---------------------------------------*/
module.exports.createOrganisationCtrl= asyncHandler(async(req,res)=>{
    //validation 
    const {error} = validateCreateOrganisation(req.body)
    if(error) {
        return res.status(400).json({msg : error.details[0].message})
    }

    const organisation = await Organisation.create({
        title: req.body.title,
        user: req.user.id
    })
    res.status(201).json(organisation)
})


/**-------------------------------------
* @desc----GET ALL Organisation
* @route --- /api/organisation
* @methode - GET    
* @acces  PUBLIC 
---------------------------------------*/
module.exports.getAllOrganisationCtrl= asyncHandler(async(req,res)=>{
    //validation 
    const organisations = await Organisation.find()
    res.status(201).json(organisations)
})



/**-------------------------------------
* @desc----Delete Organisation
* @route --- /api/organisation/:id
* @methode - DELETE  
* @acces  private (only Admin)
---------------------------------------*/
module.exports.deleteOganisationCtrl= asyncHandler(async(req,res)=>{
    //validation 
    const organisation = await Organisation.findById(req.params.id)
    if(!organisation) return res.status(404).json({msg:"not found"})

    await Organisation.findByIdAndDelete(req.params.id)
    res.status(201).json({
        msg:'Organisation deleted',
        organisationId : organisation._id
    })
})