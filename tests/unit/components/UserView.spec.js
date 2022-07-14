jest.mock('@/store/actions');

import { createStore } from 'vuex';
import { shallowMount } from '@vue/test-utils';

import UserView from '@/views/UserView';
import UserSearchForm from '@/components/UserSearchForm';
import UserProfile from '@/components/UserProfile';

import initialState from '@/store/state';
import actions from '@/store/actions';

import userFixture from '../../fixtures/userFixture';

describe('UserView', () => {
  let state = {};

  const build = () => {
    const store = createStore({
      state,
      actions,
    });
    const wrapper = shallowMount(UserView, {
      global: {
        plugins: [store],
      },
    });

    return {
      wrapper,
      userSearchForm: () => wrapper.findComponent(UserSearchForm),
      userProfile: () => wrapper.findComponent(UserProfile),
    };
  };

  beforeEach(() => {
    jest.resetAllMocks();
    state = { ...initialState };
  });

  it('renders the component', () => {
    // arrange
    const { wrapper } = build();
    // assert
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders main child components', () => {
    // arrange
    const { userSearchForm, userProfile } = build();

    // assert
    expect(userSearchForm().exists()).toBe(true);
    expect(userProfile().exists()).toBe(true);
  });

  it('passes a binded user prop to user profile component', () => {
    // arrange
    state.user = userFixture;
    const { userProfile } = build();

    // assert
    expect(userProfile().vm.user).toStrictEqual(state.user);
  });

  it('searches for a user when received "submitted"', () => {
    // arrange
    const expectedUser = 'vlad';
    const { userSearchForm } = build();

    // act
    userSearchForm().vm.$emit('submitted', expectedUser);

    // assert
    expect(actions.SEARCH_USER).toHaveBeenCalled();
    expect(actions.SEARCH_USER.mock.calls[0][1]).toEqual({
      username: expectedUser,
    });
  });
});
