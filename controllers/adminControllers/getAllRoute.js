


const getAllallRoutes = async (req, res) => {
    try {
        const routes = []
        const stack = req.app._router.stack;
        stack.forEach(data => {
            if (data.name === 'router' && data.handle.stack) {
                data.handle.stack.forEach(handler => {
                    routes.push({
                        path: handler.route.path,
                        methods: handler.route.methods
                    });
                })
            }
        });
        res.status(200).json({
            message: "Roles Fatched Sucesssfully...",
            routes
        });
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
};

module.exports = getAllallRoutes