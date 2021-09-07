import Pet from '../../../models/Pet';
import Professional from '../../../models/Professional';
import Place from '../../../models/Place';
import Auth from '../../../models/Auth';
import Jwt from 'jsonwebtoken';
import Brcrypt from 'bcryptjs';

class AuthService {

    async login(auth) {
        if (!auth.email || !auth.password) {
            return {
                status: false,
                message: 'Fill in the login and password correctly'
            }
        }
        const existentUser = await Auth.findOne({ email: auth.email });
        if (!existentUser) {
            return {
                status: false,
                message: 'E-mail ou senha incorretos'
            }
        }
        if (! await Brcrypt.compare(auth.password, existentUser.password)) {
            return {
                status: false,
                message: 'Invalid password'
            }
        }
        const token = Jwt.sign({ id: existentUser.userId }, process.env.SUPER_SECRET, { expiresIn: 86400 });
        var user = {}
        switch (existentUser.userType) {
            case 'CLIENT':
                user = await Pet.findById(existentUser.userId)
                break;
            case 'PROFESSIONAL':
                user = await Professional.findById(existentUser.userId)
                break;
            case 'PLACE':
                user = await Place.findById(existentUser.userId)
                break;
            default:
                return {
                    status: false,
                    message: 'User type not valid!'
                }
        }
        user = { user, jwtToken: token }
        console.log(user)
        return user
    }
    
}

export default new AuthService();