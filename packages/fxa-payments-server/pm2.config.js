/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

module.exports = {
  apps: [
    {
      name: 'payments',
      cwd: __dirname,
      script: 'server/bin/fxa-payments-server.js',
      max_restarts: '1',
      min_uptime: '2m',
      env: {
        LOGGING_FORMAT: 'pretty',
        NODE_ENV: 'development',
        NODE_OPTIONS: '--inspect=9170',
        PROXY_STATIC_RESOURCES_FROM: 'http://localhost:3032',
        CONFIG_FILES: 'config/secrets.json',
        PORT: '3031',
      },
      filter_env: ['npm_'],
    },
    {
      name: 'payments-react',
      cwd: __dirname,
      script: 'yarn rescripts start',
      max_restarts: '1',
      min_uptime: '2m',
      env: {
        SKIP_PREFLIGHT_CHECK: 'true',
        NODE_ENV: 'development',
        PUBLIC_URL: 'http://localhost:3031',
        BROWSER: 'NONE',
        PORT: '3032',
        PATH: process.env.PATH.split(':')
          .filter(p => !p.includes(process.env.TMPDIR))
          .join(':'),
      },
      filter_env: ['npm_', 'BERRY_BIN_FOLDER'],
    },
  ],
};
