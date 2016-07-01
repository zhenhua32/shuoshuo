/// <reference path="../../typings/index.d.ts" />

import {err as errhelper} from './error';

export class Helper {
  static getMIME(type: string) {
    let t = type.toLowerCase();
    if (t === 'gif') return 'image/gif';
    if (t === 'jpg' || t === 'jpeg') return 'image/jpeg';
    if (t === 'png') return 'image/png';
    if (t === 'svg') return 'image/svg+xml';
    if (t === 'tiff') return 'image/tiff';
    return t;
  }

  static imgExist(params, res) {
    let exist = true;
    if (!params.title) {
      errhelper.json400(new Error('title is not exist'), res);
      exist = false;
    }
    if (!params.body) {
      errhelper.json400(new Error('body is not exist'), res);
      exist = false;
    }
    if (!params.type) {
      errhelper.json400(new Error('type is not exist'), res);
      exist = false;
    }
    return exist;
  }

  static commentExist(params, res) {
    let exist = true;
    if(!params.body) {
      errhelper.json400(new Error('body is not exist'), res);
      exist = false;
    }
    return exist;
  }

  static listExist(params, res) {
    let exist = true;
    if(!params.body) {
      errhelper.json400(new Error('body is not exist'), res);
      exist = false;
    }
    if(!params.type) {
      errhelper.json400(new Error('type is not exist'), res);
      exist = false;
    }
    return exist;
  }

  static linkExist(params, res) {
    let exist = true;
    if(!params.body) {
      errhelper.json400(new Error('body is not exist'), res);
      exist = false;
    }
    return exist;
  }

  
}

