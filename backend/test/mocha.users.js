process.env.NODE_ENV = 'test';
const server = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe("Users", () => {
        it("should register a user", (done) => {
            let user = {
                username: "Testeur",
                email: "test@test.com",
                password: "test",
                postcode: "75000",
                city: "PARIS",
                image: "test",
                creation_date: new Date(),
                edition_date: new Date(),
                admin: false,
                association: false
            }
             chai.request(server)
                 .post('/users/register')
                 .send(user)
                 .end((err, res) => {
                     res.should.have.status(200);
                     done();
                  });
         });

        it("should get all users", (done) => {
             chai.request(server)
                 .get('/users/findAllUsers')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('array');
                     done();
                  });
         });
});