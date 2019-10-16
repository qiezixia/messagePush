/* eslint-disable */
import { shallowMount } from '@vue/test-utils'
import Alert from '../../src/components/alert.vue';
import { expect } from 'chai'

describe('Alert', () => {
  it('检测props接受参数', () => {
    const wrapper = shallowMount(Alert, {
      propsData: {
        title: 'test',
        showIcon: true
      }
    })
    expect(wrapper.props().title).to.be.equal('test')
  })

  it('检测类型', () => {
    const wrapper = shallowMount(Alert, {
      propsData: {
        title: 'test',
        type: 'success',
        showIcon: true
      }
    })
    expect(wrapper.classes()).to.contain('el-alert--success')
  })

  it('检测描述', () => {
    const wrapper = shallowMount(Alert, {
      propsData: {
        title: 'Dorne',
        description: 'Unbowed, Unbent, Unbroken',
        showIcon: true
      }
    })
    expect(wrapper.find('.el-alert__description').text()).to.equal('Unbowed, Unbent, Unbroken')
  })

  it('theme', () => {
    const wrapper = shallowMount(Alert, {
      propsData: {
        title: 'test',
        effect: 'dark'
      }
    })
    expect(wrapper.classes()).to.contain('is-dark')
  });

  it('title slot', () => {
    const wrapper = shallowMount(Alert, {
      slots: {
        title: '<span slot="title">foo</span>'
      }
    })
    expect(wrapper.find('.el-alert__title').text()).to.equal('foo')
  })

  it('close', () => {
    const wrapper = shallowMount(Alert, {
      propsData: {
        title: 'test',
        closeText: 'close'
      }
    })
    const closeClick = wrapper.find('.el-alert__closebtn')
    closeClick.trigger('click')
    expect(wrapper.vm.visible).to.false
  });

});