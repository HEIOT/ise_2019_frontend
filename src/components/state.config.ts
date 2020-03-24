export const StateConfig = [
    {
        cssName: 'tab-urgent',
        filterDevice: 'urgent',
        stateLabel: 'Urgent',
        informationText: 'Critical status: Immediate actions necessary',
        icon: 'el-icon-warning',
    },
    {
        cssName: 'tab-warning',
        filterDevice: 'warning',
        stateLabel: 'Warning',
        informationText: 'Warning status: Further observation necessary',
        icon: 'el-icon-view',
    },
    {
        cssName: 'tab-ok',
        filterDevice: 'ok',
        stateLabel: 'OK',
        informationText: 'OK status: Everything is fine with these devices.',
        icon: 'el-icon-success',
    },
    {
        cssName: 'tab-info',
        filterDevice: 'info',
        stateLabel: 'Information',
        informationText: 'Information status: These devices are not connected on purpose',
        icon: 'el-icon-s-tools',
    },
]