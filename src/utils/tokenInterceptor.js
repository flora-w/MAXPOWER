import authService from 'services/authService';

export default async function tokenInterceptor(config) {
  if (config.url.includes('/oauth/adlogin')) {
    return config;
  }

  const profile = authService.retrieveSessionCredentials();
  if (profile) {
    const { token, exp } = profile;
    if (exp <= Math.floor(Date.now() / 1000) + 60) {
      const res = await authService.refreshToken(profile);
      const { refresh_token, exp: nextExp } = await res.json();
      config.headers.Authorization = `${refresh_token}`;
      authService.updateSessionCredentials({
        ...profile,
        exp: nextExp,
        token: refresh_token,
      });

      return config;
    }

    config.headers.Authorization = `${token}`;
    return config;
  }

  return config;
}
