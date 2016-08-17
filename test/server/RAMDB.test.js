import { expect } from 'chai';
import RAMDB from '../../server/database/RAMDB';

describe('RAMDB singleton', function() {
  it('RAMDB should only have one same instance', function() {
    expect(new RAMDB()).to.be.equal(new RAMDB());
  });
});
