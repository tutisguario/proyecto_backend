import { getDependency } from '../utils/dependencyManager.js';
import checkRoleMiddleware from '../middlewares/checkRoleMiddleware.js';

export function configureUserRouter(router) {
    const userService = getDependency('userService');

    console.log("Configurando rutas de usuario");
    router.get("/api/users", checkRoleMiddleware("admin"), async (req, res) => {
        const users = userService.getList();
        res.json(users.map(user => ({
            username: user.user_name,
            displayName: user.display_name,
            email: user.email,
            role: user.role

        })));
    });

    router.post("/api/users", checkRoleMiddleware("admin"), async (req, res) => {
        const user = await getDependency('userService').create(req.body);
        if (!user) return res.status(409).json({ error: "El nombre de usuario ya existe" });
    });

    router.put("/api/users/:id", checkRoleMiddleware("admin"), async (req, res) => {
        const userService = getDependency('userService');
        const updateUser = await userService.update(parseInt(req.params.id), req.body);
        if (!updateUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json({ id: updateUser.id, name: updatedUser.name });
    });
}
