import { InjectionKey } from 'vue'
import { createStore,useStore as baseUseStore,Store } from 'vuex'
import VuexPersistence from 'vuex-persist'

export interface State {
    items: {id:number, title: string, isChecked: boolean, isSoftDeleted: boolean, isSoftDone: boolean,description: string}[],
    statistics: {successfulTasks: number, unsuccessfulTasks: number}
  }
export interface StateItem {
    id:number;
    title: string;
    isChecked: boolean;
    isSoftDeleted:boolean;
    isSoftDone:boolean;
    date: string;
    description: string
}
const vuexLocal = new VuexPersistence<State>({
storage: window.localStorage
})

export const key: InjectionKey<Store<State>> = Symbol()


export const store = createStore<State>({
    state(){
        return {
            items: [],
            statistics : {
                successfulTasks: 0,
                unsuccessfulTasks: 0
            }
        };
    },
    mutations: {
        CREATE_TO_DO: (state, data:StateItem) => {
            state.items = [...state.items, data];
        },
        HANDLE_CHECKBOX: (state, id:number) => {
            const index = state.items.findIndex(item => item.id === id);
            state.items[index].isChecked = !state.items[index].isChecked;
        },
        DELETE_ITEM: (state, taskId:number) => {
            const index = state.items.findIndex(item => item.id === taskId);
            state.items[index].isSoftDeleted = true;
            state.statistics.unsuccessfulTasks = state.statistics.unsuccessfulTasks + 1;
        },
        EDIT_TO_DO: (state, {description, id}:{description:string, id:number}) => {
            const index = state.items.findIndex(item => item.id === id);
            state.items[index].description = description;
        },
        DONE_ITEM: (state, id:number) => {
            const index = state.items.findIndex(item => item.id === id);
            state.items[index].isSoftDone = true;
            state.statistics.successfulTasks = state.statistics.successfulTasks + 1;
        },
        REORDER_ITEMS: (state, {fromId,toId}:{fromId:number, toId:number}) => {
            const fromIndex = state.items.findIndex(item => item.id === fromId);
            const toIndex = state.items.findIndex(item => item.id === toId);
            [state.items[fromIndex], state.items[toIndex]] =  [state.items[toIndex], state.items[fromIndex]];
        }
    },
    plugins: [vuexLocal.plugin]
});

export function useStore () {
    return baseUseStore(key)
  }