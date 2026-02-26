<template>
	<view class="PopupBank" :style="{right: right}">
		<view class="lable-top">
			<view>选择银行</view>
			<view>
				<image :src="globalstore.upImageuler('/static/close.png')" mode="widthFix" @click="close"></image>
			</view>
		</view>
		<view class="bankType">
			<view @click="onTap">{{Object.keys(selectBanks.headOfficeBank).length ? selectBanks.headOfficeBank.headOfficeBankName : '总行' }}</view>
			<image :src="globalstore.upImageuler('/static/purchase/yellow_kuozhan.png')" mode="widthFix"></image>
			<view>支行</view>
		</view>
		<view class="select">选择{{isBank ? '总行' : '支行'}}</view>
		<view class="search">
			<uni-icons style="margin-right: 20rpx;cursor: pointer;" type="search" color="#ABABAB" size="20"></uni-icons>
			<input v-if="isBank" type="text" placeholder="请输入匹配总行" placeholder-class="placeholder" v-model="searchInput"/>
			<input v-else type="text" placeholder="请输入匹配支行" placeholder-class="placeholder" v-model="subInput"/>
			<view>搜索</view>
		</view>
		<view class="bankList">
			<view v-if="isBank" style="width: 100%;">
				<view class="bankItem" v-for="(item,index) in filteredBankList" @click="onSelect(item)">
					<view>{{item.headOfficeBankName}}</view>
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
			<view v-else style="width: 100%;">
				<view class="bankItem" v-for="(item,index) in subbranchBankList" @click="onSub(item)">
					<view>{{item.bankBranchName}}</view>
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
			<view class="nohave">
				<view class="line"></view>
				<view>没有更多了</view>
				<view class="line"></view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { computed, nextTick, onMounted, ref, watchEffect } from 'vue';
	import { useGlobalStore } from '../../store/store';
	import { headBankList} from '../../utils/banklist';
	import { selectByHeadOfficeCodeAndCity } from '../../api/common';
	const right = ref('-100%')
	
	const props = defineProps({
		city: {
			type: String,
			required: true
		}
	})
	
	watchEffect(()=>{
		nextTick(()=>{
			right.value = '20%'
		})
		
	})
		
	const emit = defineEmits(['close','click'])
		
	const globalstore = useGlobalStore()
	const searchInput = ref('')
	const subInput = ref('')
	const isBank = ref(true)
	const selectBanks = ref({
		headOfficeBank: {},
		bankBranch: {}
	})
	const subbranch = ref({})
		
	const filteredBankList = computed(() => {
	  if (!searchInput.value) return headBankList;
	  const keywords = searchInput.value.trim().split(/\s+/);
	  const regex = new RegExp(keywords.map(k => escapeRegExp(k)).join('.*'), 'i');
	  return headBankList.filter(bank => regex.test(bank.headOfficeBankName));
	});
	
	const subbranchBankList = computed(()=>{
		if(!subInput.value) return subbranch.value
		const keywords = subInput.value.trim().split(/\s+/);
		const regex = new RegExp(keywords.map(k => escapeRegExp(k)).join('.*'), 'i');
		return subbranch.value.filter(bank => regex.test(bank.bankBranchName));
	})
	
	function escapeRegExp(string) {
	  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	const onSelect = (item) =>{
		selectBanks.value.headOfficeBank = item
		selectByHeadOfficeCodeAndCity({
			city: props.city,
			headOfficeBankCode: item.headOfficeBankCode
		}).then(res=>{
			subbranch.value = res.data
			isBank.value = false
		})
	}
	
	const onSub = (item) =>{
		selectBanks.value.bankBranch = item
		emit('click',selectBanks.value)
		right.value = '-30%'
		setTimeout(()=>{
			emit('close')
		},500)
		
	}
	
	const close = () =>{
		right.value = '-30%'
		setTimeout(()=>{
			emit('close')
		},500)
	}
	
	const onTap = () =>{
		isBank.value = true
		subbranch.value = {}
	}
	
</script>

<style scoped lang="scss">
	.PopupBank{
		position: fixed;
		right: -20%;
		top: 172rpx;
		width: 750rpx;
		height: calc(100vh - 268rpx);
		background: #F8F8F8;
		box-shadow: -12rpx 0 24rpx 0 rgba(47,83,109,0.08);
		border-radius: 16rpx;
		box-sizing: border-box;
		transition: all .5s ease;
		padding: 32rpx 28rpx;
		
		.lable-top{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 24rpx;
			>view:first-child{
				margin-left: 14rpx;
				font-weight: 600;
				font-size: 32rpx;
				color: #656565;
			}
			>view:last-child{
				width: 36rpx;
				display: flex;
				align-items: center;
				image{
					width: 100%;
					cursor: pointer;
				}
			}
		}
		
		.bankType{
			display: flex;
			align-items: center;
			gap: 10rpx;
			font-weight: 600;
			font-size: 32rpx;
			color: #FFC400;
			>image{
				width: 80rpx;
				height: 12rpx;
			}
			>view{
				cursor: pointer;
			}
		}
		
		.select{
			font-weight: 600;
			font-size: 30rpx;
			color: #ABABAB;
			margin-top: 24rpx;
		}
		
		.search{
			padding: 30rpx 44rpx;
			box-sizing: border-box;
			background: #fff;
			border-radius: 20rpx;
			width: 100%;
			margin: 24rpx 0;
			font-weight: 400;
			font-size: 28rpx;
			color: #2C2E3A;
			display: flex;
			justify-content: space-between;
			align-items: center;
			>input{
				width: 100%;
			}
			>view{
				white-space: nowrap;
				padding-left: 20rpx;
				margin-left: 20rpx;
				cursor: pointer;
				color: #FFC400;
				font-weight: 600;
				line-height: 32rpx;
				border-left: 2rpx solid #F8F8F8;
			}
		}
		
		.bankList{
			display: flex;
			align-items: center;
			flex-direction: column;
			overflow-y: scroll;
			height: calc(100vh - 664rpx);
			.bankItem{
				background-color: #fff;
				box-sizing: border-box;
				display: flex;
				width: 100%;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx;
				border-bottom: 2rpx solid #F3F3F3;
				cursor: pointer;
			}
			.nohave{
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #ABABAB;
				width: 100%;
				gap: 20rpx;
				padding: 40rpx;
				font-weight: 600;
				.line{
					height: 2rpx;
					background-color: #ccc;
					width: 14%;
				}
			}
		}
	}

</style>