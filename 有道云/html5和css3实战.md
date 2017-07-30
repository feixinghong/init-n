# 第二章 支持不同的视口
meta标签可以控制页面可以缩放的范围， 下面可以允许将页面放大到页面的3倍或者缩小到页面的0.5倍。

```
<meta content="width=device-width,maximum-scale=3,minimum-scale=0.5">
```
禁止用户缩放：

```
<meta content="inicial-scale=1.0,user-scalable=no">
```
缩放比例设置为

拖放：拖放文件到浏览器里面会触发drop事件，可以在event.dataTransfer.files里面获取到该文件。是一个file对象
事件：dragover,dragenter,drop。 但是要取消默认行为。可以使用来结合xml和文件上传
