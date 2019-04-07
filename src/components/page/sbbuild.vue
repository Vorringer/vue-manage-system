<template>
    <div class="container">
        <el-row :gutter="20">
            <el-col :span="12">
                <v-statview></v-statview>
            </el-col>
            <el-col :span="7">
                <div class="container"  style="height:500px;"  ref="traits">
                    <el-scrollbar style="height:100%;">
                            <el-checkbox-group v-model="form.traits" >
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
            </el-col>
            <el-col :span="5">
                <div class="container">
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import sbdata from "../common/sbdata.vue"
    import vStatview from "../common/statview.vue"
    export default {
        name: 'sbbuild',
        data() {
            return {
                url: 'http://120.78.91.122:8080/Entity/Uebde5c813efa2/MobileMeet/Conference/',
                form: {},
                trait_minWidth: "200px",
                
            }
        },
        components:{
            vStatview
        },
        created() {
        },
        mounted() {
            var self = this;
            self.trait_minWidth = self.$refs["traits"].clientWidth * 0.7 + "px";
        },
        computed: {
            sb_base_classes: function() {
                return sbdata.get_sb_base_classes();
            },
            sb_disciplines: function() {
                return sbdata.get_sb_disciplines();
            },
            sb_mastery_runes: function() {
                return sbdata.get_sb_mastery_runes();
            },
            sb_races: function() {
                return sbdata.get_sb_races();
            },
            sb_prestige_classes: function() {
                return sbdata.get_sb_prestige_classes();
            },
            sb_starting_traits: function() {
                return sbdata.get_sb_starting_traits();
            },
            sb_stat_runes: function() {
                return sbdata.get_sb_stat_runes();
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
    .el-scrollbar__wrap {
        overflow-x: hidden;
    }
</style>
<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .el-row {
        margin-bottom: 20px;
    }
    .el-col {
        border-radius: 4px;
    }

    
</style>
