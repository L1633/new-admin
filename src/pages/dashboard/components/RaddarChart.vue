<template>
    <div class="date-tools">

        <div class="title">
            <p>我的课程</p>
            <div class="date-years">
                <span class="date-left" @click="subMonth()"></span>
                <span class="date-middle" @click="selectYM()">{{panelYear}}-{{panelMonth+1}}</span>
                <span class="date-right" @click="addMonth()">></span>
            </div>
        </div>
        
        <div class="date-weeks Extra-notice-color">
            <span>周日</span>
            <span>周一</span>
            <span>周二</span>
            <span>周三</span>
            <span>周四</span>
            <span>周五</span>
            <span>周六</span>
        </div>
        <div class="date-days">
            <template v-for="(day,index) in dayFullList">
                <span v-if="day!=0" :key="index" class="Extra-notice-color course-box">
                    <a href="javascript:void(0);" v-if="(trainDateFullList.includes(day))" class="active" @click="getCurrentDay(day)">{{day | filterDay}} </a>
                    <a href="javascript:void(0);" v-else>{{day | filterDay}} </a>

                    <div class='course-item ' v-if="courseList[day]">
                        <!-- 早上 -->
                        <swiper :options="swiperOption" ref="mySwiper"  v-if="courseList[day].morning" class="moring" @mouseover.native="con($event,courseList[day].morning,day)" @mouseout.native="demo">
                            <swiper-slide  v-for="time in courseList[day].morning">
                                <i>{{time.ca_name+'(' + time.curr_hour+' -'+ time.total_hour+')'}}</i>
                            </swiper-slide>
                        </swiper>

                        <!-- 下午 -->
                        <swiper :options="swiperOption" ref="mySwiper"  v-if="courseList[day].afternoon" class="afternoon"  @mouseover.native="con($event,courseList[day].afternoon,day)" @mouseout.native="demo"> 
                            <swiper-slide  v-for="time in courseList[day].afternoon">
                                <i v-if="courseList[day].afternoon"  :class="courseList[day].afternoon?'afternoon':'' ">{{time.ca_name+'(' + time.curr_hour+' -'+ time.total_hour+')'}}</i>
                            </swiper-slide>
                        </swiper>

                        <!-- 晚上 -->
                        <swiper :options="swiperOption" ref="mySwiper"  v-if="courseList[day].night" class="night"  @mouseover.native="con($event,courseList[day].night,day)" @mouseout.native="demo">
                             <swiper-slide  v-for="time in courseList[day].night">
                                <i  :class="courseList[day].night?'night':'' ">{{time.ca_name+'(' + time.curr_hour+' -'+ time.total_hour+')'}}</i>
                            </swiper-slide>
                        </swiper>

                    </div>
                    <!-- <div>{{day}}</div> -->
                </span>
                <span v-else :key="index">
                    <a href="javascript:void(0);" style="opacity:0;">{{day}} </a>
                </span>
            </template>
        </div>
        <!-- 年月下拉框 -->
        <div class="drop-down-ym" v-if="showDropDownYM">
            <div class="drop-down-y">
                <a href="javascript:void(0);" v-for="(item,index) in yearList" @click="selectY(item)">{{item}}</a>
            </div>
            <div class="drop-down-m">
                <a href="javascript:void(0);" v-for="(item,index) in monthList" @click="selectM(item-1)">{{item}}</a>
            </div>
        </div>
        <div class="time">
            <span>上午8：00-12:00</span>
            <span>下午13：00-18:00</span>
            <span>晚上18：00-22:00</span>
            <span>开课</span>
            <span>结课</span>
        </div>

        <course-info :positionLeft="left" :positionTop="top" :cardData="cardData" :day="day" :positionC="position" :display="display"></course-info>
    </div>
</template>

