<template>
    <div class="cards">
        <el-card
            :id="[state.cssName]"
            v-for="(state, index) in stateConfig"
            :key="state.cssName"
            shadow="hover"
            :class="[{ 'is-active': state.active }, 'custom-tab']"
            v-on:click.native="setActiveTab(index)"
            :body-style="{ padding: mobileFormat ? '15px 10px' : '20px' }"
        >
            <div class="custom-container">
                <div class="custom-row">
                    <div class="status-text">{{ state.stateLabel }}</div>
                    <div class="custom-column">
                        <el-tooltip placement="top">
                            <div slot="content">{{ state.informationText }}</div>
                            <i :class="[state.icon]"></i>
                        </el-tooltip>
                    </div>
                </div>
                <div class="custom-row">
                    <div>
                        <div class="custom-number">
                            {{ devices.filter(dev => dev.state === state.filterDevice).length }}
                        </div>
                        <div class="custom-subtitle">Total devices</div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { StateConfig } from '@/components/state.config'

@Component({})
export default class StateCards extends Vue {
    public stateConfig = StateConfig.map(item => ({
        ...item,
        active: false,
    }))

    public created() {
        const activeCard = this.$store.getters.getActiveCard
        const card = this.stateConfig.find(element => element.filterDevice === activeCard)
        if (card) card.active = true
        this.stateConfig = [...this.stateConfig]
    }

    /*
     Function to set active-flag to true when card is selected and false for every other card.
     This is necessary to determine which tab is currently selected. 
     The class binding in template to state.active also makes the component reactive.*/
    public setActiveTab(index: number) {
        const card = this.stateConfig.find(element => element.active)
        if (card) card.active = false
        this.stateConfig[index] = {
            ...this.stateConfig[index],
            active: true,
        }
        const activeCard = this.stateConfig.find(element => element.active)
        if (activeCard) {
            this.$store.commit('setActiveCard', activeCard.filterDevice)
        }

        this.stateConfig = [...this.stateConfig]
    }

    get devices() {
        return this.$store.getters.getDevices
    }

    get mobileFormat() {
        return this.$store.getters.getMobileFormat
    }
}
</script>

<style lang="scss" scoped>
@import '@/style/colours.scss';

.cards {
    display: flex;
    flex-direction: row;
    height: 170px;
    align-items: flex-end;
    border-radius: 4px 4px 0 0;
    overflow: hidden;
    margin-top: 20px;
}

.custom-tab {
    width: 240px;
    opacity: 0.4;
    height: 140px;
    border: 0;
    border-radius: 0;
    cursor: pointer;

    &.is-active {
        opacity: 1;
        height: 170px;
    }
}

#tab-urgent {
    color: #ff4444;
    background-color: #ffd6d6;
}

#tab-warning {
    color: #ffcc5e;
    background-color: #fff0ce;
}
#tab-ok {
    color: #53dd6c;
    background-color: #d5ffdd;
}
#tab-info {
    color: #8a8d91;
    background-color: #e1e2e4;
}

.custom-row {
    display: flex;
    flex-direction: row;
}

.custom-column {
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: flex-end;
    font-size: 30px;
}

.custom-number {
    color: black;
    font-size: 50px;
    font-weight: bold;
    text-align: left;
}

.custom-subtitle {
    color: #454545;
    text-align: left;
    font-size: 16px;
}

.information-text {
    color: #454545;
    text-align: left;
    font-size: 12px;
}

.status-text {
    color: #454545;
    text-align: left;
    font-weight: bold;
    font-size: 18px;
}

@media only screen and (max-width: 1200px) {
    .cards {
        height: 130px;
    }

    .custom-tab {
        width: 150px;
        height: 110px;

        &.is-active {
            opacity: 1;
            height: 130px;
        }
    }

    .custom-number {
        font-size: 30px;
    }

    .custom-subtitle {
        font-size: 14px;
    }

    .status-text {
        font-size: 16px;
    }
}

@media (max-width: 400px) {
    .custom-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .custom-tab {
        width: 150px;
        height: 60px;

        &.is-active {
            opacity: 1;
            height: 64px;
        }
    }
    .custom-row {
        justify-content: center;
    }
    .status-text,
    .custom-subtitle {
        display: none;
    }
}
</style>
