import Professional from '../../../models/Professional';
import Auth from '../../../models/Auth';
import Brcrypt from 'bcryptjs';

class ProfessionalService {

    async create(professional) {
        const existentProfessional = await Professional.findOne({ email: professional.email });
        const existentUser = await Auth.findOne({ email: professional.email });
        if (existentProfessional || existentUser) {
            return {
                status: false,
                message: 'Professional allready is exist!'
            }
        }
        const passwordHash = Brcrypt.hashSync(professional.password, Brcrypt.genSaltSync(8), null)
        professional.password = passwordHash
        const newProfessional = await Professional.create(professional)
        await Auth.create({
            ...professional,
            userId: newProfessional._doc._id
        })
        console.log(newProfessional._doc)
        return newProfessional._doc
    }

    async update(id, professional) {
        const existentProfessional = await Professional.findById(id);
        if (!existentProfessional) {
            return {
                status: false,
                message: 'Professional not exist!'
            }
        }
        delete professional.email
        var newProfessional = await Professional.findByIdAndUpdate(id, professional)
        newProfessional = { ...newProfessional._doc, ...professional }
        console.log(newProfessional)
        return newProfessional
    }

    async listAll(params) {
        const allProfessionals = await Professional.find({ ...params });
        console.log(allProfessionals)
        return allProfessionals
    }

    async delete(id) {
        const existentProfessional = await Professional.findById(id);
        if (!existentProfessional) {
            return {
                status: false,
                message: 'Professional not exist!'
            }
        }
        await Professional.findByIdAndDelete(id)
        await Auth.findOneAndDelete({ userId: id })
        console.log({
            status: true,
            message: 'Professional sucessfuly removed!'
        })
        return {
            status: true,
            message: 'Professional sucessfuly removed!'
        }
    }

}

export default new ProfessionalService();