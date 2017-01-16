  /*config{
        duration:0.5 //单位s 动画切换持续时间。
        auto_play:true,
        panel_class:.slider-panel //面板的类 否则默认去第一个ul
        activeClass:'active' //默认第二个
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
                        activeClass:'active'

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
              
                t.item_width=Slider.util.get_bounds( t.$li )["width"];
                
                if(t.config.lazyLoad){

                    t.$img.length&&t.$img.slice(0,2).forEach(function( element, index ){
                        var url=this.getAttribute("data-src");
                        if(url){
                            this.setAttribute("src",url);
                            this.removeAttribute("data-src");
                        }
                    })
                };
                t.$li.forEach(function(element,index){
                    t.set_styles(0,index*t.item_width,element);
                })

                t.set_styles(0,-1*t.item_width,first);
                t.set_styles(0,t.len*t.item_width,last);

                t.bind_event();

                if(t.config.auto_play){
                    // t.auto_play();
                }

                t.add_tabs();
                
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
            },
            touch_move:function(e){
                var t=this;
                Slider.util.get_touches(e);

                t._moveX=e.touches[0].pageX;

                var move_distance=this.move_distance=t._moveX-t._startX;

                // 移动的距离是鼠标移动的距离和它本身的之和
                t.set_styles(0,move_distance - _private.index*t.item_width );
               
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
                return Slider.util.get_css_adapter('transform','translate3D('+result+'px,0,0)');
            },
            touch_end:function(e){
                var t=this;
                // 向左移动
                if(this.move_distance<0){
                    if(this.move_distance<-Slider.defaults.distance){
                        _private.index++;
                        this.move_left(this.item_width);
                    }
                }else{
                     if(this.move_distance>Slider.defaults.distance){
                        _private.index--;
                        this.move_right(this.item_width);
                    }
                }
                if(t.config.auto_play){
                    t.timer=setInterval(function(){
                        _private.index++;
                        t.move_left();
                    },4000);
                }
             
            },
            auto_play:function(){
                var t=this;
                t.timer=setInterval(function(){
                    _private.index++;
                    t.move_left();
                },4000)
            },
            add_tabs:function(){

                var t=this;
                if(t.$tabs){

                    [].slice.call(t.$tabs).forEach(function(element,index){
                        element.classList.remove( t.config.activeClass );

                    });

                    t.$tabs[_private.index].classList.add( t.config.activeClass );
                }
            },
            move_left:function(){
                var t=this;
               
                t.set_styles( t.config.duration ,-t.item_width*_private.index);

                if(_private.index>=t.len){
                    
                   _private.index=0;
                   setTimeout(function(){
                    t.set_styles(0,0);
                },t.config.duration*1000 );
               
                }

                 t.add_tabs();


            },
            move_right:function(){
                var t=this;
                
                t.set_styles( t.config.duration ,-t.item_width*_private.index);

                if(_private.index<=-1){
                    
                    // 指向最后一个
                   _private.index=t.len-1;
                   

                   setTimeout(function(){
                    t.set_styles(0,- _private.index*t.item_width);
                },t.config.duration*1000 );

                }

                 t.add_tabs();
            }
        }.init(id,config);
    };

    function extend(target,option){
        for(var i in option){
            option[i] && ( target[i]=option[i] );
        };
        return target;
    }

    extend(Slider,{
        defaults:{
            distance:50
        },
        util:{
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
   