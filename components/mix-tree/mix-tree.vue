<template>
	<view class="content">
		<view class="mix-tree-list">
			<block v-for="(item, index) in treeList" :key="index">
				<view 
					class="mix-tree-item"
					:style="[{
							paddingLeft: item.rank*20 + 'px',
							zIndex: item.rank*-1 +50
						}]"
					:class="{
							border: treeParams.border === true,
							show: item.show,
							last: item.lastRank,
							showchild: item.showChild,
							rank1: item.rank == 1
						}"
					@click.stop="treeItemTap(item, index)"
				>
					<image class="mix-tree-icon" :src="item.lastRank && item.showChild ? treeParams.currentIcon : item.showChild ? treeParams.currentIcon : treeParams.defaultIcon"></image>
					<view class="innet-content">
						<view class="tree-user">
						<view class="">
							{{item.username}} 
						</view>
						
						<text v-if="item.name && item.name.length > 0" class="inner-state">{{item.name}}</text>
						</view>
						<view class="tree-bottom">
							<view class="tree-bottom-item">
								<view class="touzi">
									直推业绩: {{item.ztyeji ?item.ztyeji:0}}
								</view>
							</view>
							<view class="tree-bottom-item">
								
								<view class="yeji">
									团队人数
									<!-- {{i18n.team}} -->
									: {{item.tdrs?item.tdrs:0}} 
								</view>
							</view>
							<view class="tree-bottom-item">
								
								<view class="touzi">
									{{i18n.Team_performance}}: {{item.yeji?item.yeji:0}}
								</view>
							</view>
							
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default(){
					return [];
				}
			},
			params: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				treeList: [],
				treeParams: {
					defaultIcon: '../../static/mix-tree/defaultIcon.png',
					currentIcon: '../../static/mix-tree/currentIcon.png',
					lastIcon: '',
					border: false
				}
			}
		},
		computed: {
			formatParsefloat(val){
				if ((!val && val != 0) || val == null || val == undefined || val == 'undefined') {
					return 0
				}
				return parseFloat(val)
			},
			i18n () {  
				return this.$t('message')
			}
		},
		watch: {
			list(list){
				this.treeParams = Object.assign(this.treeParams, this.params);
				this.renderTreeList(list);
			}
		},
		methods: {
			//扁平化树结构
			renderTreeList(list=[], rank=0, parentId=[]){
				list.forEach(item=>{
					this.treeList.push({
						id: item.id,
						username: item.username,
						name: item.name,
						freeze: item.freeze,
						yeji: item.yeji,
						tdsl:item.tdsl,
						ekn_tr:item.ekn_tr,
						ekn_xqyj:item.ekn_xqyj,
						yeji2:item.yeji2,
						parentId,  // 父级id数组
						rank,  // 层级
						ztyeji:item.ztyeji,
						ths:item.ths,
						showChild: false,  //子级是否显示
						show: rank === 0  // 自身是否显示
					})
					if(Array.isArray(item.xj) && item.xj.length > 0){
						let parents = [...parentId];
						parents.push(item.id);
						this.renderTreeList(item.xj, rank+1, parents);
					}else{
						this.treeList[this.treeList.length-1].lastRank = true;
					}
				})
			},
			// 点击
			treeItemTap(item){
				if (item.rank == 2) return;
				let list = this.treeList;
				let id = item.id;
				// if(item.lastRank === true){
				// 	//点击最后一级时触发事件
				// 	this.$emit('treeItemClick', item);
				// 	return;
				// }
				item.showChild = !item.showChild;
				list.forEach(childItem=>{
					if(item.showChild === false){
						if(!childItem.parentId.includes(id)){
							return;
						}
						if(childItem.lastRank !== true){
							childItem.showChild = false;
						}
						childItem.show = false;
					}else{
						if(childItem.parentId[childItem.parentId.length-1] === id){
							childItem.show = true;
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/variable.scss';
	.content {
		overflow: hidden;
	}
	.mix-tree-list{
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
	}
	.mix-tree-item{
		display: flex;
		align-items: center;
		flex-direction: row;
		font-size: 30upx;
		color: $white;
		height: 0;
		opacity: 0;
		transition: .2s;
		position: relative;
		
		.innet-content {
			display: flex;
			justify-content: space-between;
			// flex-direction: column;
			align-items: center;
			width: 100%;
			.tree-user {
				// flex: 1;
				width: 220upx;
				text {
					padding: 4upx 10upx;
					background-color: rgba(45, 170, 255, .2);
					color: rgba(45, 170, 255, 1);
					font-size: 9px;
					margin-left: 30upx;
					border-radius: 4upx;
					margin-top: -2px;
				}
			}
			.tree-bottom {
				// width: 200upx;
				flex:1;
				// justify-content: space-between;
				
				margin-right: 18upx;
				// width: 100%;
				.tree-bottom-items{
					text-align: right;
					font-size: 12px;
					margin-top: 10upx;
				}
				.tree-bottom-item{
					flex-shrink: 1;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					font-size: 12px;
					view {
						flex-shrink: 1;
					}
					view+view {
						// margin-left: 40upx;
					}
				}
			}
		}
	}
	.mix-tree-item.border{
		border-bottom: 1px solid $split-line-color1;
	}
	.mix-tree-item.show{
		height: 100upx;
		opacity: 1;
		padding: 20upx 0;
		border-bottom: 1upx solid $split-line-color1;
	}
	.mix-tree-item.show.rank1 {
		height: 100upx;
	}
	.mix-tree-icon{
		width: 26upx;
		height: 26upx;
		margin-right: 8upx;
		opacity: .9;
	}
	
	.mix-tree-item.showchild:before{
		transform: rotate(90deg);
	}
	.mix-tree-item.last:before{
		opacity: 0;
	}
</style>
