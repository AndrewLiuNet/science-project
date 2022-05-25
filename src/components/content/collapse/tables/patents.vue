<template>
  <div class="approve">
    <!-- 科研项目立项汇总页面 -->
        <el-card class="data" >
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

        <!-- <el-button type="danger" plain>删 除</el-button> -->
      </div>
       
       
      
    </div>
    

  
    <!-- 页面加载的表格 -->

      <el-table :data="tableData" stripe max-height="310" style="width: 100%;"
       :row-style="{height: 66+'px'}"
        :cell-style="{padding:0+'px'}">
         <el-table-column type="index" label="序号"  align="center" />
        <el-table-column label="专利名称" align="center" prop="patent_name"> </el-table-column>
        <el-table-column label="专利类型" align="center" prop="patentTypeName">
        </el-table-column>
        <el-table-column label="发明单位" align="center" prop="attrOrginName">
        </el-table-column>
        <el-table-column label="发明人" align="center" prop="inventor"> </el-table-column>
        <el-table-column label="专利号" align="center" prop="patent_number"> </el-table-column>
     
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
  name: "reportAndpublished",
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
        attrOrginId: null, //发明单位
        patent_name: null, // 专利名称
        patenttype: null, //专利类型
        inventor: null, //发明人
        patent_number: null, //专利号
        isApplication: null, //授权or申请
        yearId: null, // 年份
        // publication_time: null, // 日期
      },
      isApplicationOption: [
        {
          value: "0",
          label: "申请",
        },
        {
          value: "1",
          label: "授权",
        },
      ],
      eidtForm: {},
      // 时间控件的值
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      // 表单校验规则
      rules: {
        inventor: [
          { required: true, message: "请输入发明人", trigger: "blur" },
        ],
        patent_number: [
          { required: true, message: "请输入专利号", trigger: "blur" },
        ],
        patent_name: [
          { required: true, message: "请输入专利名称", trigger: "blur" },
        ],
        attrOrginId: [
          { required: true, message: "请选择发明单位", trigger: "change" },
        ],
        patentTypeId: [
          { required: true, message: "请选择专利类型", trigger: "change" },
        ],
        isApplication: [
          { required: true, message: "请选择状态", trigger: "change" },
        ],
        yearId: [{ required: true, message: "请选择年份", trigger: "change" }],
        createTime: [
          { required: true, message: "请选择项目创建时间", trigger: "change" },
        ],
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
    this.$axios.post('/api/yb1_patent/GetList',this.queryList).then((res) => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.count;
        console.log(this.tableData);
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
//   width: 240px;
}
</style>
