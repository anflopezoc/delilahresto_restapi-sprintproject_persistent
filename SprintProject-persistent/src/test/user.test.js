const chai = require('chai');
const chaiHttp = require('chai-http');
const db = require('../DB/db');
const app = require('../server');

chai.should()
chai.use(chaiHttp);

describe('Test to Account Rout', () =>{
    const userTest = (name, password, repeatPassword, email,phone) => {
        const newUser = {
            name,
            password,
            repeatPassword,
            email,
            phone
        };
        return newUser
    };

    

    describe('Test to Register Path', () => {
        it('Name test: minimum 3 letthers, return status 404', (done) => {
            chai.request(app)
                .post('/account/register')
                .send(userTest('t','test123','test123','test@gmail.com','3144488875'))
                .end((err,response) => {
                    response.should.have.status(404);
                    response.should.be.an('object');                    
                    done();
                })
        });
        it('Repeatpassword test: password and repeat password do not match, return status 404', (done) => {
            chai.request(app)
                .post('/account/register')
                .send(userTest('test','test123','tes12','test@gmail.com','3144488875'))
                .end((err,response) => {
                    response.should.have.status(404);
                    response.should.be.an('object');
                    done();
                })
        });
        it('Email test: email , return status 404', (done) => {
            chai.request(app)
                .post('/account/register')
                .send(userTest('test','test123','tes123','test@gmail','3144488875'))
                .end((err,response) => {
                    response.should.have.status(404);
                    response.should.be.an('object');
                    done();
                })
        });
        it('Correct User test: correct user created, return status 200', (done) => {
            chai.request(app)
                .post('/account/register')
                .send(userTest('test','test123','test123','test@gmail.com','3144488875'))
                .end((err,response) => {
                    response.should.have.status(200);
                    response.should.be.an('object');
                    done();
                })
        });
        it('Repeat email test: repeat email, return status 404', (done) => {
            chai.request(app)
                .post('/account/register')
                .send(userTest('test','test123','tes123','test@gmail.com','3144488875'))
                .end((err,response) => {
                    response.should.have.status(404);
                    response.should.be.an('object');
                    done();
                })
        })
    });

    after (async () =>{
        await db.Users.destroy({ 
            where: { 
                email: 'test@gmail.com' 
            }
        });
    });
});