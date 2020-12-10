/* eslint-disable no-console */

const set_mode = (mode = 'dev') => {
  let app_mode = 'dev';
  mode === 'prod' ? app_mode = 'prod' : app_mode = 'dev';
  return app_mode;
}
export default set_mode;
