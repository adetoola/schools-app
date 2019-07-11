import cluster from 'cluster';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import next from 'next';
import os from 'os';
import path from 'path';
import url from 'url';

const numCPUs = os.cpus().length;
import routesWithSlug from './routesWithSlug';

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt((process as any).env.PORT, 10) || 3000;
// const { PRODUCTION_URL_APP } = env;
const ROOT_URL = dev ? `http://localhost:${port}` : 'PRODUCTION_URL_APP';

// Multi-process to utilize all CPU cores.
if (!dev && cluster.isMaster) {
    console.log(`Node cluster master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.error(
            `Node cluster worker ${
                worker.process.pid
            } exited: code ${code}, signal ${signal}`,
        );
    });
} else {
    const app = next({ dev });
    const handle = app.getRequestHandler();

    app.prepare()
        .then(() => {
            const server = express();

            if (!dev) {
                // Enforce SSL & HSTS in production
                // tslint:disable-next-line:no-shadowed-variable
                server.use((req, res, next) => {
                    const proto = req.headers['x-forwarded-proto'];
                    if (proto === 'https') {
                        res.set({
                            'Strict-Transport-Security': 'max-age=31557600', // one-year
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
            server.use(
                '/static',
                express.static(path.join(__dirname, 'static'), {
                    maxAge: dev ? '0' : '365d',
                }),
            );

            server.use(helmet());
            server.use(compression());

            if (!dev) {
                server.set('trust proxy', 1); // sets req.hostname, req.ip
            }

            routesWithSlug({ server, app });

            server.get('/robots.txt', (_, res) => {
                res.sendFile(path.join(__dirname, '../static', 'robots.txt'));
            });

            // Default catch-all renders Next app
            server.get('*', (req, res) => {
                // res.set({
                //   'Cache-Control': 'public, max-age=3600'
                // });
                const parsedUrl = url.parse(req.url, true);
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
