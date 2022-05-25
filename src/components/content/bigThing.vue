<!--  -->
<template>
  <div>
      <div class="container">
        <div>
            <h1>大事记</h1>
            <br>
            <svg id="topicon" aria-hidden="true">
                 <use xlink:href="#icon-fenlei-copy"></use>
            </svg>
            <!-- <i id="topicon" class="iconfont icon-fenlei"></i> -->
        </div>
        <div class="centerBox" >
            <div class="leftbox">
                <el-carousel class="carousel" :interval="5000" arrow="always" >
                <el-carousel-item v-for="item in loopImgList" :key="item.loopImgId">
                    <img :src="item.loopImgPath" alt="a" class="image" />
                </el-carousel-item>
                </el-carousel>  
            </div>  
            <div class="rightbox">    
                <ul>   
                <li  class="menuItem" v-for="(item,index) in menuList" :key="item.id">
                   <span @click="clickTitle(index)">{{item.memTitle}}</span>
                   <div class="lite">&nbsp;<i class="el-icon-date"></i>&nbsp;<a>{{item.memTime}}</a></div>
                </li>
                 <el-dialog 
                    style="max-height:600px;"
                     center 
                     title="详情" 
                     :visible.sync="dialogHtmlVisible">
                        <div class="dialog" v-html="menuList[selectIndex].memContent"></div>
                   </el-dialog> 
                </ul>
                    <el-pagination
                        style="width:80%;"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="5"
                        layout="total, prev, pager, next"
                        :total="totalCount">
                    </el-pagination>
            </div>    
        </div>

      </div>  
  </div>
</template>

<script>
export default {
  name:'bigThing',
  data () {
    return {
        dialogHtmlVisible:false,
        menuList:[],
        pageSize:5,
        currentPage:1,
        totalCount:0,
        selectIndex:0,
        loopImgList: [
        {
          loopImgId: 2,
          loopImgTitle: "科研成果",
          loopImgPath: require("@/assets/new1.png"),
        },
        {
          loopImgId: 3,
          loopImgTitle: "学术活动",
          loopImgPath: require("@/assets/new2.jpg"),
        },
        {
          loopImgId: 4,
          loopImgTitle: "大事记",
          loopImgPath: require("@/assets/new3.jpg"),
        },
      ],
    };
  },
  components: {
  },
  computed: {
  },
  mounted() {
      this.initData();
  },
  methods: {
      handleSizeChange(val) {
        this.pageSize=val;
        this.initData();
      },
      handleCurrentChange(val) {
        this.currentPage=val;
         this.initData();
      },
      clickTitle(index){
            this.dialogHtmlVisible=true;
            this.selectIndex=index;
            console.log(this.selectIndex)
      },
      initData(){
        let params={
                page: this.currentPage,
                rows: this.pageSize,
                yearId: "",
                searchStr: "",
                attrOrginId: ""
        }
        this.$axios.post('/api/common/GetMems',params).then(res=>{
            this.totalCount=res.data.data.count;
            this.menuList=res.data.data.menList;
            console.log(res);
            console.log(this.totalCount)
        })
      },
  }
}

</script>
<style  scoped>
  .image {
      /* border: 1px solid red; */
      width:100%;
      height:70%;
  }
 .carousel{
    width: 100%;
    height: 350px;
    overflow-y:hidden;
    /* border: 1px solid green; */
 }
.centerBox{
    display: flex;
    width:100%;
    margin-top:70px;
    /* border: 1px solid blue; */
}
.centerBox .leftbox{
    width:47%;

}
.centerBox .rightbox{
   /* border: 1px solid red; */
    width:38%;
    overflow:hidden;/*对超出容器的部分强制截取，高度不确定则换行*/
    text-overflow:ellipsis;/*显示省略符号来代表被修剪的文本。*/
    white-space:nowrap;/*禁止换行*/  
}

.centerBox .rightbox ul{
    /* border:1px solid red; */
      margin-left:0px;
}
.centerBox .rightbox .menuItem{
    /* border:1px solid red; */
    position:relative;
    width:80%;
    height:60px;
    font-weight:600;
    font-size:20px;
    padding-left:60px;
    margin-bottom:5px;
    line-height:50px;
    text-align:left;
    overflow:hidden;/*对超出容器的部分强制截取，高度不确定则换行*/
    text-overflow:ellipsis;/*显示省略符号来代表被修剪的文本。*/
    white-space:nowrap;/*禁止换行*/
}
.centerBox .rightbox .menuItem:hover{
    cursor:pointer;
}


.centerBox .rightbox .menuItem .dialog{
    width:600px;
    height:auto;
    white-space:wrap;
}

.centerBox .rightbox .menuItem .lite{
    font-size:13px;
    color:grey;
    font-weight:500;
    position:absolute;
    left:60px;
    bottom:-18px;
}
.container{
    width:90%;
    margin:0 auto;
    text-align:center;

    padding-top:100px;
}
.container h1{
    font-size:37px;
}
/deep/ .el-carousel__arrow{
    display:none !important;
}
*{
    margin:0;
    padding:0;
    list-style:none;
}

svg#topicon{
        width:35px;
        height:35px; /* 控制图标的大小 */
        /* color: #0062CC; 控制图标的颜色 */
        margin:  0;
    }
</style>