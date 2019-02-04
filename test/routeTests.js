// https://www.chaijs.com/api/bdd/
const {
  expect,
} = require('chai');
const chai = require('chai');
const {
  beforeEach,
  describe,
  it,
} = require('mocha');
const chaiHttp = require('chai-http');

// const should = chai.should();
const server = require('../server');

// const {
//   expect,
// } = chai;
chai.use(chaiHttp);


/* describe('loading express server', () => {
  it('should serve web pages', () => {
    chai.request(server)
      .get('/testrequest')
      .end((err, res) => {
        res.should.have.status(200);
      });
  });

  // it('should throw when not passed numbers', () => {
  //   expect(() => {
  //     multiply(2, '4');
  //   }).to.throw(Error);
  // });
}); */

// const {
//   expect,
// } = require('chai');

const fourtyTwo = 42;
describe('Sample Test', () => {
  it('should equal 42', () => {
    expect(fourtyTwo).to.equal(42);
  });
});

describe('Express Tests', () => {
  describe('Server Test', () => {
    let request;
    beforeEach(() => {
      request = chai.request(server);
    });
    it('it should serve test route', (done) => {
      // const app = require('../server');
      // chai.request(app)
      request
        .get('/testroute')
        .end((err, res) => {
          // console.log(res);
          expect(res).to.have.status(200);
          expect(res.text).to.equal('ok');
          // expect(res.body).to.equal()
          done(); // <= Call done to signal callback end
        });
    });
    it('it should serve index route', (done) => {
      // const app = require('../server');
      // chai.request(app)
      request
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done(); // <= Call done to signal callback end
        });
    });
  });
});
