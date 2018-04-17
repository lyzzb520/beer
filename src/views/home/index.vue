<template>
  <div class="app-container">
    <!-- <fieldset>
      <el-form :inline="true" :model="tQueryData" class="demo-form-inline">
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-refresh" @click="onQuerySubmit(true)">刷新</el-button> 通知：叭叭叭 ~ ~ ~。
        </el-form-item>
      </el-form>
    </fieldset> -->
    <!-- <el-table :data="tableData.length===0?[]:tableData.data.content" style="width: 100%">
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
    </div> -->
    <!-- <el-collapse v-for="item,index in tableData.data.content" :key="index" accordion>
      <el-collapse-item name="index">
        <template slot="title">
          <div :style="{'color': item.pr===0?'red':'black'}">{{index+1}} .
            <span v-show="item.pr===0" style="font-weight:700;color:#ff8f00;font-size:15px;"> [ 置顶 ] </span>{{item.title}}
            <span style="position:absolute;color:gray;right:70px;">{{item.createtime}}/{{tg(item.createtime)}}</span>
          </div>

        </template>
        <div v-html="item.content"></div>
      </el-collapse-item>

    </el-collapse> -->
    
    <div class="acontent" v-for="item, index in tableData.data.content" :key="index">
      <a class="atitle" :href="item.content!==''?'':item.url" target="_blank"><span v-if="item.pr===0" style="color:red">[置顶]</span>{{item.title}}</a>
      <div style="color:gray;margin-top:5px;font-size: 10px;margin-bottom:5px;">
        <span>{{item.createtime}}</span> /
        <span>{{tg(item.createtime)}}</span>
      </div>
      <truncate :show="shows[index]" :index="index" @hahaha="operate" clamp="阅读全部" :class="item.content===''?'':'contentStyle'" action-class="readmorebtn" :length="200" less="收起" type="html" :text="item.content"></truncate>
      <div v-if="item.content !==null && item.content !==''" v-show="shows[index]===false" class="mask"></div>
    </div>
  </div>
</template>

<script>
  import {
    query
  } from '@/api/home'
  import timeago from 'timeago.js'
  import truncate from '@/components/truncate'
  export default {
    components: {
      truncate
    },
    methods: {
      operate(d, i) {
        this.$set(this.shows, i, d)
      },
      tg(time) {
        if (time) {
          return timeago(null, 'zh_CN').format(time)
        }
      },
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
            const c = r.data.totalElements
            for (let i = 0; i < c; i++) {
              this.shows.push(false)
            }
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
        shows: [],
        types: ['免费', 'VIP'],
        tQueryData: {},
        tableLoading: false,
        formLabelWidth: '120px',
        tableData: {
          data: {
            content: ''
          }
        }
      }
    }
  }

</script>
<style>
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

  .customClass {
    color: blue;
  }

  .atitle {
    cursor: pointer;
    font-size: 18px;
    font-weight: 600;
    padding-top: 15px;
    display: block;
  }

  .readmorebtn {
    display: table;
    padding: 5px 10px;
    border: solid 1px gray;
    border-radius: 5px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #de686d;
    color: #de686d;
    cursor: pointer;
    position: absolute;
    margin-left: 38%;
    z-index: 12;
  }

  .readmorebtn:hover {
    color: white;
    background: #de686d;
    
  }

  .mask {
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 120px;
    background: -webkit-gradient(linear, 0 top, 0 bottom, from(rgba(255, 255, 255, 0)), to(#fff));
    margin-top: -150px;
  }

  .contentStyle {
    min-height: 100px;
    
  }
  .acontent{
    border-bottom: solid 1px gainsboro
  }
</style>
