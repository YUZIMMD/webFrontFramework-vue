import Vue from 'vue'

const app = new Vue({
  // el:'#root',
  template:'<div ref="div">{{text}}{{obj.a}}</div>',
  data:{
    text:0,
    obj:{}
  }
  // watch:{
  //   text:(newText,oldText)=>{
  //       console.log(`${newText}:${oldText}`)
  //     }
  // }
})

app.$mount('#root');

const time = 1000;
let i = 0
setInterval(()=>{
  i++
  // app.text +=1
  app.obj.a = i
  app.$forceUpdate()
},time);

console.log(app.$data)
console.log(app.$props)
console.log(app.$el)
console.log(app.$options)
// app.$options.render =(h)=>{
//   return h('div',{},'new render function');
// }
console.log(app.$root)
console.log(app.$children)
console.log(app.$slots)
console.log(app.$scopedSlots)
console.log(app.$refs)
console.log(app.$isServer)
const unWatch = app.$watch('text',(newText,oldText)=>{
  console.log(`${newText}:${oldText}`)
})
setTimeout(()=>{
  unWatch();
},time)

app.$once('test',(a,b)=>{
  console.log(`test emited ${a} ${b}`)
})
app.$emit('test','1','2')
