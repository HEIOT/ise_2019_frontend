<template>
    <div class="managementwrapper">
        <div class="custom-subtitle">IoT-Devices</div>
        <div class="custom-title">Management</div>
        <div class="custom-row spacing-top-small">
            <div class="custom-column custom-card">
                <div class="custom-section-title no-spacing-top">Masterdata</div>
                <ManageMasterDataCategory />
            </div>
            <div class="custom-column custom-card">
                <div class="custom-section-title no-spacing-top">Tags</div>
                <ManageTags />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import ManageMasterDataCategory from '@/components/ManageDevice/ManageMasterdataCategory.vue'
import ManageTags from '@/components/ManageDevice/ManageTags.vue'

@Component({
    components: {
        ManageMasterDataCategory,
        ManageTags,
    },
})
export default class Management extends Vue {}
</script>

<style lang="scss" scoped>
.custom-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .custom-column:first-child {
        margin-right: 20px;
    }
    .custom-column {
        width: 640px;
        margin-bottom: 20px;
    }
}
.no-spacing-top {
    margin-top: 0;
}
</style>
