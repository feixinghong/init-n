### let 
1. 只在块级{}内有效
2. for 循环内部使用的话，每次的i都是不同的.
```
var a=[];
for(let i=0;i<10;i++){
a[i]=function(){console.log(i)}
}
a[6]() //6
```
3.不存在变量提升
