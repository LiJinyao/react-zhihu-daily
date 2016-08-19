import { expect, assert } from 'chai';
import RAMDB from '../../server/database/RAMDB';

describe('RAMDB test', function() {

  it('should be singleton', function() {
    const i1 = new RAMDB();
    const i2 = new RAMDB();
    expect(i1).to.be.equal(i2);
  });

  it('update and get should be literal queal', function() {
    const DB = new RAMDB();
    const key = 'test';
    const value = {
      key1: 'test',
      key2: 'key2',
    }
    DB.update(key, value);
    // literal queal.
    expect(DB.get(key).value.toString()).to.be.equal(value.toString());
  });

    it('should have a lastUpdate record', function() {
      const DB = new RAMDB();
      DB.update('test', {});
      assert.typeOf(DB.get('test').lastUpdate, typeof Date.now());
    });

    it('objects should be deep copied', function() {
      const DB = new RAMDB();
      let value = {a: 1};
      DB.update('test', value);
      value.a = 2;
      expect(DB.get('test').value.a).to.be.equal(1);
    });

    it('key which not exists shoud return {}.', function() {
      const DB = new RAMDB();
      expect(DB.get('null').value.toString()).to.be.equal({}.toString());
    });

});
