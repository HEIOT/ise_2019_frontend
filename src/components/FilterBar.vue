<template>
    <div class="filter-bar">
        <Multiselect
            v-model="taggingSelected"
            :options="computedOptions"
            :multiple="true"
            :taggable="true"
            @tag="addTag"
            group-values="filters"
            group-label="group"
            :group-select="false"
            tag-placeholder="Search for id, deviceId or name of a device"
            placeholder="Type to search"
            label="name"
            track-by="id"
            :custom-label="getCustomLabel"
            :close-on-select="false"
        >
            <template #tag="props">
                <span
                    class="multiselect__tag"
                    :class="{ 'blue-bg': isMasterdata(props.option), 'grey-bg': isCustom(props.option) }"
                >
                    <span v-html="getOptionText(props.option)"></span>
                    <i
                        tabindex="1"
                        @keypress.enter.prevent="props.remove(props.option)"
                        @mousedown.prevent="props.remove(props.option)"
                        class="multiselect__tag-icon"
                    ></i>
                </span>
            </template>
            <template #option="props">
                <div class="option__desc">
                    <span class="option__title" v-html="getOptionText(props.option)"></span>
                </div>
            </template>
        </Multiselect>
    </div>
</template>

<script lang="ts">
import Multiselect from 'vue-multiselect'
import { IFilter, IGroupedFilter, FilterType, IVueMultiselectOption } from '../typings/typings'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component({
    components: { Multiselect },
})
export default class FilterBar extends Vue {
    public taggingSelected: IFilter[] = this.$store.getters.getSelectedFilters
    public customOptions: IFilter[] = []

    @Prop(Array) public readonly defaultOptions: IGroupedFilter[] | undefined

    @Watch('taggingSelected') public onTaggingSelected() {
        this.$store.commit('selectFilters', this.taggingSelected)
    }

    get computedOptions() {
        return [
            {
                group: 'Custom (ids, deviceIds or names)',
                filters: this.customOptions,
            },
            ...(this.defaultOptions ? this.defaultOptions : []),
        ]
    }

    public addTag(tagName: string) {
        if (!tagName.length) return
        const newTag: IFilter = {
            id: tagName.substring(0, 1) + Math.floor(Math.random() * 10000000),
            name: tagName,
            type: FilterType.CUSTOM,
        }

        this.customOptions.push(newTag)
        this.taggingSelected.push(newTag)
    }

    private getOptionText(option: any): string {
        let retval = ''
        if (this.isFilter(option)) {
            if (option.type === FilterType.MASTERDATA) retval = `<b>${option.name}</b> ${option.value}`
            else retval = `${option.name}`
        } else if (option.$isLabel) retval = option.$groupLabel ? option.$groupLabel : ''
        else if (option.isTag) retval = `${option.label}`

        return retval
    }

    private isFilter(toBeDetermined: IFilter | IVueMultiselectOption): toBeDetermined is IFilter {
        return (toBeDetermined as IFilter).type !== undefined
    }

    private getCustomLabel(option: any): string {
        let retval = `${option.name}`
        if (option.value) {
            retval += option.value
        }
        retval += option.type
        return retval
    }

    private isMasterdata(option: IFilter): boolean {
        return option.type === FilterType.MASTERDATA
    }

    private isCustom(option: IFilter): boolean {
        return option.type === FilterType.CUSTOM
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
.filter-bar {
    margin-bottom: 20px;
}
.option__small {
    font-size: 12px !important;
}

.blue-bg {
    background-color: #1976d2;

    .multiselect__tag-icon:focus,
    .multiselect__tag-icon:hover {
        background: #1662ad;
    }
}

.grey-bg {
    background-color: #b0bec5;

    .multiselect__tag-icon:focus,
    .multiselect__tag-icon:hover {
        background: #90a4ae;
    }
}
</style>
