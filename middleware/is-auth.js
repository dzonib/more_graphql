import jwt from 'jsonwebtoken'

export default async (req, res, next) => {
    const authHeader = req.get('Authorization')
    console.log(authHeader)
    if (!authHeader) {
        req.isAuth = false
        return next();
    }

    const token = authHeader.split(' ')[1]

 

    if (!token || token === '') {
        return next();
    }

    let decodedToken;

    try {
       decodedToken = await jwt.verify(token, 'yosecretyo')
    } catch(e) {
        req.isAuth = false
        return next();
    }


    if (!decodedToken) {
        req.isAuth = false
        return next();
    }

    req.isAuth = true
    req.userId = decodedToken.userId
    return next();
}