<script>
    import { getAgentCourseTimeDayList } from "../../../api";
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import courseInfo from '../../../components/CourseInfo/courseInfo.vue'
    export default ({
        props: ['dateToolsKey','trainDateList','trainDateFullList'],
        data(){
            return {
                yearList:[2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022],
                monthList:[1,2,3,4,5,6,7,8,9,10,11,12],
                weekList:[],
                dayList:[],//所有的天数列表，前面空位补0
                dayFullList:[],//所有的天数列表，前面空位补0
                panelYear:'',//仪表盘显示的年
                panelMonth:'',//仪表盘显示的月（从0开始）
                panelDay:'',//仪表盘显示的天（从1开始）
                firstDay:'',//每月第一天
                lastDay:'',//每月最后一天也即每月多少天
                firstDayisWhat:'',//第一天星期几0-6（星期日到星期六）
                showDropDownYM:false,
                courseList:[],
                swiperOption:{
                    // debugger: true,            
                    autoplay: true,
                    direction:'vertical',
                    grabCursor:true,
                    loop:true    
                    // slidesPerView: "auto",
                },

                left:'',
                top:'',
                position:'fixed',
                display:'block',
                cardData:[],
                day:''
                
            }
        },
        components: {
            swiper,
            swiperSlide,
            courseInfo
        },
        created(){
            const seqid = Date.parse(new Date());
            let c_id = this.$store.state.c_id;
            // const Month = `2018-10`;
            const Month = (new Date().getMonth()+1)<10 ? `${new Date().getFullYear()}-0${new Date().getMonth()+1}`:`${new Date().getFullYear()}-${new Date().getMonth()+1}`;
            console.log(Month,'sdsdsdsds ')
            getAgentCourseTimeDayList({seqid,Month,c_id}).then(res=>{
                console.log(res.data.list,'课表轮播图')
                this.courseList = res.data.list;
                // console.log(this.courseList[20180903]['morning'],'22222')
            })
            
        },
        computed: {
            swiper() {
                // return this.$refs.mySwiper.swiper;
            }
        },
        mounted(){
            this.dateInit();
            // this.swiper.slideTo(3, 1000, false);
            // console.log('this is current swiper instance object', this.swiper)
        },
        filters:{
            filterDay(value){
                return parseInt(value.slice(-2));
            }
        },
        methods:{
            dateInit(year=(new Date()).getFullYear(),month=(new Date()).getMonth()){
                let self = this;
                let y = year;
                let m = month;
                self.panelYear = year;
                self.panelMonth = month;
                self.firstDay = (new Date(y,m,1)).getDate();//每月第一天
                self.lastDay = (new Date(y,m+1,0)).getDate();//每月最后一天也即每月多少天
                self.firstDayisWhat = (new Date(y,m,1)).getDay();//第一天星期几0-6（星期日到星期六）
                let beginTmp = new Array(self.firstDayisWhat).fill(0);//初始化长度为3的数组并填充0
                let lastTmp = [];//初始化长度为当月天数的数组并填充为0-30或0-31
                let lastFullTmp = [];//初始化完整的月的每天格式为年月日20180627
                for (let i=1;i<=self.lastDay;i++){
                    lastTmp.push(i);
                    lastFullTmp.push(''+self.panelYear+self.addPreZero(self.panelMonth+1)+self.addPreZero(i));
                }
                self.dayList=[...beginTmp,...lastTmp];//用结构的方式生成新日期数组
                self.dayFullList = [...beginTmp,...lastFullTmp];//用结构的方式生成年月日完整的新日期数组
            },
            subMonth(){
                let self = this;
                if(self.panelMonth>0){
                    self.panelMonth--;
                }
            },
            addMonth(){
                let self = this;
                if(self.panelMonth<11){
                    self.panelMonth++;
                }
            },
            getCurrentDay(currentDay){
                this.panelDay = currentDay;
            },
            selectYM(){
                let self = this;
                self.showDropDownYM = true;
            },
            selectY(year){
                let self = this;
                self.panelYear = year;
            },
            selectM(month){
                let self = this;
                self.panelMonth = month;
                self.showDropDownYM=false;
            },
            addPreZero(num){//小于9的需要添加0前缀
                return (num>9) ? num:('0'+num);
            },
            removePreZero(num){//小于9的需要去除0前缀
                return parseInt(num);
            },
            con(e,data,day){
                console.log(day,'data');
                e.preventDefault();
                this.left = e.clientX;
                this.top = e.clientY;
                // this.position = "fixed";
                this.cardData = data;
                this.day = day;
                this.display = true
                console.log(11111,this.position);
                
            },
            demo(){
                this.display = false
            }
        },
        watch: {
            panelMonth(newVal,oldVal){//检测月份变化
                this.dateInit(this.panelYear,this.panelMonth);
            },
            panelYear(newVal,oldVal){//检测年份变化
                this.dateInit(this.panelYear,this.panelMonth);
            },
            panelDay(newVal,oldVal){//检测具体日期变化
                this.$emit('topDateEvent'+this.dateToolsKey,newVal);
            }
        },
        
    })
</script>

