<template>
  <div class="wrapper" :style="color_style">
    <div class="inputs">
      <div v-show="mode=='rgb'">
        <ColorRange label="Red" v-model="color.red"/>
        <ColorRange label="Green" v-model="color.green"/>
        <ColorRange label="Blue" v-model="color.blue"/>
      </div>
      <div v-show="mode=='hsv'">
      <ColorRange label="Hue" postfix="°" :factor="360/255" v-model="color.hue"/>
      <ColorRange label="Sat" postfix="%" :factor="100/255" v-model="color.saturation"/>
      <ColorRange label="Val" postfix="%" :factor="100/255" v-model="color.brightness"/>
      </div>
    </div>
    <div class="button-group">
      <button @click="mode='rgb'" :disabled="mode==='rgb'">RGB</button>
      <button @click="mode='hsv'" :disabled="mode==='hsv'">HSV</button>
    </div>
    <div>{{hex}}</div>
    <div>Closest: <code>{{closest}} </code></div>
    <div>Closest Normalized: <code>{{guess}} </code></div>
  </div>
</template>

<script>
import ColorRange from "./components/ColorRange"
import {pcolors} from "./colors";
import {RGB} from "./RGB";
import {closest, most_accurate} from "./algos";
import _ from "lodash";
export default {
  name: 'App',
  data(){
    return{
      color: new RGB(250,100,0),
      mode: "rgb",
      guess:"",
    }
  },
  methods:
  {
    setGuess()
    {
      this.guess =  most_accurate(this.color, pcolors);
    },

  },
  computed:{
    closest()
    {
      _.debounce(this.setGuess, 10)();
      return closest(this.color, pcolors);
    },
    hex(){
      return this.color.asHex();
    },
    color_style(){
      const avg = (+this.color.red+ (+this.color.blue)*(50/256) +
        (+this.color.green))/3;
      const bg =  this.hex;
      const fg =  
      (avg<70)?'white':'black';
      return `background-color:${bg};color:${fg};`
    }
  },
  components:{ColorRange}
}
</script>

<style scoped>
.wrapper{
  display:flex;
  flex-direction:column;
  width:100%;
  height:100%;
  justify-content:center;
  align-items:center;
  transition:color .5s ease-in;
}
code{
  font-size:1rem;
}
.button-group{
  margin-bottom:1rem;
}
</style>
