import Vue from 'vue'
import { ICategory, IStateCategoryManagement } from '../typings/typings'
import {
    createMasterDataCategory,
    modifyMasterDataCategory,
    getMasterDataCategories,
    deleteMasterDataCategory,
} from '@/api/deviceManagement.api'

export const initialState: IStateCategoryManagement = {
    masterDataCategories: [],
}

export const mutations: any = {
    setAllMasterDataCategories(state: IStateCategoryManagement, masterDataCategories: ICategory[]) {
        state.masterDataCategories = masterDataCategories
    },
    createMasterDataCategory(state: IStateCategoryManagement, masterDataCategoriy: ICategory) {
        state.masterDataCategories.push(masterDataCategoriy)
    },
    modifyMasterDataCategory(state: IStateCategoryManagement, payload: any) {
        const index: number = state.masterDataCategories.indexOf(payload.oldMasterDataCategory)
        if (index !== -1) {
            state.masterDataCategories.splice(index, 1, payload.newMasterDataCategory)
        }
    },

    deleteMasterDataCategory(state: IStateCategoryManagement, masterDataCategory: ICategory) {
        state.masterDataCategories = state.masterDataCategories.filter(
            (category: ICategory) => category !== masterDataCategory
        )
    },
}

export const actions: any = {
    getMasterdataCategories({ commit }: any) {
        getMasterDataCategories().then(result => {
            commit('setAllMasterDataCategories', result.data)
        })
    },
    createMasterDataCategory({ commit }: any, masterDataCategory: ICategory) {
        return createMasterDataCategory(masterDataCategory).then(() => {
            commit('createMasterDataCategory', masterDataCategory)
        })
    },
    modifyMasterDataCategory({ commit }: any, payload: any) {
        return modifyMasterDataCategory(payload.oldMasterDataCategory, payload.newMasterDataCategory).then(() => {
            commit('modifyMasterDataCategory', payload)
        })
    },
    deleteMasterdataCategory({ commit }: any, masterDataCategory: ICategory) {
        return deleteMasterDataCategory(masterDataCategory).then(() => {
            commit('deleteMasterDataCategory', masterDataCategory)
        })
    },
}

export const getters: any = {
    getMasterDataCategories(state: IStateCategoryManagement) {
        return state.masterDataCategories
    },
}

export default {
    state: initialState,
    actions,
    mutations,
    getters,
}
