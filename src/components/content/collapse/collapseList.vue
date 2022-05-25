<!--  -->
<template>
  <div id="app">
    <div class="title">
      <h1>学术成果</h1>
      <svg id="topicon" aria-hidden="true">
            <use xlink:href="#icon-jiaoyukeyan-copy"></use>
      </svg>
    </div>
       
    <div class="content">
      <ul>
        <li @click="select(1)"
         :class="currentClass(1)">学术论文统计</li>
        <li @click="select(2)"
         :class="currentClass(2)">咨询报告</li>
        <li @click="select(3)"
         :class="currentClass(3)">学术著作</li>
       
        <li @click="select(4)"
         :class="currentClass(4)">科技奖励</li>
      </ul>
      <!-- <el-collapse v-model="activeName" @change="handleChange" accordion>
          <el-collapse-item title="科研成果" name="1">
              <ul>
                  <li @click="select(1)">授权和专利</li>
                  <li @click="select(2)">报告和出版</li>
                  <li @click="select(3)">专利</li>
                  <li @click="select(4)">软件著作</li>
              </ul>
               
            </el-collapse-item>
            <el-collapse-item title="学术活动" name="2">
                <ul>
                    <li @click="select(5)">学术论文统计</li>
                    <li @click="select(6)">资讯报告</li>
                    <li @click="select(7)">学术著作</li>
                </ul>
            </el-collapse-item>
      </el-collapse> -->
      <div id="tableContent">
            <!-- <AuthorizationPatent v-if="selectedComponment==1"/>
            <ReportAndpublished v-if="selectedComponment==2"/>
            <Patent v-if="selectedComponment==3" />
            <Softworks v-if="selectedComponment==4"/> -->
            <AcademicPaper v-if="selectedComponment==1"/>
            <ConsultingReport v-if="selectedComponment==2"/>
            <AcademicWork v-if="selectedComponment==3"/>
            <TechnologyAward v-if="selectedComponment==4"/>
      </div>
      </div>
  </div>
</template>

<script>
// const AuthorizationPatent=()=>import('./tables/authorization-patent.vue')
// const ReportAndpublished=()=>import('./tables/report-andpublish.vue')
// const Patent=()=>import('./tables/patents.vue')
// const Softworks=()=>import('./tables/softworks.vue')
const AcademicPaper=()=>import('./tables/acadmic-paper.vue')
const ConsultingReport=()=>import('./tables/consulting-report.vue')
const AcademicWork=()=>import('./tables/academic-work.vue')
const TechnologyAward=()=>import('./tables/technology-award.vue')
export default {
  data () {
    return {
      selectedComponment:1,
      activeName:'1'
    };
  },
  components: {
    // AuthorizationPatent,
    // ReportAndpublished,
    // Patent,
    // Softworks,
    AcademicPaper,
    ConsultingReport,
    AcademicWork,
    TechnologyAward
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    select(index){
     this.selectedComponment=index;
    },
    handleChange(){
        console.log(this.activeName)
    },
    currentClass(index) {
      return [this.selectedComponment == index ? 'selectedType' : ''];
    }, 
  }
}

</script>
<style  scoped>
  #app{
     margin-top: 0px;
     width: 100%;
     transition: all .3s;
     height: 750px;
     /* border: 1px solid red; */
  }
  .content{
    width: 90%;
    margin: 0 auto;
     /* border: 1px solid red; */
    margin-top: 30px;
    display: flex;
    justify-content:space-between;
    height: 68vh;
  }

  /deep/ .el-collapse-item__header{
    padding-left: 40%;
    display: flex;
    height: 48px;
    line-height: 48px;
    color: white;
    background: #4485be;
    cursor: pointer;
    border-bottom: 1px solid #EBEEF5;
    font-size: 18px;
    transition: border-bottom-color .3s;
    outline: none;
    text-align: center !important;
  }
  /deep/ .el-icon-arrow-right{
      /* margin-left: 50px; */
      display: inline-block !important;
  }
  ul{
      width: 32% !important;
        text-align: center;
           border: none;
     margin: 0;
      padding: 0;
  }
  ul li{
      /* // #88bcee */
      list-style: none;
      color: white;
      border: 1px solid  white;
      background:  #4d8fcd;
      font-size:15px ;
      padding: 10px 0;
  }
  ul li:hover{
    cursor: pointer;
  }
  /deep/ .el-collapse-item__content{
      padding-bottom: 0;
  }
  #tableContent{
    /* margin: 0 120px; */
    /* float: inherit; */
    width: 65%;
    /* border: 1px solid red; */
  }
  svg#topicon{
        width:35px;
        height:35px; /* 控制图标的大小 */
        /* color: #0062CC; 控制图标的颜色 */
        margin:  0;
    }

  .title{
    /* font-family: 'Microsoft YaHei'; */
    width: 100%;
    text-align: center;
  }
  .selectedType{
    background:#4485be;
  }
</style>