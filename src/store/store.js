import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        containerItems:
            [ 
                { id: 1, foodName: 'Coffee', currentAmount: 0.4, maxCapacity: 2.0, progress: Math.round(this.currentAmount*100/this.maxCapacity) },
                { id: 2, foodName: 'Cashew Nuts', currentAmount: 0.1, maxCapacity: 0.5, progress: Math.round(this.currentAmount*100/this.maxCapacity) },
                { id: 3, foodName: 'Sugar', currentAmount: 2.0, maxCapacity: 4.0, progress: Math.round(this.currentAmount*100/this.maxCapacity) },
                { id: 4, foodName: 'Coffee', currentAmount: 9, progress: Math.round(this.currentAmount*100/this.maxCapacity) },
                { id: 5, foodName: 'Eggs', currentAmount: 0.25, progress: Math.round(this.currentAmount*100/this.maxCapacity) }
            ]
    },
    getters: {
        getContainerItems: state => state.containerItems
    }
})