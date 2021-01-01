// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks, see: http://docs.feathersjs.com/api/hooks.html
import { HookContext, Hook } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (options = {}): Hook {
  return async (context: HookContext) => {
    // Get `app`, `method`, `params` and `result` from the hook context
    const { app, method, result, params } = context;

    // Make sure that we always have a list of messages either by wrapping
    // a single message into an array or by getting the `data` from the `find` method's result
    const messages = method === 'find' ? result.data : [result];

    // Asynchronously get user object from each message's `userId`
    // and add it to the message
    await Promise.all(
      messages.map(async (message: any) => {
        // Also pass the original `params` to the service call
        // so that it has the same information available (e.g. who is requesting it)
        message.user = await app.service('users').get(message.userId, params);
      }),
    );

    // Best practice: hooks should always return the context
    return context;
  };
}
