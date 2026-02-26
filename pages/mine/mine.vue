<template>
	<view>
		<GlobalSidebar />
		<YppHeader :index="-1" />
		<view class="mine-box">
			<view class="mine-left">
				<view class="left-box">
					<view class="left-column">
						<view class="home">
							<view class="mine-img">
								<image :src="globalstore.upImageuler('/static/mine/my.png')" mode="widthFix"
									style="width: 100%;height: 24rpx;"></image>
							</view>
							<view class="selection" @click="showHome">我的首页</view>
						</view>
						<view class="deal">
							<view class="deal-inner" @click="changeShowMenu">
								<view class="mine-img">
									<image :src="globalstore.upImageuler('/static/mine/dollor.png')" mode="widthFix"
										style="width: 100%;height: 24rpx;"></image>
								</view>
								<view class="selection"
									style="display: flex;align-items: center;justify-content: space-between;width: 100%;">
									<view>我的交易</view>
									<uni-icons type="right" style="transition: all .5s ease;" :class="{roate : isShowMenu}"></uni-icons>
								</view>
							</view>
							<view class="menu" :class="{ show: isShowMenu }">
								<view class="choice" :class="{choiceActive: index == menuIndex}" @click="onMenuItem(index)"
									v-for="(item,index) in menuList">{{item.title}}</view>
							</view>
						</view>
						<view class="deal">
							<view class="deal-inner" @click="onSetting">
								<view class="mine-img">
									<image :src="globalstore.upImageuler('/static/mine/secic.png')" mode="widthFix"
										style="width: 100%;height: 24rpx;"></image>
								</view>
								<view class="selection"
									style="display: flex;align-items: center;justify-content: space-between;width: 100%;">
									<view>账户设置</view>
									<uni-icons type="right" style="transition: all .5s ease;" :class="{roate : isSetting}"></uni-icons>
								</view>
							</view>
							<view class="menu" :class="{ show: isSetting }">
								<view class="choice" :class="{choiceActive: index == settingIndex}" @click="onSettItem(index)"
									v-for="(item,index) in settingList">{{item.title}}</view>
							</view>
						</view>
					</view>
					<!-- <button class="publish-btn" @click="onPublish">发布商品</button> -->
				</view>
			</view>
			<view class="mine-right">
				<view class="my-home" v-if="isShowHome">
					<view class="my-home-left">
						<view class="asset">
							<view>资产</view>
							<view class="eye" @click="onAmount">
								<image
									:src="amount.isshow ? globalstore.upImageuler('/static/mine/open-eye.png') : globalstore.upImageuler('/static/mine/myeye.png')"
									mode="widthFix"></image>
							</view>
						</view>
						<view class="trade">
							<view><text>{{amount.assetAmount.totalAmount}}</text>交易金额(元)</view>
							<view><text>{{amount.assetAmount.totalCount}}</text>交易次数</view>
						</view>
						<view class="my-list">
							<view class="item">
								<view class="item-top">
									<view>我的钱包</view>
									<view class="look">
										<view @click="amount.getCertified(0)">{{userInfos.finishLevel ? '去提现' : '去认证' }}</view>
										<view>
											<image :src="globalstore.upImageuler('/static/mine/right.png')" mode="widthFix"></image>
										</view>
									</view>
								</view>
								<view class="item-bottom">
									<view v-if="userInfos.finishLevel">{{amount.isshow ? amount.myAmount : '******'}}</view>
									<view v-else>--</view>
									<view>账户余额(元)</view>
								</view>
								<view class="bgcolo1"></view>
							</view>
							<view class="item">
								<view class="item-top">
									<view>我的仓库</view>
									<view class="look">
										<view @click="amount.getCertified(1)">查看宝贝</view>
										<view>
											<image :src="globalstore.upImageuler('/static/mine/right.png')" mode="widthFix"></image>
										</view>
									</view>
								</view>
								<view class="item-bottom">
									<view>{{amount.isshow ? amount.wareAmount : '******'}}</view>
									<view>总库存估值(元)</view>
								</view>
								<view class="bgcolo2"></view>
							</view>
							<view class="item" style="width: calc(100% - 54% - 80rpx);">
								<view class="item-top">
									<view>寄售仓库</view>
									<view class="look">
										<view @click="amount.getCertified(2)">{{userInfos.finishLevel ? '查看仓库' : '去认证' }}</view>
										<view>
											<image :src="globalstore.upImageuler('/static/mine/right.png')" mode="widthFix"></image>
										</view>
									</view>
								</view>
								<view class="item-bottom">
									<view v-if="userInfos.finishLevel">{{amount.isshow ? amount.saleAmount : '******'}}</view>
									<view v-else>--</view>
									<view>库存总计(元)</view>
								</view>
								<view class="bgcolo3"></view>
							</view>
						</view>
					</view>
					<view class="my-home-right">
						<view class="right-top" @click="onEditInfo">
							<view class="aciver">
								<image :src="userInfos.avatar" mode="aspectFill"></image>
								<image v-if="userInfos.ifMember" class="absoult"
									:src="globalstore.upImageuler('/static/mine/vip-member-decoration.png')" mode="aspectFill"></image>
							</view>
							<view class="name">
								<view>{{userInfos.nickName}}</view>
								<view v-if="userInfos.ifMember">
									<view style="white-space: nowrap;">{{userLevel}}有效期至:{{ExpireDate}}</view>
									<view>
										<uni-icons type="right" size="12" color="#ABABAB"></uni-icons>
									</view>
								</view>
							</view>
						</view>
						<view class="right-bottom"
							:style="`background-image: url(${globalstore.upImageuler('/static/mine/rBgc.png')});`">
							<view class="vipcode">
								<view class="bgvip">
									<view class="bg-v">
										<image :src="globalstore.upImageuler('/static/mine/big-v.png')" mode="scaleToFill"></image>
									</view>
									<view style="white-space: nowrap;">{{userInfos.ifMember ? `共创会员码:${userInfos.inviterCode}` : '共创会员' }}
									</view>
									<view class="no" @click="onMemberNo">
										<image :src="globalstore.upImageuler('/static/mine/no.png')" mode="widthFix"></image>
									</view>
								</view>
								<view class="once">
									<view>{{userInfos.ifMember ? '立即邀请' : '	成为共创会员' }}</view>
									<view>
										<image :src="globalstore.upImageuler('/static/mine/right.png')" mode="widthFix"></image>
									</view>
								</view>
							</view>
							<view class="points" v-if="userInfos.ifMember">
								<view class="item">
									<view class="item-num">
										<view>已邀请人数</view>
										<view>
											<uni-icons type="down" size="12" color="#FDE9CF"></uni-icons>
										</view>
									</view>
									<view>{{userInfos.inviterCount}}</view>
								</view>
								<view class="item">
									<view class="item-num">
										<view>积分</view>
										<view>
											<uni-icons type="down" size="12" color="#FDE9CF"></uni-icons>
										</view>
									</view>
									<view>{{rewardPoint}}</view>
								</view>
							</view>
							<view v-else class="view-member">
								<image :src="globalstore.upImageuler('/static/mine/gouxuan.png')" mode="scaleToFill"></image>
								成为共创会员，邀请他人注册，分享发展红利
							</view>
						</view>
					</view>
				</view>

				<view class="edit" v-if="isEdit">
					<view class="avatar" @click="upEditInfo.upImage()">
						<image :src="upEditInfo.avatar ? upEditInfo.avatar : userInfos.avatar " mode="aspectFill"></image>
						<image :src="globalstore.upImageuler('/static/mine/jia.png')" mode="widthFix"></image>
					</view>
					<view class="nickName">
						<view>呢称</view>
						<view class="ipt">
							<input type="text" style="width: 100%;" :placeholder="userInfos.nickName" placeholder-class="placeholder"
								v-model="upEditInfo.nickName" />
							<uni-icons type="clear" color="#D8D8D8" size="20" style="cursor: pointer;" v-if="upEditInfo.nickName"
								@click="upEditInfo.nickName=''"></uni-icons>
						</view>
					</view>
					<button @click="upEditInfo.sure()" :disabled="!upEditInfo.avatar && !upEditInfo.nickName">确定</button>
				</view>

					
				<MyRelease v-if="isShowPurchase" :release="optionType" :is-step="optionStep"></MyRelease>
					
				<PopupInstruct></PopupInstruct>
				<AddMember :show="isAddShow" @close="unMemberNo"></AddMember>
				<MyAsset v-if="myAssetref.show" :type-index="myAssetref.typeIndex" @close="()=>myAssetref.close()"
					@addBank="()=>myAssetref.onAddBank()"></MyAsset>
				<AccountSetting v-if="isSetting" :setting-index="settingIndex" :isgetCertified="isgetCertified"
					@click="closeCer"></AccountSetting>
				<MyTransactions v-if="isShowMenu" :TransaIndex="menuIndex"></MyTransactions>
			</view>
		</view>
		<PopupModal :show='outLoginModal.show' title="是否确认退出登录" @close="outLoginModal.close()" @suer="outLoginModal.suer()">
		</PopupModal>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		watch,
		defineAsyncComponent
	} from 'vue';
	import {
		assets,
		balanceQuery,
		getInventoryList,
		marchant,
		editInfo,
		userInfo,
		outLogin,
		myTotalPoint,
		queryRealNameInfo
	} from '../../api/common';
	import {
		ProhibitScroll,
		TurnOnScrool
	} from '../../utils/scroll';
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		uploadImage
	} from '../../api/upload';
	import {
		useGlobalStore
	} from '../../store/store';
	// import purchaseVue from '../../components/purchase/purchase.vue';
	// import NewPurchase from '../../components/publish/NewPurchase.vue';
	// import MyRelease from '../../components/MyRelease/MyRelease.vue';

	const PopupInstruct = defineAsyncComponent(() =>
		import('../../components/PopupInstruct/PopupInstruct.vue')
	);

	const AddMember = defineAsyncComponent(() =>
		import('../../components/AddMember/AddMember.vue')
	);

	const AccountSetting = defineAsyncComponent(() =>
		import('../../components/AccountSetting/AccountSetting.vue')
	);

	const PopupModal = defineAsyncComponent(() =>
		import('../../components/PopupModal/PopupModal.vue')
	);

	const MyAsset = defineAsyncComponent(() =>
		import('../../components/MyAsset/MyAsset.vue')
	)

	const MyTransactions = defineAsyncComponent(() =>
		import('../../components/MyTransactions/MyTransactions.vue')
	)

	const MyRelease = defineAsyncComponent(() =>
		import('../../components/MyRelease/MyRelease.vue')
	)

	const globalstore = useGlobalStore()
	const isEdit = ref(false)
	const isShowMenu = ref(false)
	const isShowHome = ref(true)
	const isShowPurchase = ref(false)
	const rewardPoint = ref(0)
	const userLevel = ref('svip')
	const ExpireDate = ref('')
	const optionType = ref('')
	const optionStep = ref(false)

	const myAssetref = ref({
		show: false,
		typeIndex: 0,
		close() {
			this.show = false
			isShowHome.value = true
		},
		onAddBank() {
			this.show = false
			isSetting.value = true
			settingIndex.value = 0
			isgetCertified.value = 2
		}
	})

	const amount = ref({
		isshow: false,
		myAmount: '',
		wareAmount: '',
		saleAmount: '',
		assetAmount: {},
		getCertified(index) {
			if (!userInfos.value.finishLevel) {
				settingIndex.value = 0
				isgetCertified.value = 1
				onSetting()
				return
			} else {
				isShowHome.value = false
				Object.assign(myAssetref.value, {
					show: true,
					typeIndex: index
				})

			}
		}
	})

	const closeCer = () => {
		isgetCertified.value = 0
	}
	const isAddShow = ref(false)
	const isSetting = ref(false)
	const settingList = ref([{
		title: '账号与安全'
	}, {
		title: '收货地址'
	}, {
		title: '关于易品品'
	}, {
		title: '退出登录'
	}])
	const settingIndex = ref(0)
	const isgetCertified = ref(0)

	const menuList = ref([{
		title: '我买到的'
	}, {
		title: '我卖出的'
	}, {
		title: '我的议价'
	}, {
		title: '我的发布'
	}])

	const outLoginModal = ref({
		show: false,
		close() {
			this.show = false
			TurnOnScrool()
		},
		suer() {
			outLogin().then(res => {
				if (res.code == 200) {
					this.show = false
					uni.removeStorageSync('token')
					uni.removeStorageSync('userInfo')
					TurnOnScrool()
					uni.showToast({
						title: '成功退出',
						icon: 'none'
					})
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/index/index'
						})
					}, 1000)
				}
			})

		}

	})

	const menuIndex = ref(0)

	const userInfos = ref(uni.getStorageSync('userInfo'))

	watch(() => globalstore.userInfo, (newInfo) => {
		userInfos.value = newInfo
		getAmount()
	})

	const upEditInfo = ref({
		avatar: '',
		nickName: '',
		upImage() {
			uploadImage().then(res => {
				this.avatar = res[0].url
			})
		},
		sure() {
			let name = this.nickName
			if (!this.avatar) {
				this.avatar = userInfos.value.avatar
			}
			if (!this.nickName) {
				name = userInfos.value.nickName
			}
			editInfo({
				avatar: this.avatar,
				nickName: name
			}).then(res => {
				if (res.code == 200) {
					userInfo().then(res => {
						uni.setStorageSync('userInfo', res.user)
						userInfos.value = res.user
						globalstore.upUserInfo(res.user)
						this.avatar = ''
						this.nickName = ''
						uni.showToast({
							title: '修改成功',
							icon: 'none',
						})
					})
				}
			})
		}
	})

	const showHome = () => {
		isShowHome.value = true
		isEdit.value = false
		isShowPurchase.value = false
		isSetting.value = false
		isShowMenu.value = false
		myAssetref.value.show = false
	}

	const changeShowMenu = () => {
		// uni.showToast({
		// 	title: '敬请期待',
		// 	icon: 'none'
		// })
		isShowMenu.value = !isShowMenu.value
		isSetting.value = false
		isShowPurchase.value = false
		isShowHome.value = false
		isEdit.value = false
		myAssetref.value.show = false
	}

	const goHome = () => {
		isShowHome.value = true
	}

	const showProtocol = () => {
		isShowPurchase.value = false
		isShowProtocol.value = true
	}


	const getAmount = () => {
		marchant({
			userId: userInfos.value.userId
		}).then(res => {
			amount.value.assetAmount = res.data
		})
		assets().then(res => {
			amount.value.wareAmount = res.data
		})
		myTotalPoint().then(res => {
			rewardPoint.value = res.data
		})
		if (userInfos.value.finishLevel) {
			balanceQuery().then(res => {
				amount.value.myAmount = res.data.accountVOS[0].balanceAmt
			})
			getInventoryList().then(res => {
				amount.value.saleAmount = res.data.amount
			})
		}
	}

	const onMemberNo = () => {
		isAddShow.value = true
		ProhibitScroll()
	}

	const unMemberNo = () => {
		isAddShow.value = false
		TurnOnScrool()
	}

	const onAmount = () => {
		amount.value.isshow = !amount.value.isshow
	}

	const onSetting = () => {
		isSetting.value = !isSetting.value
		isShowHome.value = false
		isShowMenu.value = false
		isShowPurchase.value = false
		isEdit.value = false
		myAssetref.value.show = false
	}

	const onMenuItem = (index) => {
		menuIndex.value = index
	}

	const onSettItem = (index) => {

		if (index == 3) {
			outLoginModal.value.show = true
			ProhibitScroll()
		} else {
			settingIndex.value = index
		}
	}

	const onEditInfo = () => {
		uni.redirectTo({
			url: '/pages/mine/mine?type=edit'
		})
	}

	onMounted(() => {
		getAmount()

		queryRealNameInfo().then(res => {
			userLevel.value = res.data.reChargeMemberVO.userLevel
			ExpireDate.value = userLevel.value === 'svip' ? res.data.reChargeMemberVO.svipExpireDate : res.data
				.reChargeMemberVO.vipExpireDate
		})
		if ('requestIdleCallback' in window) {
			requestIdleCallback(() => {
				import('../../components/AccountSetting/AccountSetting.vue')
			}, {
				timeout: 2000
			});
		} else {
			setTimeout(() => {
				import('../../components/AccountSetting/AccountSetting.vue');
			}, 3000);
		}
	})

	onLoad((e) => {
		if (e.type === 'edit') {
			isEdit.value = true
			isShowHome.value = false
		} //修改头像
		else if (e.type === 'address') {
			isSetting.value = true
			settingIndex.value = 1
			isShowHome.value = false
		} //收货地址
		else if (e.type === 'mybought') {
			isShowHome.value = false
			isShowMenu.value = true
			menuIndex.value = 0
		} //我的订单
		else if (e.type === 'purchase' || e.type === 'sell') {
			optionType.value = e.type
			optionStep.value = e.cata ? true : false
			isShowHome.value = false
			isShowPurchase.value = true
		} //求购 出售
		else if(e.type === 'mypuList'){
			isShowHome.value = false
			isShowMenu.value = true
			menuIndex.value = 3
		}//发布列表
		else {}
	})
