<!--  -->
<template>
  <div>
      <div class="dataVecharts" ref="viewBox">

      </div>
  </div>
</template>

<script >
import * as echarts from "echarts";
export default {
    name: '',
    data(){
        return{
                nodeData:[],
                unitData:[],
                typeData:[],
                myChart:'',
                unitNameArr:[],
                typeNameArr:[],
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
        }
    },
    methods:{
        //桑吉图
        initSourceData() {
            console.log(this.typeData)
        if(this.unitData.length>0&&this.typeData.length>0){
        this.nodeData = [...this.unitData, ...this.typeData];
          console.log(this.nodeData)
        this.$axios.post("/api/yb1_research_funds/GetSankeyList_For6").then((res) => {
            let arr = res.data.data;
            let newArr=[];
            arr.forEach((item) => {
            newArr.push({
                source:item.source,
                target:item.target,
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
            let type=['专利','软件著作','科技奖励','学术论文','咨询报告','学术著作'];
            for(var i=0;i<type.length;i++){
                  let j = i;
                if (j == this.itemStyleArr.length - 1) {
                    j = 0;
                }
                     this.typeData.push({
                        name: type[i],
                        itemStyle: {
                            color: this.itemStyleArr[j],
                            borderColor: this.itemStyleArr[j],
                          },
                 })
            }

            this.initSourceData();
        },
    },
    mounted() {
        this.myChart=echarts.init(this.$refs.viewBox)
        this.initUnitData();
        this.initTypeData();
    },
    }
</script>
<style scoped>
.dataVecharts {
  margin: 0 auto;
  padding: 0;
  width: 80%;
  height: 600px;
}
</style>