import feathers from '@feathersjs/feathers';
import gravatar from '../../src/hooks/gravatar';

describe('\'gravatar\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async create(data: any) {
        return data;
      }
    });

    app.service('dummy').hooks({
      before: {
        create: gravatar()
      }
    });
  });

  it('runs the hook', async () => {
    expect.assertions(1);
    const result = await app.service('dummy').create({ id: 1, email: 'test@test.com', password: 'test' });
    expect(result).toHaveProperty('avatar');
  });
});
