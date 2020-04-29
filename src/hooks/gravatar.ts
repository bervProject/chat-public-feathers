// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks, see: http://docs.feathersjs.com/api/hooks.html

// We need this to create the MD5 hash
import crypto from 'crypto';
import { HookContext, Hook } from '@feathersjs/feathers';
// The Gravatar image service
const gravatarUrl = 'https://s.gravatar.com/avatar';
// The size query. Our chat needs 60px images
const query = 's=60';

export default function (options = {}): Hook { // eslint-disable-line no-unused-vars
  return async (context: HookContext) => {
    // The user email
    const { email } = context.data;
    // Gravatar uses MD5 hashes from an email address (all lowercase) to get the image
    const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');

    context.data.avatar = `${gravatarUrl}/${hash}?${query}`;

    // Best practice: hooks should always return the context
    return context;
  };
};
