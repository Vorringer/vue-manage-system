<template>
    <div>
        <el-row :gutter="20">
            <!--
            -->
            <el-col :span="16">
                <el-card shadow="hover" style="height:500px;">
                    <div class="bigDiv">
                        <div class="smallDiv1">
                            <vue-baberrage
                                :isShow= "barrageIsShow"
                                :barrageList = "barrageList"
                                :loop = "barrageLoop"
                            >
                            </vue-baberrage>
                        </div>
                        <div class="smallDiv2">
                                <div id="qrcode" class = "qrcode-center" v-if="qrcodeVisibile"></div>
                            <el-card shadow="hover" v-if="chartVisible['score']">
                                <schart ref="scoreCanvas" class="schart" canvasId="scoreCanvas" :data="scoreForm.contents" type="bar" :options="options"></schart>
                            </el-card>
                            <div v-if="chartVisible['bonus']">
                                <p class="text-center"><span>恭喜{{bonusForm.userID}}获得{{bonusForm.type}}: {{bonusForm.name}}!</span>
                                </p>
                            </div>

                            <el-card shadow="hover" v-if="chartVisible['vote']">
                                <schart ref="voteCanvas" class="schart" canvasId="voteCanvas" :data="voteForm.contents" type="bar" :options="options"></schart>
                            </el-card>
                        </div>
                    </div>
                </el-card>
                <el-footer>
                    <el-col :span="23">
                    <el-input
                        placeholder="请发送弹幕"
                        suffix-icon="el-icon-edit-outline"
                        v-model="bulletTemp">
                    </el-input>
                    </el-col>
                    <el-col :span="1">
                    <el-form><el-form-item><el-button type="primary" plain @click="sendBullet">发送</el-button></el-form-item></el-form>
                    </el-col>
                </el-footer>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:525px;">
                    <div class="user-info">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="选择器">
                                <el-select v-model="form.gameType" placeholder="请选择" @change="chooseGame">
                                    <el-option key="bonus" label="抽奖" value="bonus"></el-option>
                                    <el-option key="score" label="评分" value="score"></el-option>
                                    <el-option key="vote" label="投票" value="vote"></el-option>
                                </el-select>
                            </el-form-item>
                            <div class="container" style="width:100%" v-if="gameVisible['bonus']">
                                <el-form-item label="奖项类型">
                                    <el-input v-model="bonusForm.type"></el-input>
                                </el-form-item>
                                <el-form-item label="奖品名称">
                                    <el-input v-model="bonusForm.name"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button>清空</el-button>
                                    <el-button type="primary" @click="bonusSumbit">表单提交</el-button>
                                </el-form-item>
                            </div>
                            <div class="container"  v-if="gameVisible['score']">
                                <el-form-item v-for="item in scoreForm.contents" 
                                    label="打分项"
                                    :key="item.key"
                                >
                                    <el-input v-model="item.name"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button @click="addScoreInput">添加</el-button>
                                    <el-button>清空</el-button>
                                    <el-button type="primary" @click="scoreSumbit">表单提交</el-button>
                                </el-form-item>
                            </div>
                            <div class="container"  v-if="gameVisible['vote']">
                                <el-form-item v-for="item in voteForm.contents" 
                                    label="投票选项"
                                    :key="item.key"
                                >
                                    <el-input v-model="item.name"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button @click="addVoteInput">添加</el-button>
                                    <el-button>清空</el-button>
                                    <el-button type="primary" @click="voteSumbit">表单提交</el-button>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </el-card>
                
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :data="data" type="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :data="bulletStat" type="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import bus from '../common/bus';
    import Vue from 'vue'
    import QRCode from 'qrcodejs2' 
    import vueBaberrage from 'vue-baberrage'
    Vue.use(vueBaberrage);
    export default {
        name: 'dashboard',
        data() {
            return {
                baseURL: "https://vorringer.moe:18081",
                wssURL:"wss://vorringer.moe:18081",
                name: localStorage.getItem('ms_username'),
                data: [{
                        name: '2018/09/04',
                        value: 1083
                    },
                    {
                        name: '2018/09/05',
                        value: 941
                    },
                    {
                        name: '2018/09/06',
                        value: 1139
                    },
                    {
                        name: '2018/09/07',
                        value: 816
                    },
                    {
                        name: '2018/09/08',
                        value: 327
                    },
                    {
                        name: '2018/09/09',
                        value: 228
                    },
                    {
                        name: '2018/09/10',
                        value: 1065
                    }
                ],
                bulletStat: [

                ],
                options: {
                    title: '评分结果',
                    showValue: false,
                    fillColor: 'rgb(45, 140, 240)',
                    bottomPadding: 30,
                    topPadding: 30
                },
                options2: {
                    title: '最近七天用户访问趋势',
                    fillColor: '#FC6FA1',
                    axisColor: '#008ACD',
                    contentColor: '#EEEEEE',
                    bgColor: '#F5F8FD',
                    bottomPadding: 30,
                    topPadding: 30
                },
                gameVisible: {
                    score: false,
                    vote: false,
                    bonus: false
                },
                chartVisible: {
                    score: false,
                    vote: false,
                    bonus: false
                },
                form: {
                    name: '',
                    gameType: '',
                    date1: '',
                    date2: '',
                    delivery: true,
                    type: ['步步高'],
                    resource: '小天才',
                    desc: '',
                    options: []
                },
                bonusForm: {
                    type: '',
                    name: '',
                    conferenceID: 0,
                    userID: 0,
                   // time: ''
                },
                voteForm: {
                    contents: [{name:"", value:0}, {name:"", value:0}, {name:"", value:0}],
                    conferenceID: 0,
                    //time: ''
                },
                scoreForm: {
                    contents: [{name:"", value:5}, {name:"", value:5}, {name:"", value:5}],
                    conferenceID: 0,
                    //time: ''
                },
                bulletTemp: 'Hello vue-baberrage',
                barrageIsShow: true,
                qrcodeVisibile: true,
                currentId : 0,
                barrageLoop: false,
                barrageList: [],
                bonusWs:null,
                voteWs:null,
                scoreWs:null,
                bulletWs:null
            }
        },
        components: {
            Schart
        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        },
        created(){
            this.handleListener();
            this.changeDate();
            this.bulletWs = new WebSocket(this.wssURL + "/bullet");
            var self = this;
            console.log("bulletwss: ", this.bulletWs);
            this.bulletWs.onmessage = function(msg) {
                self.barrageList.push({
                    id: ++self.currentId,
                    msg: msg.data,
                    // barrageStyle: "normal",
                    time: 5,
                    type: 0,
                    position: 'bottom'
                });
            }
        },
        mounted() {
            var self = this;
            this.qrcode();
            setInterval(function(){
                self.$axios({
                    method: 'get',
                    url: "https://vorringer.moe:18081/bulletstat",
                    headers:{
                        'Content-Type':'application/json'
                    }
                }).then(response => {
                    console.log("bullet stat: ", response.data);
                    var bstat = response.data;
                    self.bulletStat = [];
                    for (var i = 0; i < bstat.stat.length; ++i) {
                        self.bulletStat.push({name: bstat.time[i], value: bstat.stat[i]});
                    }
                });
            }, 10000);
        },
        activated(){
            this.handleListener();
        },
        deactivated(){
            window.removeEventListener('resize', this.renderChart);
            bus.$off('collapse', this.handleBus);
        },
        methods: {
            changeDate(){
                const now = new Date().getTime();
                this.data.forEach((item, index) => {
                    const date = new Date(now - (6 - index) * 86400000);
                    item.name = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
                })
            },
            qrcode () {  
                let qrcode = new QRCode('qrcode', {  
                    width: 400,  
                    height: 400, // 高度  
                    text:  this.$route.params['conferenceID'] + ''// 二维码内容  
                    // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
                    // background: '#f0f'  
                    // foreground: '#ff0'  
                })  
                console.log(qrcode)  
            },
            handleListener(){
                bus.$on('collapse', this.handleBus);
                // 调用renderChart方法对图表进行重新渲染
                window.addEventListener('resize', this.renderChart)
            },
            handleBus(msg){
                setTimeout(() => {
                    this.renderChart()
                }, 300);
            },
            renderChart(){
                if (this.$refs.scoreCanvas != undefined)
                    this.$refs.scoreCanvas.renderChart();
                if (this.$refs.voteCanvas != undefined)
                    this.$refs.voteCanvas.renderChart();
                this.$refs.line.renderChart();
            },
            bonusSumbit() {
                var bonusData = this.bonusForm;
                for (var key in bonusData) {
                    if (bonusData[key] === '') {
                        this.$message.error('请完善数据！');
                        return;
                    }
                }
                bonusData.conferenceID = this.$route.params['conferenceID'] === undefined ? 0 : this.$route.params['conferenceID'] ;
                //console.log(JSON.stringify(bonusData));
                var bonusWsURL = this.wssURL + "/setBonus";
                var self = this;
                if (this.bonusWs === null)
                    this.bonusWs = new WebSocket(bonusWsURL);
                else {
                    this.bonusWs.send(JSON.stringify(bonusData));
                }
                this.bonusWs.onopen = function() {
                    self.bonusWs.send(JSON.stringify(bonusData));
                }
                this.bonusWs.onmessage = function(msg) {
                    console.log("bonus receive: %s", JSON.stringify(msg.data));
                    //console.log(typeof(msg.data));
                    self.bonusForm = JSON.parse(msg.data);
                    self.chartVisible['bonus'] = true;
                    setTimeout(function() {
                        self.chartVisible['bonus'] = false;
                    }, 10000);
                }
                this.bonusWs.onclose = function() {
                    self.bonusWs = null;
                }
                /*
                this.$axios({
                        method: 'post',
                        url: this.bonusUrl,
                        data: bonusData,
                        headers:{
						    'Content-Type':'application/json'
					    }
                    }).then(response => {
                        this.bonusForm = {};
                        this.$message.success(`添加成功`);
                });
                */
            },
            scoreSumbit() {
                console.log("scoreForm: ", JSON.stringify(this.scoreForm));
                var scoreData = this.scoreForm; 
                for (var key in scoreData) {
                    if (scoreData[key] === '') {
                        this.$message.error('请完善数据！');
                        return;
                    }
                }

                scoreData.conferenceID = this.$route.params['conferenceID'] === undefined ? 0 : this.$route.params['conferenceID'] ;

                var scoreWsURL = this.wssURL + "/setScore";
                var self = this;
                if (this.scoreWs === null) 
                    this.scoreWs = new WebSocket(scoreWsURL);
                else {
                    this.scoreWs.send(JSON.stringify(scoreData));
                }
                this.scoreWs.onopen = function() {
                    self.scoreWs.send(JSON.stringify(scoreData));
                }
                this.scoreWs.onmessage = function(msg) {
                    console.log("score receive: %s", JSON.stringify(msg.data));
                    //console.log(typeof(msg.data));
                    self.scoreForm = JSON.parse(msg.data);
                    self.chartVisible['score'] = true;
                    setTimeout(function() {
                        self.chartVisible['score'] = false;
                    }, 10000);
                }
                this.scoreWs.onclose = function() {
                    self.scoreWs = null;
                }
                
            },
            voteSumbit() {
                console.log("voteForm: ", JSON.stringify(this.voteForm));
                var voteData = this.voteForm; 
                for (var key in voteData) {
                    if (voteData[key] === '') {
                        this.$message.error('请完善数据！');
                        return;
                    }
                }

                voteData.conferenceID = this.$route.params['conferenceID'] === undefined ? 0 : this.$route.params['conferenceID'] ;

                var voteWsURL = this.wssURL + "/setvote";
                var self = this;
                if (this.voteWs === null) 
                    this.voteWs = new WebSocket(voteWsURL);
                else {
                    this.voteWs.send(JSON.stringify(voteData));
                }
                this.voteWs.onopen = function() {
                    self.voteWs.send(JSON.stringify(voteData));
                    self.chartVisible['vote'] = true;
                    setTimeout(function() {
                        self.chartVisible['vote'] = false;
                    }, 30000);
                }
                this.voteWs.onmessage = function(msg) {
                    console.log("vote receive: %s", JSON.stringify(msg.data));
                    self.chartVisible['vote'] = true;
                    //console.log(typeof(msg.data));
                    self.voteForm = JSON.parse(msg.data);
                }
                this.voteWs.onclose = function() {
                    self.voteWs = null;
                }
                
            },
            chooseGame() {
                for (var key in this.gameVisible) {
                    this.gameVisible[key] = false;
                }
                this.qrcodeVisibile = false;
                this.gameVisible[this.form['gameType']] = true;
                console.log("time: ", new Date().getTime());
            },
            addScoreInput() {
                this.scoreForm['contents'].push({name:"", value:5});
            },
            addVoteInput() {
                this.voteForm['contents'].push({name:"", value:0});
            },
            sendBullet() {
                console.log("send bullet", this.bulletTemp);
                this.barrageList.push({
                    id: ++this.currentId,
                    msg: this.bulletTemp,
                    // barrageStyle: "normal",
                    time: 5,
                    type: 0,
                    position: 'bottom'
                });
            }

        }
    }

</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }

    .text-center {
        margin-bottom: 0;
        font-size: 12px;
        min-height: 31px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 31px;
        margin-top: 5px;
        white-space: normal;
    }

    .text-center span {
        text-align: left;
        font-size: 30px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display:-webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .bigDiv{
    position: relative;
}
.smallDiv1{
    position: absolute;
    width: 100%;
    height: 400px;
    z-index: 2;
}
.smallDiv2{
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 300px;
}
.qrcode-center {
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
}


</style>
