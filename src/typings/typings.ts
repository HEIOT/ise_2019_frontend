export interface IMasterdata {
    category_id: string
    value: string
}

export interface ITag {
    tagId: string
}

export interface ICategory {
    category: string
}

export interface IDevice {
    name: string
    device_id: string
    id: string
    device_state: string
    tags: string[]
    master_data: IMasterdata[]
    anomaly?: IAnomaly
}

export interface IDeviceState {
    id: string
    state: string
}

export enum FilterType {
    TAG,
    MASTERDATA,
    CUSTOM,
}
export interface IFilter {
    id: string
    type: FilterType
    name: string
    value?: string
}

export interface IVueMultiselectOption {
    $groupLabel?: string
    $isLabel?: string
    isTag?: boolean
    label?: string
}

export interface IGroupedFilter {
    group: string
    filters: IFilter[]
}

export interface IStateDeviceManagement {
    excludedCategories: string[]
    deviceDetail: IDevice
    deviceList: IDevice[]
    selectedFilters: any[]
}

export interface IStateStateCards {
    activeCard: string
}

export interface IStateCategoryManagement {
    masterDataCategories: ICategory[]
}

export interface IStateTagManagement {
    tags: ITag[]
}

export interface IDataFlat {
    device_id: number
    date: string
    value_name: string
    value_type: string
    value: number
}

export interface IData {
    device_id: number
    date: Date
    data: Array<{
        name: string
        type: string
        value: number
    }>
}

export interface IDataComponentPayload {
    data: IData[]
    namesWithColors: { [key: string]: string }
    anomaly?: IAnomaly
}

export interface IAnomaly {
    device_id: number
    attribute: string
    type: string
    timestamp: Date
}
