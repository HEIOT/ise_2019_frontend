import { actions } from '@/store/tagManagement.module'
import { ITag } from '@/typings/typings'

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

describe('tagManagement', () => {
    it('creates a tag', async () => {
        const commit = jest.fn()
        const tag = 'newTag'

        await actions.createTag({ commit }, tag)

        expect(url).toBe('http://localhost/api/devicemanagement/createTag')
        expect(body).toEqual({ tag })
        expect(commit).toHaveBeenCalledWith('createTag', tag)
    })

    it('delete a tag', async () => {
        const commit = jest.fn()
        const tag = 'tagToDelete'

        await actions.deleteTag({ commit }, tag)

        expect(url).toBe('http://localhost/api/devicemanagement/deleteTag')
        expect(body).toEqual({ tag })
        expect(commit).toHaveBeenCalledWith('deleteTag', tag)
    })

    it('getTags', async () => {
        await actions.getTags({})

        expect(url).toBe('http://localhost/api/devicemanagement/getTags')
    })
})
