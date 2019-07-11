"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function routesWithSlug({ server, app }) {
    // Dynamic pages server-side routing
    server.get('/verify-email/:token', (req, res) => {
        const actualPage = '/verify-email';
        const queryParams = { token: req.params.token };
        app.render(req, res, actualPage, queryParams);
    });
}
exports.default = routesWithSlug;
//# sourceMappingURL=routesWithSlug.js.map