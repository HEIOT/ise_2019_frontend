<template>
    <div class="custom-card">
        <div class="custom-container">
            <div class="custom-add-form">
                <el-input
                    show-word-limit
                    placeholder="Enter a new tag"
                    type="text"
                    :maxlength="stringLength"
                    v-model="tag"
                ></el-input>
                <el-button :disabled="tag === ''" circle icon="el-icon-plus" type="success" @click="createTag" />
            </div>
            <el-table class="custom-table" :data="tableData" v-if="tableData.length">
                <el-table-column label="Tag">
                    <template slot-scope="scope">
                        <span v-if="scope.row.visible === false">{{ scope.row.tag }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Operation">
                    <template slot-scope="scope">
                        <el-button circle icon="el-icon-delete" type="danger" @click="open(scope.row.tag)" />
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script lang="ts">
/**
 * This component creates and deletes tags
 */
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component({})
export default class ManageTags extends Vue {
    public readonly stringLength = 30
    private tag: string = ''

    get tableData() {
        const tags = this.$store.getters.getTags
        const tableData = tags.map((item: string) => ({ tag: item, newValue: '', visible: false }))
        return tableData
    }

    /**
     * createTag function calls store to transmit new created tag to backend
     */
    public createTag() {
        this.$store
            .dispatch('createTag', this.tag.trim())
            .then(() => {
                this.tag = ''
                this.$message('Tag sucessfully created')
            })
            .catch((error: any) => {
                this.$message({
                    message: error.response.data.message,
                    type: 'error',
                })
            })
    }

    public deleteTags(tag: string) {
        this.$store
            .dispatch('deleteTag', tag)
            .then(() => {
                this.$message('Tag successfully deleted')
            })
            .catch((error: any) => {
                this.$message({
                    message: error.response.data.message,
                    type: 'error',
                })
            })
    }

    public created() {
        this.$store.dispatch('getTags') // initialize state
    }

    // confirmation if tag should be deleted
    private open(tag: string) {
        this.$confirm('This will permanently delete the tag. Continue?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        })
            .then(() => {
                this.deleteTags(tag)
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