</script>

<style lang="scss" scoped>
	.mine-box {
		padding: 40rpx 13.5416667% 40rpx 13.5416667%;
		display: flex;
		justify-content: space-between;
		height: calc(100vh - 420rpx);
		min-height: 2000rpx;
		min-width: 2200rpx;
		.mine-left {
			width: 14.28571428571%;
			box-shadow: 0px 2px 12px 0px rgba(47, 83, 109, 0.08);
			border-radius: 16rpx;
			height: 100%;
			
			.left-box {
				padding: 48rpx 24rpx 0 24rpx;

				.mine-img {
					width: 15px;
					height: 12px;
					display: flex;
					align-items: center;
				}

				.left-column {
					padding-left: 28rpx;

					.selection {
						cursor: pointer;

						.roate {
							transform: rotate(90deg);
						}
					}

					.home,
					.deal-inner,
					.setting {
						font-size: #323232;
						font-weight: 600;
						display: flex;
						align-items: center;
						gap: 18rpx;
					}

					.home {
						padding-bottom: 20rpx;
					}

					.deal {
						.deal-inner {
							padding: 30rpx 0 20rpx 0;
						}

						.menu {
							// padding-left: 46rpx;
							overflow: hidden;
							transition: all 0.5s ease;
							max-height: 0;

							.choice {
								padding: 20rpx 46rpx;
								cursor: pointer;

							}

							.choiceActive {
								background: #FEFBEE;
								border-radius: 16rpx;
							}
						}

						.menu.show {
							max-height: 320rpx;
						}

					}

					.setting {
						padding-top: 40rpx;
					}

				}

				.publish-btn {
					height: 88rpx;
					margin-top: 102rpx;
					margin-bottom: 48rpx;
					background-color: #ffc400;
					color: #fff;
					font-size: 28rpx;
					border-radius: 16rpx;
					line-height: 88rpx;

					&::after {
						display: none;
					}
				}
			}
		}

		.mine-right {
			width: 84.28571%;
			box-shadow: 0px 2px 12px 0px rgba(47, 83, 109, 0.08);
			border-radius: 16rpx;
			height: 100%;
			position: relative;
			.my-home {
				width: 100%;
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 0 40rpx;

				.my-home-left {
					width: 68%;
					padding-top: 50rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;

					.asset {
						display: flex;
						align-items: center;
						font-weight: 600;
						font-size: 36rpx;
						gap: 16rpx;

						>view:last-child {
							display: flex;
							align-items: center;
							width: 36rpx;
							cursor: pointer;

							image {
								width: 100%;
								height: 36rpx;
							}
						}
					}

					.trade {
						margin: 16rpx 0 32rpx 0;
						display: flex;
						align-items: center;
						gap: 80rpx;

						>view {
							font-weight: 400;
							font-size: 24rpx;
							color: #ABABAB;
							display: flex;
							align-items: center;

							>text {
								margin-right: 8rpx;
								font-weight: 600;
								font-size: 32rpx;
								color: #2C2E3A;
							}
						}
					}

					.my-list {
						display: flex;
						gap: 40rpx;
						justify-content: space-between;

						.item {
							padding: 36rpx 24rpx;
							box-sizing: border-box;
							display: flex;
							flex-direction: column;
							gap: 34rpx;
							width: 27%;
							border-radius: 12rpx;
							border: 2rpx solid #FFE7D3;
							background-color: #fff;
							position: relative;

							.item-top {
								display: flex;
								align-items: center;
								justify-content: space-between;
								font-weight: 600;
								z-index: 1;

								.look {
									display: flex;
									align-items: center;
									gap: 16rpx;
									color: #FFC400;
									cursor: pointer;

									>view:last-child {
										display: flex;
										align-items: center;
										width: 16rpx;

										image {
											width: 100%;
											height: 16rpx;
										}
									}
								}
							}

							.item-bottom {
								display: flex;
								flex-direction: column;
								gap: 8rpx;
								z-index: 1;

								>view:first-child {
									font-weight: 600;
									font-size: 30rpx;
								}

								>view:last-child {
									font-weight: 400;
									font-size: 24rpx;
									color: #ABABAB;
								}
							}

							.bgcolo1 {
								position: absolute;
								top: 0;
								left: 0;
								width: 109px;
								height: 58px;
								background: #FFF0ED;
								border-radius: 0px 0px 0px 0px;
								filter: blur(25rpx);
							}

							.bgcolo2 {
								position: absolute;
								top: 0;
								left: 0;
								width: 99px;
								height: 53px;
								background: rgba(255, 195, 131, 0.48);
								border-radius: 0px 0px 0px 0px;
								filter: blur(35rpx);
							}

							.bgcolo3 {
								position: absolute;
								top: 0;
								left: 0;
								width: 129px;
								height: 71px;
								background: #F8FFED;
								border-radius: 0px 0px 0px 0px;
								filter: blur(25rpx);
							}
						}
					}
				}

				.my-home-right {
					width: calc(100% - 68% - 40rpx);
					background: #F8F8F8;
					box-shadow: 4rpx 4rpx 22rpx 0 rgba(44, 46, 58, 0.12);
					box-sizing: border-box;
					padding: 28rpx;
					display: flex;
					gap: 20rpx;
					flex-direction: column;

					.right-top {
						display: flex;
						align-items: center;
						gap: 10rpx;
						cursor: pointer;

						.aciver {
							width: 120rpx;
							height: 114rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							position: relative;

							>image:first-child {
								width: 98rpx;
								height: 98rpx;
								border-radius: 50%;
							}

							.absoult {
								border-radius: 0;
								position: absolute;
								inset: 0;
								width: 100%;
								height: 100%;
							}
						}

						.name {
							display: flex;
							flex-direction: column;
							gap: 16rpx;

							>view:first-child {
								font-weight: 600;
								font-size: 32rpx;
								color: #2C2E3A;
							}

							>view:last-child {
								font-weight: 400;
								font-size: 24rpx;
								color: #656565;
								display: flex;
								align-items: center;
								gap: 12rpx;

								>view:last-child {
									display: flex;
									align-items: center;
									justify-content: center;
								}
							}
						}
					}

					.right-bottom {
						background-size: 100% 100%;
						background-repeat: no-repeat;
						display: flex;
						box-sizing: border-box;
						flex-direction: column;
						padding: 28rpx 24rpx;
						gap: 26rpx;

						.vipcode {
							display: flex;
							align-items: center;
							justify-content: space-between;
							overflow: hidden;

							.bgvip {
								font-weight: 500;
								font-size: 24rpx;
								color: #67310D;
								display: flex;
								align-items: center;
								gap: 6rpx;
								background: linear-gradient(180deg, #FEEED7 0%, #FCD1A5 100%);
								border-radius: 6rpx;
								box-sizing: border-box;
								padding: 12rpx 10rpx 12rpx 54rpx;
								position: relative;

								.bg-v {
									position: absolute;
									width: 54rpx;
									top: 0;
									bottom: 0;
									left: -2rpx;

									image {
										width: 100%;
										height: 58rpx;
									}
								}

								.no {
									display: flex;
									align-items: center;
									width: 28rpx;
									cursor: pointer;

									image {
										width: 100%;
										height: 28rpx;
									}
								}
							}

							.once {
								font-weight: 600;
								font-size: 28rpx;
								color: #FFC400;
								display: flex;
								align-items: center;
								gap: 6rpx;
								cursor: pointer;
								white-space: nowrap;

								>view:last-child {
									width: 14rpx;
									display: flex;
									align-items: center;

									image {
										width: 100%;
										height: 20rpx;
									}
								}
							}
						}

						.points {
							display: flex;
							align-items: center;
							justify-content: space-between;
							gap: 40rpx;

							.item {
								padding: 16rpx;
								box-sizing: border-box;
								width: calc(50% - 20rpx);
								background-color: rgba(255, 255, 255, 0.2);
								border-radius: 12rpx;
								display: flex;
								flex-direction: column;
								gap: 12rpx;
								font-weight: 400;
								font-size: 24rpx;
								color: #FDE9CF;

								.item-num {
									display: flex;
									align-items: center;
									justify-content: space-between;

									>view:last-child {
										display: flex;
										align-items: center;
									}
								}
							}
						}

						.view-member {
							font-weight: 400;
							font-size: 24rpx;
							color: #FDE9CF;
							display: flex;
							align-items: center;

							image {
								width: 28rpx;
								height: 28rpx;
								margin-right: 4rpx;
							}
						}
					}
				}
			}

			.edit {
				padding: 80rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 120rpx;

				.avatar {
					width: 220rpx;
					white-space: 1/1;
					position: relative;

					>image:first-child {
						width: 220rpx;
						height: 220rpx;
						border-radius: 50%;
						cursor: pointer;
					}

					>image:last-child {
						position: absolute;
						bottom: 10rpx;
						right: 10rpx;
						width: 64rpx;
						height: 64rpx;
						cursor: pointer;
					}
				}

				.nickName {
					display: flex;
					flex-direction: column;
					gap: 20rpx;
					font-weight: 600;
					font-size: 28rpx;
					color: #2C2E3A;

					.ipt {
						padding: 20rpx;
						box-sizing: border-box;
						background: #FFFFFF;
						border-radius: 16rpx;
						border: 2rpx solid #D8D8D8;
						width: 864rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-weight: 400;
						font-size: 28rpx;

						.placeholder {
							font-weight: 400;
							font-size: 28rpx;
							color: #ABABAB;
						}
					}
				}

				>button {
					padding: 10rpx 148rpx;
					box-sizing: border-box;
					font-weight: 600;
					font-size: 34rpx;
					color: #FFFFFF;
					background: #FFC400;
					border-radius: 60rpx;

					&::after {
						border: none;
					}
				}
			}

			.publish-box {
				padding: 488rpx 27.2033898% 1032rpx 27.28813559%;
				display: flex;
				justify-content: space-between;

				.publish-content {
					text-align: center;
					display: flex;
					flex-direction: column;
					gap: 36rpx;
					padding: 114rpx 0;

					.icon {
						width: 92rpx;
						height: 92rpx;
						margin: 0 auto;
					}

					.publish-text {
						color: #fff;
						font-weight: 600;
						font-size: 40rpx;
					}
				}

				.purchase {
					width: 33.4796518%;
					height: 412rpx;
					background: #00B0F9;
					box-shadow: 3px 3px 12px 0px rgba(0, 176, 249, 0.4);
					border-radius: 10px 10px 10px 10px;
				}

				.purchase:hover {
					cursor: pointer;
				}

				.sale {
					width: 33.4796518%;
					height: 412rpx;
					background: #FF5354;
					box-shadow: 3px 3px 12px 0px rgba(255, 83, 84, 0.4);
					border-radius: 10px 10px 10px 10px;
				}

				.sale:hover {
					cursor: pointer;
				}
			}
		}
	}
</style>