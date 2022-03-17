import servicioLogin from '../servicios/login.js'

export default {
    /* --------- REGISTER ---------- */
    getRegister: async(req, res) => {
        return res.render('signup.ejs', { message: '' })
    },

    postRegister: async (req, res) => {
        const token = await servicioLogin.register(req.body)
        if(token) return res.json(token)
        else return res.status(401).json({ error: 'Usuario existente o email inválido y/o no coinciden las password' });
    },

    getRegisterError: async (req, res) => {
        return res.render('signup.ejs', { message: 'Usuario existente o email inválido y/o no coinciden las password' })
    },

    /* --------- LOGIN ---------- */
    getLogin: async (req, res) => {
        return res.render('login.ejs', { message: '' })
    },

    postLogin: async (req, res) => {
        const token = await servicioLogin.login(req.body)
        if(token) return res.json(token)
        else return res.status(401).json({ error: 'Usuario y/o password incorrectos' });
    },

    getLoginError: async (req, res) => {
        return res.render('login.ejs', { message: 'Usuario y/o password incorrectos' })
    },

    /* --------- ECOMMERCE ---------- */
    getMain: async (req, res) => {
        return res.render('main.ejs', { message: '' })
    }
}