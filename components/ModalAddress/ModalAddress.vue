<template>
	<view class="ModalAddress">
		<view class="address">
			<view>{{type}}收货地址</view>
			<view class="adddinfo">
				<view class="addfrom">
					<view class="fromItem">
						<view><span>*</span>收货人姓名</view>
						<view class="itemIpt">
							<input type="text" placeholder="输入真实姓名" placeholder-class="placeholder" v-model="addressdata.name"/>
						</view>
					</view>
					<view class="fromItem">
						<view><span>*</span>手机号</view>
						<view class="itemIpt">
							<input type="number" placeholder="输入手机号" maxlength="18" placeholder-class="placeholder" v-model="addressdata.mobile"/>
						</view>
					</view>
					<view class="fromItem">
						<view><span>*</span>所在地区</view>
						<view class="itemIpt">
							<input disabled type="text" placeholder="选择地区" placeholder-class="placeholder" v-model="addressdata.location"/>
							<uni-icons type="right" class="right" color="#ABABAB" :class="{rotate : isLoaction}"></uni-icons>
							<view class="invit" @click="onShowLoaction"></view>
							<region-selection v-if="isLoaction" style="width: 100%;top: 100%;left: 0;box-sizing: border-box;" @region="onAddres"></region-selection>
						</view>
					</view>
					<view class="fromItem" style="align-items: flex-start;">
						<view><span>*</span>详细地址</view>
						<view class="itemIpt">
							<textarea type="text" placeholder="输入详细地址" placeholder-class="placeholder" v-model="addressdata.address"/>
						</view>
					</view>
				</view>
				<view class="addradio">
					<image @click="addressdata.isDefault = !addressdata.isDefault" :src="addressdata.isDefault ? globalstore.upImageuler('/static/purchase/checked-w.png') : globalstore.upImageuler('/static/purchase/nochoose.png')" mode="widthFix"></image>
					<view>设置为默认收货地址</view>
				</view>
			</view>
			<view class="addbut">
				<view @click="close">取消</view>
				<view @click="suer">确定</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, watchEffect } from 'vue';
	import { useGlobalStore } from '../../store/store';
	import regionSelection from '../regionSelection/regionSelection.vue';
	const globalstore = useGlobalStore()
	const from = {
		name: '',
		mobile: '',
		location: '',
		address: '',
		value: [],
		isDefault: false,
		id: ''
	}
	const isLoaction = ref(false)
	const addressdata = ref({...from})
	const emit = defineEmits(['close','suer'])
	const props = defineProps({
		type: {
			type: String,
			default: '新增'
		},
		data: {
			type: Object,
			default: () =>({})
		}
	})
	
	watchEffect(()=>{
		if(Object.keys(props.data).length != 0) {
			Object.assign(addressdata.value,{
				name: props.data.receiverName,
				mobile: props.data.receiverPhone,
				location: props.data.province + ' ' + props.data.city + ' ' + props.data.district,
				address: props.data.detailAddress,
				value: [props.data.provinceCode,props.data.cityCode,props.data.districtCode],
				isDefault: props.data.isDefault,
				id: props.data.id
			})
		}
	})
	
	
	
	const onAddres = (e) =>{
		const add = []
		const val = []
		e.forEach(item=>{
			add.push(item.name)
			val.push(item.val)
		})
		addressdata.value.location = add.join(' ')
		addressdata.value.value = val
		if(add.length === 3) isLoaction.value = false
	}
	
	const onShowLoaction = () =>{
		isLoaction.value = !isLoaction.value
	}
	
	const close = () =>{
		emit('close')
	}
	
	const suer = () =>{
		if(!addressdata.value.name){
			uni.showToast({
				title: '请输入真实姓名',
				icon: 'none'
			})
			return
		}
		if(!addressdata.value.mobile){
			uni.showToast({
				title: '请输入手机号',
				icon: 'none'
			})
			return
		}
		if (!/^1[3-9]\d{9}$/.test(addressdata.value.mobile)) {
		    uni.showToast({
		      title: '手机号格式不正确',
		      icon: 'none'
		    })
		    return
		  }
		if(!addressdata.value.location){
			uni.showToast({
				title: '请选择地区',
				icon: 'none'
			})
			return
		}
		if(!addressdata.value.address){
			uni.showToast({
				title: '请输入详细地址',
				icon: 'none'
			})
			return
		}
		emit('suer',addressdata.value)
		emit('close')
	}

</script>

<style scoped lang="scss">
	.ModalAddress{
		position: fixed;
		inset: 0;
		background: rgba(44,46,58,0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;
		.address{
			width: 940rpx;
			padding: 40rpx 52rpx 60rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 16rpx;
			>view:first-child{
				font-weight: 600;
				font-size: 32rpx;
				color: #2C2E3A;
			}
			.adddinfo{
				margin: 28rpx 0 40rpx 0;
				display: flex;
				flex-direction: column;
				gap: 24rpx;
				.addfrom{
					display: flex;
					flex-direction: column;
					gap: 32rpx;
					.fromItem{
						display: flex;
						align-items: center;
						justify-content: space-between;
						>view:first-child{
							width: 20%;
							font-weight: 400;
							font-size: 14px;
							color: #2C2E3A;
							>span{
								color: #FF5500;
								
							}
						}
						.itemIpt{
							width: calc(100% - 20% - 20rpx);
							padding: 20rpx;
							box-sizing: border-box;
							background: #FFFFFF;
							border-radius: 16rpx;
							border: 2rpx solid #D8D8D8;
							display: flex;
							align-items: center;
							justify-content: space-between;
							position: relative;
							>input{
								width: 100%;
							}
							>textarea{
								height: 160rpx;
							}
							.placeholder{
								font-weight: 400;
								font-size: 28rpx;
								color: #ABABAB;
							}
							.invit{
							position: absolute;
							inset: 0;
							background-color: transparent;
							cursor: pointer;
						}
						.right{
							margin-left: 12rpx;
							transition: all .5s ease;
							cursor: pointer;
						}
						.rotate{
							transform: rotate(90deg);
						}
						}
					}
				}
				.addradio{
					display: flex;
					align-items: center;
					font-weight: 400;
					font-size: 30rpx;
					color: #2C2E3A;
					gap: 12rpx;
					>image{
						width: 32rpx;
						height: 32rpx;
						cursor: pointer;
					}
				}
			}
			.addbut{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				gap: 40rpx;
				>view{
					padding: 12rpx 60rpx;
					box-sizing: border-box;
					font-weight: 400;
					font-size: 28rpx;
					color: #2C2E3A;
					cursor: pointer;
				}
				>view:first-child{
					background: #FFFFFF;
					border-radius: 80rpx;
					border: 2rpx solid #D8D8D8;
				}
				>view:last-child{
					background: #FFC400;
					border-radius: 80rpx;
					border: 2rpx solid #FFC400;
					color: #FFFFFF;
					font-weight: 600;
				}
			}
		}
	}
</style>