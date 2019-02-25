<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>  
        <p>{{fullName}}{{count}}</p>
        <p>{{textA}}{{textPlus}}</p>
        <!-- <Todo></Todo> -->
        <!-- 挂载路由 -->
        <router-link to='./app'>app</router-link>
        <router-link to='./login'>login</router-link>
        <transition name="fade">
           <router-view />   
        </transition>
        <Footer></Footer>
    </div>
</template>
<script>
// 快速在组件内使用vuex
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'
export default {
    components:{
        Header,
        Footer
        // Todo
    },
    data(){
        return{
        }
    },
    methods:{
      ...mapActions(['updateCountAsync','a/add','textAction']),
      ...mapMutations(['updateCount','a/updateText'])
    },
    mounted(){
      console.log(this.$store)
      // let i = 1
      // this.$store.state.count = 3;//在vuex中规定了strict为true，在开发环境中就不允许这样做，浏览器控制台会报错
      // setInterval(()=>{
      //   this.$store.commit('updateCount',i++)
      // },1000)
      // this.$store.dispatch('updateCountAsync',{ num:5,time:2000 })
      this.updateCountAsync({ num:5,time:2000 })//辅助函数用法
      this['a/updateText']('123')//a模块化下面的mutation方法
      this['a/add']()
      this.textAction()
    },
    computed:{
      // textA(){
      //   return this.$store.state.a.text
      // },
      textB(){
        return this.$store.state.b.text
      },
      ...mapState({
        count:(state)=>state.count,
        textA:state => state.a.text
      }),
      // count(){
      //   return this.$store.state.count
      // },
      // fullName(){
      //   return this.$store.getters.fullName
      // }
      ...mapGetters({
        fullName:'fullName',
        textPlus:'a/textPlus'
      })
    }
}
</script>
<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
#loading{
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background-color rgba(255,255,255,.3)
  z-index 99
  display flex
  align-items center
  justify-content center
}
</style>
