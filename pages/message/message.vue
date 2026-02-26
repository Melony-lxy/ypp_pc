<template>
	<view class="message">
		<YppHeader :index="4" />
		<global-sidebar></global-sidebar>
		<view class="container">
			<view class="content">
				<view class="IMlfet">
					<view>消息列表</view>
					<view class="list">
						<view class="item" v-for="(item,index) in chatList" :class="{active: chatId === item.userProfile.userID}"
							@click="onChat(item)">
							<image :src="item.userProfile.avatar" mode="aspectFill"></image>
							<view class="msg-info">
								<view class="msg-name">
									<view>{{item.userProfile.nick}}</view>
									<view>{{item.timeTap}}</view>
								</view>
								<view class="msg-child">
									<view class="text">{{item.lastText}}</view>
									<view class="number" v-if="item.unreadCount">{{item.unreadCount}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="IMright">
					<view class="chat" v-if="chatId !== ''">
						<view class="chat-top">
							<view>{{chatNick}}</view>
							<view class="shop">
								<image src="/static/purchase/she-b.jpg" mode="aspectFit"></image>
								<view class="shop-right">
									<view>
										2024年贺岁纪念钞
										<uni-icons type="right" color="#ABABAB" size="16"></uni-icons>
									</view>
									<view>详细描述信息打卡发卡拉斯罚款发送</view>
									<view>2888.00</view>
								</view>
							</view>
						</view>
						<view class="chat-continer">
							<scroll-view style="width: 100%;height: 100%;" scroll-y @scrolltoupper="scrolltoupper"
								:show-scrollbar="false" :scroll-into-view="scrollId">
								<view class="chat-list">
									<view class="chat-conten" v-for="(item,index) in msgList" :id="item.msgId">
										<view class="time" v-if="isShowTime(index)">{{formatTimestamp(item.time)}}</view>
										<view class="chat-item" :class="{'flex-end': item.flow === 'out'}">
											<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
											<!-- 文本 -->
											<view class="text" v-if="TencentCloudChat.TYPES.MSG_TEXT === item.type">{{item.payload.text}}
											</view>
											<!-- TencentCloudChat.TYPES.MSG_TEXT	TIMTextElem	文本消息
											TencentCloudChat.TYPES.MSG_IMAGE	TIMImageElem	图片消息
											TencentCloudChat.TYPES.MSG_SOUND	TIMSoundElem	音频消息（已废弃，请使用 TencentCloudChat.TYPES.MSG_AUDIO ）
											TencentCloudChat.TYPES.MSG_AUDIO	TIMSoundElem	音频消息
											TencentCloudChat.TYPES.MSG_VIDEO	TIMVideoFileElem	视频消息
											TencentCloudChat.TYPES.MSG_FILE	TIMFileElem	文件消息
											TencentCloudChat.TYPES.MSG_CUSTOM	TIMCustomElem	自定义消息
											TencentCloudChat.TYPES.MSG_MERGER	TIMRelayElem	合并消息
											TencentCloudChat.TYPES.MSG_LOCATION	TIMLocationElem	位置消息
											TencentCloudChat.TYPES.MSG_FACE	TIMFaceElem	表情消息
											TencentCloudChat.TYPES.MSG_GRP_TIP	TIMGroupTipElem	群提示消息
											TencentCloudChat.TYPES.MSG_GRP_SYS_NOTICE	TIMGroupSystemNoticeElem	群系统通知消息 -->
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
						<view class="chat-bottom">
							<view class="imgBut">
								<image src="/static/sidebar/chat1.png" mode="widthFix"></image>
								<image src="/static/sidebar/chat2.png" mode="widthFix"></image>
								<image src="/static/sidebar/chat3.png" mode="widthFix"></image>
							</view>
							<view class="text">
								<textarea name="text" maxlength="10000" placeholder="请输入消息，按Enter键发送或点击发送按钮发送" placeholder-class="placeholder"
									v-model="textValue" @keydown="handleKeydown"></textarea>
								<button form-type="submit">发送</button>
							</view>
						</view>
					</view>
					<view class="no-contacts" v-else>
						<image src="/static/sidebar/no_contacts.png" mode="widthFix"></image>
						<view>尚未选择任何联系人</view>
						<view>快点左侧列表聊起来吧～</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		nextTick,
		onMounted,
		ref
	} from 'vue';
	import {
		chat
	} from '../../utils/chat';
	import {
		formatTimestamp
	} from '../../utils/common';
	import TencentCloudChat from '@tencentcloud/lite-chat';
	import {
		onReady,
		onLoad
	} from '@dcloudio/uni-app'

	const chatList = ref(null)
	const chatId = ref('')
	const chatNick = ref('')
	const msgList = ref([])
	const nextId = ref('')
	const scrollId = ref('')
	const textValue = ref('')

	const getChatList = async () => {
		try {
			uni.showLoading({
				title: '加载中...'
			})
			const login = await chat.login()
			console.log(login);
			if (login.data.actionStatus === 'OK') {
				setTimeout(() => {
					chat.getList().then(res => {
						const data = res.data.conversationList
						chatList.value = data.map(item => ({
							...item,
							timeTap: formatTimestamp(item.lastMessage.lastTime),
							lastText: chat.showLastMessage(item.lastMessage)
						}))
						console.log(chatList.value);
						uni.hideLoading()
					}).catch((err) => {
						console.error(err);
						// uni.hideLoading()
					})
				}, 500)

			}
		} catch (err) {
			console.log(err);
			// uni.hideLoading()
		}

	}

	const onChat = async (e) => {
		chatId.value = e.userProfile.userID
		chatNick.value = e.userProfile.nick
		nextId.value = ''
		msgList.value.length = 0
		getChatInfo(e.userProfile.userID, nextId.value)
	}

	const getChatInfo = (userId, nextReqMessageID) => {
		chat.getChatList({
			conversationID: `C2C${userId}`,
			nextReqMessageID
		}).then((res) => {
			console.log(res.data);
			nextId.value = res.data.nextReqMessageID
			res.data.messageList.forEach(item => {
				item.msgId = 'msg' + item.ID
			})
			msgList.value = [...res.data.messageList, ...msgList.value]
			if (nextReqMessageID === '') setTimeout(() => scrollId.value = msgList.value[msgList.value.length - 1].msgId)
		})
	}

	const onSend = (e) => {
		if(textValue.value === '') return
		chat.sendMsg({
			to: chatId.value,
			conversationType: TencentCloudChat.TYPES.CONV_C2C,
			payload: {
				text: textValue.value
			},
			needReadReceipt: true
		}).then((res) => {
			updateChat(res.data.message)
		}).catch((err) => {
			console.error(err);
		})
	}
	
	function handleKeydown(event){
		if(event.key === 'Enter'){
			if(event.shiftKey){
				return
			}
			event.preventDefault()
			onSend()
		}
	}
	
	function updateChat(message) {
		textValue.value = ''
		updatemsgList(message)
		chat.getList().then(res => {
			const data = res.data.conversationList
			chatList.value = data.map(item => ({
				...item,
				timeTap: formatTimestamp(item.lastMessage.lastTime),
				lastText: chat.showLastMessage(item.lastMessage)
			}))
		}).catch((err) => {
			console.log(err);
		})
	}

	function updatemsgList(message) {
		message.msgId = 'msg' + message.ID
		msgList.value.push(message)
		setTimeout(() => scrollId.value = msgList.value[msgList.value.length - 1].msgId)
	}

	function isShowTime(index) {
		if (index === 0) return true;
		const currentMsg = msgList.value[index];
		const prevMsg = msgList.value[index - 1];
		const currentTime = String(currentMsg.time).length === 10 ?
			currentMsg.time * 1000 :
			currentMsg.time;
		const prevTime = String(prevMsg.time).length === 10 ?
			prevMsg.time * 1000 :
			prevMsg.time;
		const timeDiff = (currentTime - prevTime) / 1000;
		return timeDiff > 300;
	}

	const scrolltoupper = () => {
		if (nextId.value === '') return
		getChatInfo(chatId.value, nextId.value)
	}

	onMounted(() => {
		getChatList()
	})
