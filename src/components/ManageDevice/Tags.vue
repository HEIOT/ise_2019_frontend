<template>
    <el-select :value="value" @input="change" multiple filterable placeholder="Select" no-data-text="No tags">
        <el-option v-for="item in tagOptions" :key="item" :label="item" :value="item"></el-option>
    </el-select>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator'

@Component({})
export default class ManageDeviceTags extends Vue {
    @Model('change', { type: Array }) public value: string[] | undefined
    @Prop() private readonly tagOptions: string[] | undefined

    @Emit()
    public change(value: string[]) {
        return
    }
}
</script>

<style lang="scss" scoped>
.el-select {
    width: 100%;
}
</style>
