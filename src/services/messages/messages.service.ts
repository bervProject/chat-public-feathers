// Initializes the `messages` service on path `/messages`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Messages } from './messages.class';
import createModel from '../../models/messages.model';
import hooks from './messages.hooks';

declare module '../../declarations' {
  interface ServiceTypes {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: Messages & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/messages', new Messages(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('messages');

  service.hooks(hooks);
}
