const chai = require('chai');
const chaihttp = require('chai-http');
const mongoose = require('mongoose');

const app = require('../server/index');
const User = require('../server/models/User');

const assert = require('assert');

const should = chai.should();
chai.use(chaihttp);

describe(`test register, login User`, () => {
    describe(`test register`, () => {
        it(`test register true`, (done) => {
            const newUser = {
                "username": "NewAcc3",
                "password": "12345678"
            };

            chai.request(app)
            .post("/api/auth/register")
            .send(newUser)
            .end((err,res) => {
                res.should.have.status (200);
                res.body.data.should.be.a("object");
                res.body.data.success.should.be.eql("true");
                done();
            })
        })
        it(`test register false 1`, (done) => {
            const newUser = {
                "username": "NewAcc1",
                "password": "12345678"
            };

            chai.request(app)
            .post("/api/auth/register")
            .send(newUser)
            .end((err,res) => {
                res.should.have.status (400);
                res.body.data.should.be.a("object");
                res.body.data.success.should.be.eql("false");
                res.body.data.success.should.be.eql("Username already taken")
                done();
            })
        })
        it(`test register false 2`, (done) => {
            const newUser = {
                "username": "NewAcc1",
                "password": ""
            };

            chai.request(app)
            .post("/api/auth/register")
            .send(newUser)
            .end((err,res) => {
                res.should.have.status (400);
                res.body.data.should.be.a("object");
                res.body.data.success.should.be.eql("false");
                res.body.data.success.should.be.eql("Missing username and/or password")
                done();
            })
        })
    })
    describe (`test login`, () => {
        it (`test login true`, (done) => {
            const loginUser = {
                "username": "NewAcc1",
                "password": "12345678"
            };

            chai.request(app)
            .post("/api/auth/register")
            .send(newUser)
            .end((err,res) => {
                res.should.have.status (200);
                res.body.data.should.be.a("object");
                res.body.data.success.should.be.eql("true");
                res.body.data.message.should.be.eql("User logged in successfully")
                done();
            })
        })
        it (`test login false 1`, (done) => {
            const loginUser = {
                "username": "NewAcc1",
                "password": "12345678"
            };

            chai.request(app)
            .post("/api/auth/register")
            .send(newUser)
            .end((err,res) => {
                res.should.have.status (400);
                res.body.data.should.be.a("object");
                res.body.data.success.should.be.eql("false");
                res.body.data.message.should.be.eql("Incorrect username or password")
                done();
            })
        })
        it (`test login false 2`, (done) => {
            const loginUser = {
                "username": "NewAcc1",
                "password": ""
            };

            chai.request(app)
            .post("/api/auth/register")
            .send(newUser)
            .end((err,res) => {
                res.should.have.status (400);
                res.body.data.should.be.a("object");
                res.body.data.success.should.be.eql("false");
                res.body.data.message.should.be.eql("Missing username and/or password")
                done();
            })
        })
    })
}
)

describe (`test post `, () => {
    describe('POST /api/posts', () => {
        it('should create a new post', async () => {
          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDYxYjk1YjdkMjljZTFiMTA5YmQxZTAiLCJpYXQiOjE2MTczNjIxNjV9.ZTwbrIeDpchmUjkNQv_bmBd7_Maw2Gp7Y1ioZx2s7i8';
          const post = {
            title: 'React',
            description: 'React',
            url: 'https://react.com',
            status: 'TO LEARN'
          };
          const response = await request(app)
            .post('/api/posts')
            .set('Authorization', `Bearer ${token}`)
            .send(post)
            .expect(201);
      
          expect(response.body.success).toBe(true);
          expect(response.body.message).toBe('Happy learning!');
          expect(response.body.post).toHaveProperty('_id');
          expect(response.body.post.title).toBe(post.title);
          expect(response.body.post.description).toBe(post.description);
          expect(response.body.post.url).toBe(post.url);
          expect(response.body.post.status).toBe(post.status);
          expect(response.body.post).toHaveProperty('user');
          expect(response.body.post).toHaveProperty('__v');
        });
      });
      describe('GET /api/posts', () => {
        it('should return an array of posts', async () => {
          // Set the authorization header with the bearer token
          const headers = { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDYxYjk1YjdkMjljZTFiMTA5YmQxZTAiLCJpYXQiOjE2MTczNjIxNjV9.ZTwbrIeDpchmUjkNQv_bmBd7_Maw2Gp7Y1ioZx2s7i8` };
      
          // Make the request to the API
          const response = await axios.get('http://localhost:5000/api/posts', { headers });
      
          // Assert that the response contains a success property set to true
          expect(response.data.success).toBe(true);
      
          // Assert that the response contains an array of posts
          expect(response.data.posts).toBeInstanceOf(Array);
          expect(response.data.posts.length).toBeGreaterThan(0);
          expect(response.data.posts[0]).toHaveProperty('_id');
          expect(response.data.posts[0]).toHaveProperty('title');
          expect(response.data.posts[0]).toHaveProperty('description');
          expect(response.data.posts[0]).toHaveProperty('url');
          expect(response.data.posts[0]).toHaveProperty('status');
          expect(response.data.posts[0]).toHaveProperty('user');
          expect(response.data.posts[0].user).toHaveProperty('_id');
          expect(response.data.posts[0].user).toHaveProperty('username');
          expect(response.data.posts[0]).toHaveProperty('__v');
        });
      });
})