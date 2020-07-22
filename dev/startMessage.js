/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */

const set_mode = (mode = 'dev') => {
  let app_mode = 'dev';
  mode === 'prod' ? app_mode = 'prod' : app_mode = 'dev';
  return app_mode;
};

export default set_mode;
