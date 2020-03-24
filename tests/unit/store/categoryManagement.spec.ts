import { actions } from '@/store/categoryManagement.module'
import { ICategory } from '@/typings/typings'

let url = ''
let body = {}
const mockError = false

jest.mock('axios', () => ({
    post: (url_param: any, body_param: any) => {
        return new Promise(resolve => {
            if (mockError) throw Error()

            url = url_param
            body = body_param
            resolve(true)
        })
    },
    get: (url_param: any) => {
        return new Promise(resolve => {
            if (mockError) throw Error()

            url = url_param
            resolve(true)
        })
    },
}))

describe('categoryManagement', () => {
    it('creates a master data category', async () => {
        const commit = jest.fn()
        const category = 'newCategory'

        await actions.createMasterDataCategory({ commit }, category)

        expect(url).toBe('http://localhost/api/devicemanagement/createCategory')
        expect(body).toEqual({ category })
        expect(commit).toHaveBeenCalledWith('createMasterDataCategory', category)
    })

    it('modify a master data category', async () => {
        const commit = jest.fn()
        const payload = {
            oldCategory: 'oldCategory',
            category: 'newCategory',
        }
        const category = 'newCategory'

        await actions.modifyMasterDataCategory(
            { commit },
            { oldMasterDataCategory: 'oldCategory', newMasterDataCategory: 'newCategory' }
        )

        expect(url).toBe('http://localhost/api/devicemanagement/modifyCategory')
        expect(body).toEqual(payload)
        expect(commit).toHaveBeenCalledWith('modifyMasterDataCategory', {
            oldMasterDataCategory: 'oldCategory',
            newMasterDataCategory: 'newCategory',
        })
    })

    it('delete a master data category', async () => {
        const commit = jest.fn()
        const category = 'categoryToDelete'

        await actions.deleteMasterdataCategory({ commit }, category)

        expect(url).toBe('http://localhost/api/devicemanagement/deleteCategory')
        expect(body).toEqual({ category })
        expect(commit).toHaveBeenCalledWith('deleteMasterDataCategory', category)
    })

    it('getMasterdataCategories', async () => {
        await actions.getMasterdataCategories({})

        expect(url).toBe('http://localhost/api/devicemanagement/getCategories')
    })
})
