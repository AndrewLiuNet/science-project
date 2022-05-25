<!-- tabMain -->
<template>
   <div>
         <div class="header">
            <div class="box">
              <button :class="{'actived': isFirst}" @click="clickOne">数据库版</button>
              &nbsp;
              <button :class="{'actived': isSec}"  @click="clickTwo">可视化版</button>
          </div>
            <el-divider></el-divider>
              <div class="title">
              <h1>科研项目</h1>
              <svg id="topicon" aria-hidden="true">
                    <use xlink:href="#icon-keyanxiangmu-copy"></use>
              </svg>
            </div>
            </div>
            <div v-if="isFirst" class="container">
            <div class="container2">
                <div class="leftSide">
                  <div class="unit">
                      <br/> 
                      <ul id="btnStyle">
                        <!-- isUnit? -->
                          <li class="mainBtn" @click="change(true)" :class="btnActive==true&&btnActive!==''?'btnactive':''">{{"单位"}}</li>
                          <li class="mainBtn" @click="change(false)" :class="btnActive==false&&btnActive!==''?'btnactive':''">{{"类型"}}</li>
                      </ul>
                      <ul  v-if="isUnit" class="unitUl">
                          <li ref="unitLi"  
                            v-for="(item,index) in unit" 
                              :key="index"
                              :class="currentClass(index)"
                              @click="currentInfo(index)"
                            >
                            {{item.attrOrginName}}

                            </li>

                          
                      </ul>
                      
                        <ul  v-if="!isUnit" class="unitUl">
                          
                          <li  ref="unitLi" 
                            v-for="(item,index) in typeData" 
                            :key="index"
                              :class="currentClass(index)"
                              @click="currentInfo(index)"
                            >
                            <a >{{item.typeName}}</a>
                            
                          </li>
                        </ul>
                  </div>

                  <div class="types">
                      <span style="">国防科技大学</span>
                      <span><a>{{!isUnit?"单位":"类型"}}</a> <a>总经费(W)</a></span>

                      <ul class="TypeUl" v-show="isUnit">

                        <li  v-for="(item,index) in typeAndfunds" :key="index"
                          :class="currentTypeClass(index)"
                          @click="currentTypeInfo(index)">
                          <a >{{item.projectTypeName}}</a>
                          <span class="totalnum"><a :class="currentTypeClass(index)">
                          {{item.fund}} </a></span>
                        </li>



                    </ul>
                      <ul class="TypeUl" v-show="!isUnit" >
                        
                        <li  v-for="(item,index) in  unitAndfunds" :key="index"
                          :class="currentTypeClass(index)"
                          @click="currentTypeInfo(index)">
                          <a >{{item.attrOrginName}}</a>
                          <span class="totalnum"><a :class="currentTypeClass(index)">
                          {{item.fund}} </a></span>
                        </li>
                      </ul>


                  </div>

                </div>

                <div class="rightSide">
            
                      <el-table
                        stripe
                        max-height="600"
                        ref="filterTable"
                        :data="filterData"
                        :border="true"
                        style="width: 100%;">
                        <el-table-column
                        align="center"
                          prop="yearName"
                          label="日期"
                          sortable
                          width="100"
                          column-key="yearId"
                          :filters="years"
                          :filter-method="filterHandler"
                        >
                          <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.yearName }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="project_name"
                          label="项目名称"
                          width="110"
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="projectTypeName"
                          label="项目类别"
                          width="150"
                          align="center"
                        >
                        </el-table-column>


                        <el-table-column
                          prop="person_in_charge"
                          label="负责人"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                              <el-tag type="light">{{ scope.row.person_in_charge }}</el-tag>
                            </div>
                        </template>

                        </el-table-column>

                        <el-table-column
                          prop="cooperation_AttrOrgin"
                          label="合作单位"
                          align="center"
                        >
                        <template slot-scope="scope">
                            {{scope.row.cooperation_AttrOrgin?scope.row.cooperation_AttrOrgin:'暂无'}}
                            
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="attrOrginName"
                          label="单位"
                          align="center"
                          >
                          
                        </el-table-column>
                        
                        <el-table-column
                          prop="total_funds"
                          label="经费(w)"
                          align="center"
                          >
                        </el-table-column>


                      <el-table-column
                          align="center"
                          prop="isFinish"
                          label="是否完成"
                          width="100"
                          :filters="[{ text: '是', value: 1 }, { text: '否', value: 0 }]"
                          :filter-method="filterTag"
                          filter-placement="bottom-end">
                          <template slot-scope="scope">
                            <el-tag
                              :type="scope.row.isFinish == 0 ? 'danger' : 'success'"
                              disable-transitions>{{scope.row.isFinish?'是':'否'}}</el-tag>
                          </template>
                        </el-table-column>
                      </el-table>
      
                        <el-pagination
                        style="text-align:center;
                                padding-top:20px"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="dataLenght">
                      </el-pagination>


              
      
               </div>

            </div>

          </div>

              <CollapseList v-if="!isSec"/>
              <BigThing v-if="!isSec"/> 
              <Chart v-if="isSec"/>
  </div>
