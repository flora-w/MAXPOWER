import env from 'environments/environment';

function mockAdapter(config) {
  return new Promise(resolve => {
    const fileName = config.url.split('?')[0];

    import(`../__mocks__${fileName}`)
      .then(mockFile =>
        setTimeout(() => {
          const response = {
            data: mockFile.default,
            status: 200,
            statusText: 'OK - Mocked request',
            headers: { mock: true },
            config,
          };
          resolve(response);
        }, 100),
      )
      .catch(error => {
        console.error(error);
      });
  });
}

export default function mockInterceptor(config) {
  if (env.mock) {
    config.adapter = mockAdapter;
  }

  return config;
}
