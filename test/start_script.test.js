import assert from 'assert';
import set_mode from '../dev/startMessage';

describe('test application mode', () => {
  it('verifies active dev mode', (done) => {
    assert.equal('dev', set_mode());
    done();
  });
});
