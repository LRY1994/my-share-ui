<template>
  <el-form-item v-if="display"
  :ref="formItemRef"
  :label="label"
  :prop="prop"
  :rules="rules">
    <div class="plain" v-if="disabled">{{model || ''}}</div>
    <el-input  v-else
      v-model="model"
      @change="handleChange"
      :placeholder="placeholder"
      @blur="handleBlur"></el-input>

    <div v-show="!disabled">
      <slot></slot>
    </div>

  </el-form-item>
</template>

<script>
import mixin from '../editor.mixin';

export default {
  mixins: [mixin],
  name: 'alogic-input',
};
</script>

<style lang="scss" scoped>
.plain {
  padding: 0 10px;
  border: 1px solid #eee;
  min-height: 42px;
}
</style>
