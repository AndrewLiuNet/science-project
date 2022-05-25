<template>
  <div class="approve">
    <!-- 科研项目立项汇总页面 -->
      <el-card>
    <div class="tools" >
      <div >
        <span>请选择年份进行筛选：</span>
        <el-select
          v-model="value"
          placeholder="请选择年份"
          @change="searchYear"
        >
          <el-option
            v-for="item in yearOptions"
            :key="item.yearId"
            :label="item.yearName"
            :value="item.yearId"
          />
        </el-select>
      </div>
      <div class="tools-btn">
        <el-input
          class="search-name"
          v-model="queryList.searchStr"
          placeholder="请根据名称查询"
        ></el-input>
        <el-button type="success" plain @click="searchList">查询</el-button>
    
      </div>
 



    </div>
    <!-- 页面加载的表格 -->
      <el-table  :data="tableData" max-height="450" stripe style="width: 100%"
        :row-style="{height: 40+'px'}"
        :cell-style="{padding:0+'px'}">
        <el-table-column type="index" label="序号"  align="center" min-width="20%" />
        <el-table-column prop="project_name" label="获奖项目名称" align="center" min-width="20%" />
        <el-table-column prop="attrOrginName" label="完成单位" align="center" min-width="20%"/>
        <el-table-column prop="completed_by" label="完成人" align="center" min-width="20%"/>
        <el-table-column prop="award_level" label="奖种及等级" align="center" min-width="20%"/>
     
      </el-table>
      <el-pagination
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="queryList.rows"
        :page-sizes="[10,20,30]"
        :current-page.sync="queryList.page"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
export default {
  name: "TechnologyAward",
  data() {
    return {
      total: 0,
      queryId: null,
      queryList: {
        page: 1,
        rows: 10,
        yearId: "",
      },
      yearOptions: [], // 年份下拉列表值
      attrOrginOptions: [], // 单位下拉列表值
      projectTypeList: [], // 年份下拉列表值
      value: "",
      tableData: [],
      eidtForm: {},
    };
  },
  mounted() {
    this.getResearList();
    this.getYearsListData();
  },
  methods: {

    // 获取科技奖励列表
    getResearList() {
     this.$axios.post('/api/yb1_Science_and_Technology_Award/GetList',this.queryList).then((res) => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.count;
        console.log(res);
      });
    },
    // 获取年份加载下拉框
    getYearsListData() {
      this.$axios.post('/api/common/GetYears').then((res) => {
        this.yearOptions = res.data.data;
      });
    },
    // 根据年份筛选数据
    searchYear(e) {
      // console.log(e);
      this.queryList.yearId = e;
      this.getResearList();
    },

    // 分页器方法
    handleSizeChange(val) {
      this.queryList.page = 1;
      this.queryList.rows = val;
      this.getResearList();
    },
    handleCurrentChange(val) {
      this.queryList.page = val;
      this.getResearList();
    },
    //条件查询
    searchList() {
      this.getResearList();
    },
  },
};
</script>
<style scoped lang='scss'>
.approve {
  width: 100;
  .tools {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
     display: flex;
  }
}

.el-pagination {
  text-align: center;
  margin: 20px 0 0 0;
}

.addForm {
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: space-around;
  .el-input {
    width: 240px;
  }
}
.search-name {
  width: 220px;
  margin-right: 10px;
}
</style>
