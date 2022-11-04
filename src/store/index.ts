import { InjectionKey } from 'vue'
import { createStore,useStore as baseUseStore,Store } from 'vuex'
import VuexPersistence from 'vuex-persist'

export interface State {
    items: {id:number, title: string, isChecked: boolean}[];
  }
export interface StateItem {
    id:number, title: string, isChecked: boolean
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
                    isChecked: false
                },
                {
                    id: 2,
                    title: 'item2',
                    isChecked: false
                },
                {
                    id: 3,
                    title: 'item3',
                    isChecked: false
                }              
            ]
        };
    },
    mutations: {
        CREATE_TO_DO: (state, data) => {
            state.items = [...state.items, data];
        },
        HANDLE_CHECKBOX: (state, id) => {
            const index = state.items.findIndex(item => item.id === id);
            state.items[index].isChecked = !state.items[index].isChecked;
        },
        DELETE_ITEM: (state, taskId) => {
           state.items = state.items.filter((task)=> task.id !== taskId);
        },
        EDIT_TO_DO: (state, {title, id}) => {
            const index = state.items.findIndex(item => item.id === id);
            state.items[index].title = title;
        }
    },
    plugins: [vuexLocal.plugin]
});

export function useStore () {
    return baseUseStore(key)
  }