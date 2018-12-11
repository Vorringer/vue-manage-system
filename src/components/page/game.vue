<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="选择器">
                        <el-select v-model="form.gameType" placeholder="请选择" @change="chooseGame">
                            <el-option key="bonus" label="抽奖" value="bonus"></el-option>
                            <el-option key="score" label="评分" value="score"></el-option>
                            <el-option key="vote" label="投票" value="vote"></el-option>
                        </el-select>
                    </el-form-item>
                    <div class="container" v-if="gameVisible['bonus']">
                        <el-form-item label="奖项类型">
                            <el-input v-model="bonusForm.type"></el-input>
                        </el-form-item>
                        <el-form-item label="奖品名称">
                            <el-input v-model="bonusForm.content"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="bonusSumbit">表单提交</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'baseform',
        data: function(){
            return {
                bonusUrl: "http://120.78.91.122:8080/Entity/Uebde5c813efa2/MobileMeet/Bonus",
                voteUrl: "",
                scoreUrl: "http://120.78.91.122:8080/Entity/Uebde5c813efa2/MobileMeet/Score",
                options:[
                    {
                        value: 'guangdong',
                        label: '广东省',
                        children: [
                            {
                                value: 'guangzhou',
                                label: '广州市',
                                children: [
                                    {
                                        value: 'tianhe',
                                        label: '天河区'
                                    },
                                    {
                                        value: 'haizhu',
                                        label: '海珠区'
                                    }
                                ]
                            },
                            {
                                value: 'dongguan',
                                label: '东莞市',
                                children: [
                                    {
                                        value: 'changan',
                                        label: '长安镇'
                                    },
                                    {
                                        value: 'humen',
                                        label: '虎门镇'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: 'hunan',
                        label: '湖南省',
                        children: [
                            {
                                value: 'changsha',
                                label: '长沙市',
                                children: [
                                    {
                                        value: 'yuelu',
                                        label: '岳麓区'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                gameVisible: {
                    score: true,
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
                    content: '',
                    conferenceID: 0,
                    userID: 0,
                    time: ''
                },
                voteForm: {
                    content: [],
                    value: [],
                    conferenceID: 0,
                    time: ''
                },
                scoreForm: {
                    value: 0,
                    conferenceID: 0,
                    time: ''
                }
            }
        },
        methods: {
            onSubmit() {
                this.$message.success('提交成功！');
            },
            bonusSumbit() {
                var bonusData = this.bonusForm;
                for (var key in bonusData) {
                    if (bonusData[key] === 0 || bonusData[key] === '') {
                        this.$message.error('请完善数据！');
                        return;
                    }
                }
                bonusData.conferenceID = this.$route.params['conferenceID'];
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
            chooseGame() {
                for (var key in this.gameVisible) {
                    this.gameVisible[key] = false;
                }
                this.gameVisible[this.form['gameType']] = true;
                console.log("time: ", new Date().getTime());
            }
        }
    }
</script>