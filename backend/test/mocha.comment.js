process.env.NODE_ENV = 'test';
let server = require('../index');
let chai = require('chai');
let chaiHttp = require('chai-http');
const Comment = require('../Models/comments');

chai.use(chaiHttp);
chai.should();

describe("Comment", () => {

        before(function(done) {
            //Clean db
            Comment.deleteOne({"username": "marie"})
                .then(res => {
                    console.log('MongoDB cleaned before starting the tests.')
                    done();
                });
            })

        after(function(done) {
            //Clean db
            Comment.deleteOne({"username": "marie"})
                .then(res => {
                    console.log('MongoDB cleaned before starting the tests.')
                    done();
                });
            })


        it("should add a comment", (done) => {
            chai.request(server)
                .post('/comment')
                .send({
                idEvent: "890349823492384720398",
                username: "marie",
                description: "ceci est mon premier commentaire en tant qu'utilisateur connecté.",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.body.should.be.a('object');
                    done();
                });
        });

        it("should edit a comment", (done) => {
            chai.request(server)
                .put('/comment')
                .send({
                id: "890349823492384720398",
                description: "Mon premier article a été édité pour un nouveau contenu.",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.body.should.be.a('object');
                    done();
                });
        });

        it("should delete a comment", (done) => {
            chai.request(server)
                .delete('/comment')
                .send({
                idEvent: "890349823492384720398",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.body.should.be.a('object');
                    done();
                });
        });

        it("should get all comments", (done) => {
            chai.request(server)
                .get('/comment')
                .send({
                idEvent: "890349823492384720398",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.body.should.be.a('object');
                    done();
                });
        });
});