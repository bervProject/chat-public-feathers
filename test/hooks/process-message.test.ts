import feathers from '@feathersjs/feathers';
import processMessage from '../../src/hooks/process-message';

describe('\'process-message\' hook', () => {
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
        create: processMessage()
      }
    });
  });

  it('runs the hook', async () => {
    expect.assertions(2);
    const params = {
      user: {
        _id: 2
      }
    };
    const result = await app.service('dummy').create({
      id: 1, text: 'Hello World'
    }, params);
    expect(result).toHaveProperty('userId');
    expect(result).toHaveProperty('createdAt');
  });
});
