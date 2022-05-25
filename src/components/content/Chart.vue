<template>
  <div>
    <div class="dataVecharts" ref="viewBox"></div>
    <p style="font-size: 30px; text-align: center">科研项目统计</p>
    <p style="font-size: 20px; text-align: center">{{ secTitle }}</p>
    <div style="width: 80%;margin:0 auto;">
    <br/>
      <span>年份: &nbsp;</span>
      <el-select @change="changeYear" v-model="selectedYear" placeholder="请选择年份">
        <el-option
        v-for="(item,index) in years"
        :key="index"
        :label="item.text"
        :value="item.value"></el-option>
      </el-select>
      &nbsp;
      <span>统计方式: &nbsp;</span>
      <el-select @change="changeSel" v-model="selectedValue" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <br />

    <div v-if="selectedValue=='2'" class="thirdChart" ref="thirdChart"></div>
    <div v-else class="zhuCharts" ref="zhuCharts">   </div> 
      <div class="title">
              <h1>学术成果</h1>
              <svg id="topicon" aria-hidden="true">
                    <use xlink:href="#icon-jiaoyukeyan-copy"></use>
              </svg>
            </div>
            <AcademicResult/>
       <!-- <div  class="barChart" ref="barChart"></div> -->  

    <el-drawer
      title="项目详情"
      :visible.sync="drawer"
      direction="ltr"
      size="25%"
    >
      <el-table :data="filterData">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="项目类别 :">
                <span>{{ props.row.projectTypeName }}</span>
              </el-form-item>

              <el-form-item label="合作单位 :">
                <span>{{ props.row.cooperation_AttrOrgin }}</span>
              </el-form-item>

              <el-form-item label="总经费 :">
                <span>{{ props.row.total_funds }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="yearName"
          label="日期"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="project_name"
          label="项目名称"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="person_in_charge"
          label="负责人"
        ></el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
import * as echarts from "echarts";
import AcademicResult from './academicResult.vue'
export default {
  name: "Chart",
  components:{
    AcademicResult
  },
  data() {
    return {
      drawer: false,
      commonData: [],
      unitData: [],
      typeData: [],
      nodeData: [],
      linksData: [],
      itemStyleArr: [
        "#f18bbf",
        "#009c7a",
        "#986F0B",
        "#3C8EA4",
        "#4F82BE",
        "#D38017",
        "#A8CDD7",
        "#7A072D",
        "#859599",
        "#0078D7",
        "#84AA33",
        "#ff8b67",
        "#1B587C",
        "#A19574",
        "#918485",
        "#FFA98C",
        "#B0E3C0",
        "#4BADC7",
        "#3891A7",
        "#0037DA",
        "#C0BEAF",
        "#EA005E",
        "#D13438",
        "#567C73",
        "#9ed566",
        "#2BCC7F",
        "#809B48",
        "#9B2D1F",
        "#604878",
        "#A5644E",
        "#2D3F3A",
        "#761721",
        "#B1BADD",
        "#8164A3",
        "#B0CCB0",
        "#8164A3",
        "#C1504D",
        "#CCAF0A",
        "#956251",
        "#C17529",
        "#CEC597",
        "#9F2936",
        "#ac7430",
        "#00BCF2",
        "#CD7B38",
        "#424242",
        "#f63185",
        "#9CBC59",
        "#4F4BD9",
        "#3EC562",
        "#F06F2E",
        "#C3986D",
        "#BA144C",
        "#BA144C",
      ],
      selectUnitId: 0,
      selectedTypeId: 0,
      myChart: "",
      zhuCharts: "",
      filterData: [],
      secTitle: "基于 类型 - 单位 统计经费",
      selectedValue:'0',
      options: [
        {
          label: "类型 - 单位 统计经费",
          value: "0",
        },
        {
          label: "类型 - 单位 统计数量",
          value: "1",
        },
        {
          label: "单位 - 类型 统计经费",
          value: "2",
        },
        {
          label: "单位 - 类型 统计数量",
          value: "3",
        },
      ],
      unitNameArr:[],
      typeNameArr:[],
      thirdChart:'',
      years:[],
      selectedYear:''
    };
  },
  mounted() {
    this.myChart=echarts.init(this.$refs.viewBox)
    this.zhuCharts = echarts.init(this.$refs.zhuCharts);
    this.initUnitData();
      this.initTypeData();
    this.initYear();
    setTimeout(() => {
      
      this.initBarData();
        
    }, 200);

    this.myChart.on("click", (params) => {
      this.selectUnitId = params.data.unitId;
      this.selectedTypeId = params.data.typeId;
      this.filterDataByIds();
    });
  },
  methods: {
    changeSel(){   
      let obj=this.options.find(e=>{
        return  e.value==this.selectedValue
      })
     if(obj){
         this.secTitle=`基于 ${obj.label}`
     }
      if(this.selectedValue==='2'||this.selectedValue==='3'){
              this.initSecBar();
      }else{
        this.initBarData();
      }
    },
    changeYear(){
        if(this.selectedValue==='2'||this.selectedValue==='3'){
              this.initSecBar();
        }else{
          this.initBarData();
        }
    },
    filterDataByIds() {
      let params = {
        page: 1,
        rows: 100,
        yearId: "",
        searchStr: "",
        attrOrginId: this.selectUnitId,
        projectTypeId: this.selectedTypeId,
      };
      this.$axios
        .post("/api/yb1_research_project/GetList", params)
        .then((res) => {
          let result = res.data.data;
          console.log(result);
          if (result.list.length > 0) {
            this.drawer = true;
            this.filterData = result.list;
          } else {
            // this.$message({
            //   type: "warning",
            //   message: "暂无数据",
            // });
          }
        });
    },
    //柱状图
    initBarData() {
      this.$axios.post(`/api/yb1_research_funds/GetBar?yearId=${this.selectedYear}`).then((res) => {
        let barArr = res.data.data;
        let typeData = [];
        //所有类型数据
        barArr.forEach((item) => {
          typeData.push(item.projectTypeName);
        });

        let xAxis = []; //X轴数据
        xAxis.push({
          type: "category",
          axisTick: {
            show: false,
          },
          data: typeData,
          axisLabel: {
            formatter: (val) => {
              let txt = val;
              if (val.length > 6) {
                txt = val.substr(0, 7) + "...";
              }
              return txt;
            },
          },
        });
        let yAxis = [{ type: "value" }];

        // 根据不同单位分组
        let unitNum = barArr[0].funds_ForAttrs.length;
        let groupyData1 = [];
        for(let index=0;index<unitNum;index++){
          groupyData1.push([]);
          for (let i = 0; i < barArr.length; i++) {
            if(this.selectedValue==='0'){
                  groupyData1[index].push(barArr[i].funds_ForAttrs[index].fund);
            }else if(this.selectedValue==='1'){
                  groupyData1[index].push(barArr[i].funds_ForAttrs[index].number);
            }
          }
        }
        console.log('groupyData1')
        console.log(groupyData1)

        let SeriesData = [];
        for (let p = 0; p < this.unitData.length; p++) {
          SeriesData.push({
            name: this.unitData[p].name,
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: groupyData1[p],
          });
        }
        console.log('serdata')
        console.log(SeriesData)
        this.zhuCharts.setOption({
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          legend: {
            data: this.unitNameArr
          },
          toolbox: {
            show: true,
            orient: "vertical",
            left: "right",
            top: "center",
            feature: {
              magicType: { show: true, type: ["line", "bar", "stack"] },
              restore: { show: true },
            },
          },
          grid: {
            top: 60,
          },
          xAxis: xAxis,
          yAxis: yAxis,
          series: SeriesData,
        },true);
        
      });
    },
    initSecBar(){
          let params={
              "page": 1,
              "rows": 100,
              "yearId": this.selectedYear,
              "searchStr": "",
              "attrOrginId": ""
            }
        this.$axios.post('/api/yb1_research_funds/GetList',params).then(res=>{
        let barArr = res.data.data.list;
        let unitData = [];
        barArr.forEach((item) => {
          //单位数据
          unitData.push(item.attrOrginName);
        });

        let xAxis = []; //X轴数据
        xAxis.push({
          type: "category",
          axisTick: {
            show: false,
          },
          data: unitData,
          axisLabel: {
            formatter: (val) => {
              let txt = val;
              if (val.length > 6) {
                txt = val.substr(0, 7) + "...";
              }
              return txt;
            },
          },
        });
        let yAxis = [{ type: "value" }];

        // 根据不同单位分组
        let typeNum = barArr[0].fundsList.length;

        let groupyData = [];
        let index = 0;

        for(let index=0;index<typeNum;index++){
          groupyData.push([]);
          for (let i = 0; i < barArr.length; i++) {
            if(this.selectedValue==='2'){
                groupyData[index].push(barArr[i].fundsList[index].fund);
            }else if(this.selectedValue==='3'){
                groupyData[index].push(barArr[i].fundsList[index].number);
            }
          }
        }

      // const labelOption = {
      //   show: true,
      //   position: 'insideBottom',
      //   distance: 15,
      //   align: 'left',
      //   verticalAlign: 'middle',
      //   rotate: 90,
      //   formatter: '{c}  {name|{a}}',
      //   fontSize: 1,
      //   rich: {
      //     name: {}
      //   }
      // };
        let SData = [];
        for (let p = 0; p < this.typeData.length; p++) {
          SData.push({
            name: this.typeData[p].name,
            type: "bar",
            emphasis: {
              focus: "series",
            },
            // label:labelOption,
            data: groupyData[p],
          });
        }
        console.log('serdata')
        console.log(SData)
        this.zhuCharts.setOption({
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          legend: {
            data: this.typeNameArr
          },
          toolbox: {
            show: true,
            orient: "vertical",
            left: "right",
            top: "center",
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar", "stack"] },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          grid: {
            top: 60,
          },
          xAxis: xAxis,
          yAxis: yAxis,
          series: SData,
        },true);

        groupyData=[];
      })
    },

    //桑吉图
    initSourceData() {
     if(this.unitData.length>0&&this.typeData.length>0){
      this.nodeData = [...this.unitData, ...this.typeData];
      this.$axios.post("/api/yb1_research_funds/GetSankeyList2").then((res) => {
        let arr = res.data.data;
        let newArr=[];
        arr.forEach((item) => {
          newArr.push({
            source:item.source,
            target:item.target,
            typeId:item.typeId,
            unitId:item.unitId,
            value:item.lineThickess,
          });
        })
        let option={
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove",
          },
          animation: true,
          series: [
            {
              draggable:false,
              type: "sankey",
              bottom: '0%',
              left:'0%',
              right:'0%',
              top:'5%',
              emphasis: {
                focus: "adjacency",
                label: { show: true },
              },
              data: this.nodeData,
              links: newArr,
              orient: "vertical",
              label: {
                position: "top",
              },
              lineStyle: {
                color: "source",
                curveness: 0.5,
              },
            },
          ]};
          option && this.myChart.setOption(option);
      });
      }
    },
    initUnitData() {
      let params = {
        page: 1,
        rows: 100,
        yearId: "",
        searchStr: "",
        attrOrginId: "",
      };
      this.$axios.post("/api/yb1_AttrOrgin/GetList", params).then((res) => {
        let unitArr = res.data.data.list;
        for (let i = 0; i < unitArr.length; i++) {
          let j = i;
          if (j == this.itemStyleArr.length - 1) {
            j = 0;
          }
          this.unitNameArr.push(unitArr[i].attrOrginName)
          this.unitData.push({
            name: unitArr[i].attrOrginName,
            itemStyle: {
              color: this.itemStyleArr[j],
              borderColor: this.itemStyleArr[j],
            },
            unitId: unitArr[i].id,
          });
           this.initSourceData();
        }
      });
        
    },
    initTypeData() {
      this.$axios.post("/api/yb_ProjectType/GetProjectTypeList").then((res) => {
        let typeArr = res.data.data;
        for (let i = 0; i < typeArr.length; i++) {
          let j = i;
          if (j == this.itemStyleArr.length - 1) {
            j = 0;
          }
          this.typeNameArr.push(typeArr[i].typeName)
          this.typeData.push({
            name: typeArr[i].typeName,
            itemStyle: {
              color: this.itemStyleArr[j],
              borderColor: this.itemStyleArr[j],
            },
            typeId: typeArr[i].projectTypeId,
          });
          this.initSourceData();
        }
      });   
    },


    initYear(){
          this.$axios.post('/api/common/GetYears').then(res=>{
            res.data.data.forEach(item => {
                this.years.push({text:item.yearName,value:item.yearId})
                 this.selectedYear=this.years[0].value;
                 this.changeYear();
            });
        })
       
      },
  },
};
</script>
<style scoped>
.dataVecharts {
  margin: 0 auto;
  padding: 0;
  width: 80%;
  height: 600px;
}
.el-form {
  padding-left: 50px;
  /* height:10px;
  line-height:10px; */
}
.el-form-item {
  margin: 0;
  vertical-align: center;
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.zhuCharts {
  width: 100%;
  height: 600px;
  /* border:1px solid red; */
}
.zhuCharts p {
  text-align: center;
  font-size: 38px;
  /* font-weight:500; */
}

.thirdChart{
  width: 100%;
  height: 600px;
  /* border: 1px solid blue; */
  margin: 0 auto;
}
  svg#topicon{
        width:35px;
        height:35px; /* 控制图标的大小 */
        color: #4485be; 
        margin-top: 15px;
    }

  .title{
    /* font-family: 'Microsoft YaHei'; */
    width: 100%;
    text-align: center;
    color: rgb(61, 60, 60);
    margin-top: 20px;
  }
  .title h1{
    /* font-family: 'Microsoft YaHei'; */

  }



</style>
