<template>
  <div class="approve">
     <el-card class="data">
    <!-- 科研项目立项汇总页面 -->
    <div class="tools">
      <div>
        <span>请选择年份进行筛选：</span>
        <el-select
          class="inner-input"
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
   
      <el-table 
   
        :data="tableData"  
        max-height="450" 
        stripe 
        style="width: 100%"
        :row-style="{height: 40+'px'}"
        :cell-style="{padding:0+'px'}">
        <el-table-column type="index" label="序号" align="center"/>
        <el-table-column prop="title_of_monograph" label="专著名称"  min-width="22%" align="center"/>
        <el-table-column prop="first_author" label="第一作者" min-width="12%" align="center"/>
        <el-table-column prop="attrOrginName" label="单位" min-width="12%" align="center"/>
        <el-table-column prop="press" label="出版社" min-width="10%" align="center"/>
        <el-table-column prop="publication_time" label="出版时间" min-width="20%" align="center"/>
        <el-table-column prop="book_number" label="书号" min-width="10%" align="center"/>
        <el-table-column prop="remarks" label="备注" min-width="8%" align="center"/>
        <el-table-column prop="yearName" label="年份" min-width="8%" align="center"/>
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
  name: "AcademicWork",
  data() {
    return {
      //  loading :false,
      isSuccess:false,
      fileList:[],
      uploadFormProduct:'',
    
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
      tableData: [],
      addDialogVisible: false,
      editDialogVisible: false,

    };
  },
  mounted() {
    this.getResearList();
    this.getYearsListData();
  },
  methods: {
    // 获取学术著作列表
    getResearList() {
     this.$axios.post("/api/yb1_Academic_work/GetList",this.queryList).then((res) => {
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
.upload-demo{
  margin-left:10px;
  // border:1px solid red;
}
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


.search-name {
  width: 221.4px;
  margin-right: 10px;
}
.inner-input {
}
</style>