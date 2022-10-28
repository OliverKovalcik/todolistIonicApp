// vuex-shim.d.ts
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    items: {id:number, title: string, description: string}[];
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}