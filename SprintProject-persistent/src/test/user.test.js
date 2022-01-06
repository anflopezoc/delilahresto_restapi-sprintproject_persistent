const { expect, should } = require('chai');
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
    
    const loginTest = (email, password) => {
        const newUser = {
            email,
            password
        };
        return newUser
    };

    describe('Test to Register Path', () => {
        
        it('1) Minimum 3 letthers, return status 404', (done) => {
            chai.request(app)
                .post('/account/register')
                .send(userTest('t','test123','test123','test@gmail.com','3144488875'))
                .end((err,response) => {
                    response.should.have.status(404);
                    response.should.be.an('object');                    
                    done();
                })
        });
        it('2) Repeat password test: password and repeat password do not match, return status 404', (done) => {
            chai.request(app)
                .post('/account/register')
                .send(userTest('test','test123','tes12','test@gmail.com','3144488875'))
                .end((err,response) => {
                    response.should.have.status(404);
                    response.should.be.an('object');
                    done();
                })
        });
        it('3) Email test: email , return status 404', (done) => {
            chai.request(app)
                .post('/account/register')
                .send(userTest('test','test123','tes123','test@gmail','3144488875'))
                .end((err,response) => {
                    response.should.have.status(404);
                    response.should.be.an('object');
                    done();
                })
        });
        it('4) Correct User test: correct user created, return status 200', (done) => {
            const responseUserCreated = {
                name: 'test', 
                email: 'test@gmail.com', 
                phone: '3144488875' 
               };
            chai.request(app)
                .post('/account/register')
                .send(userTest('test','test123','test123','test@gmail.com','3144488875'))
                .end((err,response) => {
                    response.should.have.status(200);
                    expect(JSON.parse(response.text)).to.be.a('object');
                    expect(response.text).to.be.equal(JSON.stringify(responseUserCreated));
                    done();
                })
        });
        it('5) Repeat email test: repeat email, return status 404', (done) => {
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
    describe('Test to Login Path', () => {
        
        it('6) Login (user not fund), return status 404', (done) => {
            chai.request(app)
                .post('/account/login')
                .send(loginTest('badtes@gmail.com','test123'))
                .end((err,response) => {
                    response.should.have.status(404);
                    response.text.should.be.an('String');
                    expect(response.text).to.equal('User not found');
                    done();
                })
        });

        it('7) Incorrect password login, return status 401', (done) => {
            chai.request(app)
                .post('/account/login')
                .send(loginTest('test@gmail.com','test'))
                .end((err,response) => {
                    response.should.have.status(401);
                    response.text.should.be.an('String');
                    expect(response.text).to.equal('Sorry, incorrect password');
                    done();
                })
        });

        it('8) Successful login, return status 200', (done) => {
            chai.request(app)
                .post('/account/login')
                .send(loginTest('test@gmail.com','test123'))
                .end((err,response) => {
                    response.should.have.status(202);
                    response.text.should.be.an('String');
                    expect(JSON.parse(response.text).token).to.be.a('string');
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