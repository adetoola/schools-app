"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const next_1 = __importDefault(require("next"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const numCPUs = os_1.default.cpus().length;
const routesWithSlug_1 = __importDefault(require("./routesWithSlug"));
const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3000;
// const { PRODUCTION_URL_APP } = env;
const ROOT_URL = dev ? `http://localhost:${port}` : 'PRODUCTION_URL_APP';
// Multi-process to utilize all CPU cores.
if (!dev && cluster_1.default.isMaster) {
    console.log(`Node cluster master ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker, code, signal) => {
        console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
    });
}
else {
    const app = next_1.default({ dev });
    const handle = app.getRequestHandler();
    app.prepare()
        .then(() => {
        const server = express_1.default();
        if (!dev) {
            // Enforce SSL & HSTS in production
            // tslint:disable-next-line:no-shadowed-variable
            server.use((req, res, next) => {
                const proto = req.headers['x-forwarded-proto'];
                if (proto === 'https') {
                    res.set({
                        'Strict-Transport-Security': 'max-age=31557600',
                    });
                    return next();
                }
                res.redirect(`https://${req.headers.host}${req.url}`);
            });
        }
        // give all Nextjs's request to Nextjs before anything else
        server.get('/_next/*', (req, res) => {
            handle(req, res);
        });
        // Static files
        // https://github.com/zeit/next.js/tree/4.2.3#user-content-static-file-serving-eg-images
        server.use('/static', express_1.default.static(path_1.default.join(__dirname, 'static'), {
            maxAge: dev ? '0' : '365d',
        }));
        server.use(helmet_1.default());
        server.use(compression_1.default());
        if (!dev) {
            server.set('trust proxy', 1); // sets req.hostname, req.ip
        }
        routesWithSlug_1.default({ server, app });
        server.get('/robots.txt', (_, res) => {
            res.sendFile(path_1.default.join(__dirname, '../static', 'robots.txt'));
        });
        // Default catch-all renders Next app
        server.get('*', (req, res) => {
            // res.set({
            //   'Cache-Control': 'public, max-age=3600'
            // });
            const parsedUrl = url_1.default.parse(req.url, true);
            handle(req, res, parsedUrl);
        });
        server.listen(port, err => {
            if (err) {
                throw err;
            }
            console.log(`> Ready on ${ROOT_URL}🚀`);
        });
    })
        .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
}
//# sourceMappingURL=app.js.map