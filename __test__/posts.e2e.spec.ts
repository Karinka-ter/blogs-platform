import request from 'supertest';
import express, {Express} from 'express';
import {setupApp} from '../src/setup-app';
import {POSTS_PATH} from "../src/posts/constants/posts.paths";
import {runDB, stopDb} from "../src/db/mongo.db";
import {SETTINGS} from "../src/settings/config";
import {createTestBlog} from "./blogs.e2e.spec";



beforeAll(async () => {
    await runDB(SETTINGS.MONGO_URL);
});

afterAll(async () => {
    await stopDb();
});


const ADMIN_AUTH = `Basic ${Buffer.from(
    'admin:qwerty',
).toString('base64')}`;

 export const createTestPost = async (app: Express, blogId:string) => {
    const response = await request(app)
        .post(POSTS_PATH)
        .set('Authorization', ADMIN_AUTH)
        .send({
            title: 'Post title',
            shortDescription: 'Short description',
            content: 'Post content',
            blogId: blogId
        }).expect(201)

    return response.body
}


describe(POSTS_PATH, () => {
    const app = express();
    setupApp(app);

    beforeEach(async () => {
        await request(app)
            .delete('/api/testing/all-data')
            .expect(204);
    });

    it('should return empty array', async () => {
        await request(app)
            .get(POSTS_PATH)
            .expect(200, { pagesCount: 0, page: 1, pageSize: 10, totalCount: 0, items: [] });
    });

    it('return post by id', async () => {
        const blog = await createTestBlog(app)
        const post = await createTestPost(app,blog.id)
        await request(app).get(`${POSTS_PATH}/${post.id}`).expect(200, post)
    })


    it('should return 404 for non existing post', async () => {
        await request(app)
            .get(`${POSTS_PATH}/63189b06003380064c4193be`)
            .expect(404);
    });

    it('should create post', async () => {
        const blog = await createTestBlog(app)
        const post = await createTestPost(app,blog.id)

        expect(post).toEqual({
            id: post.id,
            title: 'Post title',
            shortDescription: 'Short description',
            content: 'Post content',
            blogId: blog.id,
            blogName: blog.name,
            createdAt: post.createdAt,
        });
    });

    it('should not create post with incorrect data', async () => {
        const blog = await createTestBlog(app)

        await request(app)
            .post(POSTS_PATH)
            .set('Authorization', ADMIN_AUTH)
            .send({
                title: '',
                shortDescription: '',
                content: '',
                blogId: blog.id,
            })
            .expect(400);
    });

    it('should not create post for non existing blog', async () => {
        await request(app)
            .post(POSTS_PATH)
            .set('Authorization', ADMIN_AUTH)
            .send({
                title: 'Post title',
                shortDescription: 'Short description',
                content: 'Post content',
                blogId: '63189b06003380064c4193be',
            })
            .expect(404);
    });

    it('should update post', async () => {
        const blog = await createTestBlog(app)
        const post = await createTestPost(app,blog.id)

        await request(app)
            .put(`${POSTS_PATH}/${post.id}`)
            .set('Authorization', ADMIN_AUTH)
            .send({
                title: 'Updated title',
                shortDescription: 'Updated short description',
                content: 'Updated content',
                blogId: blog.id,
            })
            .expect(204);

        const updatePostRequest = await request(app).get(`${POSTS_PATH}/${post.id}`).expect(200);

        expect(updatePostRequest.body.title).toBe('Updated title');
        expect(updatePostRequest.body.shortDescription).toBe(
            'Updated short description',
        );
        expect(updatePostRequest.body.content).toBe('Updated content');
    });

    it('should not update non existing post', async () => {
        const blog = await createTestBlog(app)

        await request(app)
            .put(`${POSTS_PATH}/63189b06003380064c4193be`)
            .set('Authorization', ADMIN_AUTH)
            .send({
                title: 'Updated title',
                shortDescription: 'Updated short description',
                content: 'Updated content',
                blogId: blog.id,
            })
            .expect(404);
    });

    it('should delete post', async () => {
        const blog = await createTestBlog(app)
        const post = await createTestPost(app,blog.id)

        await request(app)
            .delete(`${POSTS_PATH}/${post.id}`)
            .set('Authorization', ADMIN_AUTH)
            .expect(204);

        await request(app).get(`${POSTS_PATH}/${post.id}`).expect(404);
    });

    it('should return 404 when deleting non existing post', async () => {
        await request(app)
            .delete(`${POSTS_PATH}/63189b06003380064c4193be`)
            .set('Authorization', ADMIN_AUTH)
            .expect(404);
    });

    it('should return 401 without authorization', async () => {
        await request(app)
            .post(POSTS_PATH)
            .send({
                title: 'Post title',
                shortDescription: 'Short description',
                content: 'Post content',
                blogId: '1',
            })
            .expect(401);
    });
});