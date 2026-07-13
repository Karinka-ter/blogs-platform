import request from 'supertest';
import express from 'express';
import {setupApp} from '../src/setup-app';
import {db} from "../src/db/in-memory.db";
import {ADMIN_PASSWORD, ADMIN_USERNAME} from "../src/auth/middlewares/super-admin.guard-middleware";
import {BLOGS_PATH} from "../src/blogs/constants/blogs.paths";

const createTestBlog = () => ({
    id: '1',
    name: 'My Blog',
    description: 'My description',
    websiteUrl: 'https://my-blog.com',
});

const ADMIN_AUTH = `Basic ${Buffer.from(
    `${ADMIN_USERNAME}:${ADMIN_PASSWORD}`
).toString('base64')}`;

describe(BLOGS_PATH, () => {
    const app = express();

    setupApp(app);

    beforeEach(() => {
        db.blogs = []
    });


    it('should return empty array', async () => {
        await request(app)
            .get(BLOGS_PATH)
            .expect(200, []);
    });

    it('should return blog', async () => {
        db.blogs.push(createTestBlog())
        await request(app)
            .get(`${BLOGS_PATH}/1`)
            .expect(200, {
                id: '1',
                name: 'My Blog',
                description: 'My description',
                websiteUrl: 'https://my-blog.com',
            });
    });

    it('should create blog', async () => {
        const response = await request(app)
            .post(BLOGS_PATH)
            .set('Authorization', ADMIN_AUTH)
            .send({
                name: 'My Blog',
                description: 'My description',
                websiteUrl: 'https://my-blog.com',
            })
            .expect(201);

        expect(response.body).toEqual({
            id: expect.any(String),
            name: 'My Blog',
            description: 'My description',
            websiteUrl: 'https://my-blog.com',
        });
    });

    it('should not create blog with incorrect data', async () => {
        await request(app)
            .post(BLOGS_PATH)
            .set('Authorization', ADMIN_AUTH)
            .send({
                name: '',
                description: '',
                websiteUrl: 'test',
            })
            .expect(400);
    });

    it('update blog', async () => {
        db.blogs.push(createTestBlog())
        await request(app).put(`${BLOGS_PATH}/1`).set('Authorization', ADMIN_AUTH).send({
            name: 'Update Blog',
            description: 'Update description',
            websiteUrl: 'https://update-blog.com',
        }).expect(204);

        expect(db.blogs[0].id).toEqual('1');
        expect(db.blogs[0].name).toEqual('Update Blog');
        expect(db.blogs[0].description).toEqual('Update description');
    })

    it('should not update blog with incorrect data', async () => {
        db.blogs.push(createTestBlog())
        await request(app)
            .put(`${BLOGS_PATH}/1`)
            .set('Authorization', ADMIN_AUTH)
            .send({
                name: '',
                description: '',
                websiteUrl: 'test',
            })
            .expect(400);
    });

    it('delete blog', async () => {
        db.blogs.push(createTestBlog())
        await request(app).delete(`${BLOGS_PATH}/1`).set('Authorization', ADMIN_AUTH).expect(204);
        expect(db.blogs.length).toBe(0);
    })

    it('should return 404 for non existing blog', async () => {
        await request(app)
            .get(`${BLOGS_PATH}/999`)
            .expect(404);
    });

    it('should not delete non existing blog', async () => {
        await request(app)
            .delete(`${BLOGS_PATH}/999`).set('Authorization', ADMIN_AUTH)
            .expect(404);
    });

    it('should not update non existing blog', async () => {
        await request(app)
            .put(`${BLOGS_PATH}/999`).set('Authorization', ADMIN_AUTH)
            .send({
                name: 'Blog',
                description: 'Description',
                websiteUrl: 'https://blog.com',
            })
            .expect(404);
    });

});