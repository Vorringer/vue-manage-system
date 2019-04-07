<<template>
    <div class="container" style="height:500px;" ref="traits">
        <el-scrollbar style="height:100%;">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="Resist" name="Resist">
                    <el-row :gutter="5" v-for="(resist, name) in buildData.resists" :key="resist">
                        <el-col :span="8">
                            <label>{{name}}</label>
                        </el-col>
                        <el-col :span="16">
                            <el-progress :text-inside="true" 
                                :stroke-width="20" 
                                :percentage="resist"
                                style="margin-top:6px">
                            </el-progress>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <el-collapse-item title="Skill" name="Skill">
                        <div v-for="(focuses, skillName) in buildData.skills" :key="skillName">
                            <el-row :gutter="5" v-for="(focus, focusName) in focuses" :key="focusName" v-if="focus!=0">
                                <el-col :span="8">
                                    <label>{{focusName}}</label>
                                </el-col>
                                <el-col :span="16">
                                    <el-progress :text-inside="true" 
                                        :stroke-width="20" 
                                        :percentage="focus"
                                        v-bind:style="{width:trait_minWidth}"  
                                        style="margin-top:6px">
                                    </el-progress>
                                </el-col>
                            </el-row>
                        </div>
                </el-collapse-item>
            </el-collapse>
        </el-scrollbar>
    </div>
</template>

<script>
import sbdata from "../common/sbdata.vue"
export default {
    name: 'stats',
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
            self.trait_minWidth = self.$refs["traits"].clientWidth * 0.5 + "px";
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