</template>

<script>

import  Chart from '@/components/content/Chart'
import BigThing from '@/components/content/bigThing'
import CollapseList from '@/components/content/collapse/collapseList'
export default {
  data () {
    return {
      // filterUnitIdAndTypeIdData
        btnactive:'btnactive',
        isShow:true,
        isUnit:true,
        isFirst:true,
        isSec:false,
        isSelected:false,
        SelectedUnitId:'',
        SelectedTypeId:'',
        unit:[],
        typeData:[],
        currentNumber: 0,  // 用来判断active样式类是否显示
        currentTypeNumber: '',
        filterData:[],
        dataLenght:0,
        pageSize:10,
        currentPage:1,
        years:[],
        typeAndfunds:[],
        unitAndfunds:[],
        isClickUnit:false,
        isClickType:false,
        btnActive:'',
    };
  },
   methods: {
     change(flag){
       if(flag){
         this.isUnit=true;
         this.btnActive=true;
       }else{
         this.isUnit=false;
         this.btnActive=false;
       }
        // this.isUnit=!this.isUnit;

        this.filterUnitIdAndTypeIdData();
     },
     initYear(){
          this.$axios.post('/api/common/GetYears').then(res=>{
            res.data.data.forEach(item => {
                this.years.push({text:item.yearName,value:item.yearName})
            });
         })
      },
      filterTag(value, row) {
        return row.isFinish === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handleSizeChange(val) {
        this.pageSize=val;
        this.filterUnitIdAndTypeIdData();
      },
      handleCurrentChange(val) {
        this.currentPage=val;
        this.filterUnitIdAndTypeIdData();
      },
      clickOne(){
        this.isFirst=true;
        this.isSec=false;
       
      },
      clickTwo(){
        this.isFirst=false;
        this.isSec=true;
        
      },
        initUnitData(){
        let params={
            "page": 1,
            "rows": 100,
            "yearId": "",
            "searchStr": "",
            "attrOrginId": "",
          }
          this.$axios.post('/api/yb1_AttrOrgin/GetList',params).then(res=>{
           
              this.unit=res.data.data.list;
                  this.SelectedUnitId=this.unit[0].id;
                  this.initTyAndFundsData();
                  this.filterUnitIdAndTypeIdData();
          }).catch(error=>{

          })

      },
       initTypeData(){
          this.$axios.post('/api/yb_ProjectType/GetProjectTypeList').then(res=>{
                if(res){
                    this.typeData=res.data.data
                    this.SelectedTypeId= this.typeData[0].projectTypeId
                    this.initUnitAndFunds();
                    this.filterUnitIdAndTypeIdData();
                }
             
          })
      },
      // 类型与经费
       initTyAndFundsData(){
            let params={
              "page": 1,
              "rows": 100,
              "yearId": "",
              "searchStr": "",
              "attrOrginId": this.SelectedUnitId,
            }
              this.$axios.post('/api/yb1_research_funds/GetList',params).then(res=>{
              this.typeAndfunds=res.data.data.list[0].fundsList;
            }).catch(error=>{
            })

      },
      // 单位与经费
       initUnitAndFunds(){
          console.log("测试TypeAndFunds"+this.SelectedTypeId)
          console.log()
            let params={
              "projectTypeId":this.SelectedTypeId,
            }
            this.$axios.post('/api/yb1_research_funds/GetFundsForProjectType',params).then(res=>{
                  this.unitAndfunds=res.data.data;
          })
      },  
      currentInfo(index) {
          this.isClickUnit=true;
          this.currentNumber = index;
          if(this.isUnit){
             this.SelectedUnitId=this.unit[index].id;
             this.initTyAndFundsData();
          }
          else{
             this.SelectedTypeId=this.typeData[index].projectTypeId
             this.initUnitAndFunds();
          }
          this.filterUnitIdAndTypeIdData();
      },
      currentTypeInfo(index) {
          this.isClickType=true;
          this.currentTypeNumber = index;
          if(!this.isUnit){
            this.SelectedUnitId=this.unit[index].id;
          }else{
              this.SelectedTypeId=this.typeData[index].projectTypeId 
          }
          this.filterUnitIdAndTypeIdData();
      },
      currentClass(index) {
        return [this.currentNumber == index ? 'selectedunit' : ''];
      },
      currentTypeClass(index) {
        return [this.currentTypeNumber == index ? 'selectedType' : ''];
      }, 
      filterUnitIdAndTypeIdData(){    
         if(this.SelectedUnitId&&this.SelectedTypeId){
              let params={
                "page": this.currentPage,
                "rows": this.pageSize,
                "yearId": "",
                "searchStr": "",
                "attrOrginId": this.SelectedUnitId,
                "projectTypeId": this.SelectedTypeId
              }
                this.$axios.post('/api/yb1_research_project/GetList',params).then(res=>{
                        this.filterData=res.data.data.list;
                        this.dataLenght=res.data.data.count;
                      }).catch(error=>{
                })
        }else{
          // this.$message({
          //   message:'网络出小差了，请刷新页面',
          //   type:'warning'
          // })
        }

      },
    
   },
  components: {
    Chart,BigThing,CollapseList
  },
  computed: {
  },
  created() {
    
  },
  beforeMount() {

  },
  mounted() {
      this.initUnitData();
      this.initTypeData();
      this.filterUnitIdAndTypeIdData();
      this.initYear();
  }
}

</script>
<style  scoped>
*{
  margin:0;
  padding:0;
  list-style:none;
}

.container2{
  display: flex;
  width:90%;
  margin:20px auto;
  justify-content:space-between;
  /* border: 1px solid red; */
  height: 670px;
}
.container .leftSide{
  width:32%;
  height:600px;
  background:#4d8fcd;
 
}
.container .leftSide .unit{
 width:35%;
 height:100%;
 background:#4485be;
  float:left;
 /* display:flex; */
}
.container .leftSide .unit .unitUl{
  width:90%;
  margin:12px auto;
  max-height:500px;
  /* border: 1px solid red; */
  overflow: auto;
    /* overflow: scroll !important; */
}
.container .leftSide .unit .unitUl::-webkit-scrollbar{
  display: block;
  width: 12px;
  height: 12px;

}

.container .leftSide .unit .unitUl::-webkit-scrollbar-track{
 -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
 border-radius: 10px;
 background-color: #4d8fcd;
}
.container .leftSide .unit .unitUl::-webkit-scrollbar-thumb{
 -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
 border-radius: 10px;
 background-color: #479be6;
}



.container .leftSide .unit .unitUl li{
  border-radius:5px;
  width:100%;
  color:white;
  height:35px;
  line-height:35px;
  text-align:center;
  padding:0px;
  overflow:hidden;/*对超出容器的部分强制截取，高度不确定则换行*/
  text-overflow:ellipsis;/*显示省略符号来代表被修剪的文本。*/
  white-space:nowrap;/*禁止换行*/
  /* border:1px solid red; */
  margin-top:3px;
}

.container .leftSide .unit .unitUl li:hover{
  cursor:pointer;
  background:#4c99dc;

}
.selectedunit{
   cursor:pointer;
   background:#4c99dc;
}
.selectedType {
  background:white;
  color:grey;
}

.container .leftSide .types{
  width:65%;
  float:left;
   /* display:flex; */
  /* border:1px solid red; */
}
.container .leftSide .types span{
  display:block;
  /* height:125px; */
  width:100%;
  color:white;
  font-size:25px;
  /* border:1px solid red; */
  text-align:center;
    /* padding:5px 15px; */
  margin-left:10px;
}
.container .leftSide .types span:nth-child(1){
  /* border:1px solid red; */
  margin-top:20px;
  font-size:35px; 
  /* //STKaiti */
  font-family:'STXingkai';
  color:white;
}

.container .leftSide .types span:nth-child(2){
  font-size:18px; 
  padding-left:4px;
  /* //STKaiti */
 display: flex;

  /* flex: 1; */
  justify-content:space-between;
  margin-top:10px;
  /* border:1px solid red; */
  width:94%;
}


.container .leftSide .types .TypeUl{
  margin-top:5px;
  color:white;
  /* border:1px solid red; */
  width:100%;
  max-height:500px; 
  /* border: 1px solid red; */
  overflow-y: auto; 
  overflow-x: hidden;
}

.container .leftSide .types .TypeUl::-webkit-scrollbar{
  display: block;
  width: 12px;
  height: 12px;
}



.container .leftSide .types .TypeUl::-webkit-scrollbar-track{
 -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
 border-radius: 10px;
 background-color: #4d8fcd;
}


.container .leftSide .types .TypeUl::-webkit-scrollbar-thumb{
 -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
 border-radius: 10px;
 background-color: #66b1f3;
}


.container .leftSide .types .TypeUl li{
  cursor:pointer;
  position:relative;
  padding:2px 15px;
  width:100%;
  height:33px;
  line-height:33px;
  display:flex;
  justify-content:space-between;
}
.container .leftSide .types .TypeUl li:hover{
  background:white;
  color:grey;
 
}
.container .leftSide .types .TypeUl li:hover span a{
  background:white;
  color:grey;
}
.container .leftSide .types .TypeUl li span.totalnum{
  /* border:1px solid red; */
  width:50px;
  height:30px;
  display:block;
  position:absolute;
  right:30px;
  top:-10px;
  font-size:16px;
}
.container .rightSide{
  width:65%;
  /* border:1px solid red; */
}
li.mainBtn {
    color:white;
    background:#4c99dc;
    border:none;
    margin:0 5px;
    padding:10px 10px;
    font-size:17px;
    letter-spacing:5px;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    border-radius: 6px;
}
li.mainBtn:hover{
  background:#4c99dc ;
 
}
.btnactive{
  background:#0f60a7 !important;
}
.actived{
  background:#094c8b;
  color:white;
}
button{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
}
.header{
  width:100%;
  border:1px solid white;
  text-align:center;
  height:180px;

}
.box{
  display:flex;
  justify-content:center;
  align-items:center;
  width:260px;
  margin:10px auto;
}
.el-divider{
  background: #e0d8d8 !important;
}
.el-divider--horizontal{
  height: 0.5px !important;
  margin: 14px 0;
}
#btnStyle{
  display: flex;
  justify-content:space-around;
}

  svg#topicon{
        width:35px;
        height:35px; /* 控制图标的大小 */
        color: #4485be; 
        margin-top:  15px;
    }

  .title{
    /* font-family: 'Microsoft YaHei'; */
    width: 100%;
    text-align: center;
    margin-top: 20px;
    color: rgb(61, 60, 60);
  }

.clear{
 clear: both;
}


</style>