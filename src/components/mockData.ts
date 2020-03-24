export const mockData: any = [
    {
        id: '1',
        deviceId: '123test',
        name: 'TemperatureSensor1',
        state: 'error',
        tags: ['#test', '#dev1'],
        masterData: [
            {
                categoryId: 'location',
                value: 'Heidelberg',
            },
            {
                categoryId: 'color',
                value: 'green',
            },
        ],
    },
    {
        id: '2',
        deviceId: '123test',
        name: 'PhotoSensor1Ok',
        state: 'ok',
        tags: ['#dev2', '#light'],
        masterData: [],
    },
    {
        id: '3',
        deviceId: '123test',
        name: 'PhotoSensor2Anomaly',
        state: 'anomaly',
        tags: ['#test', '#light'],
        masterData: [],
    },
    {
        id: '4',
        deviceId: '123test',
        name: 'TemperatureSensor2',
        state: 'ok',
        tags: ['#geraet'],
        masterData: [
            {
                categoryId: 'location',
                value: 'Heidelberg',
            },
            {
                categoryId: 'color',
                value: 'blue',
            },
        ],
    },
    {
        id: '5',
        deviceId: '123test',
        name: 'TemperatureSensor3',
        state: 'error',
        tags: ['#test', '#Test'],
        masterData: [
            {
                categoryId: 'location',
                value: 'Heidelberg',
            },
            {
                categoryId: 'color',
                value: 'blue',
            },
        ],
    },
    {
        id: '6',
        deviceId: '123test',
        name: 'TestError3',
        state: 'error',
        tags: ['#test', '#dev1'],
        masterData: [
            {
                categoryId: 'location',
                value: 'Heidelberg',
            },
            {
                categoryId: 'color',
                value: 'red',
            },
        ],
    },
    {
        id: '7',
        deviceId: '123test',
        name: 'PhotoSensor2OK',
        state: 'ok',
        tags: ['#test', '#light'],
        masterData: [
            {
                categoryId: 'location',
                value: 'Heidelberg',
            },
            {
                categoryId: 'color',
                value: 'blue',
            },
        ],
    },
    {
        id: '8',
        deviceId: '123test',
        name: 'PhotoSensor2Anomaly',
        state: 'anomaly',
        tags: ['#test', '#light'],
        masterData: [
            {
                categoryId: 'location',
                value: 'Heidelberg',
            },
            {
                categoryId: 'color',
                value: 'red',
            },
        ],
    },
    {
        id: '9',
        deviceId: '123test',
        name: 'Geraet2Ok',
        state: 'ok',
        tags: ['#test', '#dev1'],
        masterData: [
            {
                categoryId: 'location',
                value: 'Heidelberg',
            },
            {
                categoryId: 'color',
                value: 'blue',
            },
        ],
    },
    {
        id: '10',
        deviceId: '123test',
        name: 'Test',
        state: 'error',
        tags: ['#test', '#dev1'],
        masterData: [
            {
                categoryId: 'location',
                value: 'Mannheim',
            },
            {
                categoryId: 'color',
                value: 'red',
            },
        ],
    },
    {
        id: '11',
        deviceId: '123test',
        name: 'Test',
        state: 'error',
        tags: ['#test', '#dev1'],
        masterData: [
            {
                categoryId: 'location',
                value: 'Heidelberg',
            },
            {
                categoryId: 'color',
                value: 'blue',
            },
        ],
    },
    {
        id: '12',
        deviceId: '123test',
        name: 'PhotoSensor1',
        state: 'ok',
        tags: ['#test', '#dev1'],
        masterData: [
            {
                categoryId: 'location',
                value: 'Heidelberg',
            },
            {
                categoryId: 'color',
                value: 'blue',
            },
        ],
    },
    {
        id: '13',
        deviceId: '123test',
        name: 'PhotoSensor2',
        state: 'anomaly',
        tags: ['#test', '#dev1'],
        masterData: [
            {
                categoryId: 'location',
                value: 'Heidelberg',
            },
            {
                categoryId: 'color',
                value: 'blue',
            },
        ],
    },
    {
        id: '14',
        deviceId: '123test',
        name: 'Geraet3OK',
        state: 'ok',
        tags: ['#test', '#geraet'],
        masterData: [
            {
                categoryId: 'location',
                value: 'Heidelberg',
            },
            {
                categoryId: 'color',
                value: 'blue',
            },
        ],
    },
    {
        id: '15',
        deviceId: '123test',
        name: 'Test5Error',
        state: 'error',
        tags: ['#test', '#dev5'],
        masterData: [
            {
                categoryId: 'location',
                value: 'Heidelberg',
            },
            {
                categoryId: 'color',
                value: 'blue',
            },
        ],
    },
]

export const CategoriesMock: any = [
    {
        label: 'Color',
        value: 'Color',
    },
    {
        label: 'Maintainer',
        value: 'Maintainer',
    },
    {
        label: 'Location',
        value: 'Location',
    },
    {
        label: 'Installation Date',
        value: 'Installation Date',
    },
]

export const MockTags: any = [{ label: 'Haus in Hauptstraße' }, { label: 'Room 2' }, { label: 'Testtag' }]
