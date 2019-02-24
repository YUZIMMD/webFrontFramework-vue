<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>  
        <p>{{fullName}}{{count}}</p>
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
  mapState
  // mapGetters
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
    mounted(){
      console.log(this.$store)
      let i = 1
      setInterval(()=>{
        this.$store.commit('updateCount',i++)
      },1000)
    },
    computed:{
      ...mapState(['count']),
      // count(){
      //   return this.$store.state.count
      // },
      fullName(){
        return this.$store.getters.fullName
      }
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
