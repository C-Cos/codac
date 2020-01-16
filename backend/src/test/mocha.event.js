process.env.NODE_ENV = 'test';
let server = require('../index');
let chai = require('chai');
let chaiHttp = require('chai-http');
const Event = require('../Models/event');
ObjectId = require('mongodb').ObjectID;

chai.use(chaiHttp);
chai.should();

describe("Event", () => {

        before(function(done) {
            //Clean db
            Event.deleteOne({"name": "test"})
                .then(res => {
                    console.log('MongoDB cleaned before starting the tests.')
                    done();
                });
            })

        after(function(done) {
            //Clean db
            Event.deleteOne({"name": "test"})
                .then(res => {
                    console.log('MongoDB cleaned before starting the tests.')
                    done();
                });
            })


        /* it("should add an event", (done) => {
            chai.request(server)
                .post('/events/addevent')
                .field('Content-Type', 'multipart/form-data')
                .field( 'username', "Titi")
                .field('name', "test")
                .field('desc', "Tournoi de Baseball")
                .field('sport', "Baseball")
                .field('address', "84 rue Carves")
                .field('zipcode', "92120")
                .field('city', "Montrouge")
                .field('startHr', "10:00")
                .field('endHr', "10:00")
                .field('startDate', "2019-06-04")
                .field('endDate', "2019-06-05")
                //.attach('files', '/Users/celinecossez/Sites/Rendu/codac-pff/backend/public/images/me5fR1M.jpg')
                .end((err, res) => {
                    console.log(err);
                    console.log(res);
                    res.should.have.status(200);
                    //res.body.should.be.a('object');
                    done();
                });
        }); */

        /* it("should edit an event", (done) => {
            chai.request(server)
                .put('/event/5cf7f963f1e23673b4f178f8')
                .send({
                    id: ObjectId("5cf7f963f1e23673b4f178f8")},
                {
                    username: "Tata",
                    name: "test",
                    desc: "Tournoi de Baseball",
                    sport: "Baseball",
                    image: "https://images.unsplash.com/photo-1557766131-dca3a8acae87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1491&q=80",
                    startHr: "06:00",
                    endHr: "10:00",
                    startDate: "2019-06-04",
                    endDate: "2019-06-06"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.body.should.be.a('object');
                    done();
                });
        }); */

        it("should delete an event", (done) => {
            chai.request(server)
                .delete('/event/5cf7f963f1e23673b4f178f8')
                .send({
                    id: ObjectId("5cf7f963f1e23673b4f178f8"),
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.body.should.be.a('object');
                    done();
                });
        });

        it("should get all events", (done) => {
            chai.request(server)
                .get('/events/findAll')
                .send()
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.body.should.be.a('object');
                    done();
                });
        });

        it("should get one event", (done) => {
            chai.request(server)
                .get('/event/5cf7f963f1e23673b4f178f8')
                .send({
                    id: ObjectId("5cf7f963f1e23673b4f178f8")
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.body.should.be.a('object');
                    done();
                });
        });
});