import request from 'supertest';
import express from 'express';
import { setupApp } from '../src/setup-app';
import { db } from '../src/db/in-memory.db';
import {BLOGS_PATH, POST_PATH} from "../src/core/paths/paths";

const ADMIN_AUTH = `Basic ${Buffer.from(
    'admin:qwerty',
).toString('base64')}`;

const testBlog = {
    id: '1',
    name: 'My Blog',
    description: 'Description',
    websiteUrl: 'https://my-blog.com',
};

const testPost = {
    id: '1',
    title: 'Post title',
    shortDescription: 'Short description',
    content: 'Post content',
    blogId: '1',
    blogName: 'My Blog',
};

describe(POST_PATH, () => {
    const app = express();
    setupApp(app);

    beforeEach(() => {
        db.blogs = [];
        db.posts = [];
    });

    it('should return empty array', async () => {
        await request(app)
            .get(POST_PATH)
            .expect(200, []);
    });

    it('should return post by id', async () => {
        db.blogs.push({ ...testBlog });
        db.posts.push({ ...testPost });

        await request(app)
            .get(`${POST_PATH}/1`)
            .expect(200, testPost);
    });

    it('should return 404 for non existing post', async () => {
        await request(app)
            .get(`${POST_PATH}/999`)
            .expect(404);
    });

    it('should create post', async () => {
        db.blogs.push({ ...testBlog });

        const response = await request(app)
            .post(POST_PATH)
            .set('Authorization', ADMIN_AUTH)
            .send({
                title: 'Post title',
                shortDescription: 'Short description',
                content: 'Post content',
                blogId: '1',
            })
            .expect(201);

        expect(response.body).toEqual({
            id: expect.any(String),
            title: 'Post title',
            shortDescription: 'Short description',
            content: 'Post content',
            blogId: '1',
            blogName: 'My Blog',
        });
    });

    it('should not create post with incorrect data', async () => {
        db.blogs.push({ ...testBlog });

        await request(app)
            .post(POST_PATH)
            .set('Authorization', ADMIN_AUTH)
            .send({
                title: '',
                shortDescription: '',
                content: '',
                blogId: '',
            })
            .expect(400);
    });

    it('should not create post for non existing blog', async () => {
        await request(app)
            .post(POST_PATH)
            .set('Authorization', ADMIN_AUTH)
            .send({
                title: 'Post title',
                shortDescription: 'Short description',
                content: 'Post content',
                blogId: '999',
            })
            .expect(400);
    });

    it('should update post', async () => {
        db.blogs.push({ ...testBlog });
        db.posts.push({ ...testPost });

        await request(app)
            .put(`${POST_PATH}/1`)
            .set('Authorization', ADMIN_AUTH)
            .send({
                title: 'Updated title',
                shortDescription: 'Updated short description',
                content: 'Updated content',
                blogId: '1',
            })
            .expect(204);

        expect(db.posts[0].title).toBe('Updated title');
        expect(db.posts[0].shortDescription).toBe(
            'Updated short description',
        );
        expect(db.posts[0].content).toBe('Updated content');
    });

    it('should not update non existing post', async () => {
        db.blogs.push({ ...testBlog });

        await request(app)
            .put(`${POST_PATH}/999`)
            .set('Authorization', ADMIN_AUTH)
            .send({
                title: 'Updated title',
                shortDescription: 'Updated short description',
                content: 'Updated content',
                blogId: '1',
            })
            .expect(404);
    });

    it('should delete post', async () => {
        db.blogs.push({ ...testBlog });
        db.posts.push({ ...testPost });

        await request(app)
            .delete(`${POST_PATH}/1`)
            .set('Authorization', ADMIN_AUTH)
            .expect(204);

        expect(db.posts.length).toBe(0);
    });

    it('should return 404 when deleting non existing post', async () => {
        await request(app)
            .delete(`${POST_PATH}/999`)
            .set('Authorization', ADMIN_AUTH)
            .expect(404);
    });

    it('should return 401 without authorization', async () => {
        await request(app)
            .post(POST_PATH)
            .send({
                title: 'Post title',
                shortDescription: 'Short description',
                content: 'Post content',
                blogId: '1',
            })
            .expect(401);
    });
});