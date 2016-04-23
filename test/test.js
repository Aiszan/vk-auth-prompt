import test from 'ava';
import 'babel-core/register';
import run, { UP, DOWN, ENTER } from 'inquirer-test';
import fs from 'fs';
import pify from 'pify';
import userHome from 'userhome';
import pkg from '../package.json';

const unlink = pify(fs.unlink);

const cliPath = __dirname + '/fixtures/example.js';

test.beforeEach(async t => {
  try {
    await removeConfig();
  } catch (e) {
    // whatever
  }
});

test('process correct url', async t => {
  const token = 'aaaaa';
  const url = `https://oauth.vk.com/blank.html#access_token=${token}&expires_in=0&user_id=<user_id>`;

  const result = await(run(cliPath, [url, ENTER]));
  t.regex(result, new RegExp(token, 'g'));
});

test('process incorrect url', async t => {
  const url = `https://oauth.vk.com/blank.html`;

  const result = await(run(cliPath, [url, ENTER]));
  t.regex(result, new RegExp(`"${url}" is incorrect`, 'g'));
});

const configFile = userHome('.config', 'configstore', `${pkg.name}-test-example.json`);

function removeConfig() {
  return unlink(configFile);
}
