import { expect } from "chai";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Navigation from "@/components/Navigation.vue";
import BootstrapVue from "bootstrap-vue";

describe("Navigation.vue", () => {
  it("Get brand", () => {
    const localVue = createLocalVue();
    localVue.use(BootstrapVue);
    const wrapper = shallowMount(Navigation, { localVue });
    expect(wrapper.text()).to.include("Mindfield");
  });
});
