<template>
  <div class="approve">
    <!-- 科研项目立项汇总页面 -->
      <el-card class="data">
    <div class="tools">
      <div>
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
      <!-- <div class="tools-btn">
        <el-input
          class="search-name"
          v-model="queryList.searchStr"
          placeholder="请根据名称查询"
        ></el-input>
        <el-button type="success" plain @click="searchList">查询</el-button>
         <el-button type="success" plain @click="addDialogVisible = true"
          >添 加</el-button
        > -->
        <!-- <el-button type="danger" plain>删 除</el-button> 
      </div> -->
    </div>
    <!-- 页面加载的表格 -->
  
      <el-table :data="tableData" stripe max-height="310" show-summary style="width: 100%"
      :row-style="{height: 66+'px'}"
        :cell-style="{padding:0+'px'}">
         <el-table-column type="index" label="序号"  align="center" />
        <el-table-column label="单位" align="center" prop="attrOrginName"> </el-table-column>
        <el-table-column label="咨询报告" align="center" prop="advisory_report">
        </el-table-column>
        <el-table-column label="出版专著" align="center" prop="publishing_monographs">
        </el-table-column>
      </el-table>
      <el-pagination
        
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="queryList.rows"
        :page-sizes="[10, 20,30]"
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
  name: "reportAndpublished",
  data() {
    return {
      tableData: [],
      total: 0,
      queryId: null,
      queryList: {
        page: 1,
        rows: 10,
        yearId: "",
        searchStr: "",
      },
      yearOptions: [], // 年份下拉列表值
      attrOrginOptions: [], // 单位下拉列表值
      projectTypeList: [], // 年份下拉列表值
      projectLevel: [], // 年份下拉列表值
      value: "",
      addDialogVisible: false,
      editDialogVisible: false,
    
    
    };
  },
  mounted() {
    this.getResearList();
    this.getYearsListData();
  },
  methods: {
    // 获取咨询报告列表
    getResearList() {
      this.$axios.post("/api/yb1_Research_Output/GetStatistics_reports_and_monographssList",this.queryList).then((res) => {
         this.tableData = res.data.data.list;
         this.total = res.data.data.count;
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
    // border: 1px solid #dcdfe6;
  }
}
.projectName {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}
.el-pagination {
  text-align: center;
  margin: 20px 0 0 0;
}

.addForm {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .el-input {
    width: 240px;
  }
}
.search-name {
  width: 220px;
  margin-right: 10px;
}
</style>