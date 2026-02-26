
<script setup>
	import { onLaunch } from '@dcloudio/uni-app'
	import { chat } from './utils/chat';
	import asyncGetList from './api/writeDB';
	onLaunch(()=>{
		// chat.login()
		uni.loadFontFace({
		  family: "kuaikanshijieti",
		  source: 'url("/static/font/kuaikanshijieti.ttf")',
		  success() {
		    console.log("success");
		  },
		});
		setTimeout(()=>{
			
			asyncGetList()
		},2500)
	})
	
</script>

<style>
	/*每个页面公共css */
	page {
		background-color: #fff;
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 28rpx;
		color: #2C2E3A;
		font-style: normal;
		line-height: normal;
		text-transform: none;
		user-select: text;
		-webkit-user-select: text;
		-moz-user-select: text;
		-ms-user-select: text;
	}
	image{
		will-change: transform;
	}
	.placeholder{
		font-weight: 400;
		font-size: 28rpx;
		color: #ABABAB;
	}
</style>


