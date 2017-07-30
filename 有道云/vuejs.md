易错点：
- 组件内部要获取的话必须在要映射为计算属性：
- this.$store.state.currnum 
- 要使用某一个值，必须
<router-link :to="{name:'topic',params:{id:item.id}}">
- message | upper(3,2)
则在upper里面变成了upper('message',3,2);
- filter放在filters参数里面。必须有返回 作为输出 一般像限制长度这种就可以使用 

- v-for="(item,index) in lists"
两边要加双引号 
- 比如一个对象里面的属性report={};
现在需要进行渲染，因为vue读不到的话会报错，此时可以加上
report.id(在ajax获取完成之后会拥有该值)
在根标签加上：

```
<div v-if="report.id"></div>
```
ajax没有完成时，去渲染时，不会对其进行渲染。不会出错。
但是当ajax请求成功之后，马上就可以读到，该标签里面的内容可以立即进行渲染。
- 
			console.log(this.$route.params) 记住是$route
- mock返回的是string 要转义才行。
- 要使用组件，必须要在components里面声明才行
- import就和reuirejs里面导入其他模块一样，导入后如果没有说明为window对象上面的话，那么就是一个局部变量
- this.$router.push({
					name:"home"
				});
- webpack 在更改代码后不替换，需要重启继续才行
- beforeenter在什么时候触发？
比如 从 a 进入b页面。也可以从c页面进入b页面，而b页面需要验证。此时从a c进入b页面的时候，有一个导航钩子会被调用，就是beforeenter.此时可以看它的to属性，如果需要验证的话则直接进行验证。即使在浏览器里面直接敲/home，则也会触发导航钩子的
- 对于src属性的绑定：	<img :src="item.ext2"/> 
- 404 center报错是因为该页面的接口页面里面出现异常了无法访问，导致了路由404
- 一个匹配路由的组件内部的子组件不会触发beforeRouteEnter事件 因为不是路由触发的它
- 注意如果router没有调用next()的话，点击会无反应
- // 自动获取上一级的路由信息 
	
```
	beforeRouteEnter(to,from,next){
			next(vm=>{
				vm.path=from.name
			});
		} 
```
###### 这样是不可取的，因为可能是从detail页面回到myreport页面，此时的from.name是detail，而应该是setting，故有问题可以这样做限制：单边限制。
---
# 过渡效果
## css动画
和css过渡一致，只是在动画中
```
v-enter
```
类名在节点插入dom后不会被立即删除，而是在animationend事件时才删除
## 自定义过渡类名
是为了解决 如何利用已有的动画组件库来完成动画，
现在只需要替换enter-active-class类名即可。在点击切换时，vue会直接找到该值 然后在动画过程中加上对应的赋予的类名。

```
enter-class
enter-active-class
leave-class
leave-active-class
```
demo

```
<transition name="custom-classes-transition"
 enter-active-class="bounce-in"
 leave-active-class='bounce-out'
 <p v-if='show'>itit me</p>
>
</transition>
**已有的动画类**：
.bounce-in{

}
.bounce-out{
}
```
此时可以结合animation.css

# vuex
是一个全局store 进行状态管理
store是一个容器，可以进行状态管理
和全局变量的区别：

---
- vuex的状态管理是响应式的，当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
- 全局变量形式的数据 无法被响应式到。
- 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 mutations。这样使得我们可以方便地跟踪每一个状态的变化
使用：

```
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
获取状态：
store.state.count
更改状态：
store.commit('increment')
```
可以得知 更改状态是使用commit来进行 而不是直接更改，这样可以更加明确跟踪到状态的变化
这样的话 多个组件可以共用一个属性
## state特点
单一状态树：一个对象就包含了全部的应用层级状态，可以作为唯一数据源，方便调试
store的getters 可以认为是store的一个计算属性。
## router
路由中：
```
 { path: '/center/:userId/h/:article', component: Bar }
const Bar = { template: '<div>center{{$route.params.userId}}g{{$route.params.article}}query:{{$route.query.id}}</div>' }
当执行
router.push({path:'center/123/h/78?id=89' })
可以看见渲染结果
center123g78query:89

---

命名路由：
  { path: '/center/:userId/h/:article', component: Bar,name:"center" }
  手动跳转：
  router.push({name:'center' ,params:{userId:123,article:90}})
  则导航栏会变成：
  /center/123/h/90
```

