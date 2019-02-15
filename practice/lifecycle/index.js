import Vue from 'vue'
// vue组件生命周期
new Vue({
  el:'#root',
  template:'<div>{{text}}</div>',
  data:{
    text:'aaa'
  },
  beforeCreate(){
    console.log(this,'beforeCreate')
  },
  created(){
    console.log(this,'create')
  },
  beforeMount(){
    console.log(this,'beforeMount')
  },
  mounted(){
    console.log(this,'mounted')
  },
  beforeUpdate(){
    console.log(this,'beforeUpdate')
  },
  updated(){
    console.log(this,'updated')
  },
  activated(){
    console.log(this,'activated')
  },
  deactivated(){
    console.log(this,'deactivated')
  },
  beforeDestroy(){
    console.log(this,'beforeDestroy')
  },
  destroyed(){
    console.log(this,'destroyed')
  },
  // render(h){
  //   throw new TypeError('runder error')
  // },
  errorCaptured(h,err){
    console.log(this,'errorCaptured')
    return h('div',{},err.stack)
  }
})
