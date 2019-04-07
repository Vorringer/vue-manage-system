<template>
    <div class="container"  style="height:500px;"  ref="traits">
        <el-scrollbar style="height:100%;">
                <el-checkbox-group v-model="buildData.traits" >
                    <div v-for="trait in sb_starting_traits" :key="trait.name">
                        <el-checkbox
                            v-bind:style="{minWidth:trait_minWidth}"  
                            :label="trait.name" 
                            border>
                        </el-checkbox>
                    </div>
                </el-checkbox-group>
        </el-scrollbar>
    </div>
</template>

<script>
import sbdata from "../common/sbdata.vue"
export default {
    name: 'traitsview',
        data() {
            return {
                trait_minWidth: "200px"
            }
        },
        props: ['buildData'],
        created() {

        },
        mounted() {
            var self = this;
            self.trait_minWidth = self.$refs["traits"].clientWidth * 0.7 + "px";
        },
        computed: {
            sb_starting_traits: function() {
                return sbdata.get_sb_starting_traits();
            }          
        },
        methods: {
            
        }
}
</script>

<style>

</style>
