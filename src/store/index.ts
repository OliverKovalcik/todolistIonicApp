import {createStore} from 'vuex';

const store = createStore({
    state(){
        return {
            items: [
                {
                    id: 1,
                    title: 'item1',
                    description: 'some text1'
                },
                {
                    id: 2,
                    title: 'item2',
                    description: 'some text2'
                },
                {
                    id: 3,
                    title: 'item3',
                    description: 'some text3'
                }              
            ]
        };
    },
    getters: {
        items(state){
            return state.items;
        }
    }
});

export default store;