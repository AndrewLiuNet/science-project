<template>
  <div>
    <el-carousel  :interval="5000" arrow="always" height="340px">
      <el-carousel-item v-for="item in loopImgList" :key="item.loopImgId">
        <img :src="item.loopImgPath" alt="a" class="image" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      loopImgList: [
        {
          loopImgId: 0,
          loopImgTitle: "科研工作",
          loopImgPath: require("@/assets/loop7.jpg"),
        },
        {
          loopImgId: 1,
          loopImgTitle: "科研项目",
          loopImgPath: require("@/assets/loop8.jpg"),
        },
        {
          loopImgId: 2,
          loopImgTitle: "科研成果",
          loopImgPath: require("@/assets/loop3.jpg"),
        },
        {
          loopImgId: 3,
          loopImgTitle: "学术活动",
          loopImgPath: require("@/assets/loop4.jpg"),
        },
        {
          loopImgId: 4,
          loopImgTitle: "大事记",
          loopImgPath: require("@/assets/loop5.jpg"),
        },
      ],
    };
  },
};
</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 600px;
  margin: 0;
  height: 500px;
}
.image {
  width: 100%;
}
/* .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
</style>
<style>
el-carousel el-carousel--horizontal{
  height: 400px !important;
}
</style>