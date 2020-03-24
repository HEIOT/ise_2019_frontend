import { ITag, IStateTagManagement } from '../typings/typings'
import { createTag, deleteTag, getTags } from '@/api/deviceManagement.api'

export const initialState: IStateTagManagement = {
    tags: [],
}

export const mutations: any = {
    setAllTags(state: IStateTagManagement, tags: ITag[]) {
        state.tags = tags
    },
    deleteTag(state: IStateTagManagement, tagToDelete: ITag) {
        state.tags = state.tags.filter((tag: ITag) => tag !== tagToDelete)
    },
    createTag(state: IStateTagManagement, tag: ITag) {
        state.tags.push(tag)
    },
}

export const actions = {
    createTag({ commit }: any, tag: string) {
        return createTag(tag).then(() => {
            commit('createTag', tag)
        })
    },
    deleteTag({ commit }: any, tag: string) {
        return deleteTag(tag).then(() => {
            commit('deleteTag', tag)
        })
    },

    getTags({ commit }: any) {
        getTags().then(result => {
            commit('setAllTags', result.data)
        })
    },
}

export const getters: any = {
    getTags(state: IStateTagManagement) {
        return state.tags
    },
}

export default {
    state: initialState,
    actions,
    mutations,
    getters,
}
