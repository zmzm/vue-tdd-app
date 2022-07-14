import userFixture from '../../../tests/fixtures/userFixture';

export default {
  SEARCH_USER: jest.fn().mockResolvedValue(userFixture),
};
