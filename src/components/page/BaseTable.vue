<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 会议信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button type="primary" icon="search" @click="handleAdd()">添加会议</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="150">
                </el-table-column>
                <el-table-column prop="name" label="名称" width="300">
                </el-table-column>
                <el-table-column prop="type" label="类型" width="120">
                </el-table-column>
                <el-table-column prop="maxnum" label="最大人数" width="120">
                </el-table-column>
                <el-table-column prop="begintime" label="开始时间" sortable width="190">
                </el-table-column>
                <el-table-column prop="endtime" label="结束时间" sortable width="190">
                </el-table-column>
                <el-table-column prop="location" label="地址" width="300">
                </el-table-column>
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleGame(scope.$index, scope.row)">设置互动项目</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-input v-model="form.type"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.location"></el-input>
                </el-form-item>
                <el-form-item label="最大人数">
                    <el-input type = "number" v-model="form.maxnum"></el-input>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.begintime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.endtime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                url: 'http://120.78.91.122:8080/Entity/Uebde5c813efa2/MobileMeet/Conference/',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    id: 0,
                    name: '',
                    type: '',
                    maxnum: 0,
                    begintime: '',
                    endtime: '',
                    location: ''
                },
                idx: -1
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {

                this.$axios.get(this.url)
                    .then(response => {
                        this.tableData = response.data['Conference'];
                        console.log(this.tableData);
                    });
                /*
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                if (process.env.NODE_ENV === 'development') {
                    this.url = '/ms/table/list';
                };
                this.$axios.post(this.url, {
                    page: this.cur_page
                }).then((res) => {
                    this.tableData = res.data.list;
                })
                */
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleAdd() {
                this.idx = -1;
                this.form = {
                    name: '',
                    type: '',
                    maxnum: 0,
                    begintime: '',
                    endtime: '',
                    location: ''
                }
                this.editVisible = true;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    id: item.id,
                    name: item.name,
                    type: item.type,
                    maxnum: item.maxnum,
                    begintime: item.begintime,
                    endtime: item.endtime,
                    location: item.location
                }
                this.editVisible = true;
            },
            handleGame(index, row) {
                const item = this.tableData[index];
                //console.log("before id: ", item.id);
                this.$router.push({name:'screen', params:{conferenceID: item.id}});
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                if (this.idx == -1) {
                    for (var key in this.form) {
                        //console.log(key, ": ", typeof(key));
                        if (this.form[key] === '' || this.form[key] === 0) {
                            this.$message.error('请完善数据！');
                            return;
                        }
                    }
                    this.form['maxnum'] = parseInt(this.form['maxnum']);
                    this.$axios({
                        method: 'post',
                        url: this.url,
                        data: this.form,
                        headers:{
						    'Content-Type':'application/json'
					    }
                    }).then(response => {
                        this.tableData.push(this.form);
                        this.editVisible = false;
                        this.$message.success(`添加成功`);
                    });
                }
                else {
                    this.$axios({
                        method: 'put',
                        url: this.url + this.tableData[this.idx]['id'],
                        data: this.form,
                        headers:{
						    'Content-Type':'application/json'
					    }
                    }).then(response => {
                        this.$set(this.tableData, this.idx, this.form);
                        this.editVisible = false;
                        this.$message.success(`修改第 ${this.idx+1} 行成功`);
                    });
                }          
            },
            // 确定删除
            deleteRow(){
                //console.log("ID: ", this.tableData[this.idx]['id'], " ", typeof(this.tableData[this.idx]['id']));
                this.$axios({
                        method: 'delete',
                        url: this.url + this.tableData[this.idx]['id'],
                        headers:{
						    'Content-Type':'application/json'
					    }
                    }).then(response => {
                        this.tableData.splice(this.idx, 1);
                        this.$message.success(`删除成功`);
                        this.delVisible = false;
                    });
            }
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
</style>
