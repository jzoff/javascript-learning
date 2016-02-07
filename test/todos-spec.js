var expect = require('chai').expect;
var supertest = require('supertest');

var api = supertest('http://localhost:3000');

describe('Todo API', () => {
    it('should return 200 response', (done) => {
        api.get('/todos')
        .set('Accept', 'application/json')
        .expect(200, done);
    });

    it('should create a new object with POST request', (done) => {
        api.post('/todos')
        .set('Accept', 'application/json')
        .send({
            title: 'Some',
            completed: false
        })
        .expect(201)
        .end((err, res) => {
            expect(res.body).to.have.property('title');
            expect(res.body.title).to.equal('Some');
            expect(res.body).to.have.property('completed');
            expect(res.body.completed).to.equal(false);
            expect(res.body).to.have.property('id');
            done();
        });
    });

    it('should be updated with completed as true', (done) => {
        api.post('/todos')
        .send({
            title: 'Thing',
            completed: false
        })
        .end((postErr, postRes) => {
            api.put('/todos/' + postRes.body.id)
            .send({
                title: 'Thing',
                completed: true
            })
            .end((putErr, putRes) => {
                expect(putRes.body.completed).to.be.equal(true);
                expect(putRes.body.id).to.be.equal(postRes.body.id);
                done();
            });
        });
    });

    it('should delete an object', (done) => {
        api.delete('/todos/0')
        .end((err, res) => {
            expect(204);
            done();
        });
    });

    it('should return 404 if resource doesn\'t exist', (done) => {
        api.delete('/todos/1000000000')
        .expect(404)
        .end((err, res) => {
            if (err) return done(err);
            done();
        });
    });
});
