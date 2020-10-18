<template>
<div>
    <label>{{label}}: {{Math.round(modelValue* factor)}}{{postfix}}</label>
    <input
        @input="$emit('update:modelValue', $event.target.value)"
        type="range"
        min="0"
        max="255"
        :value="modelValue" />
</div>
</template>

<script>
export default{
    name:"ColorRange",
    props: {
        "modelValue":Number,
        "label":String,
        "factor":{type:Number,default:1},
        "postfix":{type:String,default:""}
        }
}
</script>

<style scoped>
label{
    display:block;
}
</style>