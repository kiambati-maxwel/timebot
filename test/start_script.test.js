import set_mode from '../app/startMessage';
import assert from 'assert';

describe('it tests application mode', () => {
  it('verifies mode set', done => {
    assert.equal('dev', set_mode());
    done();
  });
});
