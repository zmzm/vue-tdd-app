import userFixture from '../../../tests/fixtures/userFixture';

export default {
  searchUser: jest.fn().mockResolvedValue(userFixture),
};
