// const { expect } = require('chai');
const chai = require('chai');
const { describe, it } = require('mocha');
const chaiHttp = require('chai-http');

// const server = require('../server');

const { expect } = chai;
chai.use(chaiHttp);

const multiply = (x, y) => {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new Error('x or y is not a number.');
  } else return x * y;
};

describe('multiply', () => {
  it('should serve web pages', () => {
    expect(multiply(2, 4)).to.equal(8);
  });

  it('should throw when not passed numbers', () => {
    expect(() => {
      multiply(2, '4');
    }).to.throw(Error);
  });
});
