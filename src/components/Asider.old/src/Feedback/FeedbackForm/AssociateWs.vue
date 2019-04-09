/**
* @author: linruiyu;
* @date: 2019-3-14;
* @description: 关联工单下拉选择
*/
<template>
    <el-form-item
    :label="item.name"
    :prop="item.property"
    ref="form-item-ref">
        <el-select v-model="model" placeholder="请选择关联工单"
        no-data-text="您未提交过工单"
        style="width:100%">
            <el-option
                v-for="item in optionList"
                :key="item.problemNo"
                :label="item.problemTitle"
                :value="item.problemNo">
                <div class="problem-title">{{ item.problemTitle }}</div>
                <span class="small-text">产品类型：{{ item.productType }}</span>
                <span class="small-text">问题类型：{{ item.problemType }}</span>
                <span class="small-text">创建时间：{{ item.createDate|formatDate }}</span>
            </el-option>
        </el-select>
    </el-form-item>
</template>

<script>

export default {
  props: {
    worksheetId: {
      type: String,
    },
    item: {
      type: Object,
    },
  },
  data() {
    return {
      optionList: [],
      model: '',
      http$:this.$root.http$,
    };
  },
  created() {
    this.getOptionList();
  },
  watch: {
    model(val) {
      this.handleBlur(val);
    },
  },
  methods: {
    getOptionList() {
      this.http$.worksheet.ctyunListYun().then((res) => {
        this.optionList = res.result;
      });
    },
    // 保存
    handleBlur(value) {
      if (this.model) {
        const params = {
          worksheetId: this.worksheetId,
          param: `${this.item.worksheetInfoId},${value}`,
        };

        this.http$.worksheet.userExtendUpdate(params).then(() => {
          if (this.$refs['form-item-ref']) {
            this.$refs['form-item-ref'].clearValidate();
          }
        });
      }
    },

    getValue() {
      if (this.item.value) {
        this.model = this.item.value;
      }
      this.$emit('input', this.model);
    },
    getDisabled() {
      return false;
    },
    getDisplay() {
      return true;
    },
    handleChange(value) {
      this.$emit('input', value);
      // 手动触发blur
      this.handleBlur(value);
    },

  },
  filters: {
    formatDate(timestamp) {
      function prefix(val) {
        return val - 0 > 10 ? val : `0${val}`;
      }
      const date = new Date(timestamp - 0);
      const Y = `${date.getFullYear()}-`;
      const M = `${prefix(date.getMonth() + 1)}-`;
      const D = `${date.getDate()} `;
      const h = `${prefix(date.getMonth() + 1)}:`;
      const m = `${prefix(date.getMinutes() + 1)}:`;
      const s = `${prefix(date.getMonth() + 1)}`;
      return Y + M + D + h + m + s;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-select-dropdown__item{
    height: auto;
    border-bottom: 1px dashed #e9e9e9;
}
.small-text{
    font-size:10px;
    padding:0 15px;
    border-left:1px solid #e9e9e9;
    color:#909399;
    &:first-of-type{
        border: none;
        padding-left:0;
    }
}
.problem-title{
    max-width: 500px;
    overflow: hidden;
    word-wrap: break-word;
    white-space: normal;
    font-size:0.9em;
}
</style>
