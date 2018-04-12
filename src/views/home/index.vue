<template>
  <div class="app-container">
    <fieldset>
      <el-form :inline="true" :model="tQueryData" class="demo-form-inline">
        <el-form-item>
          <!-- <el-button size="mini" type="primary" icon="el-icon-refresh" @click="onQuerySubmit(true)">刷新</el-button>-->
          <el-button size="mini" type="primary" icon="el-icon-refresh" @click="onQuerySubmit(true)">刷新</el-button> 通知：叭叭叭 ~ ~ ~。
        </el-form-item>
      </el-form>
    </fieldset>
    <el-table :data="tableData.length===0?[]:tableData.data.content" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div v-html="props.row.content"></div>
        </template>
      </el-table-column>
      <el-table-column label="标题" prop="title">
      </el-table-column>
      <el-table-column label="创建时间" prop="createtime">
      </el-table-column>
    </el-table>
    <div class="p">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="prev, pager, next"
        :total="parseInt(tableData.length===0?0:tableData.data.totalElements)" :page-size="20">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import {
    query
  } from '@/api/home'
  export default {
    methods: {
      onQuerySubmit(first) {
        if (first) {
          this.tQueryData.page = 1
        }
        this.tableLoading = true
        query(this.tQueryData).then(r => {
          if (r.data === null) {
            this.tableData = []
          } else {
            this.tableData = r
          }
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
        this.onQuerySubmit(true)
      }
    },
    created() {
      this.fetchData()
    },
    data() {
      return {
        types: ['免费', 'VIP'],
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
