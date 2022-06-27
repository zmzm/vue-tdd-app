import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';

import UserView from '@/views/UserView';
import UserSearchForm from '@/components/UserSearchForm';
import UserProfile from '@/components/UserProfile';

describe('UserView', () => {
  const build = () => {
    const wrapper = shallowMount(UserView, {
      data: () => ({
        user: {},
      }),
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

  it('passes a binded user prop to user profile component', async () => {
    // arrange
    const { wrapper, userProfile } = build();

    wrapper.setData({
      user: {
        name: 'Daniel',
      },
    });

    await nextTick();

    // assert
    expect(userProfile().vm.user).toBe(wrapper.vm.user);
  });
});
