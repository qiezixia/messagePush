/* eslint-disable */
import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Counter from '@/components/counter.vue'

describe('Counter', () => {
  const wrapper = mount(Counter)

  it('renders the correct markup', () => {
    expect(wrapper.html()).to.contain('<span class="count">0</span>')
  })

  // 也便于检查已存在的元素
  it('has a button', () => {
    expect(wrapper.contains('button')).to.be.ok
  })

  it('button click should increment the count', () => {
    expect(wrapper.vm.count).to.be.equal(0)
    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.vm.count).to.be.equal(1)
  })
})