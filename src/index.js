import inquirer from 'inquirer-question';

const responseExample = 'https://oauth.vk.com/blank.html#access_token=<85 symbols>&expires_in=0&user_id=<user_id>';

module.exports = function(appId, scope, getToken, setToken) {
  const token = getToken();

  const tokenCredentials = {
    name: 'url',
    type: 'input',
    message: `Open "${getAuthUrl(appId, scope)}" in browser.\nCopy paste new url here.\nIt should look "${responseExample}"`
  };

  if (token) {
    return Promise.resolve(token);
  } else {
    return inquirer.prompt([tokenCredentials])
      .then(credentials => {
        const tokenRegex = /.+access_token=([a-z0-9]+)&.+/g;
        const match = tokenRegex.exec(credentials.url);

        if (match) {
          const token = match[1];

          setToken(token);
          return token;
        } else {
          throw new Error(`"${credentials.url}" is incorrect`);
        }
      });
  }
};

function getAuthUrl(appId, scope) {
  return `https://oauth.vk.com/authorize?client_id=${appId}&scope=${scope}&redirect_uri=https://oauth.vk.com/blank.html&display=page&v=5.23&response_type=token`;
}
