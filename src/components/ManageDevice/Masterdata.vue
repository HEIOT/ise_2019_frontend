<template>
    <div class="manage-device-masterdata">
        <div class="masterdata-list">
            <div class="masterdata-entry" v-for="(masterDataEntry, index) in masterdata" :key="index">
                <div class="category">{{ masterDataEntry.category_id }}</div>
                <div class="value">{{ masterDataEntry.value }}</div>
                <div class="delete button" @click="deleteMasterdataEntry(masterDataEntry.category_id)">
                    <i class="el-icon-remove-outline"></i>
                </div>
            </div>
        </div>
        <div class="input-container">
            <!--categoryInput shows drop down element to select from already existing masterdata categories.-->
            <div class="categoryInput">
                <el-select
                    v-model="category"
                    filterable
                    placeholder="Select category"
                    no-match-text="This category does not exist yet"
                    no-data-text="No categories"
                >
                    <el-option v-for="item of unusedCategories" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </div>
            <!-- ValueInput shows input field for user to enter specific value of selected category-->
            <div class="valueInput">
                <el-input
                    placeholder="Enter value"
                    v-model="value"
                    clearable
                    type="text"
                    :maxlength="stringLength"
                    show-word-limit
                    @keyup.enter.native="addMasterdataEntry"
                ></el-input>
            </div>
            <el-button circle type="success" icon="el-icon-plus" @click="addMasterdataEntry" />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator'
import { IMasterdata } from '@/typings/typings'

@Component({})
export default class ManageMasterdata extends Vue {
    get unusedCategories() {
        if (!this.categories) return []
        const excludedCategories = this.$store.getters.getExcludedCategories
        return this.categories.filter(category => !excludedCategories.includes(category))
    }
    @Model('change', { type: Array, default: () => [] }) public masterdata: IMasterdata[] | undefined
    // stringLength is set to 30 characters due to database limitations
    public readonly stringLength = 30

    @Prop() private readonly categories: any[] | undefined

    private category: string = ''
    private value: string = ''

    @Emit()
    public change(masterdata: IMasterdata[]) {
        return
    }

    public getConfirmation() {
        if (this.value && this.category) return true
        else return false
    }

    public addMasterdataEntry() {
        if (!this.category || !this.value || !this.masterdata) {
            return
        }

        this.change([
            ...this.masterdata,
            {
                value: this.value,
                category_id: this.category,
            },
        ])
        const excludedCategories = this.$store.getters.getExcludedCategories
        excludedCategories.push(this.category)
        this.$store.commit('setExcludedCategories', excludedCategories)

        this.category = ''
        this.value = ''
    }

    public reset() {
        this.category = ''
        this.value = ''
        this.$store.commit('setExcludedCategories', [])
    }

    public deleteMasterdataEntry(categoryId: string) {
        if (this.masterdata !== undefined) {
            const excludedCategories = this.$store.getters.getExcludedCategories
            const filteredCategories = excludedCategories.filter((el: string) => {
                return el !== categoryId
            })
            this.$store.commit('setExcludedCategories', filteredCategories)
            this.change(this.masterdata.filter(el => el.category_id !== categoryId))
        } else {
            return
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/style/colours.scss';

.manage-device-masterdata {
    .input-container,
    .masterdata-entry {
        margin: 10px 0;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .categoryInput,
        .category {
            flex: 3;
        }

        .valueInput,
        .value {
            flex: 6;

            margin: 0 10px;
        }

        .button {
            flex: 1;

            cursor: pointer;

            i {
                font-size: 28px;
            }

            &.add {
                i {
                    color: $--color-success;
                }
            }

            &.delete {
                i {
                    color: $--color-info;
                }
            }
        }
    }
}
</style>
