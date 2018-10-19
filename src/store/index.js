import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        token: '',
        c_id:'',
        pid:'',
        hashId:'',
        isCollapse: false,
        hasCharts:{line:true,pie:true}
    },
    mutations: {
        toggleSideBar(state) {
             state.isCollapse = !state.isCollapse ;
        },
        // 设置 token
        set_token(state, token) {
            state.token = token;
            sessionStorage.token = token;  //sessionStorage 保存
        },
        set_c_id(state,c_id){
            state.c_id = c_id;
            sessionStorage.c_id = c_id;  
        },
        set_pid(state, pid) {
            state.pid = pid;
            sessionStorage.pid = pid;
        },
        set_hashId(state, hashId){
            state.hashId = hashId;
            sessionStorage.hashId = hashId;            
        },
        // 删除 token
        del_token(state) {
            state.token = '';
            sessionStorage.removeItem('token');
        },
        showCharts(state,playload){
            if (playload.type=='line'){
                state.hasCharts.line = playload.has;
            }else{
                state.hasCharts.pie = playload.has;
            }
        }
        
    },
})

export default store