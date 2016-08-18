import { expect, assert } from 'chai';
import RAMDB from '../../server/database/RAMDB';

describe('RAMDB test', function() {

  it('RAMDB should be singleton', function() {
    const i1 = new RAMDB();
    const i2 = new RAMDB();
    expect(i1).to.be.equal(i2);
  });

  it('RAMDB update and get', function() {
    const DB = new RAMDB();
    const key = 'test';
    const value = {
      key1: 'test',
      key2: 'key2',
    }
    DB.update(key, value);
    expect(DB.get(key)).to.be.equal(value);
  });

    it('RAMDB timestamp', function() {
      const DB = new RAMDB();
      DB.update('test', {});
      assert.typeOf(DB.get('test').lastUpdate, typeof Date.now());
    });


});
