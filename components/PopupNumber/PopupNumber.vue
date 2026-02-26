<template>
	<view class="PopupNumber" :class="{AcivePopupNumber : show}" >
		<form class="Number-form" @submit="formSubmit" @reset="formReset" v-if="is_but">
			<view class="Number">
				<view class="Number-top">
					<view class="title">
						<view>号码输入识别</view>
						<view @click="close">
							<image src="/static/close.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="input">
						<input type="number" disabled :placeholder="typeName" name="number"
							placeholder-style='font-weight: 400;font-size: 28rpx;color: #ABABAB;' />
					</view>
				</view>
				<view class="Number-center">
					<view class="center-title">
						<view>输入号码识别</view>
						<view>下面输入框内输入后8位冠号即可</view>
					</view>
					<view class="center-input">
						<view class="border-input" v-for="(item,index) in inputList" :style="{width: inputList.length > 1 ? 'calc(50% - 10rpx)' : '' }">
							<view>
								J0
							</view>
							<view>｜</view>
							<input type="number" v-model="item.value" :focus="index == inputIndex" @input="(event)=>onInput(event,index)" placeholder="请输入后8位冠号" :name="'input' + index"
								placeholder-style='font-weight: 400;font-size: 28rpx;color: #ABABAB;' maxlength="8" />
						</view>
					</view>
				</view>
				<view class="Number-bottom">
					<view>选择号码规格</view>
					<view class="bottom-content">
						<view class="loose">
							<radio-group class="radio-group" name="specs" @change="change">
								<label class="label" v-for="(item,index) in radio_list" :key="item.value">
									<view class="readio">
										<radio :value="item.value" style="transform: scale(0.7);" borderColor='#ABABAB'
											activeBackgroundColor='#FFC400' activeBorderColor='#FFC400' :checked="item.value == speceIndex" />
									</view>
									<view class="name">{{item.name}}</view>
								</label>
							</radio-group>
						</view>
						<view class="serial">
							<view class="readio">
								<view>
									<radio-group name="serialNumber">
										<radio style="transform: scale(0.7);" borderColor='#ABABAB' value="1"
											activeBackgroundColor='#FFC400' activeBorderColor='#FFC400' :checked="is_serial" @click="onSerial" />
									</radio-group>
								</view>
								<view>连号</view>
							</view>
							<view class="input">
								<input type="number" placeholder="输入数量" v-model="NumSeria" name="quantity" :disabled="!is_serial"
									placeholder-style='font-weight: 400;font-size: 28rpx;color: #ABABAB;' />
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="Button">
				<button hover-class="none" form-type="reset">重置号码</button>
				<button hover-class="none" form-type="submit">识别号码</button>
			</view>
		</form>
		<view class="Number-form" v-else>
			<view class="Number">
				<view class="Number-top">
					<view class="title">
						<view>号码输入识别</view>
						<view @click="close">
							<image src="/static/close.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="successNum">已识别冠号</view>
					<view class="successToatl" v-for="(item, index) in numList">
						<view class="top">
							<view>共识别到{{numList[index] ? numList[index].split('、').length : 0}}张</view>
							<view @click="unData(index)">
								<image src="/static/yellow_delete.png" mode="widthFix" style="width: 28rpx;"></image>
								<view>删除</view>
							</view>
						</view>
						<view>{{numList[index]}}</view>
					</view>
				</view>
			</view>
			<view class="Button">
				<button hover-class="none" @click="is_but = true">继续添加</button>
				<button hover-class="none" @click="emit('submit',numList)">合并号码</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		computed,
		getCurrentInstance,
		ref,
		watchEffect
	} from 'vue';
	import {recognitionText} from '../../api/common.js'
	
	const props = defineProps({
		show: {
			type: Boolean,
			default: false
		},
		typeName: {
			type: String,
			default: ''
		},
		bankNoteId: {
			type: String,
			default: ''
		}
	})
	
	const emit = defineEmits(['click','submit'])
	
	const close = () =>{
		emit('click',false)
	}
		
	const inputList = ref([{
		value:''
	}])
	const inputIndex = ref(0)
	
	const onInput = (e,index) =>{
		if (e.detail.value && e.detail.value.length === 8) {
			if (index === inputList.value.length - 1) {
				inputList.value.push({ value: '' });
				inputIndex.value = inputList.value.length - 1
			}
		}
		if (!e.detail.value || e.detail.value.length === 0) {
			inputIndex.value = index - 1;
			if (index < inputList.value.length - 1) {
				inputList.value.splice(index, 1);
			}
		}
	}
	const is_but = ref(true)
	const is_serial = ref(false)
	const radio_list = ref([{
			value: '1',
			name: '散钞',
			crownType: '1',
			joinNum: ''
		},
		{
			value: '2',
			name: '标十',
			crownType: '2',
			joinNum: ''
		},
		{
			value: '3',
			name: '标二十',
			crownType: '4',
			joinNum: ''
		},
		{
			value: '4',
			name: '标百',
			crownType: '3',
			joinNum: ''
		},
		{
			value: '5',
			name: '十连',
			crownType: '6',
			joinNum: '10'
		},
		{
			value: '6',
			name: '二十连',
			crownType: '6',
			joinNum: '20'
		},
		{
			value: '7',
			name: '百连',
			crownType: '6',
			joinNum: '100'
		},
		{
			value: '8',
			name: '捆货',
			crownType: '5',
			joinNum: ''
		},
	])
	
	const speceIndex = ref('1')
	const NumSeria = ref('')
	
	const change = (e) =>{
		speceIndex.value = e.detail.value
		is_serial.value = false
		NumSeria.value = ''
	}
	
	const onSerial = () =>{
		is_serial.value = true
		speceIndex.value = '0'
		// inputList.value = [{value:''}]
	}
	
	const numList = ref([])
	const num = computed(() => {
		return inputList.value.filter(item=> item.value && item.value.length === 8)
			   .map(item => 'J0' + item.value)
	})
	const formSubmit = (e) =>{
		if(is_serial.value){
			if(num.value === '') {
				uni.showToast({
					title: '请输入号码',
					icon: 'none'
				})
			}
			else {
				recognitionText({
					banknoteType: props.bankNoteId,
					crownNumbers: num.value.join('、'),
					crownType: '6',
					joinNum: NumSeria.value
				}).then(res=>{
					if(numList.value[0] === '') {
						numList.value.splice(0, 1)
					}
					numList.value.push(res.data.numberGroupList[0].numberList.join('、'))
					is_but.value = false
				})
			}
		}
		else if(speceIndex.value != '0') {
			if(num.value === '') {
				uni.showToast({
					title: '请输入号码',
					icon: 'none'
				})
			}
			else {
				recognitionText({
					banknoteType: props.bankNoteId,
					crownNumbers: num.value.join('、'),
					crownType: radio_list.value[speceIndex.value-1].crownType,
					joinNum: radio_list.value[speceIndex.value-1].joinNum
				}).then(res=>{
					if(numList.value[0] === '') {
						numList.value.splice(0, 1)
					}
					for(let i = 0; i < res.data.numberGroupList.length; i++) {
						numList.value.push(res.data.numberGroupList[i].numberList.join('、'))
					}
					is_but.value = false
				})
			}
		}
		else{
			const errList = []
			inputList.value.forEach(item=>{
				if(item.value.length !== 8){
					errList.push(item.value)
				}
			})
			if(errList != 0){
				uni.showToast({
					title: errList.join(',') + '格式错误',
					icon: 'none'
				})
				return
			}
			numList.value = inputList.value.filter(item=> item.value && item.value.length === 8)
							.map(item => 'J0' + item.value).split('、')
			is_but.value = false
		}
		
	}
	
	const formReset = (e) =>{
		inputList.value.length = 1
		speceIndex.value = '1'
		// uni.showToast({
		// 	title: '已重置',
		// 	icon: 'none'
		// })
	}
	
	defineExpose({
		formReset
	})
	
	const unData = (index) =>{
		uni.showModal({
			content:'确定删除吗？',
			success: (res)=>{
				if(res.confirm && index === 0 && numList.value.length === 1) numList.value[index] = ''
				if(res.confirm && numList.value.length != 1) numList.value.splice(index, 1)
			},
		})
		
	}
