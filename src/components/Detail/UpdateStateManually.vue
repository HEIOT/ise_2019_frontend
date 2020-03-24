<template>
    <div class="wrapper">
        <div class="multi-switch">
            <el-popover
                placement="top"
                v-model="states[index].visible"
                v-for="(state, index) in states"
                :key="state.filterDevice"
                trigger="manual"
            >
                <div style="text-align: right; margin: 0">
                    <el-button type="success" size="mini" @click="confirm(index)">Change State</el-button>
                    <el-button size="mini" type="text" @click="cancel(index)">Cancel</el-button>
                </div>
                <div
                    :class="['option', state.filterDevice, currentState === state.filterDevice ? 'active' : '']"
                    slot="reference"
                    @click="showPopOver(index)"
                >
                    <i :class="[state.icon]"></i>
                </div>
            </el-popover>
        </div>
    </div>
</template>

<script lang="ts">
/**
 * This component updates the state of a device manually
 */
import { Vue, Component, Watch, Prop, Emit } from 'vue-property-decorator'
import { StateConfig } from '@/components/state.config'

@Component({})
export default class UpdateStateManually extends Vue {
    @Prop() public currentState: any

    public states = StateConfig.map(item => ({
        ...item,
        visible: false,
    }))

    @Emit()
    public changeState(state: string) {
        return state
    }

    public updateState(newState: string): void {
        if (!newState) return
        this.changeState(newState)
    }

    public showPopOver(index: number) {
        if (this.states[index].filterDevice === this.currentState) return
        if (this.states.some(({ visible }) => !!visible)) return
        this.$set(this.states, index, { ...this.states[index], visible: true })
    }

    public cancel(index: number) {
        this.$set(this.states, index, { ...this.states[index], visible: false })
    }

    public confirm(index: number) {
        this.$set(this.states, index, { ...this.states[index], visible: false })
        this.updateState(this.states[index].filterDevice)
    }
}
</script>

<style lang="scss" scoped>
@import '@/style/colours.scss';

$hover_opacity: 0.3;

$state_menu_size: 48px;

.wrapper {
    // min-height: 100px;
    border-radius: 4px;
    background-color: white;

    .multi-switch {
        display: flex;
        border: 1px solid #dfdfdf;
        border-radius: $state_menu_size;

        .option {
            border-radius: $state_menu_size;
            cursor: pointer;

            i {
                font-size: $state_menu_size / 2;
                margin: $state_menu_size / 4;
            }

            &:focus {
                outline: 0;
            }

            &.active {
                cursor: initial;
            }

            &.urgent {
                color: $urgent_main;
                &:hover {
                    background-color: rgba($urgent_main, $hover_opacity);
                }
                &.active {
                    color: white;
                    background-color: $urgent_main;
                }
            }
            &.warning {
                color: $warning_main;
                &:hover {
                    background-color: rgba($warning_main, $hover_opacity);
                }
                &.active {
                    color: white;
                    background-color: $warning_main;
                }
            }
            &.ok {
                color: $ok_main;
                &:hover {
                    background-color: rgba($ok_main, $hover_opacity);
                }
                &.active {
                    color: white;
                    background-color: $ok_main;
                }
            }
            &.info {
                color: $info_main;
                &:hover {
                    background-color: rgba($info_main, $hover_opacity);
                }
                &.active {
                    color: white;
                    background-color: $info_main;
                }
            }
        }
    }
}
.state-label {
    margin-left: 10px;
}
.current-state {
    font-size: 0.8em;
    &.urgent {
        color: #ff4444;
        background-color: #ffd6d6;
    }

    &.warning {
        color: #ffcc5e;
        background-color: #fff0ce;
    }
    &.ok {
        color: #53dd6c;
        background-color: #d5ffdd;
    }
    &.info {
        color: #8a8d91;
        background-color: #e1e2e4;
    }
}

.custom-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 60px;
}

@media (max-width: 400px) {
    .wrapper {
        padding: 0;
        .multi-switch {
            .option {
                i {
                    font-size: 10px;
                }
            }
        }
    }
}
</style>
