### 错误原因
比使用css extra时 出现错误

```
Module not found: Error: Cannot resolve module '[object Object]'
```
是因为版本问题   在1里面使用2的方法 导致出错
当使用不同入口来打包时 必须使用name
## 两个entry 
里面的所有公共require 不管是css 还是js文件 都会被统一打包到一个共共的common.js里面去
require.ensure里面require的包会被打包到1.bundle.js里面去。然后比如该语句是在click里面 的 ，则只有在点击时才会去异步加载该文件，和seajs类似