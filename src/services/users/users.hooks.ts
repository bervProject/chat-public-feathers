import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import {
  disallow,
  discard,
  required
} from 'feathers-hooks-common';
import gravatar from '../../hooks/gravatar';

const { authenticate } = feathersAuthentication.hooks;
const {
  hashPassword,
  protect
} = local.hooks;


export default {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [required('email', 'password'), hashPassword('password'), gravatar()],
    update: [disallow()],
    patch: [authenticate('jwt'), discard('email'), required('password'), hashPassword('password')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
