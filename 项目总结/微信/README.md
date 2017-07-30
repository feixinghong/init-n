# 微信总结

综合使用了组合模式等等方面。

## 遇见的bug
- 苹果手机上面 在微信或者safari里面拖动网页的时候，出现了 网页document整体在滚动的问题
解决方案:这是因为iphone手机safari的默认行为导致的，阻止即可
```
  if(isiphone){

            e.preventDefault();
        }
 
```

- iphone上面当一个子div.item的高度为100% 只有一个背景，里面没有子元素
 此时无法触发touchstart?
 ```

 <div class="father" style="height:100%;width:100%;">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
 </div>
 ```
 问题原因:父元素设置了高度100%，导致父元素无法包住子元素
 解决方案: 只需要给父元素去掉**height:100%**,然后让父元素高度自动适应子元素即可