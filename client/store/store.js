import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default ()=>{
    return new Vuex.Store({
        strict:isDev,//在开发环境中，在正式环境中关掉
        state:defaultState,
        mutations,//修改一个数据，放在mutations,mutations是同步的
        getters,
        actions,
        modules:{//模块下还可以增加模块
            a:{
                namespaced: true,
                state: {
                    text:1
                },
                mutations: {//默认生成的mutation是在全局的命名空间下面的，如果想在只在a模块下，需要加上namespaced
                    updateText(state,text){
                        console.log(state)
                        state.text=text
                    }
                },
                getters:{
                    textPlus(state,getters,rootState){
                        return state.text +rootState.b.text//拿到全局state的方法
                    }
                },
                actions:{
                    add({ state,commit,rootState }){
                        // commit('updateText',rootState.count)//直接调用是是当前作用域下面的mutation
                        commit('updateCount',rootState.count,{ root:true })
                    }
                }
            },
            b:{
                state: {
                    text: 2
                },
                actions:{
                    textAction({ commit }){
                        commit('a/updateText','test test')
                    }
                }
            }
        }
    })
}