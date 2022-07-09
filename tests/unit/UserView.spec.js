import { createStore } from 'vuex';
import { shallowMount } from '@vue/test-utils';

import UserView from '@/views/UserView';
import UserSearchForm from '@/components/UserSearchForm';
import UserProfile from '@/components/UserProfile';
import initialState from '@/store/state';

import userFixture from '../fixtures/userFixture';

describe('UserView', () => {
  let state = {};

  const build = () => {
    const store = createStore({
      state() {
        return state;
      },
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
});
