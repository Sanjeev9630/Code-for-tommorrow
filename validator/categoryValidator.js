const {  Validator } = require('node-input-validator')

module.exports ={ 
    registerValidator: async function(dataObj) {
        let { email, password } = dataObj ;
        const v = new Validator(dataObj, {
            email: 'required|email',
            password: 'required|string',
        });

        let matched = await v.check();

        if(!matched){
            throw (v.errors)
        } else {
            return { email: email.toLowerCase(), password }
        }
    },
    
    loginValidator: async function(dataObj) {
        let { email, password } = dataObj ;
        const v = new Validator(dataObj, {
            email: 'required|email',
            password: 'required|string',
        });

        let matched = await v.check();

        if(!matched){
            throw (v.errors)
        } else {
            return { email: email.toLowerCase(), password }
        }
    },
    
    addCategoryValidator: async function(dataObj) {
        let { categoryId, categoryName } = dataObj ;
        const v = new Validator(dataObj, {
            categoryId: 'required|integer',
            categoryName: 'required|string',
        });

        let matched = await v.check();

        if(!matched){
            throw (v.errors)
        } else {
            return { categoryId, categoryName }
        }
    },
    
    updateCategoryValidator: async function(dataObj) {
        let { categoryName } = dataObj ;
        const v = new Validator(dataObj, {
            categoryName: 'required|string',
        });

        let matched = await v.check();

        if(!matched){
            throw (v.errors)
        } else {
            return { categoryName }
        }
    },
    
    deleteCatValid: async function(dataObj) {
        let { categoryId } = dataObj ;
        const v = new Validator(dataObj, {
            categoryId: 'required|integer',
        });

        let matched = await v.check();

        if(!matched){
            throw (v.errors)
        } else {
            return { categoryId }
        }
    },
    
    addServiceValidator: async function(dataObj) {
        let { serviceid, servicename, servicetype, serviceprice } = dataObj ;
        const v = new Validator(dataObj, {
            serviceid: 'required|integer',
            servicename: 'required|string',
            serviceprice: 'required|string',
            servicetype: 'required|string',
        });

        let matched = await v.check();

        if(!matched){
            throw (v.errors)
        } else {
            return { serviceid, servicename, servicetype, serviceprice }
        }
    },

    updateServiceValidator: async function(dataObj) {
        let { servicename, servicetype, serviceprice } = dataObj ;
        const v = new Validator(dataObj, {
            servicename: 'required|string',
            serviceprice: 'required|string',
            servicetype: 'required|string',
        });

        let matched = await v.check();

        if(!matched){
            throw (v.errors)
        } else {
            return { servicename, servicetype, serviceprice }
        }
    },

    deleteSerValid: async function(dataObj) {
        let { categoryId, serviceId } = dataObj ;
        const v = new Validator(dataObj, {
            categoryId: 'required|integer',
            serviceId: 'required|integer',
        });

        let matched = await v.check();

        if(!matched){
            throw (v.errors)
        } else {
            return { categoryId, serviceId }
        }
    }
}