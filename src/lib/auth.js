export const isLogedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/login')
}

export const isNotLogedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/perfil')
}