import bcryptjs from 'bcryptjs'

const qHelpers = {}

qHelpers.encryptPassword = async (password) => {
    const salt = await bcryptjs.genSalt(10)
    const hash = await bcryptjs.hash(password, salt)
    return hash
}

qHelpers.matchPassword = async (password, savedPassword) => {
    try {
        return await bcryptjs.compare(password, savedPassword)
    }catch(err){
        console.log(err)
    }
}

export default qHelpers 