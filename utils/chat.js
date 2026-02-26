import TencentCloudChat from '@tencentcloud/lite-chat';

class TencentChatManager{
	constructor() {
	    this.options = {SDKAppID: 1600042933}
			this.chat = TencentCloudChat.create(this.options)
	}
	
	/**
	 * 登录
	 */
	login(){
		const userInfo = uni.getStorageSync('userInfo')
		return this.chat.login({
			userID: userInfo.chatId,
			userSig: userInfo.userSign
		})
	}
	
	/**
	 * 退出
	 */
	 logout(){
		return this.chat.logout()
	 }
	 
	 /**
		* 会话列表
		*/
	getList(){
		return this.chat.getConversationList()
	}
	
	/**
	 * 消息列表
	 */
	getChatList(data){
		return this.chat.getMessageList(data)
	}
	
	/**
	 * 发送消息
	 */
	
	sendMsg(data){
	 let message = this.chat.createTextMessage(data)
	 return this.chat.sendMessage(message)
	}
	
	/**
	 * 显示最后一条消息类型
	 */
	showLastMessage(lastMessage){
		if (lastMessage.type === TencentCloudChat.TYPES.MSG_CUSTOM) {
			return lastMessage.payload?.description
		} else {
			return lastMessage.messageForShow
		}
	}
	
}

export const chat = new TencentChatManager()
