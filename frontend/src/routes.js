const apiPath = '/api/v1';

export default {
  chat: () => '/',
  login: () => '/login',
  loginPath: () => [apiPath, '/login'].join(''),
  dataPath: () => [apiPath, '/data'].join(''),

};