<style scoped lang="scss">
@function px2rem($px) {
  $rem: 100;
  @return($px / $rem)+rem;
}
button{
    background-color:#fff;
    cursor:pointer;
}
.title{
    display: flex;
    justify-content:space-between;
}
.date-btn,.date-middle{
    color:#333!important;
}
.date-tools{
    position:relative;
    margin-bottom:px2rem(39);
    display:inline-block;
    width:px2rem(1114);
    // height:px2rem(718);
    overflow: hidden;
    border:1px solid #eee;
    font-size: 16px;
}
.date-btn{
    width:34px;
    height:34px;
    border-radius:50%;
}
.date-btn:hover{
    color:#fff;
    background-color:#0A81E5;
    opacity:0.6;
}
.date-years{
    border: 1px solid #CCC;
    margin:14px 20px 0 20px;
    border-radius: 4px;
    overflow: hidden;
    display:flex;
    justify-content:space-between;
}
.date-left,.date-right{
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
    background-color: #fff;
}
.date-left{
    border-right: 1px solid #CCC;
    &::before{
        content: " ";
        display: inline-block;
        height: 100%;
        width: 100%;
        vertical-align:middle;
        background: url("../../../assets/arrow.png") no-repeat center center;
    }    
}
.date-right{
    &::before{
        content: " ";
        display: inline-block;
        height: 100%;
        width: 100%;
        vertical-align:middle;
        background: url("../../../assets/arrow2.png") no-repeat center center;
    }    
}
.date-middle{
    width: 0.82rem;
    height:0.3rem;
    line-height: 0.3rem;
    text-align: center;
    border-right: 1px solid #CCC;
    background-color: #fff;
}
.date-weeks{
    display: flex;
    justify-content:space-around;
    height: px2rem(42);
}
.date-weeks span{
    display:inline-block;
    width:px2rem(44);
    height:px2rem(34);
    line-height:px2rem(34);
    text-align:center;
}
.date-days{
    span{
        border-bottom: 1px solid #E9F1F3;
        border-right: 1px solid #E9F1F3;
        display: inline-block;
        width:px2rem(158);
        height:px2rem(120);
        background-color:#fff;
        text-align: right;
        // position: relative;
    }   
    /* margin-top:14px; */
  
    .course-item{
        height: 0.95rem;
        width: 100%;
        // position: absolute;
        position: relative;
        .swiper-container{
            height: 0.24rem;
            line-height: 0.24rem;
            width: 100%;
            position: absolute;
            text-align: center;
            
        }
        i{
            // position: absolute;
            display: inline-block;
            height: 100%;
            width: 100%;
        }
        .moring{
            top: 0;
            left:0;            
            background-color:rgba(56,197,188,0.1);
            border-left:4px solid #60B4E2;
        }
        .afternoon{
            top:0.35rem;
            left:0;
            background-color:rgba(252,179,34,0.1);
            border-left:4px solid #FCB322;
            
        }
        .night{
            bottom:0;
            left:0;
            background-color: rgba(141,165,255,0.1);
            border-left:4px solid #8DA5FF
            
        }
    }
}

.date-days a{
    /* color:#000; */
    display:inline-block;
    width:0.24rem;
    height:0.24rem;
    line-height:0.24rem;
    border-radius:50%;
    text-align:center;
}
.date-days a.active{
    cursor:pointer;
    color:#fff;
    background-color:#0A81E5;
}
.date-days a:hover{
    color:#fff;
    background-color:#0A81E5;
    opacity:0.6;
}

.drop-down-ym{
    position:absolute;
    top:0;
    left:0;
    width:310px;
    height:272px;
    background-color:rgba(255,255,255,0.9);
    display: flex;
    justify-content:space-between;
}
.drop-down-y,.drop-down-m{
    width:155px;
    height:272px;
    overflow:auto;
    padding:5px;
    /* display: flex;
    flex-direction:column; */
}
.drop-down-y::-webkit-scrollbar,.drop-down-m::-webkit-scrollbar{
    display: none;
}
.drop-down-y{
    
}
.drop-down-m{
    
}
.drop-down-y a,.drop-down-m a{
    color:#000;
    text-align:center;
    display: inline-block;
    width:100%;
    height:30px;
    line-height:30px;
    font-size:18px;
    margin:0 0 5px 0;
}
.drop-down-y a:hover,.drop-down-m a:hover{
    color:#fff;
    background-color:rgba(10, 130, 229, 0.774);
    border-radius:5px;
}
.drop-down-y a.active,.drop-down-m a.active{
    color:#fff;
    background-color:#0A81E5;
    border-radius:5px;
}
.time{
    display: flex;
    justify-content: flex-start;
    color: #999;
    font-size: 12px;
    background-color: #fff;
    padding-left: 0.2rem;
    height: 0.3rem;
    line-height: 0.3rem;
    span{
        margin-right: 0.45rem;
    }
    span:nth-child(1)::before{
        content: " ";
        display: inline-block;
        height: 0.1rem;
        width: 0.1rem;
        border-radius: 50%;
        vertical-align:middle;
        background: #38C5BC;
    }
    span:nth-child(2)::before{
        content: " ";
        display: inline-block;
        height: 0.1rem;
        width: 0.1rem;
        border-radius: 50%;
        vertical-align:middle;        
        background: #FCB322;
    }
    span:nth-child(3)::before{
        content: " ";
        display: inline-block;
        height: 0.1rem;
        width: 0.1rem;
        border-radius: 50%;
        vertical-align:middle;        
        background: #60B4E2;
    }
    span:nth-child(4)::before{
        content: " ";
        display: inline-block;
        height: 0.1rem;
        width: 0.1rem;
        border-radius: 50%;
        vertical-align:middle;        
        background: #8DA5FF;
    }
    span:nth-child(5)::before{
        content: " ";
        display: inline-block;
        height: 0.1rem;
        width: 0.1rem;
        border-radius: 50%;
        vertical-align:middle;        
        background: #E06186;
    }
}
</style>