注意：从 /user/foo 导航到 user/bar，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用
可以在组件里面调用watch方法 检测$rote的变化 
route. object 路由信息对象 表示当前激活的路由的状态信息。包含了当前url解析得到的信息。
出现在组件nebula的this.$route上
具有path   params hash等属性
router.push({name:'center' ,params:{userId:123,article:90},query:{name:'peter'},hash:'#fdfd'})
组件内部的路由：
beforeRouteEnter 
// 在渲染该组件的对应路由被 confirm 前调用，在mounted之前触发。
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
比如现在是a组件在b组件的路由回到a组件的时候渲染a之前被调用
beforeRouteLeave :
 // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
即就是：在离开该组件的路由之前被调用 可以保存信息。
因为每个组件在被别的组件替换之时，数据是被销毁了的。
可以借助全局对象来存储

对组件的注入：
通过在vue根实例的router配置传入router实例，下面的这些属性
---

插件实例：

```
先写插件：
var plugin1={
  install(Vue,opt){
    console.log(opt);
    可以这样添加实例方法
    Vue.prototype.show=function(msg){
      alert(msg)
    };
    //内部写全局方法
    Vue.myGlobalMethod={
      name:'peter'
    };
  }
}
Vue.use(plugin1,{name:90});
注意是一个对象 并且该对象具有install 方法 该方法内部把需要的method绑定到vue原型上面
运行时可以打印出 opt {name:90}
使用 ：可以在组件内部使用this.show('符合')
此时会弹出符合的弹出框
```

注意：
滚动加页：可以通过两种方式设置请求参数：
###### page一直为1 ，但是limit持续加。
###### limit不变 page=page+1;
前一种缺点：有大量的重复数据。流量大。
后一种，结合vue的话。需要在请求回来的数据里面把之前的和现在的数据结合起来。
this.topics=this.topics.push(...rep.data);
然后vue的响应式系统进行render。
总的来说后一种更好一些。

---
## 组件路由导航钩子
- 全局钩子 ：即每次路由变化都会调用该钩子

```
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
router.afterEach(route=>{
//没有next参数，不能改变导航了
})
导航在所有钩子resolve之前一直处于不变中(等待)

```

- 单个路由独享的钩子

```
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,//路由到本路由时渲染的组件
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

- 组件内部的钩子

```
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```
父组件传递prop到子组件:

---
<mytemplate :my-a="ab"></mytemplate>
ab必须是布尔值，或者是一个计算值，也可以是父元素的一个方法。

```
<!-- kebab-case in HTML -->
<child my-message="hello!"></child>
子组件中获取
Vue.component('child', {
  // camelCase in JavaScript
  props: ['myMessage'],
  template: '<span>{{ myMessage }}</span>'
})
```
生命钩子：
在new Vue之后，data obverse init event之前，beforeCreate.
添加之后，created。
beforeMount是在挂载之前进行调用，
mounted el被vm.$el替换之后，被调用。
beforeUpdate 数据更新时调用，发生在重新绘制之前，可以进一步更改状态
udated:由于虚拟dom渲染到真实dom后调用，不要在这里更改状态。
beforeDestroy 在销毁前调用，实例依然可用。
destroyed vue实例销毁后调用。 事件绑定器被移除，子实例被销毁
路由顺序：比如先beforeEach 常用于验证登录

---
# 组件：
## 子组件索引：
有时父组件需要访问子组件，此时可以使用ref为子组件指定一个索引id， 然后父组件可以访问通过 this.$refs.[refname]来访问到。*（不要在模板里面或者计算属性里面访问它）

```
<div id="parent">
  <user-profile ref="profile"></user-profile>
</div>

访问：
var parent = new Vue({ el: '#parent' })
// 访问子组件
var child = parent.$refs.profile
```
当ref和 v-for一起使用是，ref是一个数组或者对象。
computed 和data props的区别：computed
### 组件命名规范

```
// 在组件定义中
components: {
  // 使用 kebab-case 形式注册
  'kebab-cased-component': { /* ... */ },
  // register using camelCase
  'camelCasedComponent': { /* ... */ },
  // register using TitleCase
  'TitleCasedComponent': { /* ... */ }
}

在html中统一使用：
<!-- 在HTML模版中始终使用 kebab-case -->
<kebab-cased-component></kebab-cased-component>
<camel-cased-component></camel-cased-component>
<title-cased-component></title-cased-component>
```
如果组件没有slot传递值，甚至可以使用/使其闭合

```
<my-component/>
```
### 递归组件
组件可以在它的内部可以递归调用自己，但是只要他有neme属性时才可以
name 
但是