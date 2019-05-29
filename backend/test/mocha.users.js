process.env.NODE_ENV = 'test';
let server = require('../index');
let chai = require('chai');
let chaiHttp = require('chai-http');
const User = require('../Models/user');

chai.use(chaiHttp);
chai.should();

describe("Users", () => {

        before(function(done) {
            //Clean db
            User.deleteOne({"email": "test@test.com"})
                .then(res => {
                    console.log('MongoDB cleaned before starting the tests.')
                    done();
                });
            })

        after(function(done) {
            //Clean db
            User.deleteOne({"email": "test@test.com"})
                .then(res => {
                    console.log('MongoDB cleaned before starting the tests.')
                    done();
                });
            })


        it("should register a user", (done) => {
            chai.request(server)
                .post('/users/register')
                .send({
                name: "Testeur",
                email: "test@test.com",
                password: "test",
                zipcode: "75000",
                city: "PARIS",
                association: false
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.body.should.be.a('object');
                    done();
                });
        });

         //Test to get single student record
        it("should get all users", (done) => {
             chai.request(server)
                 .get('/users/findAllUsers')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('array');
                     done();
                  });
         });

        it("should login a user", (done) => {
        chai.request(server)
            .post('/users/login')
            .send({
                email: "test@test.com",
                password: "test"
            })
            .end((err, res) => {
                res.should.have.status(200);
                //res.body.should.be.a('object');
                done();
                });
        });

});