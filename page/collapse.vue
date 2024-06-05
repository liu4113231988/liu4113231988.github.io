<template>
	<div class="app-container">
		<el-row :gutter="20">
			<el-form ref="condForm" :model="condForm" label-width="150px" :inline="true">
				<el-row class="btnRow">
					<el-col :span="6" class="elrow">
						<el-form-item label="线索编号1" prop="xsbh" style="padding-left: 10px;">
							<el-input v-model="condForm.xsbh" size="mini" clearable style="width: 160px;"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6" class="elrow">
						<el-form-item label="线索类型1" prop="xslx">
							<el-select v-model="condForm.xslx" size="mini" style="width: 160px;">
								<el-option v-for="item in xslxoptions" :key="item.id" :label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6" class="elrow">
						<el-form-item label="线索来源1" prop="xsxz">
							<el-select v-model="condForm.xsxz" size="mini" style="width: 160px;">
								<el-option v-for="item in options" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="6" :class="!showAll ? 'btnRow' : 'unBtnRow'">
						<el-form-item label="线索编号1" prop="xsbh" style="padding-left: 10px;">
							<el-input v-model="condForm.xsbh" size="mini" clearable style="width: 160px;"></el-input>
						</el-form-item>
					</el-col>
					<search-button v-show="showAll" :showAll="showAll" @closepop="closepop"></search-button>
				</el-row>
				<el-row :class="!showAll ? 'btnRow' : 'unBtnRow'">
					<el-col :span="6" class="elrow">
						<el-form-item label="线索编号2" prop="xsbh" style="padding-left: 10px;">
							<el-input v-model="condForm.xsbh" size="mini" clearable style="width: 160px;"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6" class="elrow">
						<el-form-item label="线索类型2" prop="xslx">
							<el-select v-model="condForm.xslx" size="mini" style="width: 160px;">
								<el-option v-for="item in xslxoptions" :key="item.id" :label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6" class="elrow">
						<el-form-item label="线索来源2" prop="xsxz">
							<el-select v-model="condForm.xsxz" size="mini" style="width: 160px;">
								<el-option v-for="item in options" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<SearchButton v-show="!showAll" :showAll="showAll" @closepop="closepop"></SearchButton>
				</el-row>
			</el-form>
		</el-row>

		<el-table :data="tableData" size="medium" :header-cell-style="{background:'#f5f7fa'}" :height="tableHeight"
			stripe fit highlight-current-row ref="multipleTable" border style="width: 100%;height:50px">
			<el-table-column type="selection" width="55" align="center" </el-table-column>
				<el-table-column type='index' width="55" align="center" label="序号" min-width="209"></el-table-column>
				<el-table-column label="查看" width="60" align="center">
					<template slot-scope="scope">
						<el-button type="text" size="small" align="center">查看</el-button>
					</template>
				</el-table-column>
				<el-table-column label="删除" width="60" align="center">
					<template slot-scope="scope">
						<el-button type="text" size="small" align="center">删除</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="jhbh" label="计划编号" :show-overflow-tooltip="true" align="center">
				</el-table-column>
				<el-table-column prop="xszt" label="状态" align="center" min-width="100"></el-table-column>
		</el-table>
		<!--分页查询工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination style="margin-right: 8px;text-align: right;" :page-sizes="pageSizes" :page-size="pageSize"
				:total="totalPage" :current-page.sync="pageIndex" background
				layout="total, sizes, prev, pager, next, jumper">
			</el-pagination>
		</el-col>
	</div>
</template>

<script>
	import SearchButton from '@/components/SearchButton/index.vue';
	export default {
		name: "User",
		dicts: ['sys_normal_disable', 'sys_user_sex'],
		components: {
			SearchButton
		},
		data() {
			return {
				showAll: true,
				tableData: [],
				//查询条件form
				condForm: {},
				condition: '',
				xslxoptions: [{
						id: "1",
						name: "土地"
					},
					{
						id: "2",
						name: "房屋"
					},
					{
						id: "3",
						name: "矿产"
					},
				],
				options: [{
					value: '1',
					label: '动态巡查'
				}, {
					value: '2',
					label: '电话举报'
				}, {
					value: '3',
					label: '信访举报'
				}, {
					value: '4',
					label: '媒体曝光'
				}, {
					value: '5',
					label: '其他单位转交'
				}, {
					value: '6',
					label: '其他'
				}],
				pageIndex: 0,
				pageSize: 0,
				pageSizes: [20, 50, 100, 200],
				totalPage: 0,
				//					height: window.innerHeight - 200,
			}
		},
		computed: {
			tableHeight() {
				if (this.showAll) {
					return window.innerHeight - 140
				} else {
					return window.innerHeight - 200
				}
			}
		},
		methods: {
			closepop() {
				this.showAll = !this.showAll;
				console.log('父组件的状态：' + this.showAll)

			}
		},
	};
</script>
<style>
	.btnRow {
		display: block;
	}

	.unBtnRow {
		display: none;
	}
</style>

1
2