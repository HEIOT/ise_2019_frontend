import { IDevice, IFilter, IMasterdata, FilterType, IGroupedFilter } from '../typings/typings'

const emptyFilterList = [
    {
        group: 'Tags',
        filters: [],
    },
    {
        group: 'Masterdata',
        filters: [],
    },
]

function createFilterOptionsFromDevicelist(devices: IDevice[]): IGroupedFilter[] {
    const filters = devices.reduce(
        (acc: IGroupedFilter[], device: IDevice) => {
            acc[0].filters = [...acc[0].filters, ...getTagFilterOptions(device)]
            acc[1].filters = [...acc[1].filters, ...getMasterdataFilterOptions(device)]

            return acc
        },
        [...emptyFilterList]
    )

    return filters.map((groupedFilter: IGroupedFilter) => {
        groupedFilter.filters = groupedFilter.filters.filter(unique)
        return groupedFilter
    })
}

function getTagFilterOptions(device: IDevice) {
    return device.tags.map(tag => ({
        id: `tag-${tag}`,
        name: tag,
        type: FilterType.TAG,
    }))
}

function getMasterdataFilterOptions(device: IDevice) {
    return device.master_data.map((masterdata: IMasterdata) => ({
        id: `masterdata-${masterdata.category_id}-${masterdata.value}`,
        name: masterdata.category_id,
        value: masterdata.value,
        type: FilterType.MASTERDATA,
    }))
}

function unique(value: IFilter, index: number, self: IFilter[]) {
    return self.findIndex((filter: IFilter) => filter.id === value.id) === index
}

// Filter Devices
const deviceFilter = (device: IDevice) => (current: boolean, filter: IFilter) => {
    return (
        (filterMasterdataMatch(device, filter) || filterTagMatch(device, filter) || filterCustom(device, filter)) &&
        current
    )
}

function filterMasterdataMatch(device: IDevice, filter: IFilter): boolean {
    if (filter.type !== FilterType.MASTERDATA) return false
    return device.master_data.reduce((acc: boolean, masterdata: IMasterdata) => {
        return (
            acc ||
            (masterdata.category_id.includes(filter.name) && !!filter.value && masterdata.value.includes(filter.value))
        )
    }, false)
}

function filterTagMatch(device: IDevice, filter: IFilter): boolean {
    if (filter.type !== FilterType.TAG) return false
    return device.tags.includes(filter.name)
}

function filterCustom(device: IDevice, filter: IFilter): boolean {
    if (filter.type !== FilterType.CUSTOM) return false
    const newDeviceId = String(device.id)
    return newDeviceId === filter.name || device.device_id === filter.name || device.name.includes(filter.name)
}

export { deviceFilter, createFilterOptionsFromDevicelist }
