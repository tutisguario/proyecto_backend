import { getDependency } from '../utils/dependencyManager.js';

export class UserService {
    constructor() {
        this.userRepo = getDependency('userRepo');
    }

    async getList() {
        return await this.userRepo.find();
    }
    
    async add(user) {
        if (!user.username)
            throw new Error("El nombre de usuario es obligatorio");

        if (!user.password)
            throw new Error("La contraseña es obligatoria");

        if (user.password == '1234')
            throw new Error("La contraseña no puede ser 1234");

        const existingUser = await this.userRepo.find({
            username: user.username
        });
        if (existingUser.length)
            throw new Error("El nombre de usuario ya existe");

        return this.userRepo.create(user);
    }
}
