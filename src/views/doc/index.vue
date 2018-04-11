<template>
  <div class="app-container">
    <fieldset>
      <el-form :inline="true" :model="tQueryData" class="demo-form-inline">
        <el-form-item>
         温馨提示：文学资源由系统自动更新发布，无须人工管理。
        </el-form-item>
      </el-form>
    </fieldset>
    <el-table :data="tableData.content" v-loading="tableLoading" border style="width: 100%" size="mini">
      <el-table-column prop="title" label="标题" align="center">
      </el-table-column>
      <el-table-column prop="preface" label="前言" align="center">
      </el-table-column>
      <el-table-column prop="length" label="字数" align="center">
      </el-table-column>
      <el-table-column prop="tags" label="标签" align="center">
      </el-table-column>
      <el-table-column prop="pubtime" label="发布时间" align="center">
      </el-table-column>
      <el-table-column prop="pv" label="虚拟阅读量" align="center">
      </el-table-column>
      <el-table-column prop="pv2" label="实际阅读量" align="center">
      </el-table-column>
      <el-table-column prop="type" label="类型" align="center">
      </el-table-column>
    </el-table>
    <div class="p">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="prev, pager, next"
        :total="tableData.totalElements">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import {
    query
  } from '@/api/pic'
  export default {
    methods: {
      onQuerySubmit(first) {
        if (first) {
          this.tQueryData.page = 1
        }
        this.tableLoading = true
        query(this.tQueryData).then(response => {
          this.tableData = response.data
          this.tableLoading = false
        }).catch(() => {
          this.tableLoading = false
        })
      },
      handleSizeChange(val) {
        this.tQueryData.size = val
        this.onQuerySubmit(true)
      },
      handleCurrentChange(val) {
        this.tQueryData.page = val
        this.onQuerySubmit()
      },
      fetchData() {
        this.onQuerySubmit()
      }
    },
    created() {
      // this.fetchData()
    },
    data() {
      return {
        tQueryData: {},
        tableLoading: false,
        formLabelWidth: '120px',
        tableData: []
      }
    }
  }

</script>
<style scoped>
  .p {
    padding: 10px;
  }

  fieldset {
    border: 1px solid #ebeef5;
    margin-bottom: 10px;
    display: block;
    font-size: 12px;
    padding: 0.1em 1.1em 0.525em;
  }

  .query-sort {
    width: 60px;
  }

  .query-stauts {
    width: 90px;
  }

  .query-input {
    max-width: 120px;
  }

  .demo-form-inline .el-form-item {
    margin-bottom: 0px;
  }

  .el-button--mini,
  .el-button--mini.is-round {
    padding: 5px 10px;
  }

</style>
