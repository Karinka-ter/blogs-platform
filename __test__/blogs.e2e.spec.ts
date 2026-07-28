import request from 'supertest';
import express from 'express';
import {setupApp} from '../src/setup-app';
import {BLOGS_PATH} from "../src/blogs/constants/blogs.paths";
import {ADMIN_PASSWORD, ADMIN_USERNAME, SETTINGS} from "../src/settings/config";
import {runDB, stopDb} from '../src/db/mongo.db';
import { Express } from 'express';
import {createTestPost} from "./posts.e2e.spec";


beforeAll(async () => {
    await runDB(SETTINGS.MONGO_URL);
});

afterAll(async () => {
    await stopDb();
});


export const createTestBlog = async (app: Express) => {
    const response = await request(app)
        .post(BLOGS_PATH)
        .set('Authorization', ADMIN_AUTH)
        .send({
            name: 'My Blog',
            description: 'My description',
            websiteUrl: 'https://my-blog.com',
        }).expect(201)

    return response.body
}


const ADMIN_AUTH = `Basic ${Buffer.from(
    `${ADMIN_USERNAME}:${ADMIN_PASSWORD}`
).toString('base64')}`;

describe(BLOGS_PATH, () => {
    const app = express();

    setupApp(app);

    beforeEach(async () => {
        await request(app)
            .delete('/api/testing/all-data')
            .expect(204);
    });

    it('should return empty array', async () => {
        await request(app)
            .get(BLOGS_PATH)
            .expect(200, {
                pagesCount: 0,
                page: 1,
                pageSize: 10,
                totalCount:0,
                items: []
            });
    });

    it('get posts by blogsId', async () => {
        const blog = await createTestBlog(app)
        const post = await createTestPost(app,blog.id)

        await request(app)
            .get(`${BLOGS_PATH}/${blog.id}/posts`)
            .expect(200, {
                pagesCount: 1,
                page:1,
                pageSize: 10,
                totalCount:1,
                items: [post]
            });
    });

    it('create posts by blogsId', async () => {
        const blog = await createTestBlog(app)
        const response = await request(app)
            .post(`${BLOGS_PATH}/${blog.id}/posts`)
            .set('Authorization', ADMIN_AUTH)
            .send({
                title: 'Post title',
                shortDescription: 'Short description',
                content: 'Post content',
                blogId:blog.id,
            }).expect(201)

        expect(response.body.title).toEqual('Post title');
        expect(response.body.shortDescription).toEqual('Short description');
        expect(response.body.content).toEqual('Post content');
        expect(response.body.blogId).toEqual(blog.id);

    });

    it('should return blog', async () => {
       const blog = await createTestBlog(app)

        const blogId = blog.id;
        await request(app)
            .get(`${BLOGS_PATH}/${blogId}`)
            .expect(200, {
                id: blogId,
                name: 'My Blog',
                description: 'My description',
                websiteUrl: 'https://my-blog.com',
                createdAt: blog.createdAt,
                isMembership: false,
            });
    });

    it('should create blog', async () => {
        const blog = await createTestBlog(app)

        const blogId = blog.id;

        expect(blog).toEqual({
            id: blogId,
            name: 'My Blog',
            description: 'My description',
            websiteUrl: 'https://my-blog.com',
            createdAt: blog.createdAt,
            isMembership: false,
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
        const blog = await createTestBlog(app)
        const blogId = blog.id;
         await request(app).put(`${BLOGS_PATH}/${blogId}`).set('Authorization', ADMIN_AUTH).send({
            name: 'Update Blog',
            description: 'Update description',
            websiteUrl: 'https://update-blog.com',
        }).expect(204);

        const updatedBlogRequest = await request(app)
            .get(`${BLOGS_PATH}/${blogId}`)
            .expect(200)

        expect(updatedBlogRequest.body.websiteUrl).toEqual('https://update-blog.com');
        expect(updatedBlogRequest.body.name).toEqual('Update Blog');
        expect(updatedBlogRequest.body.description).toEqual('Update description');
    })

    it('should not update blog with incorrect data', async () => {
        const blog = await createTestBlog(app)
        const blogId = blog.id;
        await request(app)
            .put(`${BLOGS_PATH}/${blogId}`)
            .set('Authorization', ADMIN_AUTH)
            .send({
                name: '',
                description: '',
                websiteUrl: 'test',
            })
            .expect(400);
    });
    it('delete blog', async () => {
        const blog = await createTestBlog(app);


        await request(app)
            .delete(`${BLOGS_PATH}/${blog.id}`)
            .set('Authorization', ADMIN_AUTH)
            .expect(204);



        await request(app)
            .get(`${BLOGS_PATH}/${blog.id}`)
            .expect(404);


    });

    it('should return 404 for non existing blog', async () => {
        await request(app)
            .get(`${BLOGS_PATH}/63189b06003380064c4193be`)
            .expect(404);
    });

    it('should not delete non existing blog', async () => {
        await request(app)
            .delete(`${BLOGS_PATH}/63189b06003380064c4193be`).set('Authorization', ADMIN_AUTH)
            .expect(404);
    });

    it('should not update non existing blog', async () => {
        await request(app)
            .put(`${BLOGS_PATH}/63189b06003380064c4193be`).set('Authorization', ADMIN_AUTH)
            .send({
                name: 'Blog',
                description: 'Description',
                websiteUrl: 'https://blog.com',
            })
            .expect(404);
    });

    it('should update blogName in all posts after blog update', async () => {
        const blog = await createTestBlog(app);
        const post = await createTestPost(app, blog.id);

        await request(app)
            .put(`/api/blogs/${blog.id}`)
            .set('Authorization', ADMIN_AUTH)
            .send({
                name: 'New Blog Name',
                description: blog.description,
                websiteUrl: blog.websiteUrl,
            })
            .expect(204);

        const postResponse = await request(app)
            .get(`/api/posts/${post.id}`)
            .expect(200);

        expect(postResponse.body.blogName).toBe('New Blog Name');
    });

});

