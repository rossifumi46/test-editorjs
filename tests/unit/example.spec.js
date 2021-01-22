import { shallowMount } from '@vue/test-utils';
import Navbar from '@/components/Navbar.vue';

describe('Navbar.vue', () => {
  it('renders', () => {
    const msg = 'Lorem IpsumHomeAbout';
    const wrapper = shallowMount(Navbar, {
      propsData: { msg },
      stubs: ['router-link'],
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
