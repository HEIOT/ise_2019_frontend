<template>
    <div class="home">
        <div class="custom-subtitle">IoT-Devices</div>
        <div class="custom-title">Overview</div>
        <StateCards />
        <StateOverviewSection />
        <div>
            <div class="custom-section-title"></div>
            <InstallCard />
            <RecommendationCards />
        </div>
    </div>
</template>

<script lang="ts">
import StateCards from '@/components/Overview/StateCards.vue'
import StateOverviewSection from '@/components/Overview/StateOverviewSection.vue'
import RecommendationCards from '@/components/Overview/RecommendationCards.vue'
import InstallCard from '@/components/Overview/InstallCard.vue'
import ListTabs from '@/components/ListTabs.vue'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { mockData } from '@/components/mockData'

@Component({
    components: { StateCards, StateOverviewSection, RecommendationCards, InstallCard },
})
export default class Home extends Vue {
    public mockData: any = mockData

    public initStore() {
        this.$store.dispatch('getDevicesFromDb')
    }

    public created() {
        this.initStore()
    }
}
</script>

<style lang="scss" scoped>
.home {
    max-width: 80%;

    @media only screen and (max-width: 1200px) {
        max-width: 100%;
    }
}
</style>
