jest.mock('@/service/api');

import flushPromises from 'flush-promises';

import actions from '@/store/actions';
import api from '@/service/api';

import userFixture from '../../fixtures/userFixture';

describe('store actions', () => {
  let commit;

  beforeEach(() => {
    commit = jest.fn();
  });

  it('searches for user', async () => {
    // arrange
    const expectedUser = 'vald';

    // act
    await actions.SEARCH_USER({ commit }, { username: expectedUser });
    await flushPromises();

    // assert
    expect(api.searchUser).toHaveBeenCalledWith(expectedUser);
    expect(commit).toHaveBeenCalledWith('SET_USER', userFixture);
  });
});
