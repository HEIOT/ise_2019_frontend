<template>
    <div class="custom-card">
        <div class="custom-container">
            <div class="custom-add-form">
                <el-input
                    show-word-limit
                    placeholder="Enter a new category"
                    type="text"
                    :maxlength="stringLength"
                    v-model="value"
                ></el-input>
                <el-button
                    :disabled="value === ''"
                    circle
                    icon="el-icon-plus"
                    type="success"
                    @click="createMasterdataCategory"
                />
            </div>
            <el-table class="custom-table" :data="tableData" v-if="tableData.length">
                <el-table-column label="Category">
                    <template slot-scope="scope">
                        <span v-if="scope.row.visible === false">{{ scope.row.category }}</span>
                        <template v-if="scope.row.visible">
                            <el-input
                                v-model="scope.row.newValue"
                                show-word-limit
                                placeholder="Enter a new category"
                                type="text"
                                :maxlength="stringLength"
                            ></el-input>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="Operation">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.visible"
                            type="success"
                            circle
                            icon="el-icon-check"
                            @click="modifyMasterdataCategory(scope.row.newValue, scope.row.category)"
                        />
                        <el-button
                            type="info"
                            circle
                            icon="el-icon-close"
                            @click="scope.row.visible = false"
                            v-if="scope.row.visible"
                        />
                        <el-button
                            circle
                            @click="scope.row.visible = true"
                            icon="el-icon-edit"
                            type="primary"
                            v-if="!scope.row.visible"
                        />
                        <el-button circle type="danger" icon="el-icon-delete" @click="open(scope.row.category)" />
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script lang="ts">
/**
 * This component creates new masterdata and saves it to a db
 */
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component({})
export default class ManageMasterdataCategory extends Vue {
    public readonly stringLength = 30
    private value: string = ''

    get tableData() {
        const categories = this.$store.getters.getMasterDataCategories
        const tableData = categories.map((item: string) => ({ category: item, newValue: '', visible: false }))
        return tableData
    }

    public created() {
        this.$store.dispatch('getMasterdataCategories') // initialize state
    }

    // Create masterdatacategory in db
    public createMasterdataCategory() {
        if (this.value.trim() !== '') {
            this.$store
                .dispatch('createMasterDataCategory', this.value.trim())
                .then(() => {
                    this.$message('Category successfully created')
                    this.resetValue()
                })
                .catch((error: any) => {
                    this.$message({
                        message: error.response.data.message,
                        type: 'error',
                    })
                })
        } else {
            this.resetValue()
            this.$message({
                message: 'The category must not be empty!',
                type: 'warning',
            })
        }
    }

    // delete masterdatacategories from db and locally
    public deleteMasterdataCategory(category: string) {
        this.$store
            .dispatch('deleteMasterdataCategory', category)
            .then(() => {
                this.$message('Category successfully deleted')
            })
            .catch((error: any) => {
                this.$message({
                    message: error.response.data.message,
                    type: 'error',
                })
            })
    }

    public modifyMasterdataCategory(newValue: string, oldValue: string) {
        if (newValue.trim() !== '') {
            this.$store
                .dispatch('modifyMasterDataCategory', {
                    oldMasterDataCategory: oldValue,
                    newMasterDataCategory: newValue,
                })
                .then(() => {
                    this.$message('Category successfully updated')
                })
                .catch((error: any) => {
                    this.$message({
                        message: error.response.data.message,
                        type: 'error',
                    })
                })
        } else {
            this.$message({
                message: 'New category must not be empty!',
                type: 'warning',
            })
        }
    }

    private resetValue() {
        this.value = ''
    }

    // confirmation dialog if masterdata category should be deleted
    private open(category: string) {
        this.$confirm('This will permanently delete the category. Continue?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        })
            .then(() => {
                this.deleteMasterdataCategory(category)
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Delete cancelled',
                })
            })
    }
}
</script>

<style lang="scss" scoped>
.custom-add-form {
    max-width: 510px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .el-input {
        display: block;
        max-width: 450px;
        margin-right: 20px;
    }
}

.custom-table {
    max-width: 550px;
    margin-top: 20px;
}
</style>
