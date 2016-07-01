/// <reference path="../typings/index.d.ts" />

import {server} from './api';
import {db} from './dbmodel/connect';

server.listen(8080, function () {
  console.log(`${server.name} is listening at ${server.url}`);
  if (db) {
    console.log('db is ok')
  } else {
    console.log('db is bad');
  }
});

