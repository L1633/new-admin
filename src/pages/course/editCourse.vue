<template>
    <div class="edit-detail">

        <div class="detail-title">
            <span>我的课程</span>
            <span>课程详情</span>
            <span>编辑课程纪要</span>
        </div> 

        <swiper :options="swiperOption" ref="mySwiper" >
            <swiper-slide v-for="o in 4">
                <div class="slider-item">111111</div>
            </swiper-slide>
        </swiper>

        <div class="detail-form">
            
        </div>
    </div>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    export default {
        name:'editCourse',
        data() {
            return {
                swiperOption:{
                    // debugger: true,            
                    autoplay: true,  
                    // direction:'vertical',
                    grabCursor:true,
                    // loop:true    
                    // slidesPerView: "auto",
                },
            }
        },
        components: {
            swiper,
            swiperSlide,
        },
    }
</script>

<style scoped lang="scss">
    .edit-detail{
        font-size: 16px;
        .detail-title{
            margin-bottom: 0.3rem;
        }
        .swiper-container{
            width: 100%;
            height: 1.6rem;
            background-color: #fff;
            .slider-item{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>