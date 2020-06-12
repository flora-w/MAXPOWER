import env from 'environments/environment';

const { mock, serverUrl } = env;

export const baseApiUrl = mock ? '' : serverUrl;
