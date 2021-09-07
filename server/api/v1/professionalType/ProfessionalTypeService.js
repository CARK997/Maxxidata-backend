import ProfessionalType from '../../../models/ProfessionalType';
import Auth from '../../../models/Auth';
import Brcrypt from 'bcryptjs';

class ProfessionalService {

    async create(professional) {
        const existentProfessional = await ProfessionalType.findOne({ email: professional.email });
        const existentUser = await Auth.findOne({ email: professional.email });
        if (existentProfessional || existentUser) {
            return {
                status: false,
                message: 'Professional type allready is exist!'
            }
        }
        const passwordHash = Brcrypt.hashSync(professional.password, Brcrypt.genSaltSync(8), null)
        professional.password = passwordHash
        const newProfessional = await ProfessionalType.create(professional)
        await Auth.create({
            ...professional,
            userId: newProfessional._doc._id
        })
        console.log(newProfessional._doc)
        return newProfessional._doc
    }

    async update(id, professional) {
        const existentProfessional = await ProfessionalType.findById(id);
        if (!existentProfessional) {
            return {
                status: false,
                message: 'Professional type not exist!'
            }
        }
        delete professional.email
        var newProfessional = await ProfessionalType.findByIdAndUpdate(id, professional)
        newProfessional = { ...newProfessional._doc, ...professional }
        console.log(newProfessional)
        return newProfessional
    }

    async listAll(params) {
        const allProfessionals = await ProfessionalType.find({ ...params });
        console.log(allProfessionals)
        return allProfessionals
    }

    async delete(id) {
        const existentProfessional = await ProfessionalType.findById(id);
        if (!existentProfessional) {
            return {
                status: false,
                message: 'Professional type not exist!'
            }
        }
        await ProfessionalType.findByIdAndDelete(id)
        await Auth.findOneAndDelete({ userId: id })
        console.log({
            status: true,
            message: 'Professional type sucessfuly removed!'
        })
        return {
            status: true,
            message: 'Professional type sucessfuly removed!'
        }
    }

}

export default new ProfessionalService();