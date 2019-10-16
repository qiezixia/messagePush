// packages/textarea/index.js

// 导入组件，组件必须声明 name
import testComponent from './Home.vue'

// 为组件添加 install 方法，用于按需引入
testComponent.install = function (Vue) {
  Vue.component(testComponent.name, testComponent)
}

export default testComponent
