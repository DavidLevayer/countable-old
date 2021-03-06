import {Application} from 'express';

export function testHelloWorld(app: Application) {

    /**
     * Returns 'hello world' (debug function)
     */
    app.get('/api/test/helloworld', function (req, res) {
        console.log('hitting HELLO WORLD function');
        const welcomeString = '<h1>hello world!</h1>';
        res.end(welcomeString);
    });
};
