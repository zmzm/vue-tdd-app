import Vuex, { nextTick } from 'vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import UserView from '@/views/UserView';
import UserSearchForm from '@/components/UserSearchForm';
import UserProfile from '@/components/UserProfile';
import initialState from '@/store/state';

import userFixture from '../fixtures/userFixture';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('UserView', () => {
  let state;

  const build = () => {
    const wrapper = shallowMount(UserView, {
      localVue,
      store: new Vuex.Store({ state }),
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

  it('passes a binded user prop to user profile component', () => {
    // arrange
    state.user = userFixture;
    const { userProfile } = build();

    // assert
    expect(userProfile().vm.user).toBe(state.user);
  });
});
