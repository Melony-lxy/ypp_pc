<template>
	<view class="region-box">
		<view class="region-title">
			<text>{{provinceName}}</text>
			<image src="/static/purchase/yellow_kuozhan.png" mode=""></image>
			<text>{{cityName}}</text>
			<image v-if="type == '3'" src="/static/purchase/yellow_kuozhan.png" mode=""></image>
			<text v-if="type == '3'" >{{areaName}}</text>
		</view>
		<view class="options">
			<view v-for="(item, index) in options.slice(0,+type)"
			 :key="index" 
			 @click="onOptionClick(index)" 
			 :style="{ color: optionId === index  ? '#2C2E3A' : '#ABABAB' }"
			>{{ item }}</view>
		</view>
		<view class="province-regionList" v-if="optionId === 0">
			<view v-for="(item, index) in newregionsList" @click="onProvinceClick(item, index)">
				<view :style="{color: provinceId === index ? '#FFC400' : '#2C2E3A' }">
					{{ item.name }}
				</view>
				<view class="line" :class="{'active-line' : provinceId === index}"></view>
			</view>
		</view>
		<view class="city-regionList" v-for="(region, regionIndex) in newregionsList" v-if="optionId === 1" 
		:style="{ marginTop: provinceId === regionIndex ? '20rpx' : '0'}">
			<view v-for="(item, index) in region.items" :key="index"
			v-if="provinceId === regionIndex" @click="onCityClick(item, index)">
				<view>{{ item.name }}</view>
				<view class="line" :class="{'active-line' : cityId === index}"></view>
			</view>
		</view>
		<view v-if="type == '3'">
			<view v-for="(region, regionIndex) in newregionsList" v-if="optionId === 2" :style="{ marginTop: provinceId === regionIndex ? '20rpx' : '0' }">
				<view class="area-regionList" v-for="(cityItem, cityIndex) in region.items" v-if="provinceId === regionIndex">
					<view v-for="(item, index) in cityItem.items" :key="index" v-if="cityId === cityIndex" @click="() => {onAreaClick(item, index); selected()}">
						<view>{{ item.name }}</view>
						<view class="line" :class="{'active-line' : areaId === index}"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted, watch } from 'vue';
	// import { regionsList } from '../../api/regionsEnum';
	const props = defineProps({
		type: {
			type: String,
			default: '3'
		}
	})
	const newregionsList = ref(regionsList)
	const options = ['选择省份', '选择城市', '选择地区']
	const optionId = ref(0)
	const provinceId = ref(-1)
	const cityId = ref(-1)
	const areaId = ref(-1)
	const regionName = ref([{}])
	const provinceName = ref('省份')
	const cityName = ref('城市')
	const areaName = ref('地区')
	const emit = defineEmits(['region', 'selShow'])
	const selected = () => {
		emit('selShow')
	}
	const onOptionClick = (index) => {
		optionId.value = index
	}
	const onProvinceClick = (item, index) => {
		provinceId.value = index
		provinceName.value = item.name
		regionName.value = [{name:item.name,val:item.val}]
		optionId.value = 1
		cityId.value = -1
	}
	const onCityClick = (item, index) => {
		cityId.value = index
		cityName.value = item.name
		if(regionName.value.length === 1) {
			regionName.value.splice(1, 1, {name:item.name,val:item.val})
		} else {
			
		}
		optionId.value = 2
	}
	const onAreaClick = (item, index) => {
		areaId.value = index
		areaName.value = item.name
		if(regionName.value.length === 2) {
			regionName.value.splice(2, 1, {name:item.name,val:item.val})
		} else {
			
		}
	}
	watch(() => regionName.value, (newVal) => {
		emit('region', newVal)
	}, {deep: true})
		
</script>

<style lang="scss" scoped>
	.region-box {
		width: 50%;
		position: absolute;
		top: 84rpx;
		left: 8.9473684%;
		padding: 20rpx 20rpx 32rpx 20rpx;
		background: #FFFFFF;
		box-shadow: 0px 2px 12px 0px rgba(47,83,109,0.2);
		border-radius: 8px 8px 8px 8px;
		border: 2rpx solid #FFC400 !important;
		z-index: 99;
		.region-title {
			display: flex;
			align-items: center;
			gap: 8rpx;
			color: #FFC400;
			image {
				width: 50rpx;
				height: 10rpx;
			}
		}
		.options {
			display: flex;
			gap: 40rpx;
			margin-top: 16rpx;
			padding-bottom: 8rpx;
			border-bottom: 1px solid #F2F2F2;
		}
		.options:hover {
			cursor: pointer;
		}
		.province-regionList {
			margin-top: 20rpx;
		}
		.province-regionList,
		.city-regionList,
		.area-regionList {
			display: flex;
			flex-wrap: wrap;
			gap: 60rpx;
			row-gap: 32rpx;
			
			.line {
				position: relative;
				bottom: 0;
				left: 0;
				width: 107.142857%;
				height: 8rpx;
				border-radius: 12rpx;
			}
			.active-line {
				background: linear-gradient( 270deg, #FFFFFF 0%, #FFC400 100%);
			}
		}
		.province-regionList:hover,
		.city-regionList:hover,
		.area-regionList:hover {
			cursor: pointer;
		}
	}
</style>
