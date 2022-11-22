<template>
    <base-layout pageTitle="Statistics" pageDefaultBackLink="/"> 
    <article>
        <div>
            In progress... Wait for next updates.
        </div>
        <div class="button-3" @click="getAxiosApi">
            Get Axios http request
        </div>
        <div v-for="list in list1" :key="list.name.first">{{list.name.first}}</div>
        <div>{{error1}}</div>
        <div class="button-3" @click="getCapacitorApi">
            Get CapacitorHtttp native http support
        </div>
        <div v-for="list in list2" :key="list.name.first">{{list.name.first}}</div>
        <div>{{error2}}</div>
        <div class="button-3" @click="getCurrentGeolocation">Current geolocaiton position</div>
        <div>Accuracy: {{coordinates.coords.accuracy}}</div>
        <div>Latitude: {{coordinates.coords.latitude}}</div>
        <div>Longitude: {{coordinates.coords.longitude}}</div>
    </article>
    </base-layout> 
</template>

<script>
import { CapacitorHttp } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

    export default {
        data() {
            return {
                list1: [{name: {
                    first: 'name1'
                }}],
                list2: [{name: {
                    first: 'name1'
                }},],
                error1: '',
                error2: '',
                coordinates: {coords: {accuracy: "",latitude:"",longitude:""}}
            }
        },
        methods: {
            getAxiosApi() {
                this.axios.get('https://randomuser.me/api/?results=5').then((response) => {
                    this.list1 = response.data.results;
                }).catch((error)=> {
                    this.error1 = error;
                })
            },
            getCapacitorApi(){
                let options = {
                    url: 'https://randomuser.me/api/?results=5'
                }
                CapacitorHttp.get(options).then((response)=> {
                    this.list2 = response.data.results;
                }).catch((error)=> {
                    this.error2 = error;
                })
            },
            async getCurrentGeolocation(){
                this.coordinates = await Geolocation.getCurrentPosition();
            }
        },
    }
</script>
<style lang="scss">
    article {
        padding: 40px 20px 0 20px;
        text-align: center;
        font-size: 18px;
        height: 100%;
    }
 

/* CSS */
.button-3 {
  margin: 15px 0;
  appearance: none;
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
}

.button-3:focus:not(:focus-visible):not(.focus-visible) {
  box-shadow: none;
  outline: none;
}

.button-3:hover {
  background-color: #2c974b;
}

.button-3:focus {
  box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
  outline: none;
}

.button-3:disabled {
  background-color: #94d3a2;
  border-color: rgba(27, 31, 35, .1);
  color: rgba(255, 255, 255, .8);
  cursor: default;
}

.button-3:active {
  background-color: #298e46;
  box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
}
  
</style>