  /*config{
        duration:0.5 //单位s 动画切换持续时间。
        auto_play:true,
        panel_class:.slider-panel //面板的类 否则默认去第一个ul
        activeClass:'active' //默认第二个,
        direction:t2b| l2r 方向
        fallback:第一次显示该页面时的callback
        onLeave:function(){}//离开一个页面时候的回调 在滑动动结束以后
        onEnter:function(){}//进入一个页面时候的回调 进入
    }*/
    var get_dom_all=document.querySelectorAll.bind(document);
    var Slider=function(id,config){
        var _private={
            // 当前的index
            index:0
        };

        return {
            init:function(id,config){
                var t=this;
                t.config= extend({
                        auto_play:true,
                        activeClass:'active',
                        fallback:function(){},
                        onLeave:function(){},
                        onEnter:function(){}

                },_private);

                extend(t.config,config);

                t._setup();
            },
            _setup:function(){
                var t=this;
                t.$el=get_dom_all(id)[0] ;
                var ul= t.$el.querySelectorAll("ul");
                t.$dom=ul[0];

                if(ul.length==2){
                    t.$tabs = ul[1].querySelectorAll("li");
                };

                t.$li=[].slice.call( t.$dom.querySelectorAll('li') ,0 );

                t.len=t.$li.length;

                t.$img=[].slice.call( t.$dom.querySelectorAll('img') ,0 );

                var last=t.$li[0].cloneNode(true);t.$dom.appendChild( last );
                var first=t.$li[t.len-1].cloneNode(true);t.$dom.prepend( first );
              
               
                
                if(t.config.lazyLoad){

                    t.$img.length&&t.$img.slice(0,2).forEach(function( element, index ){
                        var url=this.getAttribute("data-src");
                        if(url){
                            this.setAttribute("src",url);
                            this.removeAttribute("data-src");
                        }
                    })
                };
               
                t.direction = Slider.util.oneOf( t.config.direction,Slider.defaults.direction) ? t.config.direction : Slider.defaults.direction[0];

                 t.item_width=Slider.util.get_bounds( t.$li )["width"];
                 // 根据方向设置初始的transform
                if( t.direction==Slider.defaults.direction[0] ){
                     t.$li.forEach(function(element,index){
                         t.set_styles(0,index*t.item_width,element);
                     });

                     t.set_styles(0,-1*t.item_width,first);
                     t.set_styles(0,t.len*t.item_width,last);
                }else if(t.direction==Slider.defaults.direction[1]){
                     // 使得每一页满屏
                     t.$li.forEach(function(element,index){
                         element.style.height=window.innerHeight+'px';
                      });

                    t.$li.forEach(function(element,index){
                     t.set_styles(0,index*window.innerHeight,element);
                    });


                    t.set_styles(0,-1*window.innerHeight,first);
                    t.set_styles(0,t.len*window.innerHeight,last);
                }
               


                t.bind_event();

                if(t.config.auto_play){
                    // t.auto_play();
                }

                t.add_tabs();
                // 第一次进入时要触发一次
                t.config.onEnter.call( t.$li[_private.index] , _private.index ,t.len );
                
            },
            bind_event:function(){
                var t=this;

                t.$el.addEventListener("touchstart",t.touch_start.bind(t),false);
                t.$el.addEventListener("touchmove",t.touch_move.bind(t),false);
                t.$el.addEventListener("touchend",t.touch_end.bind(t),false);
            },
            touch_start:function(e){
                var t=this;
                clearInterval(t.timer);
                Slider.util.get_touches(e);

                t._startX=e.touches[0].pageX;
                t._startY=e.touches[0].pageY;
            },
            touch_move:function(e){
                var t=this;
                Slider.util.get_touches(e);

                t._moveX=e.touches[0].pageX;
                t._moveY=e.touches[0].pageY;

                var move_distance_x=this.move_distance_x=t._moveX-t._startX;
                var move_distance_y=this.move_distance_y=t._moveY-t._startY;

                // 移动的距离是鼠标移动的距离和它本身的之和
                if(t.direction==Slider.defaults.direction[0]){
                    t.set_styles(0,move_distance_x - _private.index*t.item_width );
                }

                if(t.direction==Slider.defaults.direction[1]){
                    t.set_styles(0,move_distance_y - _private.index*window.innerHeight );
                }
               
            },
            set_styles:function(duration,distance,element){
                   var t=this;
                   element=element||this.$dom;

                  var styles=t.get_transition(duration)+ t.get_transform( distance );
                
                  element.style=styles;
            },
            get_transition:function(time){
                var t=this;
                return Slider.util.get_css_adapter("transition",'all '+time+'s');
            },
            get_transform:function(result){
                var t=this;
                if(t.direction==Slider.defaults.direction[0]){
                    return Slider.util.get_css_adapter('transform','translate3D('+result+'px,0,0)');
                }

                // 垂直方向
                if(t.direction==Slider.defaults.direction[1]){
                    return Slider.util.get_css_adapter('transform','translate3D(0,'+result+'px,0)');
                }
            },
            set_leave:function(){
                var t=this;
                // 1000后_private.index会变为当前的 需要闭包保存
                (function(last_index){
                    setTimeout(function(){
                        t.config.onLeave.call(t.$li[last_index],last_index ,t.len);

                    },t.config.duration*1000);
                })(_private.index);
            },
            touch_end:function(e){
                var t=this;

                // 左右移动

                if(t.direction==Slider.defaults.direction[0] ){
                    
                    if(this.move_distance_x<-Slider.defaults.distance){
                            t.set_leave();
                            _private.index++;

                            this.move_increase(this.item_width);

                     }else if(this.move_distance_x>Slider.defaults.distance){
                            t.set_leave();
                            _private.index--;
                            this.move_decrease(this.item_width);
                    }else{
                        t.set_styles(0.5, -_private.index*t.item_width );
                    }
                }else{//上下滑动
                    if(this.move_distance_y<-Slider.defaults.distance){
                            t.set_leave();
                            _private.index++;
                            this.move_increase(window.innerHeight);

                     }else if(this.move_distance_y>Slider.defaults.distance){
                            t.set_leave();
                            _private.index--;
                            this.move_decrease(window.innerHeight);
                    }else{
                        // 回到原来的地方
                        t.set_styles(0.5, -_private.index*window.innerHeight );
                    }
                }
                
                if(t.config.auto_play){
                   t.auto_play();
                }
             
            },
            auto_play:function(){
                var t=this;
                t.timer=setInterval(function(){
                    _private.index++;
                    t.move_increase( t.direction=='h'?t.item_width: window.innerHeight );
                },4000)
            },
            // 添加底部的tabs
            add_tabs:function(){

                var t=this;
                if(t.$tabs){

                    [].slice.call(t.$tabs).forEach(function(element,index){
                        element.classList.remove( t.config.activeClass );

                    });

                    t.$tabs[_private.index].classList.add( t.config.activeClass );
                }
            },
            move_increase:function(step){
                var t=this;
                
                t.set_styles( t.config.duration ,-step*_private.index);

                if(_private.index>=t.len){
                    
                   _private.index=0;
                   setTimeout(function(){
                    t.set_styles(0,0);
                },t.config.duration*1000 );
                
                }

                 t.add_tabs();
                 // 执行回调函数
                 var args=[{
                    index:_private.index
                 }];

                 t.config.onEnter.call( t.$li[_private.index] , _private.index ,t.len );
            },
            
            move_decrease:function(step){
                var t=this;
                
                t.set_styles( t.config.duration ,-step*_private.index);

                if(_private.index<=-1){
                    
                    // 指向最后一个
                   _private.index=t.len-1;
                   
                   //快速切换到最后一个
                   setTimeout(function(){
                    t.set_styles(0,- _private.index*step);
                },t.config.duration*1000 );

                }

                 t.add_tabs();

                 var args=[{
                    index:_private.index
                 }];

                 t.config.onEnter.call(t.$li[ _private.index ], _private.index ,t.len);
            }
        }.init(id,config);
    };

    function extend(target,option){
        for(var i in option){
            typeof option[i]!=='undefined' && ( target[i]=option[i] );
        };
        return target;
    }

    extend(Slider,{
        defaults:{
            distance:50,
            direction:['h','v']//水平和垂直两个方向
        },
        util:{
            oneOf:function(value, validList) {
                for (let i = 0; i < validList.length; i++) {
                    if (value === validList[i]) {
                        return true;
                    }
                }
                return false;
            },
            get_touches:function(e){
                if(!e.touches){
                    e.touches = e.originalEvent.touches;
                }
            },
            get_bounds:function(ele){
                if(!ele){
                    return;
                }
                var one_ele=ele;
                one_ele= one_ele.length>0&&ele[0];
                return one_ele.getBoundingClientRect();
            },
            // 兼容性
            get_css_adapter:function(property,value){
                var browser_prefix=['-ms-','-moz-','-webkit-',''];

                var str='';

                browser_prefix.forEach(function(element,index){
                   str += element+property+':'+value+';' ;
                });

                return str;
            }
        }
    })
   