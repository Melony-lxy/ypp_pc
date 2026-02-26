<!-- NO-->
<template>
  <view class="bank-notes-box">
    <view class="top-info">
      <view class="title-h3">
        <text class="big">{{ data.bankNoteNumberTags || data.noteNumberTags || data.tagName || data.horizontalTagName }}</text>
        <image class="icon" v-show="data.referencePrice" src="/static/slices/jia.png"></image>
        <text class="relate-price" v-if="data.referencePrice">
			参考单价: <template v-if="!isSafePrice || !isShowSafePrice">¥{{ data.referencePrice || data.refrenceUnitPrice }}</template>
		</text>
		<text class="safe-price" v-if="isShowSafePrice && isSafePrice" @click="openEyePrice">* * *<image class="eyesIcon" src="/static/slices/bi.png"></image></text>
      </view>
      <view class="count-info">数量:{{ data.productQuantity || data.quantity }}{{ getUnitByNumType(data.consecutiveNumType || data.crownType) }}</view>
      <view class="mark-row">
        <view class="right" v-if="data.transactionUnitPrice">单价: <text class="price">¥{{ data.transactionUnitPrice || data.unitPrice || '-' }}</text></view>
		<!-- <view v-if="isShowSafePrice" class="view-ref-price" @click="viewPrice">查看参考价格<uni-icons color="#BF7D2B" type="right" size="14"></uni-icons></view> -->
      </view>
    </view>
    <view class="nums-box">
	  {{ getPublishPackageItemDTOList(data.consecutiveNumType || data.crownType, data.headTailBookNoteNumDetailsList || data.numDetails) }}
    </view>
  </view>
</template>
<script setup>
import { ref } from 'vue'
import { matchNumber } from '@/api/product.js'
import { getPublishPackageItemDTOList, getUnitByNumType } from '@/utils/common.js'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  productName: '',
  appraisalInstitutionId: '',
  productCategoryId: '',
  isShowSafePrice: {
    type: Boolean,
    default: false
  }
})


const isSafePrice = ref(true)
const map_productCondition = {
	0: '全品',
	1: '上品',
	2: '中品',
	3: '差品',
	4: '个别瑕疵',
	5: '部分瑕疵'
}

  const map_identifyType = ref({
	 1: '散钞',
	 2: '标十',
	 3: '标百',
	 4: '多规格'
  })

const openEyePrice = async() => {
	isSafePrice.value = false
	const { headTailBookNoteNumDetailsList, consecutiveNumType } = props.data
	const typeName = map_identifyType.value[consecutiveNumType]
	const numberList = headTailBookNoteNumDetailsList.map(item => item.firstNumber)
	const params = {
		crownType:consecutiveNumType,
		consecutiveCount:10,
		numberList,
		rateId: props.appraisalInstitutionId
	}
    const res = await matchNumber(params, props.productCategoryId)
	const { count, count10, count100, sumPrice } = res.data.otherData
    const countMap = {
		1: count,
		2: count10,
		3: count100
    }
	
	const _count = countMap[consecutiveNumType]
	const refrenceUnitPrice = Math.ceil(sumPrice/_count)
	props.data.refrenceUnitPrice = refrenceUnitPrice
}

const viewPrice = (item, productName) => {
	const { headTailBookNoteNumDetailsList, consecutiveNumType } = props.data
	const typeName = map_identifyType.value[consecutiveNumType]
	const numberList = headTailBookNoteNumDetailsList.map(item => item.firstNumber)
	const obj = {
		crownType:consecutiveNumType,
		joinNum:10,
		typeName,
		numberList,
		productName: props.productName || ''
	}
	const objStr = encodeURIComponent(JSON.stringify(obj))
	console.log(1);
	// uni.setStorageSync('productType', props.productCategoryId)
	// uni.navigateTo({
	//   url: `/pages/first/matchNumber/index?objStr=${objStr}&productCategoryId=${props.productCategoryId}&fromType=2`
	// })
	// console.log(obj)
}

</script>
<style lang="scss" scoped>
.bank-notes-box {
  background: #FFF8EF;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
  padding: 0 0 4rpx;

  .nums-box {
    background: #fff;
    border-radius: 12rpx;
    padding: 30rpx 20rpx;
    margin: 4rpx 20rpx 24rpx;
	white-space:  pre-line;
  }

  .top-info {
    padding: 24rpx;

    .title-h3 {
      margin-bottom: 18rpx;
	  height: 40rpx;
	  .safe-price {
		color: #ABABAB;
		vertical-align: middle;
		.eyesIcon {
			width: 24rpx;
			height: 12rpx;
			vertical-align: middle;
			margin: -6rpx 0 0 6rpx;
			cursor: pointer;
		}  
	  }

      .big {
        font-weight: 600;
        font-size: 30rpx;
        color: #2C2E3A;
      }

      .icon {
        width: 34rpx;
        height: 30rpx;
        display: inline-block;
        vertical-align: middle;
        margin: -8rpx 6rpx 0 20rpx
      }

      .relate-price {
        font-size: 24rpx;
        color: #ABABAB;
      }
    }

    .count-info {
      font-weight: 400;
      font-size: 28rpx;
      color: #656565;
      margin-bottom: 12rpx;
    }

    .mark-row {
      display: flex;
      justify-content: space-between;
	  .view-ref-price {
		 font-weight: 600;
		 font-size: 26rpx;
		 color: #BF7D2B;
		 
		 .uniui-right { margin-top: -4rpx; vertical-align: middle;}
	  }

      .left {
        .mark {
          height: 50rpx;
          line-height: 50rpx;
          background: #FDF1DE;
          border-radius: 12rpx;
          padding: 0 14rpx;
          font-weight: 600;
          font-size: 26rpx;
          color: #BF7D2B;
          display: inline-block;
          margin-right: 20rpx;
        }
      }

      .right {
        color: #656565;

        .price {
          font-weight: 600;
          font-size: 28rpx;
          color: #FF5500;
        }
      }
    }
  }
}
</style>