</script>

<style scoped lang="scss">
	.AcivePopupNumber{
		right: 13.5% !important;
	}
	.PopupNumber {
		// width: 19.53125%;
		width: 750rpx;
		height: calc(100vh - 268rpx);
		min-height: 1440rpx;
		background: #F8F8F8;
		box-shadow: -12rpx 0 24rpx 0 rgba(47, 83, 109, 0.08);
		border-radius: 16rpx;
		position: fixed;
		top: 172rpx;
		right: -100%;
		padding: 32rpx 28rpx;
		box-sizing: border-box;
		transition: all 1s ease;
		z-index: 10;
		.Number-form {
			width: 100%;

			.Number {
				display: flex;
				flex-direction: column;
				gap: 36rpx;
				width: 100%;

				.Number-top {
					display: flex;
					flex-direction: column;
					gap: 24rpx;

					.title {
						display: flex;
						align-items: center;
						justify-content: space-between;

						>view:first-child {
							font-weight: 600;
							font-size: 32rpx;
							color: #656565;
							margin: 0 14rpx;
						}

						>view:last-child {
							width: 36rpx;
							display: flex;
							align-items: center;
							cursor: pointer;
							image {
								width: 100%;
							}
						}
					}

					.input {
						padding: 30rpx 20rpx;
						box-sizing: border-box;
						width: 100%;
						background: #FFFFFF;
						border-radius: 12rpx;

						input {
							width: 100%;

						}
					}
					.successNum{
						font-weight: 600;
					}
					
					.successToatl{
						background-color: #FFF;
						padding: 36rpx 24rpx;
						box-sizing: border-box;
						border-radius: 10rpx;
						.top{
							display: flex;
							width: 100%;
							align-items: center;
							justify-content: space-between;
							font-weight: 600;
							margin-bottom: 28rpx;
							>view:first-child{
								color: #BF7D00;
							}
							>view:last-child{
								display: flex;
								align-items: center;
								color: #FFC400;
								gap: 4rpx;
								cursor: pointer;
								>image{
									width: 28rpx;
								}
							}
						}
						>view:last-child {
							max-height: 250rpx;
							overflow: hidden;
							overflow-y: auto;
						}
					}
				}

				.Number-center {
					display: flex;
					flex-direction: column;
					gap: 12rpx;

					.center-title {
						display: flex;
						flex-direction: column;
						gap: 8rpx;
						font-weight: 600;

						>view:last-child {
							font-weight: 400;
							font-size: 24rpx;
							color: #C2C2C2;
						}
					}
					.center-input::-webkit-scrollbar{
						display: none;
					}
					.center-input {
						width: 100%;
						background: #FFFFFF;
						border-radius: 10rpx;
						border: 2rpx solid #DFE0E3;
						box-sizing: border-box;
						aspect-ratio: 2.0654762/1;
						padding: 36rpx 28rpx;
						display: flex;
						justify-content: space-between;
						align-content: flex-start;
						flex-wrap: wrap;
						gap: 20rpx 0;
						overflow-y: scroll;
						scrollbar-width: none;
						-ms-overflow-style: none;
						.border-input {
							padding: 20rpx 16rpx;
							box-sizing: border-box;
							background: #F8F8F8;
							box-shadow: inset 2rpx 2rpx 2rpx 0 rgba(0, 0, 0, 0.06), inset -2rpx -2rpx 2rpx 0 rgba(0, 0, 0, 0.02);
							border-radius: 12rpx;
							display: flex;
							align-items: center;
							font-weight: 400;
							font-size: 24rpx;
							color: #ABABAB;
							height: 84rpx;
							>view:first-child {
								font-weight: 600;
								font-size: 26rpx;
							}

							input {
								color: #2C2E3A;
								width: 80%;
							}
						}
					}
				}

				.Number-bottom {
					display: flex;
					flex-direction: column;
					gap: 16rpx;

					>view:first-child {
						font-weight: 600;
					}

					.bottom-content {
						display: flex;
						flex-direction: column;
						gap: 20rpx;

						.loose {
							width: 100%;
							box-sizing: border-box;
							padding: 36rpx 24rpx;
							background: #FFFFFF;
							border-radius: 12rpx;

							.radio-group {
								display: flex;
								flex-wrap: wrap;
								justify-content: space-between;
								width: 100%;
								gap: 60rpx 0;

								.label {
									width: 25%;
									display: flex;
									align-items: center;

									.radio {
										display: flex;
										align-items: center;
									}

									.name {
										font-weight: 600;
									}
								}



							}
						}

						.serial {
							width: 100%;
							box-sizing: border-box;
							padding: 36rpx 24rpx;
							background: #FFFFFF;
							border-radius: 12rpx;
							display: flex;
							flex-direction: column;
							gap: 28rpx;

							.readio {
								display: flex;
								align-items: center;
								font-weight: 600;

								>view:first-child {
									display: flex;
									align-items: center;
								}
							}

							.input {
								padding: 26rpx;
								box-sizing: border-box;
								background: #F8F8F8;
								border-radius: 6px 6px 6px 6px;
							}
						}
					}
				}
			}

			.Button {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 30rpx;
				margin-top: 60rpx;
				gap: 54rpx;
				>button:first-child {
					width: 46%;
					background: #FFFFFF;
					border-radius: 50rpx;
					border: 2rpx solid #D8D8D8;
					box-sizing: border-box;
				}

				>button:last-child {
					width: 46%;
					background: #FFC400;
					border: 2rpx solid #FFC400;
					border-radius: 50rpx;
					box-sizing: border-box;
					color: #FFF;
				}
				button:after{
					border: none;
				}
			}
		}
	}
</style>