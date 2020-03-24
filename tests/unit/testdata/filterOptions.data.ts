import { FilterType } from '@/typings/typings'

export const testDefaultOptions = [
    {
        group: 'Masterdata',
        filters: [
            {
                id: `tag-Test`,
                name: 'TestTag',
                type: FilterType.TAG,
            },
            {
                id: `tag-Test2`,
                name: 'TestTag2',
                type: FilterType.TAG,
            },
        ],
    },
    {
        group: 'Masterdata',
        filters: [
            {
                id: `masterdata-Test`,
                name: 'TestMasterdata',
                type: FilterType.MASTERDATA,
                value: 'Test',
            },
        ],
    },
]

export const testSelectedFilters = [
    {
        id: `tag-Test`,
        name: '#test',
        type: FilterType.TAG,
    },
    {
        id: `tag-Test2`,
        name: '#dev1',
        type: FilterType.TAG,
    },
]
