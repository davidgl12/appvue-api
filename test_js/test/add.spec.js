// var assert = require('assert');
var expect = require('chai').expect;
var addUtility = require('./../add.js');

describe('Add', function() {
  it('debería tener un método suma', function() {
    // Para Assert (Mocha)
    // assert.equal(typeof addUtility, 'object');
    // assert.equal(typeof addUtility.suma, 'function');
    // Para Expect (Chai)
    expect(addUtility).to.be.an('object');
    expect(addUtility).to.have.property('suma');
  });

  it('addUtility.suma(5, 4) debería retornar 9', function () {
    // Para Assert (Mocha)
    // assert.deepEqual(addUtility.suma(5, 4), 9);
    // Para Expect (Chai)
    expect(addUtility.suma(5, 4)).to.deep.equal(9);
  });

  it('addUtility.suma(100, 6) debe retornar 106', function () {
    expect(addUtility.suma(100, 6)).to.deep.equal(106);
  });
});