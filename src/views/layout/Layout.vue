<template>
  <div class="app-wrapper">
    <header class="header-container">
      <div class="inner header-logo">
        <!-- <img  @click="isHome=true" src="@/assets/logo_01.png" alt="" /> -->

        <span>国防科技大学信息通信学院科研工作年鉴</span>
      </div>
    </header>
    <div v-if="isHome">
        <div class="loop">
           <el-carousel :interval="4000"  indicator-position="none">
              <el-carousel-item 
               
                 v-for="item in 4" :key="item">
                 <img style="width:100%;height:100%;" src="@/assets/bg.jpg"/>
              </el-carousel-item>
            </el-carousel>
        </div>
        <tabMain></tabMain>
     </div>

    <div class="inner">
     
      <!-- <sidebar class="sidebar-container"></sidebar> -->
      <div class="main-container">
        <!-- <app-main></app-main> -->
      </div>
    </div>
    <footer class="footer-container">
      <div class="inner">
        <span>
          Copyright © Science and Technology Daily, All Rights Reserved
          中国科技网 版权所有
        </span>
      </div>
    </footer>
  </div>
</template>

<script>

import tabMain from '@/components/content/tabMain'

export default {
  name: "layout",
  data(){
    return{
      isHome:true
    }
  },
  components: {

    tabMain,
  },
  computed: {},
  beforeRouteLeave(to, from, next) {
    if (to.name == "Chart") {
      localStorage.setItem("redirect", window.location.href);
    }
    next();
  },
  methods: {
    exChangeView() {
      console.log(this.$route);
      // if (this.$route.name === "ViewPage") {
      //   this.$router.push({
      //     name: "list",
      //     params: { id: this.$route.params.id, name: this.$route.params.name },
      //   });
      // } else {
      //   this.$router.push({
      //     name: "ViewPage",
      //     params: { id: this.$route.params.id, name: this.$route.params.name },
      //   });
      // }
      this.$router.push({
        name: "Chart",
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-wrapper {
  width: 100%;
  position: relative;
  min-height: 100%;
  height: 100%;
  min-width: 1200px;
}
.loop {
  width: 100%;
  height: calc(100vh - 310px);
  margin: 0 auto;
  position: relative;
  // border:1px solid red;
  // background:url('../../assets/bg.jpg') no-repeat;
  // background-size: 100% calc(100vh - 270px);
}
::v-deep .el-carousel__container{
  height:calc(100vh - 310px) !important;
  // height:600px !important;
}
::v-deep .el-icon-arrow-left{
  display:none;
}
::v-deep .el-icon-arrow-right{
  display:none;
}
.inner {
  width: 1320px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
#menu{
  font-size:35px;
  color:white;
  display:flex;
  // justify-content:space-around;
}
#menu a{
  margin-right:50px;
}
#menu a:hover{
  cursor:pointer;
}
.sidebar-container {
  width: 300px;
  margin-bottom: 110px;
  background: #f2f7fc;
  padding: 10px;
}
.main-container {
  width: 1000px;
  margin-bottom: 110px;
}
.header-logo {
  line-height:80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-logo img{
   vertical-align:none;
}
.header-container {
  position: relative;
  width: 100%;
  background: #094c8b;
  height: 60px;
}
.header-container img {
  // width: 320px;
  // height: 70px;
  // line-height:70px;
  margin-top:5px;
  height:70px;
  // border:1px solid red;
}
.header-container img:hover{
 cursor:pointer;
}
.header-container span {
  position:absolute;
  left: 100px;
  top: 0;
  color: white;
  height: 60px;
  line-height: 60px;
}

.footer-container {
  width: 100%;
  background: #094c8b;
  height: 50px;
  // position: absolute;
  // bottom: 0;
  // left: 0;
  // z-index: 999;
}
.footer-container .inner {
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.footer-container .inner  span {
  display: inline-block;
  font-size: 15px;
  line-height: 50px;
  height: 50px;
  color: white;
  text-align: center;
}
span{
  font-size:30px;
  color:white;
}
::v-deep .el-carousel__arrow--left{
  display:none !important;
}



</style>