import { shallowMount } from '@vue/test-utils';

import UserProfile from '@/components/UserProfile';

import userFixture from '../../fixtures/userFixture';

describe('UserProfile', () => {
  let props = {};

  const build = () => {
    const wrapper = shallowMount(UserProfile, {
      props,
    });

    return {
      wrapper,
      avatar: () => wrapper.find('.user-profile__avatar'),
      name: () => wrapper.find('.user-profile__name'),
      bio: () => wrapper.find('.user-profile__bio'),
    };
  };

  beforeEach(() => {
    jest.resetAllMocks();
    props = { user: userFixture };
  });

  it('renders the component', () => {
    // arrange
    const { wrapper } = build();
    // assert
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders main components', () => {
    // arrange
    const { avatar, name, bio } = build();
    // assert
    expect(avatar().exists()).toBe(true);
    expect(avatar().attributes().src).toBe(props.user.avatar_url);

    expect(name().exists()).toBe(true);
    expect(name().text()).toBe(props.user.name);

    expect(bio().exists()).toBe(true);
    expect(bio().text()).toBe(props.user.bio);
  });
});