</script>

<style scoped lang="scss">
	.message {

		.container {
			width: 100%;
			background-color: #FDFDFD;
			padding: 40rpx 13.5% 60rpx 13.5%;
			box-sizing: border-box;
			display: flex;
			justify-content: center;

			.content {
				width: 100%;
				height: calc(100vh - 232rpx);
				min-width: 1920rpx;
				max-width: 3200rpx;
				min-height: 1600rpx;
				background: #F8F8F8;
				box-shadow: 0px 2px 12px 0px rgba(47, 83, 109, 0.08);
				border-radius: 16rpx;
				display: flex;

				.IMlfet {
					width: 27%;
					height: 100%;
					display: flex;
					flex-direction: column;
					gap: 20rpx;
					overflow: hidden;
					background: #FFFFFF;
					box-shadow: 0px 2px 12px 0px rgba(47, 83, 109, 0.08);
					border-radius: 16rpx;
					padding: 28rpx 0;
					box-sizing: border-box;

					>view:first-child {
						padding: 0 28rpx;
						box-sizing: border-box;
						font-size: 36rpx;
						font-weight: 600;
						color: #2c2e3a;
					}

					.list {
						width: 100%;
						height: 100%;
						overflow-y: auto;
						scrollbar-width: none;

						.item {
							display: flex;
							align-items: center;
							justify-content: space-between;
							gap: 20rpx;
							padding: 24rpx 28rpx;
							box-sizing: border-box;
							width: 100%;
							cursor: pointer;

							>image {
								width: 98rpx;
								height: 98rpx;
								border-radius: 50%;
							}

							.msg-info {
								display: flex;
								flex-direction: column;
								justify-content: center;
								gap: 16rpx;
								flex: 1;
								overflow: hidden;

								.msg-name {
									display: flex;
									align-items: center;
									justify-content: space-between;
									gap: 16rpx;

									>view:first-child {
										font-weight: 400;
										font-size: 32rpx;
										color: #2C2E3A;
										line-height: 32rpx;

									}

									>view:last-child {
										font-weight: 400;
										font-size: 24rpx;
										color: #ABABAB;
										line-height: 24rpx;
									}
								}

								.msg-child {
									display: flex;
									align-items: center;
									justify-content: space-between;
									gap: 16rpx;
									width: 100%;

									.text {
										flex: 1;
										font-weight: 400;
										font-size: 28rpx;
										color: #ABABAB;
										line-height: inherit;
										overflow: hidden;
										white-space: nowrap;
										text-overflow: ellipsis;
									}

									.number {
										width: 34rpx;
										height: 34rpx;
										display: flex;
										align-items: center;
										justify-content: center;
										font-weight: 400;
										font-size: 24rpx;
										color: #FFFFFF;
										line-height: 18rpx;
										background: #FF5500;
										border-radius: 50%;
									}
								}
							}
						}

						.active {
							background: #FEF9EB;
						}
					}
				}

				.IMright {
					width: calc(100% - 27%);
					height: 100%;
					background: #F8F8F8;
					box-shadow: 0px 2px 12px 0px rgba(47, 83, 109, 0.08);
					border-radius: 0 16rpx 16rpx 0;
					position: relative;
					overflow: hidden;

					.no-contacts {
						position: absolute;
						top: 10%;
						left: 50%;
						transform: translateX(-50%);
						display: flex;
						flex-direction: column;
						align-items: center;
						gap: 24rpx;

						>image {
							width: 210rpx;
							height: 224rpx;
						}

						>view:nth-child(2) {
							font-weight: 400;
							font-size: 32rpx;
							color: #2C2E3A;
							line-height: 32rpx;
						}

						>view:last-child {
							font-weight: 400;
							font-size: 28rpx;
							color: #ABABAB;
							line-height: 28rpx;
						}
					}

					.chat {
						display: flex;
						flex-direction: column;
						height: 100%;

						.chat-top {
							padding: 44rpx 40rpx;
							box-sizing: border-box;
							background-color: #FFFFFF;
							display: flex;
							flex-direction: column;
							gap: 26rpx;

							>view:first-child {
								font-weight: 500;
								font-size: 32rpx;
								color: #2C2E3A;
							}

							.shop {
								display: flex;
								gap: 12rpx;

								>image {
									width: 128rpx;
									height: 128rpx;
									border-radius: 12rpx;
									background-color: #F8F8F8;
								}

								.shop-right {
									display: flex;
									flex-direction: column;
									justify-content: space-between;
									gap: 8rpx;

									>view:first-child {
										display: flex;
										align-items: center;
										gap: 8rpx;
										font-weight: 500;
										font-size: 28rpx;
										color: #2C2E3A;
										cursor: pointer;
									}

									>view:nth-child(2) {
										font-weight: 400;
										font-size: 24rpx;
										color: #656565;
									}

									>view:last-child {
										font-weight: 600;
										font-size: 32rpx;
										color: #2C2E3A;

										&::before {
											content: '¥';
											font-size: 24rpx;
										}
									}
								}
							}
						}

						.chat-continer {
							flex: 1;
							overflow: hidden;
							padding: 60rpx 40rpx;
							box-sizing: border-box;

							.chat-list {
								display: flex;
								flex-direction: column;
								gap: 40rpx;
								width: 100%;

								.chat-conten {
									display: flex;
									flex-direction: column;
									gap: 20rpx;

									.time {
										display: flex;
										align-items: center;
										justify-content: center;
										font-size: 24rpx;
										line-height: 24rpx;
										color: #ABABAB;
									}

									.chat-item {
										display: flex;
										gap: 16rpx;

										.avatar {
											width: 80rpx;
											height: 80rpx;
											border-radius: 50%;
											background-color: #FFFFFF;
											order: 1;
										}

										.text {
											max-width: 45%;
											padding: 16rpx 24rpx;
											box-sizing: border-box;
											font-weight: 400;
											font-size: 32rpx;
											color: #141C20;
											line-height: 48rpx;
											border-radius: 12rpx;
											background: #FFFFFF;
											order: 2;
										}
									}

									.flex-end {
										justify-content: flex-end;

										.avatar {
											order: 2;
										}

										.text {
											order: 1;
										}
									}
								}

							}
						}

						.chat-bottom {
							border-top: 2rpx solid #D8D8D8;
							display: flex;
							flex-direction: column;
							gap: 20rpx;
							padding: 24rpx 40rpx;
							box-sizing: border-box;

							.imgBut {
								display: flex;
								align-items: center;
								gap: 60rpx;

								>image {
									width: 52rpx;
									height: 52rpx;
									cursor: pointer;
								}
							}

							.text {
								display: flex;
								flex-direction: column;
								gap: 10rpx;
								width: 100%;
								>textarea {
									padding: 12rpx 0;
									box-sizing: border-box;
									width: 100%;
									height: 160rpx;
									font-weight: 400;
									font-size: 28rpx;
									color: #2C2E3A;
									word-break: break-word;
								}

								.placeholder {
									font-weight: 400;
									font-size: 14px;
									color: #ABABAB;
								}

								>button {
									margin: 0 0 0 auto;
									font-weight: 600;
									font-size: 26rpx;
									color: #FFFFFF;
									line-height: 26rpx;
									padding: 14rpx 54rpx;
									box-sizing: border-box;
									background: #FFC400;
									border-radius: 26rpx;

									&::after {
										display: none;
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>