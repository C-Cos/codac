process.env.NODE_ENV = 'test';
let server = require('../index');
let chai = require('chai');
let chaiHttp = require('chai-http');
const Event = require('../Models/event');

chai.use(chaiHttp);
chai.should();

describe("Event", () => {

        before(function(done) {
            //Clean db
            Event.deleteOne({"username": "marie"})
                .then(res => {
                    console.log('MongoDB cleaned before starting the tests.')
                    done();
                });
            })

        after(function(done) {
            //Clean db
            Event.deleteOne({"username": "marie"})
                .then(res => {
                    console.log('MongoDB cleaned before starting the tests.')
                    done();
                });
            })


        it("should add an event", (done) => {
            chai.request(server)
                .post('/events')
                .send({
                creator_name:"Marie",
                title: "mon event",
                description: "description de mon event",
                category: "Boxe",
                address: "84, rue Carves",
                zipcode: "92120",
                city: "Montrouge",
                start_at: "2019-06-13",
                end_at: "2019-06-15",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.body.should.be.a('object');
                    done();
                });
        });

        it("should edit an event", (done) => {
            chai.request(server)
                .put('/events')
                .send({
                id: "",
                title: "mon event modifié",
                description: "description de mon event modifié",
                category: "Boxe",
                address: "84, rue Carves",
                zipcode: "92120",
                city: "Montrouge",
                start_at: "2019-06-13",
                end_at: "2019-06-15",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.body.should.be.a('object');
                    done();
                });
        });

        it("should delete an event", (done) => {
            chai.request(server)
                .delete('/events')
                .send({
                id: "890349823492384720398",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.body.should.be.a('object');
                    done();
                });
        });

        it("should get all events", (done) => {
            chai.request(server)
                .get('/events')
                .send()
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.body.should.be.a('object');
                    done();
                });
        });
});