<template>
    <div class="container" style="height:500px">
        <el-form ref="form" :model="buildata" label-width="80px">
            <el-form-item label="Race">
                <el-select v-model="buildData.race" placeholder="select race">
                    <el-option 
                        v-for="race in sb_races" 
                        :key="race.name" 
                        :label="race.name" 
                        :value="race.name" >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Sex">
                <el-radio-group v-model="buildData.sex">
                    <el-radio label="Male"></el-radio>
                    <el-radio label="Female"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="BaseClass">
                <el-select v-model="buildData.bclass" placeholder="select base class">
                    <el-option 
                        v-for="bclass in sb_base_classes" 
                        :key="bclass.name" 
                        :label="bclass.name" 
                        :value="bclass.name" >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Attributes">
                <div class="container">
                    <el-row :gutter="5" v-for="stat in sb_starting_attributes" :key="stat.name">
                        <el-col :span="5">
                            <label>{{stat.name}}</label>
                        </el-col>
                        <el-col :span="11">
                            <el-progress :text-inside="true" 
                                :stroke-width="20" 
                                :percentage="buildData.stat"
                                style="margin-top:6px">
                            </el-progress>
                        </el-col>
                        <el-col :span="8">
                            <el-input-number 
                                size="mini"
                                v-model="buildData.stat" 
                                :min="1" 
                                :max="100" 
                                label="描述文字"
                                style="display:inline-block;vertical-align:middle">
                            </el-input-number>
                        </el-col>
                    </el-row>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import sbdata from "../common/sbdata.vue"
export default {
        name: 'statview',
        data() {
            return {
            }
        },
        props: ['buildData'],
        created() {
        },
        mounted() {
        },
        computed: {
            sb_base_classes: function() {
                return sbdata.get_sb_base_classes();
            },
            sb_races: function() {
                return sbdata.get_sb_races();
            },
            sb_starting_attributes: function() {
                return sbdata.get_sb_starting_attributes();
            },
            sb_init_stats: function() {
                return sbdata.get_sb_init_stats();
            }
            
        },
        methods: {
            
            
        }
}
</script>

<style>

</style>
