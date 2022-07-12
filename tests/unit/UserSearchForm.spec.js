import { shallowMount } from '@vue/test-utils';

import UserSearchForm from '@/components/UserSearchForm';

describe('UserSearchForm', () => {
  const build = () => {
    const wrapper = shallowMount(UserSearchForm);

    return {
      wrapper,
      input: () => wrapper.find('input'),
      button: () => wrapper.find('button'),
    };
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders the component', () => {
    // arrange
    const { wrapper } = build();
    // assert
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders main components', () => {
    // arrange
    const { input, button } = build();
    // assert
    expect(input().exists()).toBe(true);
    expect(button().exists()).toBe(true);
  });

  it('calls "submitted" event when submitting form', () => {
    // arrange
    const expectedUser = 'vlad';
    const { wrapper, button, input } = build();
    input().element.value = expectedUser;

    // act
    input().trigger('input');
    button().trigger('click');
    button().trigger('submit');

    // assert
    expect(wrapper.emitted().submitted[0]).toEqual([expectedUser]);
  });
});
