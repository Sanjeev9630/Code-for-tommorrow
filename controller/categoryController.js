const categoryValidator = require('../validator/categoryValidator')
const authmiddleware = require('../utils/authmiddleware')
const commonHelpher = require("../utils/commonHelpher")
const db = require("../db")


const registerController = async(req, res) => {
    try {
        if(!req.body) return "Please Enter all the credentials"
        const user = await categoryValidator.registerValidator(req.body)
        const { email, password } = req.body ;

        const existingUser = await db.query(`Select * from usertype where "email" = '${email}'`)
        if(existingUser.rowCount) return res.status(404).send({ message: "User already registerd! Please Login"})  

        const hashPass = await commonHelpher.hashPassword(password)

        const useradd = await db.query(`Insert into usertype ( "email" , "password") values ('${email}', '${hashPass}')`)
        res.status(200).send({ message: "User registerd Successfully", email })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error In registration" })
    }
}


const loginController = async(req, res) => {
    try {
        if(!req.body) return "Please Enter all the credentials"
        const userLogin = await categoryValidator.loginValidator(req.body)
        const { email, password } = req.body ;

        const existingUser = await db.query(`Select * from usertype where "email" = '${email}'`)
        if(!existingUser.rowCount) return res.status(404).send({ message: "User is not registerd"})
        
        const [{ email: userEmail, password: existPassword }] = existingUser.rows;   

        const comparePass = await commonHelpher.comparePassword(password, existPassword )
        if(!comparePass) res.status(404).send({ message : "Invalid Password"})

        const token = await authmiddleware.jwtToken({ email })
        res.status(200).send({ message: "User Logged In Successfully", email, token })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error In Login" })
    }
}

// --------------------------------------- Category -----------------------------------------------------------

const addCategory = async(req, res) => {
    try {
        if(!req.body) return "Please Enter all the details of category"
        const categoryValid = await categoryValidator.addCategoryValidator(req.body)
        const { categoryId, categoryName } = req.body ;

        const addCategoryDB = await db.query(`Insert into category ("categoryid", "categoryname") values ('${categoryId}', '${categoryName}')`)
        res.status(200).send({ message: "Category Added Successfully", categoryId, categoryName })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error In adding category" })
    }
}

const getCategory = async(req, res) => {
    try {
        const getCategoryDB = await db.query(`Select * from category`)
        const { rowCount } = getCategoryDB

        if(!rowCount) return res.status(404).send({ message: "No Category Exist"})

        res.status(200).send({ getCategoryDB: getCategoryDB.rows , message: " All Categories fetched Successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error In getting categories" })
    }
}

const updateCategory = async(req, res) => {
    try {
        if(!req.body) return "Please Enter all the details of category"
        const categoryValid = await categoryValidator.updateCategoryValidator(req.body)
        const { categoryName } = req.body
        const { categoryId } = req.params
        const getCategoryDB = await db.query(`Select * from category where "categoryid" = '${categoryId}'`)
        const { rowCount } = getCategoryDB

        if(!rowCount) return res.status(404).send({ message: "Category doesn't Exist for this categoey Id"})

        const updateCat = await db.query(`Update category set "categoryname" = '${categoryName}' where "categoryid" = '${categoryId}'`)    
        res.status(200).send({ message: "Category Updated Successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error In getting categories" })
    }
}

const deleteCategory = async(req, res) => {
    try {
        const { categoryId } = req.params
        const deleteValid = await categoryValidator.deleteCatValid(req.params)

        const deleteSer = await db.query(`Delete from service where "categoryid" = '${categoryId}'`)
        const deleteCat = await db.query(`Delete from category where "categoryid" = '${categoryId}'`)    
        //  Best way to do is by doing On Cascade Delete
        res.status(200).send({ message: "Category Deleted Successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error In deleting category" })
    }
}


// ------------------------------- Services ---------------------------------------------------------------------


const addServices = async(req, res) => {
    try {
        if(!req.body) return "Please Enter all the details of services"
        const categoryValid = await categoryValidator.addServiceValidator(req.body)
        const { categoryId } = req.params ;
        const { serviceid, servicename, servicetype, serviceprice } = req.body

        const addCategory = await db.query(`Select * from category where "categoryid" = '${categoryId}'`)
        if(!addCategory.rowCount) return res.status(404).send({message:"Can't add Services! Category Doesn't exist"})

        const addCategoryDB = await db.query(`Insert into service ("categoryid", "serviceid", "servicename", "servicetype", "serviceprice") values ('${categoryId}', '${serviceid}', '${servicename}', '${servicetype}', '${serviceprice}')` ) 
        res.status(200).send({ message: "Services Added Successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error In adding Services" })
    }
}

const getServices = async(req, res) => {
    try {
        const { categoryId } = req.params ;
        const addCategory = await db.query(`Select * from category where "categoryid" = '${categoryId}'`)
        if(!addCategory.rowCount) return res.status(404).send({message:"Can't get Services! Since Category Doesn't exist"})

        const getServices = await db.query(`Select * from service where "categoryid" = '${categoryId}'`)    
        res.status(200).send({ getServices: getServices.rows , message: "Services Fetched Successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error In getting Services" })
    }
}

const updateServices = async(req, res) => {
    try {
        if(!req.body) return "Please Enter all the details of Services"
        const categoryValid = await categoryValidator.updateServiceValidator(req.body)
        const { categoryId, serviceId } = req.params ;
        const { servicename, servicetype, serviceprice } = req.body

        const getCategoryDB = await db.query(`Select * from service where "serviceid" = '${serviceId}' and "categoryid" = '${categoryId}'`)
        const { rowCount } = getCategoryDB

        if(!rowCount) return res.status(404).send({ message: "Services doesn't Exist for this service Id"})

        const updateCat = await db.query(`Update service set "servicename" = '${servicename}', "servicetype" = '${servicetype}', "serviceprice" = '${serviceprice}' where "categoryid" = '${categoryId}' and "serviceid" = '${serviceId}'`)    
        res.status(200).send({ message: "Services Updated Successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error In Updating Services" })
    }
}

const deleteService = async(req, res) => {
    try {
        const { categoryId, serviceId } = req.params
        const deleteSerValid = await categoryValidator.deleteSerValid(req.params)
        const deleteSer = await db.query(`Delete from service where "serviceid" = '${serviceId}' and "categoryid" = '${categoryId}'`)    
        const check = await db.query(`Select * from service where "categoryid" = '${categoryId}'`)
        if(!check.rowCount) {
            const deleteCat = await db.query(`Delete from category where "categoryid" = '${categoryId}'`)  
        }
        res.status(200).send({ message: "Service Deleted Successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error In deleting service" })
    }
}


module.exports = { 
    loginController,
    registerController,
    addCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    addServices,
    getServices,
    updateServices,
    deleteService
}