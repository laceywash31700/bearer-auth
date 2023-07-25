'use strict';

process.env.SECRET = 'TEST_SECRET';

const { db, usersModel } = require('../../../../../../src/auth/models/index.js');
const { handleSignIn } = require('../../../../../../src/auth/router/handlers.js');

beforeAll(async () => {
  await db.sync();
  await usersModel.create({ username: 'test', password: 'test' });
});
afterAll(async () => {
  await db.drop();
});

describe('Testing the signIn handler', () => {
  const res = {
    send: jest.fn(() => res),
    status: jest.fn(() => res),
    json: jest.fn(() => res),
  };
  const next = jest.fn();

  test('Should find a User when a `user` is present on the request', async () => {
    let req = {
      user: await usersModel.findOne({ where: { username: 'test' } }),
    };

    await handleSignIn(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        user: expect.objectContaining({
          username: expect.any(String),
          password: expect.any(String),
          token: expect.any(String),
        }),
        token: expect.any(String),
      })
    );
  });

  test('Should trigger error handler when no user is present on the request', async () => {
    let req = {};
    jest.clearAllMocks();

    await handleSignIn(req, res, next);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
