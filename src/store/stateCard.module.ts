import { IStateStateCards } from '../typings/typings'

const initialState: IStateStateCards = {
    activeCard: 'urgent',
}

export const mutations: any = {
    setActiveCard(state: IStateStateCards, card: string) {
        state.activeCard = card
    },
}

export const actions: any = {}

export const getters: any = {
    getActiveCard(state: IStateStateCards) {
        return state.activeCard
    },
}

export default {
    state: initialState,
    actions,
    mutations,
    getters,
}
