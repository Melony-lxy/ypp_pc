	<template>
		<view class="AccountSetting">
			<view v-if="settingIndex == 0">
				<view class="info" v-if="!isAccount.isMy && !isAccount.isPhone && !isAccount.isBank && !isAccount.isDelete">
					<view class="info-top">
						<view class="info-item" @click="isAccount.onEditPhone()">
							<view>手机号</view>
							<view class="item-right">
								<view>+86 {{userInfos.phonenumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</view>
								<uni-icons type="right" color="#ABABAB"></uni-icons>
							</view>
						</view>
						<view class="info-item" @click="isAccount.goAuthen('实名认证')">
							<view>实名认证</view>
							<view class="item-right">
								<image v-if="userInfos.finishLevel" src="/static/mine/successid.png" mode="widthFix"
									style="width: 24rpx;height: 28rpx;"></image>
								<view v-if="userInfos.finishLevel">{{userInfos.businessType ? '已实名认证企业用户' : '已实名认证个人用户' }}</view>
								<view v-else>未实名</view>
								<uni-icons type="right" color="#ABABAB"></uni-icons>
							</view>
						</view>
						<view class="info-item" style="border: none;" @click="isAccount.goBank('提现银行卡')">
							<view>绑定银行卡</view>
							<view class="item-right">
								<view v-if="userInfos.finishLevel == 3">已绑定</view>
								<uni-icons type="right" color="#ABABAB"></uni-icons>
							</view>
						</view>
					</view>
					<view class="info-top">
						<view class="info-item" style="border: none;" @click="isAccount.goDelete()">
							<view>注销账户</view>
							<view class="item-right">
								<uni-icons type="right" color="#ABABAB"></uni-icons>
							</view>
						</view>
					</view>
				</view>
				<view v-if="isAccount.isMy">
					<view class="taps" v-if="isAccount.tapList.length > 1">
						<view v-for="(item,index) in isAccount.tapList">
							<uni-icons v-if="index !== 0" type="right" size="18" color="#ABABAB"></uni-icons>
							<view @click="onIdTaps('isMy',index)">{{item}}</view>
						</view>
					</view>

					<view class="realType" v-if="isAccount.isMy == 1">
						<view class="realList" v-if="!userInfos.finishLevel">
							<view class="typeItem" v-for="(item,index) in realType" @click="isAccount.onSelectType(index)"
								:class="{active : index == isAccount.typeIndex}">
								<image class="type" :src="globalstore.upImageuler(item.img)" mode="widthFix"></image>
								<view>{{item.title}}</view>
								<image class="correct" src="/static/mine/correct.png" mode="widthFix"></image>
							</view>
						</view>
					</view>

					<view class="authentication" v-if="isAccount.isMy == 2">
						<view class="upImage" v-if="isAccount.typeIndex && !isAccount.isDisabled">
							<view>上传图片自动识别信息</view>
							<view class="upIdImage">
								<view class="idpositive" @click="upImageRecognition(0)">
									<image :src="globalstore.upImageuler('/static/setting/lince.png')" mode="widthFix"></image>
									<view>上传图片</view>
								</view>
								<view class="idspeci">
									<view>图片须知</view>
									<view>
										<view class="idimgspeci" v-for="(item,index) in linceNoticeList">
											<image :src="globalstore.upImageuler(item.img)" mode="widthFix"></image>
											<view>
												<image :src="globalstore.upImageuler(item.icon)" mode="widthFix"></image>
												<view>{{item.title}}</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="prive" v-if="isAccount.typeIndex">
							<view class="item">
								<view>企业名称</view>
								<view class="ipt">
									<input v-if="!isAccount.isDisabled" type="text" placeholder="输入名称" placeholder-class="placeholder"
										v-model="idType.priveName" />
									<input v-else type="text" :placeholder="isAccount.realNameInfoVO.regName"
										placeholder-class="placeholder" disabled />
								</view>
							</view>
							<view class="item">
								<view>营业执照编号</view>
								<view class="ipt">
									<input v-if="!isAccount.isDisabled" type="text" placeholder="输入编号" placeholder-class="placeholder"
										v-model="idType.priveNum" />
									<input v-else type="text" :placeholder="isAccount.realNameInfoVO.licenseCode"
										placeholder-class="placeholder" disabled />
								</view>
							</view>
							<view class="item">
								<view>注册地址</view>
								<view class="ipt">
									<input disabled type="text" placeholder="选择地址" placeholder-class="placeholder"
										v-model="idType.priveAddres" />
									<uni-icons class="right" type="right" color="#ABABAB"
										:class="{rotate : rotateIndex.addres}"></uni-icons>
									<view class="invit" @click="onOpenTime('addres')"></view>
									<region-selection style="width: 150%;top: 100%;left: 0;" v-if="rotateIndex.addres"
										@region="(e)=>onAddres(e,'id')"></region-selection>
								</view>

							</view>
							<view class="item" style="align-items: flex-start;">
								<view>注册地址详细信息</view>
								<view class="ipt">
									<textarea style="height: 192rpx;" type="text" placeholder="输入详细地址" placeholder-class="placeholder"
										v-model="idType.priveXiAdd" />
								</view>
							</view>
						</view>
						<view class="upImage" v-if="!isAccount.isDisabled || userInfos.businessType">
							<view>上传图片自动识别信息</view>
							<view class="upIdImage">
								<view class="idpositive" @click="upImageRecognition(1)">
									<image :src="globalstore.upImageuler('/static/setting/positive.png')" mode="widthFix"></image>
									<view>上传正面图片</view>
								</view>

								<view class="idspeci">
									<view>图片须知</view>
									<view>
										<view class="idimgspeci" v-for="(item,index) in picreNoticeList">
											<image :src="globalstore.upImageuler(item.img)" mode="widthFix"></image>
											<view>
												<image :src="globalstore.upImageuler(item.icon)" mode="widthFix"></image>
												<view>{{item.title}}</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="prive">
							<view class="item">
								<view>{{isAccount.typeIndex ? '法人姓名' : '姓名' }}</view>
								<view class="ipt" v-if="userInfos.businessType == 0 || userInfos.businessType == -1">
									<input type="text" v-if="!isAccount.isDisabled"
										:placeholder="isAccount.typeIndex ? '输入法人姓名' : '输入真实姓名'" placeholder-class="placeholder"
										v-model="idType.name" />
									<input type="text" v-if="isAccount.isDisabled" :placeholder="isAccount.realNameInfoVO.name"
										placeholder-class="placeholder" disabled />
								</view>
								<view class="ipt" v-else>
									<input type="text" placeholder="输入法人姓名" placeholder-class="placeholder" v-model="idType.name" />
								</view>
							</view>
							<view class="item">
								<view>{{isAccount.typeIndex ? '法人身份证号码' : '身份证号码' }}</view>
								<view class="ipt">
									<input type="number" v-if="!userInfos.businessType" :disabled="isAccount.isDisabled"
										:placeholder="!isAccount.isDisabled ? '输入证件号码' : isAccount.realNameInfoVO.certNo "
										placeholder-class="placeholder" v-model="idType.idNum" maxlength="18" />
									<input type="number" v-else placeholder="输入证件号码" placeholder-class="placeholder" v-model="idType.idNum"
										maxlength="18" />
								</view>
							</view>
							<view class="item" v-if="isAccount.typeIndex">
								<view>联系人姓名</view>
								<view class="ipt">
									<input type="text" placeholder="输入联系人姓名" placeholder-class="placeholder"
										v-model="idType.priveContact" />
								</view>
							</view>

						</view>
						<view>
							<view v-if="!isAccount.isDisabled" class="submit" @click="idType.submit()">确定</view>
							<view v-if="isAccount.isDisabled">
								<view v-if="!userInfos.businessType" class="submit" @click="idType.change('升级至企业用户')">升级至企业用户</view>
								<view v-if="!userInfos.businessType" class="submit" @click="idType.change('更换实名认证')">更换实名认证</view>
								<view v-if="userInfos.businessType" class="submit" @click="idType.submit()">确定</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="isAccount.isBank">
					<view class="taps" v-if="isAccount.tapList.length > 1">
						<view v-for="(item,index) in isAccount.tapList">
							<uni-icons v-if="index !== 0" type="right" size="18" color="#ABABAB"></uni-icons>
							<view @click="onIdTaps('isBank',index)">{{item}}</view>
						</view>
					</view>
					<view class="bank" v-if="isAccount.isBank == 1">
						<view class="bankList">
							<view class="bankItem" v-for="(item,index) in bankList">
								<view class="itemleft">
									<image :src="item.backgroundImageUrl" mode="widthFix"></image>
									<view class="banktype">
										<view>{{item.bankName}}</view>
										<view>储蓄卡</view>
									</view>
									<view>···· ···· ···· {{item.cardNo.slice(-4)}}</view>
								</view>
								<view class="itemright">
									<view @click="isAccount.onAddBank()">解绑银行卡</view>
									<view @click="isAccount.onAddBank()">查看卡号</view>
								</view>
								<view class="default" v-if="item.isSettleDefault == 'Y'">默认提现卡</view>
							</view>
						</view>
						<view class="addbank" @click="isAccount.onAddBank()">
							<image :src="globalstore.upImageuler('/static/setting/add.png')" mode="widthFix"></image>
							<view>添加银行卡</view>
						</view>
					</view>
					<view class="authentication" v-if="isAccount.isBank == 2">
						<view class="prive" v-if="!userInfos.businessType">
							<view class="item" v-if="!bankAddRef.bankTypeIndex">
								<view>姓名</view>
								<view class="ipt">
									<input type="text" :placeholder="isAccount.realNameInfoVO.name" placeholder-class="placeholder"
										disabled />
								</view>
							</view>
							<view class="item" v-if="!bankAddRef.bankTypeIndex">
								<view>身份证号码</view>
								<view class="ipt">
									<input type="number" :placeholder="isAccount.realNameInfoVO.certNo" placeholder-class="placeholder"
										disabled />
								</view>
							</view>
							<view class="item">
								<view><span style="color: #FF5500;">*</span>卡号</view>
								<view class="ipt">
									<input type="number" placeholder="输入卡号" placeholder-class="placeholder" @input="bankInput"
										v-model="bankAddRef.bankCode" />
								</view>
							</view>
							<view class="item">
								<view><span style="color: #FF5500;">*</span>银行所在地区</view>
								<view class="ipt">
									<input disabled type="text" placeholder="选择地区" placeholder-class="placeholder"
										v-model="bankAddRef.bankAddress" />
									<uni-icons class="right" type="right" color="#ABABAB"
										:class="{rotate : bankAddRef.isAddres}"></uni-icons>
									<view class="invit" @click="bankAddRef.onBankAddress()"></view>
									<region-selection v-if="bankAddRef.isAddres" type="2" style="width: 150%;top: 100%;left: 0;"
										@region="(e)=>onAddres(e,'bank')"></region-selection>
								</view>
							</view>
						</view>
						<view class="prive" v-if="userInfos.businessType">
							<view class="item">
								<view>选择绑定类型</view>
								<view class="type">
									<view v-for="(item,index) in bankAddRef.bankType" :class="{active: bankAddRef.bankTypeIndex == index}"
										@click="bankAddRef.onBankType(index)">{{item}}</view>
								</view>
							</view>
							<view class="item" v-if="!bankAddRef.bankTypeIndex">
								<view>法人姓名</view>
								<view class="ipt">
									<input type="text"
										:placeholder="userInfos.businessType ? isAccount.realNameInfoVO.legalName : isAccount.realNameInfoVO.name"
										placeholder-class="placeholder" disabled />
								</view>
							</view>
							<view class="item" v-if="bankAddRef.bankTypeIndex">
								<view><span style="color: #FF5500;">*</span>银行卡户名</view>
								<view class="ipt">
									<input type="text" placeholder="输入公司名" placeholder-class="placeholder" />
								</view>
							</view>
							<view class="item" v-if="!bankAddRef.bankTypeIndex">
								<view>法人身份证号码</view>
								<view class="ipt">
									<input type="number"
										:placeholder="userInfos.businessType ? isAccount.realNameInfoVO.legalCertNo : isAccount.realNameInfoVO.certNo"
										placeholder-class="placeholder" disabled />
								</view>
							</view>
							<view class="item">
								<view><span style="color: #FF5500;">*</span>卡号</view>
								<view class="ipt">
									<input type="number" placeholder="输入卡号" placeholder-class="placeholder" @input="bankInput"
										v-model="bankAddRef.bankCode" />
								</view>
							</view>
							<view class="item">
								<view><span style="color: #FF5500;">*</span>银行所在地区</view>
								<view class="ipt">
									<input disabled type="text" placeholder="选择地区" placeholder-class="placeholder"
										v-model="bankAddRef.bankAddress" />
									<uni-icons class="right" type="right" color="#ABABAB"
										:class="{rotate : bankAddRef.isAddres}"></uni-icons>
									<view class="invit" @click="bankAddRef.onBankAddress()"></view>
									<region-selection v-if="bankAddRef.isAddres" type="2" style="width: 150%;top: 100%;left: 0;"
										@region="(e)=>onAddres(e,'bank')"></region-selection>
								</view>
							</view>
							<view class="item" v-if="bankAddRef.bankTypeIndex">
								<view><span style="color: #FF5500;">*</span>选择总行/支行</view>
								<view class="ipt">
									<input type="text" placeholder="点击选择总行/支行" placeholder-class="placeholder" />
									<uni-icons class="right" type="right" color="#ABABAB"></uni-icons>
									<view class="invit" @click="bankAddRef.selectBank()"></view>
								</view>
							</view>
							<view class="item" v-if="bankAddRef.bankTypeIndex">
								<view><span style="color: #FF5500;">*</span>总行银行名称</view>
								<view class="ipt">
									<input type="text" placeholder="--" disabled placeholder-class="placeholder"
										v-model="bankAddRef.headOfficeBankName" />
								</view>
							</view>
							<view class="item" v-if="bankAddRef.bankTypeIndex">
								<view><span style="color: #FF5500;">*</span>总行银行编号</view>
								<view class="ipt">
									<input type="number" placeholder="--" disabled placeholder-class="placeholder"
										v-model="bankAddRef.headOfficeBankCode" />
								</view>
							</view>
							<view class="item" v-if="bankAddRef.bankTypeIndex">
								<view><span style="color: #FF5500;">*</span>支行银行名称</view>
								<view class="ipt">
									<input type="text" placeholder="--" disabled placeholder-class="placeholder"
										v-model="bankAddRef.bankBranchName" />
								</view>
							</view>
							<view class="item" v-if="bankAddRef.bankTypeIndex">
								<view><span style="color: #FF5500;">*</span>支行银行编号</view>
								<view class="ipt">
									<input type="number" placeholder="--" disabled placeholder-class="placeholder"
										v-model="bankAddRef.bankBranchCode" />
								</view>
							</view>
							<view class="radio">
								<image @click="bankAddRef.isDefault = !bankAddRef.isDefault"
									:src="bankAddRef.isDefault ? globalstore.upImageuler('/static/purchase/checked-w.png') : globalstore.upImageuler('/static/purchase/nochoose.png')"
									mode="widthFix"></image>
								<view>默认为结算卡</view>
							</view>
						</view>
						<view class="submit" @click="bankAddRef.onSubmit()">确定</view>
					</view>
				</view>
				<view v-if="isAccount.isDelete">
					<view class="taps" v-if="isAccount.tapList.length > 1">
						<view v-for="(item,index) in isAccount.tapList">
							<uni-icons v-if="index !== 0" type="right" size="18" color="#ABABAB"></uni-icons>
							<view @click="onIdTaps('isDelete',index)">{{item}}</view>
						</view>
					</view>
					<view class="idDeletecon">
						<view class="idDelete">
							<view>我们将向您{{userInfos.phonenumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}的手机发送验证短信</view>
							<view class="idcode">
								<input type="number" placeholder="输入验证码" placeholder-class="placeholder" v-model="deleteCode" />
								<count-down @click="getCode"></count-down>
							</view>
							<view @click="onDestroyUser">注销账号</view>
						</view>
					</view>
				</view>
				<view v-if="isAccount.isPhone == 1">
					<view class="taps" v-if="isAccount.tapList.length > 1">
						<view v-for="(item,index) in isAccount.tapList">
							<uni-icons v-if="index !== 0" type="right" size="18" color="#ABABAB"></uni-icons>
							<view @click="onIdTaps('isPhone',index)">{{item}}</view>
						</view>
					</view>
					<view class="idDeletecon">
						<view class="idDelete" v-if="!MobileNumberRef.isNext">
							<view>我们将向您{{userInfos.phonenumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}的手机发送验证短信</view>
							<view class="idcode" style="margin: 40rpx 0 0 0;">
								<view style="padding-right: 40rpx;">+86</view>
								<input style="width: 100%;" type="number" placeholder="输入原手机号" placeholder-class="placeholder"
									maxlength="11" v-model="MobileNumberRef.Mobile" />
							</view>
							<view class="idcode">
								<input type="number" maxlength="6" placeholder="输入验证码" placeholder-class="placeholder"
									v-model="MobileNumberRef.code" />
								<count-down @click="(countDown) =>MobileNumberRef.getMobileCode(countDown)"></count-down>
							</view>
							<view @click="MobileNumberRef.onNext()">下一步</view>
						</view>
						<view class="idDelete" v-else style="width: 680rpx;">
							<view class="idcode" style="margin: 40rpx 0 0 0;">
								<view style="padding-right: 40rpx;">+86</view>
								<input style="width: 100%;" type="number" placeholder="输入新手机号" placeholder-class="placeholder"
									maxlength="11" v-model="MobileNumberRef.NewMobile" />
							</view>
							<view class="idcode">
								<input type="number" maxlength="6" placeholder="输入验证码" placeholder-class="placeholder"
									v-model="MobileNumberRef.NewCode" />
								<count-down @click="(countDown) =>MobileNumberRef.getNewMobileCode(countDown)"></count-down>
							</view>
							<view @click="MobileNumberRef.onGetSubmit()">确定</view>
						</view>
					</view>
				</view>
			</view>

			<view v-if="settingIndex == 1">
				<view class="address">
					<view class="taps">
						<view>
							<view>收货地址</view>
						</view>
					</view>
					<view class="addressList">
						<view class="addressItem" v-for="(item,index) in shippingAddressList"
							:class="{addressItemDefalut: item.isDefault}">
							<view class="itemTop">
								<image :src="globalstore.upImageuler('/static/setting/address.png')" mode="scaleToFill"></image>
								<view>{{item.province}}{{item.city}}{{item.district}}{{item.detailAddress}}</view>
							</view>
							<view class="itemBot">
								<view>{{item.receiverName}} {{item.receiverPhone}}</view>
								<view class="operation">
									<view @click="onLoaction.onAddEdit('编辑',item)">
										<image :src="globalstore.upImageuler('/static/setting/edit.png')" mode="scaleToFill"></image>
										<view>编辑</view>
									</view>
									<view @click="onLoaction.onDeleteAddress(item)">
										<image :src="globalstore.upImageuler('/static/setting/delete.png')" mode="scaleToFill"></image>
										<view>删除</view>
									</view>
								</view>
							</view>
							<view class="addDefalut" v-if="item.isDefault">默认</view>
						</view>
					</view>
					<view class="addAddres" @click="onLoaction.onAddEdit('新增')">
						<image :src="globalstore.upImageuler('/static/setting/add.png')" mode="widthFix"></image>
						<view>新增地址</view>
					</view>
				</view>
			</view>

			<view v-if="settingIndex == 2">
				<view class="aboutUs" v-if="!aboutUs.isPolicy && !aboutUs.isUser && !aboutUs.isAgreement && !aboutUs.isLicense">
					<view class="info-top">
						<view class="info-item" v-for="(item,index) in aboutUsList"
							:style="{border: index == aboutUsList.length - 1 ? 'none' : ''}" @click="goAboutUs(item)">
							<view>{{item}}</view>
							<view class="item-right">
								<view></view>
								<uni-icons type="right" color="#ABABAB"></uni-icons>
							</view>
						</view>
					</view>
				</view>

				<view class="taps" v-if="aboutUs.taps.length > 1">
					<view v-for="(item,index) in aboutUs.taps">
						<uni-icons v-if="index !== 0" type="right" size="18" color="#ABABAB"></uni-icons>
						<view @click="aboutUs.onTaps(index)">{{item}}</view>
					</view>
				</view>

				<view class="policy" v-if="aboutUs.isPolicy">
					<user-policy :type="aboutUs.type"></user-policy>
				</view>
			</view>

			<view class="popupPhone" v-if="isAccount.isEditPhone" @click="isAccount.onClosePhone()">
				<view class="popup" @click.stop>
					<view>更换绑定的手机号？</view>
					<view>当前绑定的手机号码为: {{userInfos.phonenumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</view>
					<view class="but">
						<view @click="isAccount.onClosePhone()">取消</view>
						<view @click="isAccount.changePhone()">更换</view>
					</view>
				</view>
			</view>
			<popup-modal :show="deleteAccount.show" @close="deleteAccount.close()" @suer="deleteAccount.suer()">
				<template #title>
					<view class="popup-top">
						<image :src="globalstore.upImageuler('/static/mine/gantanhao.png')" mode="widthFix"></image>
						<view>用户注销</view>
					</view>
					<view class="popup-conetnt">
						<view>
							注销成功后，您的账户及相关信息（包括个人资料、库存记录等）将被永久删除，且无法恢复。您将无法再次通过此账户登录或使用平台的任何服务。账户中的所有权益（包括但不限于积分、虚拟资产、会员资格等）将全部清零，无法转移或恢复。
						</view>
						<view>是否确认继续注销？</view>
						<view>
							<image @click="deleteAccount.onAgree()"
								:src=" deleteAccount.isAgree ? globalstore.upImageuler('/static/purchase/checked-w.png') : globalstore.upImageuler('/static/purchase/nochoose.png')"
								mode="widthFix"></image>
							<view>阅读并同意<text @click="onOpenUrl">《账号注销协议》</text></view>
						</view>
					</view>
				</template>
			</popup-modal>

			<popup-modal :show='changeAccount.show' @close="changeAccount.close()" @suer="changeAccount.suer()">
				<template #title>
					<view class="popupAccount">
						<view class="head">是否确定{{changeAccount.title}}</view>
						<view class="red">账户余额: {{isAccount.checkAccount.balanceAmt}}</view>
						<view class="red">待买家收获订单数: {{isAccount.checkAccount.sentStatusOrderCount}}</view>
						<view class="red">未到账的提现数: {{isAccount.checkAccount.noFinishEnashmentCount}}</view>
					</view>
				</template>
			</popup-modal>

			<popup-modal :show="bankAccount.show" suer-title="去实名" @close="bankAccount.close()" @suer="bankAccount.suer()">
				<template #title>
					<view class="popupAccount">
						<image :src="globalstore.upImageuler('/static/setting/laba.png')" mode="widthFix"></image>
						<view class="head">绑定银行卡</view>
						<view class="AccountTitle">绑定银行卡之前，需要先进行实名认证</view>
					</view>
				</template>
			</popup-modal>

			<popup-modal :show='deleteAddress.show' title="确定要删除这个地址吗？" @close="deleteAddress.close()"
				@suer="deleteAddress.suer()"></popup-modal>

			<popup-down v-if="isAccount.isDownApp" @click="onDownOk"></popup-down>

			<popup-bank v-if="bankComponent.show" :city="bankComponent.city" @click="(e)=>{bankComponent.onBnakSure(e)}"
				@close="bankComponent.onBankClose()"></popup-bank>

			<modal-address v-if="isModalAdd" :type="onLoaction.type" :data="onLoaction.addData" @close="onCloseAdd"
				@suer="onSuerAdd"></modal-address>
		</view>
	</template>

	<script setup>
		import {
			ref,
			watch,
			watchEffect
		} from 'vue';
		import timeSelection from '../timeSelection/timeSelection.vue';
		import {
			ProhibitScroll,
			TurnOnScrool
		} from '../../utils/scroll';
		import {
			useGlobalStore
		} from '../../store/store';
		import PopupModal from '../PopupModal/PopupModal.vue';
		import {
			setAccount,
			destroyUserCode,
			destroyUser,
			frontSideIDRecognition,
			setAccountBusine,
			businessLicenseRecognition,
			userInfo,
			queryRealNameInfo,
			checkAccountInfo,
			clearUserInfo,
			getCardNoInfo,
			addBankCard,
			querySelfBankCard,
			addressList,
			saveAddress,
			setDeleteAddress,
			phoneCaptcha,
			confirmPhoneCaptcha,
			updateBusinessAccountInfo,
			upgradeBusinessAccount
		} from '../../api/common';
		import regionSelection from '../regionSelection/regionSelection.vue';
		import CountDown from '../CountDown/CountDown.vue';
		import ModalAddress from '../ModalAddress/ModalAddress.vue';
		import UserPolicy from '../UserPolicy/UserPolicy.vue';
		import {
			uploadImage
		} from '../../api/upload';
		import PopupDown from '../PopupDown/PopupDown.vue';
		import PopupBank from '../PopupBank/PopupBank.vue';

		const getAccount = () => {
			queryRealNameInfo().then(res => {
				if (userInfos.value.businessType) {
					isAccount.value.realNameInfoVO = res.data.businessInfoVO
					Object.assign(idType.value, {
						name: res.data.businessInfoVO.legalName,
						idNum: res.data.businessInfoVO.legalCertNo,
						priveContact: res.data.businessInfoVO.contactName,
						priveName: res.data.businessInfoVO.regName,
						priveNum: res.data.businessInfoVO.licenseCode,
						priveAddres: res.data.businessInfoVO.regProvName + ' ' + res.data.businessInfoVO.regAreaName + ' ' +
							res.data.businessInfoVO.regDistrictName,
						priveXiAdd: res.data.businessInfoVO.regDetail,
						priveVal: [res.data.businessInfoVO.regProvId, res.data.businessInfoVO.regAreaId, res.data
							.businessInfoVO.regDistrictId
						],
					})

				} else {
					isAccount.value.realNameInfoVO = res.data.realNameInfoVO
				}
			})
			checkAccountInfo().then(res => {
				isAccount.value.checkAccount = res.data
			})
		}

		const bankList = ref([])
		const getBankCard = () => {
			querySelfBankCard().then(res => {
				bankList.value = res.data
			})
		}

		const shippingAddressList = ref([])
		const getAddressList = () => {
			addressList().then(res => {
				shippingAddressList.value = res.data
			})
		}

		const globalstore = useGlobalStore()
		const props = defineProps({
			settingIndex: {
				type: Number,
				default: 0
			},
			isgetCertified: {
				type: Number,
				default: 0
			}
		})

		const emit = defineEmits(['closeCer'])

		const bankComponent = ref({
			show: false,
			city: '',
			onBnakSure(e) {
				bankAddRef.value.headOfficeBankName = e.headOfficeBank.headOfficeBankName
				bankAddRef.value.headOfficeBankCode = e.headOfficeBank.headOfficeBankCode
				bankAddRef.value.bankBranchName = e.bankBranch.bankBranchName
				bankAddRef.value.bankBranchCode = e.bankBranch.bankBranchCode
				console.log(e);
			},
			onBankClose() {
				this.show = false
			}
		})

		const isModalAdd = ref(false)
		const deleteCode = ref('')
		const picreNoticeList = ref([{
			img: '/static/setting/good.png',
			icon: '/static/setting/dui.png',
			title: '标准拍摄'
		}, {
			img: '/static/setting/no.png',
			icon: '/static/setting/cuo.png',
			title: '拍摄不全'
		}, {
			img: '/static/setting/mask.png',
			icon: '/static/setting/cuo.png',
			title: '拍摄模糊'
		}, {
			img: '/static/setting/lig.png',
			icon: '/static/setting/cuo.png',
			title: '闪光过度'
		}])

		const linceNoticeList = ref([{
			img: '/static/setting/goodlince.png',
			icon: '/static/setting/dui.png',
			title: '标准拍摄'
		}, {
			img: '/static/setting/nolince.png',
			icon: '/static/setting/cuo.png',
			title: '拍摄不全'
		}, {
			img: '/static/setting/masklince.png',
			icon: '/static/setting/cuo.png',
			title: '拍摄模糊'
		}, {
			img: '/static/setting/liglince.png',
			icon: '/static/setting/cuo.png',
			title: '闪光过度'
		}])

		const aboutUsList = ['隐私政策', '用户协议', '双方买卖协议', '证照信息']
		const isAboutUs = {
			isPolicy: false,
			type: '隐私政策',
			taps: ['关于易品品'],
		}
		const aboutUs = ref({
			...isAboutUs,
			onTaps(index) {
				if (this.taps.length != index + 1) {
					this.taps.splice(index + 1)
					this.isPolicy = false
				}
			}
		})

		const getUserInfo = () => {
			userInfo().then(res => {
				uni.setStorageSync('userInfo', res.user)
				userInfos.value = res.user
				globalstore.upUserInfo(res.user)
			})
		}

		const idType = ref({
			name: '',
			idNum: '',
			priveContact: '',
			priveName: '',
			priveNum: '',
			priveAddres: '',
			priveXiAdd: '',
			priveVal: [],
			submit() {
				if (isAccount.value.typeIndex) {
					if (!this.priveName) {
						uni.showToast({
							title: '请输入企业名称',
							icon: 'none'
						})
						return
					}
					if (!this.priveNum) {
						uni.showToast({
							title: '请输入营业执照编号',
							icon: 'none'
						})
						return
					}
					if (!this.priveAddres) {
						uni.showToast({
							title: '请选择地区',
							icon: 'none'
						})
						return
					}
					if (!this.priveXiAdd) {
						uni.showToast({
							title: '请输入详细地址',
							icon: 'none'
						})
						return
					}
					if (!this.name) {
						uni.showToast({
							title: '请输入法人姓名',
							icon: 'none'
						})
						return
					}
					if (!this.idNum) {
						uni.showToast({
							title: '请输入证件号码',
							icon: 'none'
						})
						return
					}
					if (!this.priveContact) {
						uni.showToast({
							title: '请输入联系人姓名',
							icon: 'none'
						})
						return
					}
					uni.showLoading({
						title: '正在提交'
					})
					const addlist = this.priveAddres.split(' ')

					if (changeAccount.value.title == '升级至企业用户') {
						upgradeBusinessAccount({
							regName: this.priveName,
							licenseCode: this.priveNum,
							regDetail: this.priveXiAdd,
							regProvName: addlist[0],
							regProvId: this.priveVal[0],
							regAreaName: addlist[1],
							regAreaId: this.priveVal[1],
							regDistrictName: addlist[2],
							regDistrictId: this.priveVal[2],
							legalName: this.name,
							legalCertNo: this.idNum,
							contactName: this.priveContact,
							contactMobile: userInfos.value.phonenumber
						}).then(res => {
							onIdTaps('isMy', 0)
							getUserInfo()
							uni.hideLoading()
							changeAccount.value.title = '更换实名认证'
						})
					} else if (isAccount.value.isDisabled) {
						updateBusinessAccountInfo({
							regName: this.priveName,
							licenseCode: this.priveNum,
							regDetail: this.priveXiAdd,
							regProvName: addlist[0],
							regProvId: this.priveVal[0],
							regAreaName: addlist[1],
							regAreaId: this.priveVal[1],
							regDistrictName: addlist[2],
							regDistrictId: this.priveVal[2],
							legalName: this.name,
							legalCertNo: this.idNum,
							contactName: this.priveContact,
							contactMobile: userInfos.value.phonenumber
						}).then(res => {
							onIdTaps('isMy', 0)
							getUserInfo()
							uni.hideLoading()
						})
					} else {
						setAccountBusine({
							regName: this.priveName,
							licenseCode: this.priveNum,
							regDetail: this.priveXiAdd,
							regProvName: addlist[0],
							regProvId: this.priveVal[0],
							regAreaName: addlist[1],
							regAreaId: this.priveVal[1],
							regDistrictName: addlist[2],
							regDistrictId: this.priveVal[2],
							legalName: this.name,
							legalCertNo: this.idNum,
							contactName: this.priveContact,
							contactMobile: userInfos.value.phonenumber
						}).then(res => {
							if (res.code == 200) {
								onIdTaps('isMy', 0)
								getUserInfo()
							}
							uni.hideLoading()
						})
					}

				} else {
					if (!this.name) {
						uni.showToast({
							title: '请输入真实姓名',
							icon: 'none'
						})
						return
					}
					if (!this.idNum) {
						uni.showToast({
							title: '请输入证件号码',
							icon: 'none'
						})
						return
					}
					uni.showLoading({
						title: '正在提交'
					})
					setAccount({
						cardType: -1,
						name: this.name,
						certNo: this.idNum,
						mobileNo: userInfos.value.phonenumber
					}).then(res => {
						if (res.code == 200) {
							onIdTaps('isMy', 0)
							getUserInfo()
						}
						uni.hideLoading()
					})
				}
			},
			change(title) {
				changeAccount.value.title = title
				changeAccount.value.show = true
				ProhibitScroll()
			}
		})
		const userInfos = ref(uni.getStorageSync('userInfo'))

		const realType = ref([{
			img: '/static/mine/person.png',
			title: '个人用户实名认证'
		}, {
			img: '/static/mine/enter.png',
			title: '企业用户实名认证'
		}])

		const isAccount = ref({
			isMy: 0,
			isPhone: 0,
			isEditPhone: false,
			isBank: 0,
			isDelete: 0,
			tapList: ['账号与安全'],
			typeIndex: -1,
			isDisabled: false,
			realNameInfoVO: {},
			checkAccount: {},
			isDownApp: false,
			onEditPhone() {
				this.isEditPhone = true
				ProhibitScroll()
			},
			onClosePhone() {
				this.isEditPhone = false
				TurnOnScrool()
			},
			changePhone() {
				this.isEditPhone = false
				this.isPhone = 1
				this.tapList.push('原手机号验证')
			},
			goAuthen(name) {
				if (userInfos.value.finishLevel) {
					this.isMy = 2
					this.typeIndex = userInfos.value.businessType
					this.isDisabled = true
					getAccount()
				} else {
					this.isMy = 1
				}
				this.tapList.push(name)
			},
			onSelectType(index) {
				this.isMy = 2
				this.typeIndex = index
				this.tapList.push('提交身份信息')
			},
			goBank(name) {
				if (!userInfos.value.finishLevel) {
					bankAccount.value.show = true
					ProhibitScroll()
					return
				}
				if (userInfos.value.finishLevel == 2) {
					this.isBank = 2
					this.tapList.push('绑定银行卡')
					getAccount()
					return
				}
				getBankCard()
				this.isBank = 1
				this.tapList.push(name)
			},
			onAddBank() {
				this.isDownApp = true
				ProhibitScroll()
			},
			goDelete() {
				deleteAccount.value.show = true
				ProhibitScroll()
			}
		})

		watch(
			() => props.isgetCertified,
			(newVal, oldVal) => {
				if (newVal == 1) {
					isAccount.value.goAuthen('去实名认证');
				}
				if (newVal == 2) {
					isAccount.value.goBank('提现银行卡')
				}
			}, {
				immediate: true
			}
		);

		watchEffect(() => {
			if (props.settingIndex == 1) getAddressList()
		})

		const onLoaction = ref({
			type: '新增',
			addData: {},
			onAddEdit(addType, event) {
				this.type = addType
				if (addType == '编辑') this.addData = event
				else this.addData = {}
				isModalAdd.value = true
				ProhibitScroll()
			},
			onDeleteAddress(item) {
				deleteAddress.value.show = true
				deleteAddress.value.id = item.id
				ProhibitScroll()
			}
		})

		const MobileNumber = {
			Mobile: '',
			code: '',
			isNext: false,
			NewMobile: '',
			NewCode: ''
		}

		const MobileNumberRef = ref({
			...MobileNumber,
			getMobileCode(countDown) {
				if (this.Mobile == '') {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				}
				if (this.Mobile != userInfos.value.phonenumber) {
					uni.showToast({
						title: '原手机号和输入手机号不一致',
						icon: 'none',
					})
					return
				}
				phoneCaptcha({
					phone: this.Mobile,
					type: 'exchange'
				}).then(res => {
					countDown()
				})

			},
			getNewMobileCode(countDown) {
				if (this.NewMobile == '') {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				}
				phoneCaptcha({
					phone: this.NewMobile,
					type: 'bind'
				}).then(res => {
					countDown()
				})
			},
			onNext() {
				if (this.Mobile == '') {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				}
				if (this.Mobile != userInfos.value.phonenumber) {
					uni.showToast({
						title: '原手机号和输入手机号不一致',
						icon: 'none',
					})
					return
				}
				if (this.code == '') {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return
				}
				confirmPhoneCaptcha({
					phone: this.Mobile,
					captcha: this.code,
					type: 'exchange'
				}).then(res => {
					isAccount.value.tapList.splice(1)
					isAccount.value.tapList.push('新手机号绑定')
					this.isNext = true
				})
			},
			onGetSubmit() {
				if (this.NewMobile == '') {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				}
				if (this.NewCode == '') {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return
				}
				confirmPhoneCaptcha({
					phone: this.NewMobile,
					captcha: this.NewCode,
					type: 'bind'
				}).then(res => {
					getUserInfo()
					isAccount.value.isPhone = 0
					isAccount.value.tapList.splice(1)
					this.Mobile = ''
					this.code = ''
					this.NewMobile = ''
					this.NewCode = ''
					this.isNext = false
				})
			}
		})

		const bankAdd = {
			bankCode: '',
			bankAddress: '',
			bankVal: [],
			isDefault: false,
			isAddres: false,
			bankType: ['法人银行卡', '企业银行卡'],
			bankTypeIndex: 0,
			cardName: '',
			headOfficeBankName: '',
			headOfficeBankCode: '',
			bankBranchName: '',
			bankBranchCode: ''
		}

		const bankAddRef = ref({
			...bankAdd,
			onBankAddress() {
				this.isAddres = !this.isAddres
			},
			onSubmit() {
				if (!userInfos.value.businessType) {
					if (!this.bankCode) {
						uni.showToast({
							title: '请输入卡号',
							icon: 'none'
						})
						return
					}
					if (!this.bankAddress) {
						uni.showToast({
							title: '请选择地区',
							icon: 'none'
						})
						return
					}
					uni.showLoading({
						title: '提交中...'
					})
					const newAddress = this.bankAddress.split(' ')
					addBankCard({
						bankCardType: '04',
						cardNo: this.bankCode,
						provId: this.bankVal[0],
						areaId: this.bankVal[1],
						provName: newAddress[0],
						areaName: newAddress[1],
						cardName: isAccount.value.realNameInfoVO.name,
						certNo: isAccount.value.realNameInfoVO.certNo,
						isSettleDefault: this.isDefault ? 'Y' : 'N'
					}).then(res => {
						getUserInfo()
						getBankCard()
						isAccount.value.isBank = 1
						isAccount.value.tapList.splice(1)
						isAccount.value.tapList.push('提现银行卡')
						uni.hideLoading()
					})
				}
				if (userInfos.value.businessType) {

					if (this.bankTypeIndex) {
						const newAddress = this.bankAddress.split(' ')
						addBankCard({
							bankCardType: '03',
							cardNo: this.bankCode,
							provId: this.bankVal[0],
							areaId: this.bankVal[1],
							provName: newAddress[0],
							areaName: newAddress[1],
							cardName: this.cardName,
							isSettleDefault: +this.isDefault,
							headOfficeBankName: this.headOfficeBankName,
							headOfficeBankCode: this.headOfficeBankCode,
							bankBranchName: this.bankBranchName,
							bankBranchCode: this.bankBranchCode
						}).then(res => {
							getUserInfo()
							getBankCard()
							isAccount.value.isBank = 1
							isAccount.value.tapList.splice(1)
							isAccount.value.tapList.push('提现银行卡')
							uni.hideLoading()
						})
					} else {
						if (!this.bankCode) {
							uni.showToast({
								title: '请输入卡号',
								icon: 'none'
							})
							return
						}
						if (!this.bankAddress) {
							uni.showToast({
								title: '请选择地区',
								icon: 'none'
							})
							return
						}
						uni.showLoading({
							title: '提交中...'
						})
						const newAddress = this.bankAddress.split(' ')
						addBankCard({
							bankCardType: '01',
							cardNo: this.bankCode,
							provId: this.bankVal[0],
							areaId: this.bankVal[1],
							provName: newAddress[0],
							areaName: newAddress[1],
							cardName: isAccount.value.realNameInfoVO.legalName,
							certNo: isAccount.value.realNameInfoVO.legalCertNo,
							isSettleDefault: +this.isDefault,
						}).then(res => {
							getUserInfo()
							getBankCard()
							isAccount.value.isBank = 1
							isAccount.value.tapList.splice(1)
							isAccount.value.tapList.push('提现银行卡')
							uni.hideLoading()
						})
					}
				}
			},
			onBankType(index) {
				Object.assign(this, {
					bankCode: '',
					bankAddress: '',
					bankVal: [],
					isDefault: false,
					isAddres: false,
					cardName: '',
					headOfficeBankName: '',
					headOfficeBankCode: '',
					bankBranchName: '',
					bankBranchCode: '',
					bankTypeIndex: index
				})
			},
			selectBank() {
				if (!bankComponent.value.city) {
					uni.showToast({
						title: '请先选择银行所在地区',
						icon: 'none'
					})
					return
				}
				bankComponent.value.show = true
			}
		})

		const bankInput = (e) => {
			getCardNoInfo({
				cardNo: e.detail.value
			}).then(res => {
				if (res.data) {
					bankAddRef.value.bankAddress = res.data.provName + ' ' + res.data.areaName
					bankAddRef.value.bankVal = [res.data.provId, res.data.areaId]
				} else {
					bankAddRef.value.bankAddress = ''
					bankAddRef.value.bankVal = []
				}
			})
		}

		const bankAccount = ref({
			show: false,
			close() {
				this.show = false
				TurnOnScrool()
			},
			suer() {
				this.show = false
				TurnOnScrool()
				isAccount.value.isMy = 1
				isAccount.value.tapList.push('实名认证')
			}
		})

		const changeAccount = ref({
			show: false,
			title: '更换实名认证',
			close() {
				this.show = false
				TurnOnScrool()
			},
			suer() {
				if (isAccount.value.checkAccount.balanceAmt != 0 || isAccount.value.checkAccount.sentStatusOrderCount != 0) {
					uni.showToast({
						title: '更换实名需要账户余额等于0，待买家收货订单数等于0',
						icon: 'none'
					})
					return
				}
				if (this.title == '升级至企业用户') {
					isAccount.value.isDisabled = false
					isAccount.value.typeIndex = 1
				} else {
					isAccount.value.isDisabled = false
					clearUserInfo()
					getUserInfo()
				}
				this.show = false
				TurnOnScrool()
			}
		})

		const deleteAccount = ref({
			show: false,
			isAgree: false,
			close() {
				this.show = false
				TurnOnScrool()
			},
			suer() {
				if (!this.isAgree) {
					uni.showToast({
						title: '请先勾选账号注销协议',
						icon: 'none'
					})
					return
				}
				isAccount.value.tapList.push('注销身份验证')
				isAccount.value.isDelete = 1
				this.show = false
				TurnOnScrool()
			},
			onAgree() {
				this.isAgree = !this.isAgree
			}
		})

		const deleteAddress = ref({
			show: false,
			id: '',
			close() {
				this.show = false
				TurnOnScrool()
			},
			suer() {
				console.log(this.id);
				setDeleteAddress(this.id).then(res => {
					getAddressList()
					uni.showToast({
						title: '已删除',
						icon: 'none'
					})
				})
				this.show = false
				TurnOnScrool()
			}
		})

		const onIdTaps = (type, index) => {
			if (isAccount.value.tapList.length != index + 1) {
				isAccount.value.tapList.splice(index + 1)
				if (type === 'isMy') {
					if (index == 0) getUserInfo()
					isAccount.value.isMy = index
					Object.assign(idType.value, {
						name: '',
						idNum: '',
						priveContact: '',
						priveName: '',
						priveNum: '',
						priveAddres: '',
						priveXiAdd: '',
						priveVal: [],
					})
				}
				if (type === 'isBank') {
					isAccount.value.isBank = index
					Object.assign(bankAddRef.value, {
						...bankAdd
					})
				}
				if (type === 'isDelete') {
					isAccount.value.isDelete = index
				}
				if (type === 'isPhone') {
					isAccount.value.isPhone = index
					Object.assign(MobileNumberRef.value, {
						...MobileNumber
					})
				}
			}
			emit('closeCer')
		}

		const rotateIndex = ref({
			addres: false
		})

		function getCode(countdown) {
			destroyUserCode().then(res => {
				uni.showToast({
					title: '验证码已发送',
					icon: 'none'
				})
				countdown()
			})
		}

		function onCloseAdd() {
			isModalAdd.value = false
			TurnOnScrool()
		}

		function onSuerAdd(e) {
			const newEventAddress = e.location.split(' ')
			saveAddress({
				receiverName: e.name,
				receiverPhone: e.mobile,
				province: newEventAddress[0],
				provinceCode: e.value[0],
				city: newEventAddress[1],
				cityCode: e.value[1],
				district: newEventAddress[2],
				districtCode: e.value[2],
				detailAddress: e.address,
				isDefault: e.isDefault,
				id: e.id
			}).then(res => {
				getAddressList()
			})
		}

		function onDownOk() {
			isAccount.value.isDownApp = false
			TurnOnScrool()
		}

		function onAddres(e, type) {
			console.log(e);
			const add = []
			const val = []
			e.forEach(item => {
				add.push(item.name)
				val.push(item.val)
			})
			if (type === 'id') {
				idType.value.priveAddres = add.join(' ')
				idType.value.priveVal = val
				if (add.length === 3) rotateIndex.value.addres = false
			}
			if (type === 'bank') {
				bankAddRef.value.bankAddress = add.join(' ')
				bankAddRef.value.bankVal = val
				if (add.length === 2) {
					bankComponent.value.city = add[1]
					console.log(bankComponent.value.city);
					bankAddRef.value.isAddres = false
				}
			}
		}

		const onDestroyUser = () => {
			destroyUser({
				code: deleteCode.value
			}).then(res => {
				uni.showToast({
					title: '注销成功',
					icon: 'none'
				})
				uni.removeStorageSync('token')
				uni.removeStorageSync('userInfo')
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}, 1000)
			})
		}

		const onOpenTime = (type) => {
			const keys = Object.keys(rotateIndex.value)
			if (keys.includes(type)) {
				rotateIndex.value[type] = !rotateIndex.value[type];
				keys.forEach(key => {
					if (key !== type) rotateIndex.value[key] = false;
				});
			}
		}

		const goAboutUs = (taps) => {
			console.log(aboutUs.value);
			aboutUs.value.taps.push(taps)
			aboutUs.value.isPolicy = true
			aboutUs.value.type = taps
		}

		const upImageRecognition = (type) => {
			uploadImage().then(res => {
				uni.showLoading({
					title: '识别中...'
				})
				if (type == 0) {
					businessLicenseRecognition({
						url: res[0].url
					}).then(res => {
						if (res.data.regName) idType.value.priveName = res.data.regName
						if (res.data.licenseCode) idType.value.priveNum = res.data.licenseCode
						if (res.data.legalName) idType.value.name = res.data.legalName
						if (res.data.regDetail) idType.value.priveXiAdd = res.data.regDetail
						if (res.data.regProvId) idType.value.priveVal = [res.data.regProvId, res.data.regAreaId, res.data
							.regDistrictId
						]
						if (res.data.regProvName) idType.value.priveAddres = res.data.regProvName + ' ' + res.data
							.regAreaName + ' ' + res.data.regDistrictName
						uni.hideLoading()
					})
				}
				if (type == 1) {
					frontSideIDRecognition({
						url: res[0].url
					}).then(res => {
						idType.value.name = res.data.name
						idType.value.idNum = res.data.certNo
						uni.hideLoading()
					})
				}
			})
		}

		const onOpenUrl = () => {
			window.open('https://www.yipinhui.shop/user_destory_agreement.html')
		}
	</script>

	<style scoped lang="scss">
		.AccountSetting {
			padding: 50rpx 40rpx;
			box-sizing: border-box;

			.info {
				display: flex;
				flex-direction: column;
				gap: 20rpx;
				font-weight: 400;
				font-size: 28rpx;
				color: #2C2E3A;

				.info-top {
					padding: 0 24rpx;
					background: #F8F8F8;
					border-radius: 20rpx;

					.info-item {
						padding: 40rpx 0;
						display: flex;
						align-items: center;
						justify-content: space-between;
						box-sizing: border-box;
						border-bottom: 2rpx solid #F3F3F3;
						cursor: pointer;

						.item-right {
							display: flex;
							align-items: center;
							gap: 20rpx;
							color: #ABABAB;
						}
					}
				}

			}

			.taps {
				font-weight: 600;
				font-size: 36rpx;
				color: #2C2E3A;
				display: flex;
				align-items: center;

				>view {
					display: flex;
					align-items: center;
					cursor: pointer;
				}
			}

			.realType {
				margin-top: 40rpx;

				.realList {
					display: flex;
					align-items: center;
					gap: 60rpx;

					.typeItem {
						display: flex;
						align-items: center;
						gap: 20rpx;
						padding: 12rpx;
						box-sizing: border-box;
						width: 28.5%;
						font-weight: 600;
						font-size: 32rpx;
						color: #2C2E3A;
						background: #FDFDFD;
						border-radius: 12rpx;
						border: 2rpx solid #E8E8E9;
						cursor: pointer;
						position: relative;

						.correct {
							position: absolute;
							top: -2rpx;
							right: 0;
							width: 34rpx;
							height: 30rpx;
							opacity: 0;
						}

						.type {
							width: 216rpx;
							height: 216rpx;
						}
					}

					.typeItem:hover {
						background: rgba(255, 196, 0, 0.05);
						border: 2rpx solid #FFC400;
						color: #FFC400;

						.correct {
							opacity: 1;
						}
					}
				}

				.active {
					background: rgba(255, 196, 0, 0.05);
					border: 2rpx solid #FFC400;
					color: #FFC400;

					.correct {
						opacity: 1;
					}
				}
			}

			.authentication {
				margin-top: 60rpx;
				display: flex;
				flex-direction: column;
				gap: 40rpx;

				.upImage {
					display: flex;
					flex-direction: column;
					gap: 24rpx;
					font-weight: 400;
					font-size: 28rpx;

					.upIdImage {
						background: #F8F8F8;
						box-shadow: 0 0 12rpx 0 #F2F2F2;
						border-radius: 12rpx;
						padding: 40rpx;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						gap: 60rpx;

						.idpositive {
							display: flex;
							flex-direction: column;
							align-items: center;
							gap: 18rpx;

							>image {
								width: 268rpx;
								height: 174rpx;
								cursor: pointer;
							}

							>view {
								background: #FFC400;
								border-radius: 52rpx;
								width: calc(100% - 20rpx);
								display: flex;
								justify-content: center;
								padding: 10rpx;
								box-sizing: border-box;
								color: #fff;
								cursor: pointer;
								font-weight: 600;
							}
						}

						.idspeci {
							display: flex;
							flex-direction: column;
							gap: 16rpx;
							font-weight: 400;
							font-size: 24rpx;
							color: #ABABAB;

							>view:last-child {
								display: flex;
								align-items: center;
								gap: 24rpx;

								.idimgspeci {
									display: flex;
									align-items: center;
									flex-direction: column;
									gap: 12rpx;

									>image {
										width: 156rpx;
										height: 108rpx;
									}

									>view {
										display: flex;
										align-items: center;
										gap: 6rpx;

										>image {
											width: 22rpx;
											height: 14rpx;
										}
									}
								}
							}
						}
					}
				}

				.prive {
					display: flex;
					flex-direction: column;
					gap: 40rpx;

					.item {
						display: flex;
						align-items: center;
						font-weight: 400;
						font-size: 28rpx;
						color: #2C2E3A;

						>view:first-child {
							width: 15%;
						}

						.ipt {
							padding: 20rpx;
							box-sizing: border-box;
							background: #FFFFFF;
							border-radius: 16rpx;
							border: 2rpx solid #D8D8D8;
							font-size: 28rpx;
							width: 30%;
							position: relative;
							display: flex;
							align-items: center;

							>input {
								font-size: 28rpx;
								font-weight: 400;
								color: #2C2E3A;
								width: 100%;
							}

							>textarea {
								font-size: 28rpx;
								font-weight: 400;
								color: #2C2E3A;
							}

							.placeholder {
								font-weight: 400;
								font-size: 28rpx;
								color: #ABABAB;
							}

							.invit {
								position: absolute;
								inset: 0;
								background-color: transparent;
								cursor: pointer;
							}

							.rotate {
								transform: rotate(90deg);
							}
						}

						.type {
							display: flex;
							align-items: center;
							gap: 40rpx;

							>view {
								padding: 8rpx 16rpx;
								box-sizing: border-box;
								background: #F8F8F8;
								border-radius: 12rpx;
								cursor: pointer;
							}

							.active {
								background: #FFF0DC;
								font-weight: 600;
								color: #BF7D00;
							}
						}

						.right {
							margin-left: 12rpx;
							transition: all .5s ease;
							cursor: pointer;
						}


					}

					.radio {
						display: flex;
						align-items: center;
						gap: 12rpx;
						font-size: 30rpx;

						>image {
							width: 32rpx;
							height: 32rpx;
							cursor: pointer;
						}
					}
				}

				.submit {
					margin-top: 60rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 32rpx;
					box-sizing: border-box;
					width: 45%;
					background: #FFC400;
					border-radius: 52rpx;
					color: #fff;
					font-size: 34rpx;
					font-weight: 600;
					cursor: pointer;
				}
			}

			.bank {
				display: flex;
				flex-direction: column;
				gap: 40rpx;
				margin-top: 36rpx;

				.bankList {
					display: flex;
					flex-direction: column;
					gap: 20rpx;

					.bankItem {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 60rpx 40rpx;
						background: #F8F8F8;
						border-radius: 12rpx;
						box-sizing: border-box;
						position: relative;

						.itemleft {
							display: flex;
							align-items: center;
							font-weight: 500;
							font-size: 34rpx;
							color: #2C2E3A;

							>image {
								width: 64rpx;
								height: 64rpx;
								border-radius: 50%;
							}

							.banktype {
								display: flex;
								align-items: flex-end;
								gap: 10rpx;
								margin: 0 60rpx 0 16rpx;

								>view:first-child {
									font-weight: 500;
									font-size: 32rpx;
									color: #2C2E3A;
								}

								>view:last-child {
									font-weight: 500;
									font-size: 26rpx;
									color: #2C2E3A;
								}
							}
						}

						.itemright {
							display: flex;
							align-items: center;
							gap: 40rpx;
							font-weight: 400;
							font-size: 28rpx;
							color: #2C2E3A;

							>view {
								padding: 12rpx 60rpx;
								background: #FFFFFF;
								border-radius: 80rpx;
								border: 2rpx solid #D8D8D8;
								cursor: pointer;
							}

							>view:last-child {
								font-weight: 500;
								color: #fff;
								background: #FFC400;
								border: 2rpx solid #FFC400;
							}
						}

						.default {
							position: absolute;
							top: 0;
							left: 0;
							padding: 14rpx 16rpx;
							box-sizing: border-box;
							font-weight: 600;
							font-size: 26rpx;
							line-height: 26rpx;
							color: #FFFFFF;
							background: #FFC400;
							border-radius: 0 12rpx 0 12rpx;
						}
					}
				}

				.addbank {
					padding: 52rpx;
					box-sizing: border-box;
					background: #F8F8F8;
					box-shadow: 0 0 12rpx 0 rgba(44, 46, 58, 0.06);
					border-radius: 12rpx;
					font-size: 32rpx;
					line-height: 32rpx;
					font-weight: 400;
					color: #2C2E3A;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
					gap: 12rpx;

					>image {
						width: 32rpx;
						height: 32rpx;
					}
				}
			}

			.idDeletecon {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				margin-top: 90rpx;
				font-size: 34rpx;

				.idDelete {
					display: flex;
					flex-direction: column;
					align-items: center;

					.idcode {
						padding: 32rpx 44rpx;
						box-sizing: border-box;
						background: #F8F8F8;
						border-radius: 20rpx;
						width: 100%;
						margin: 40rpx 0 100rpx 0;
						font-weight: 400;
						font-size: 28rpx;
						color: #2C2E3A;
						display: flex;
						justify-content: space-between;
						align-items: center;

						>input {
							font-weight: 400;
							font-size: 28rpx;
							color: #2C2E3A;
						}

						.placeholder {
							font-weight: 400;
							font-size: 28rpx;
							color: #C2C2C2;
						}

					}

					>view:last-child {
						font-weight: 600;
						font-size: 34rpx;
						color: #FFFFFF;
						background: #FFC400;
						border-radius: 52rpx;
						padding: 32rpx;
						box-sizing: border-box;
						width: 100%;
						display: flex;
						justify-content: center;
						cursor: pointer;
					}
				}
			}

			.address {
				.taps {
					font-weight: 600;
					font-size: 36rpx;
					color: #2C2E3A;
					display: flex;
					align-items: center;

					>view {
						display: flex;
						align-items: center;
						cursor: pointer;
					}
				}

				.addressList {
					display: flex;
					flex-direction: column;
					gap: 20rpx;
					margin: 36rpx 0 40rpx 0;

					.addressItem {
						padding: 40rpx 36rpx 40rpx 20rpx;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						gap: 40rpx;
						background: #F8F8F8;
						border-radius: 12rpx;
						position: relative;

						.itemTop {
							display: flex;
							align-items: center;
							gap: 6rpx;
							font-weight: 600;
							font-size: 32rpx;
							color: #2C2E3A;
							line-height: 32rpx;

							>image {
								width: 26rpx;
								height: 32rpx;
							}
						}

						.itemBot {
							display: flex;
							align-items: center;
							justify-content: space-between;
							font-weight: 400;
							font-size: 28rpx;
							color: #ABABAB;
							line-height: 28rpx;

							.operation {
								display: flex;
								align-items: center;
								gap: 40rpx;
								color: #BF7D2B;

								>view:first-child {
									display: flex;
									align-items: center;
									gap: 4rpx;
									cursor: pointer;

									>image {
										width: 24rpx;
										height: 24rpx;
									}
								}

								>view:last-child {
									display: flex;
									align-items: center;
									gap: 4rpx;
									cursor: pointer;

									>image {
										width: 20rpx;
										height: 26rpx;
									}
								}
							}
						}

						.addDefalut {
							position: absolute;
							top: 0;
							left: 0;
							font-weight: 600;
							font-size: 28rpx;
							color: #FFFFFF;
							line-height: 28rpx;
							padding: 10rpx 20rpx;
							background: #FFC400;
							border-radius: 12rpx 0 12rpx 0;
						}
					}

					.addressItemDefalut {
						padding-top: 58rpx;
						background: #FFFDF6;
					}
				}

				.addAddres {
					padding: 52rpx;
					box-sizing: border-box;
					background: #F8F8F8;
					box-shadow: 0 0 12rpx 0 rgba(44, 46, 58, 0.06);
					border-radius: 12rpx;
					font-size: 32rpx;
					line-height: 32rpx;
					font-weight: 400;
					color: #2C2E3A;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
					gap: 12rpx;

					>image {
						width: 32rpx;
						height: 32rpx;
					}
				}
			}

			.aboutUs {
				.info-top {
					padding: 0 24rpx;
					background: #F8F8F8;
					border-radius: 20rpx;

					.info-item {
						padding: 40rpx 0;
						display: flex;
						align-items: center;
						justify-content: space-between;
						box-sizing: border-box;
						border-bottom: 2rpx solid #F3F3F3;
						cursor: pointer;

						.item-right {
							display: flex;
							align-items: center;
							gap: 20rpx;
							color: #ABABAB;
						}
					}
				}
			}

			.policy {
				margin-top: 20rpx;
				font-weight: 400;
				font-size: 30rpx;
				color: #2C2E3A;
				line-height: 48rpx;
				text-align: left;
				font-style: normal;
				text-transform: none;
			}

			.popupPhone {
				position: fixed;
				inset: 0;
				background: rgba(44, 46, 58, 0.7);
				z-index: 999;
				display: flex;
				align-items: center;
				justify-content: center;

				.popup {
					width: 622rpx;
					padding: 66rpx 40rpx;
					box-sizing: border-box;
					background: #FFFFFF;
					border-radius: 16rpx;

					>view:first-child {
						font-weight: 600;
						font-size: 32rpx;
						color: #2C2E3A;
					}

					>view:nth-child(2) {
						font-weight: 400;
						font-size: 28rpx;
						color: #2C2E3A;
						margin: 24rpx 0 50rpx 0;
					}

					.but {
						display: flex;
						align-items: center;
						justify-content: center;
						gap: 40rpx;

						>view {
							padding: 12rpx 60rpx;
							box-sizing: border-box;
							font-weight: 400;
							font-size: 14px;
							color: #2C2E3A;
							border-radius: 40rpx;
							border: 2rpx solid #D8D8D8;
							cursor: pointer;
						}

						>view:last-child {
							color: #fff;
							background: #FFC400;
							border: 2rpx solid #FFC400;
						}
					}
				}
			}

			.popup-top {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 20rpx;

				>image {
					width: 180rpx;
					height: 180rpx;
				}
			}

			.popup-conetnt {
				margin: 40rpx 0 0;
				font-weight: 400;
				display: flex;
				flex-direction: column;
				gap: 20rpx;

				>view:nth-child(2) {
					color: #FF114D;
					font-weight: 600;
				}

				>view:last-child {
					display: flex;
					align-items: center;
					gap: 10rpx;
					font-size: 28rpx;

					>image {
						width: 26rpx;
						height: 26rpx;
						cursor: pointer;
					}

					text {
						color: #FFC400;
						cursor: pointer;
					}
				}
			}

			.popupAccount {
				display: flex;
				align-items: center;
				flex-direction: column;
				gap: 20rpx;

				.head {
					font-size: 32rpx;
				}

				>image {
					width: 220rpx;
					height: 196rpx;
				}

				.red {
					color: #FF5500;
					font-size: 28rpx;
					font-weight: 400;
				}

				.AccountTitle {
					font-size: 28rpx;
					font-weight: 400;
				}
			}
		}
	</style>