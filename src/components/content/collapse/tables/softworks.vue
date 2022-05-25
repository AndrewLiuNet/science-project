<template>
  <div class="approve">
    <!-- 科研项目立项汇总页面 -->
       <el-card class="data">
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
 
      <el-table :data="tableData" stripe max-height="310" style="width: 100%"
       :row-style="{height: 66+'px'}"
        :cell-style="{padding:0+'px'}">
         <el-table-column type="index" label="序号"  align="center" />
        <el-table-column label="著作名称" align="center" prop="title_of_monograph">
        </el-table-column>
        <el-table-column label="第一作者" align="center" prop="first_author">
        </el-table-column>
        <el-table-column label="所属单位" align="center" prop="submitted_AttrOrginName">
        </el-table-column>
        <el-table-column label="出版单位" align="center" prop="publisher_AttrOrginId">
        </el-table-column>
        <el-table-column label="出版时间" align="center" prop="publication_time">
        </el-table-column>
     
      </el-table>
      <el-pagination
        layout="total, sizes, prev, pager, next,jumper"
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
  name: "softwareWorks",
  data() {
    return {
       isSuccess:false,
      fileList:[],
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
      linTypeList: [], //专利类型下拉列表值
      projectLevel: [], // 年份下拉列表值
      value: "",
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        submitted_AttrOrginId: null, //所属单位
        publisher_AttrOrginId: null, //出版单位
        title_of_monograph: null, // 著作名称
        first_author: null, //第一作者
        yearId: null, // 年份
        publication_time: null, // 出版时间
      },


   
    };
  },
  mounted() {
    this.getYearsListData();
    this.getResearList();
  },
  methods: {
    // 获取咨询报告列表
    getResearList() {
     this.$axios.post('/api/yb1_Software_Copyright/GetList',this.queryList).then((res) => {
        this.tableData = res.data.data.list;
        //判断数据类型

     
        console.log( typeof( this.tableData[0].publication_time ))
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
  width: 221.4px;
}
</style>