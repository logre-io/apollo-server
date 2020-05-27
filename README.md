# Logre.IO Apollo Server Plugin
Apollo Server plugin to send logs to [Logre.IO](https://logre.io).

[![Twitter Follow](https://img.shields.io/twitter/follow/logreio.svg?style=social)](https://twitter.com/logreio)

## Installation
```bash
$ npm install logreio-apollo-server
# or
$ yarn add logreio-apollo-server
```

## Usage
```javascript
import LogreIOPlugin from 'logreio-apollo-server'
// or
const LogreIOPlugin = require('logreio-apollo-server').default

// ...

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    LogreIOPlugin({
      id: "266715545538134546",
      key: "****"
    }),
  ],
});
```