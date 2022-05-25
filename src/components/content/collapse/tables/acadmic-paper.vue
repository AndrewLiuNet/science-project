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
      <el-table :data="tableData" max-height="450" stripe style="width: 100%"
       :row-style="{height: 40+'px'}"
        :cell-style="{padding:0+'px'}"> 
        <el-table-column type="index" label="序号"  align="center" />
        <el-table-column prop="thesis_name" label="论文名称" min-width="15%" align="center"/>
        <el-table-column prop="author" label="作者" min-width="15%"  align="center"/>
        <el-table-column prop="attrOrginName" label="单位" min-width="15%"  align="center"/>
        <el-table-column prop="publication" label="发表刊物" min-width="15%"  align="center"/>
        <el-table-column prop="publication_time" label="发表时间" min-width="19%"   align="center"/>
        <el-table-column prop="collection" label="收录情况" min-width="12%"  align="center"/>
        <el-table-column prop="code" label="论文编号" min-width="12%"  align="center"/>
       
      </el-table>
      <el-pagination
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="queryList.rows"
        :page-sizes="[10, 20, 30]"
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
  name: "AcademicPaper",
  data() {
    return {
      total: 0,
      queryId: null,
      pageSize:'',
      currentPage:'',
      queryList: {
        page: 1,
        rows: 10,
        yearId: "",
        recognized_kernel_journals: "",
      },
      yearOptions: [], // 年份下拉列表值
      attrOrginOptions: [], // 单位下拉列表值
      projectTypeList: [], // 年份下拉列表值
      projectLevel: [], // 年份下拉列表值
      value: "",
      tableData: [],
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        attrOrginId: null, // 单位列表
        thesis_name: null, //论文名称
        author: null, //作者
        publication: null, //发表刊物
        collection: null, //收录情况
        yearId: null, // 年份
        publication_time: null, // 日期
      },
    
    
    };
  },
  mounted() {
    this.getResearList();
    this.getYearsListData();
  },
  methods: {
    
    // 获取项目结项列表
    getResearList() {
     this.$axios.post("/api/yb1_Academic_paper/GetList",this.queryList).then((res) => {
        this.tableData = res.data.data.list;
        this.tableData.forEach(e=>{
            e.publication_time=this.$moment(e.publication_time).format("YYYY-MM-DD HH:mm:ss")
        })
        this.total = res.data.data.count;
      });
    },
    // 获取年份加载下拉框
    getYearsListData() {
      this.$axios.post('/api/common/GetYears').then((res) => {
        console.log("yearData");
         console.log(res.data);
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
      this.queryList.rows=val;
      this.getResearList();
    },
    handleCurrentChange(val) {
      this.queryList.page=val;
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
    // border: 1px solid #dcdfe6;
    display: flex;
  }
}
.el-pagination {
  text-align: center;
  margin: 20px 0 0 0;
}

.search-name {
  width: 221.4px;
  margin-right: 10px;
}
.inner-input {
//   width: 221.4px;
}

</style>