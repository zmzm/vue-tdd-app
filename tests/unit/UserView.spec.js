import { createStore } from 'vuex';
import { shallowMount } from '@vue/test-utils';

import UserView from '@/views/UserView';
import UserSearchForm from '@/components/UserSearchForm';
import UserProfile from '@/components/UserProfile';

import userFixture from '../fixtures/userFixture';

describe('UserView', () => {
  const build = (state = {}) => {
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
    const { userProfile } = build({ user: userFixture });

    // assert
    expect(userProfile().vm.user).toStrictEqual(userFixture);
  });
});
