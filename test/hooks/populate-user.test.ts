import feathers from '@feathersjs/feathers';
import populateUser from '../../src/hooks/populate-user';

describe("'populate-user' hook", () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id: any) {
        return { id, userId: 100 };
      },
    });

    app.use('/users', {
      async get(id: any) {
        return { id, email: 'test@test.com' };
      },
    });

    app.service('dummy').hooks({
      after: populateUser(),
    });
  });

  it('runs the hook', async () => {
    expect.assertions(1);
    const result = await app.service('dummy').get('test');
    expect(result).toHaveProperty('userId');
  });
});
