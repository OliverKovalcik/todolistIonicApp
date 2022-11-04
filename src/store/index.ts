import { InjectionKey } from 'vue'
import { createStore,useStore as baseUseStore,Store } from 'vuex'
import VuexPersistence from 'vuex-persist'

export interface State {
    items: {id:number, title: string, isChecked: boolean, isSoftDeleted: boolean, isSoftDone: boolean}[],
    statistics: {successfulTasks: number, unsuccessfulTasks: number}
  }
export interface StateItem {
    id:number;
    title: string;
    isChecked: boolean;
    isSoftDeleted:boolean;
    isSoftDone:boolean
}
const vuexLocal = new VuexPersistence<State>({
storage: window.localStorage
})

export const key: InjectionKey<Store<State>> = Symbol()


export const store = createStore<State>({
    state(){
        return {
            items: [
                {
                    id: 1,
                    title: 'item1',
                    isChecked: false,
                    isSoftDeleted: false,
                    isSoftDone: false
                },
                {
                    id: 2,
                    title: 'item2',
                    isChecked: false,
                    isSoftDeleted: false,
                    isSoftDone: false
                },
                {
                    id: 3,
                    title: 'item3',
                    isChecked: false,
                    isSoftDeleted: false,
                    isSoftDone: false
                }              
            ],
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
        EDIT_TO_DO: (state, {title, id}:{title:string, id:number}) => {
            const index = state.items.findIndex(item => item.id === id);
            state.items[index].title = title;
        },
        DONE_ITEM: (state, id:number) => {
            const index = state.items.findIndex(item => item.id === id);
            state.items[index].isSoftDone = true;
            state.statistics.successfulTasks = state.statistics.successfulTasks + 1;
        }
    },
    plugins: [vuexLocal.plugin]
});

export function useStore () {
    return baseUseStore(key)
  }