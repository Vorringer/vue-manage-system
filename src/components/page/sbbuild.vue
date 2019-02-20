<template>
    <div class="container">
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="container">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="种族">
                            <el-select v-model="form.race" placeholder="请选择种族">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-radio-group v-model="form.sex">
                                <el-radio label="男性"></el-radio>
                                <el-radio label="女性"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="基础职业">
                            <el-select v-model="form.pclass" placeholder="请选择基础职业">
                                <el-option label="战士" value="fighter"></el-option>
                                <el-option label="医师" value="healer"></el-option>
                                <el-option label="浪人" value="rogue"></el-option>
                                <el-option label="法师" value="mage"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="属性点">
                            <div class="container">
                            <el-row :gutter="5">
                                <el-col :span="3">
                                    <label>力量:</label>
                                </el-col>
                                <el-col :span="13">
                                    <el-progress :text-inside="true" :stroke-width="32" :percentage="form.stat"></el-progress>
                                </el-col>
                                <el-col :span="8">
                                    <el-input-number 
                                        size="mini"
                                        v-model="form.stat" 
                                        :min="1" 
                                        :max="100" 
                                        label="描述文字">
                                    </el-input-number>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5">
                                <el-col :span="16">
                                    <el-progress :text-inside="true" :stroke-width="32" :percentage="form.stat2"></el-progress>
                                </el-col>
                                <el-col :span="8">
                                    <el-input-number 
                                        size="mini"
                                        v-model="form.stat2" 
                                        :min="1" 
                                        :max="100" 
                                        label="描述文字">
                                    </el-input-number>
                                </el-col>
                            </el-row>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="container">
                </div>
            </el-col>
            <el-col :span="6">
                <div class="container">
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import sbdata from "../common/sbdata.vue"
    export default {
        name: 'sbbuild',
        data() {
            return {
                url: 'http://120.78.91.122:8080/Entity/Uebde5c813efa2/MobileMeet/Conference/',
                form: {},
                
            }
        },
        created() {
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
            }
        },
        methods: {
            
            
        }
    }

</script>

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
