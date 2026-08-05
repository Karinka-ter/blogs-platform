import {runDB, stopDb} from "../src/db/mongo.db";
import {ADMIN_PASSWORD, ADMIN_USERNAME, SETTINGS} from "../src/settings/config";
import express from "express";
import {setupApp} from "../src/setup-app";
import request from "supertest";
import {USERS_PATH} from "../src/users/constans/users.paths";

beforeAll(async () => {
    await runDB(SETTINGS.MONGO_URL);
});

afterAll(async () => {
    await stopDb();
});


const ADMIN_AUTH = `Basic ${Buffer.from(
    `${ADMIN_USERNAME}:${ADMIN_PASSWORD}`
).toString('base64')}`;


describe(USERS_PATH, () => {
    const app = express();

    setupApp(app);

    beforeEach(async () => {
        await request(app)
            .delete('/api/testing/all-data')
            .expect(204);
    });

    it('should return empty array', async () => {
        await request(app)
            .get(USERS_PATH)
            .expect(200, {
                pagesCount: 0,
                page: 1,
                pageSize: 10,
                totalCount: 0,
                items: []
            });
    });

    it('create new user', async () => {
        await request(app)
            .post(USERS_PATH).set('Authorization', ADMIN_AUTH).send({
                login: 'karinka',
                password: 'Vqpkjcx2',
                email: 'terv@mail.com',
            })
            .expect(201);
    });


    it('bad request ', async () => {
        await request(app)
            .post(USERS_PATH).set('Authorization', ADMIN_AUTH).send({
                login: 'karinkanjfvfvefbv',
                password: '',
                email: 'terv',
            })
            .expect(400);
    });

    it('delete a user', async () => {
       const user = await request(app)
            .post(USERS_PATH).set('Authorization', ADMIN_AUTH).send({
                login: 'karinka',
                password: 'Vqpkjcx2',
                email: 'terv@mail.com',
            })
            .expect(201);

       await request(app).delete(`/api/users/${user.body.id}`).set('Authorization', ADMIN_AUTH).expect(204);
    })
})