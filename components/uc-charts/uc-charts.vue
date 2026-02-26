<template>
	<!-- #ifdef APP | H5 -->
	<view style="position: relative">
		<view :prop="option" :change:prop="echarts.updateEcharts" :id="canvasId" class="echarts" :data-option="JSON.stringify(option)"></view>
	</view>
	<!-- #endif -->
	<!-- #ifndef APP | H5 -->
	<view style="text-align: center;">非 APP、H5 环境不支持</view>
	<!-- #endif -->
</template>


<script>
	let index = 0;
	let currentPage = null
	export default {
		props: {
			option: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			// #ifdef APP
			const pages = getCurrentPages()
			if (pages[pages.length - 1] !== currentPage) {
				currentPage = pages[pages.length - 1]
				index = 0
			}
			// #endif
			return {
				canvasId: 'render_canvas_' + (index++),
			}
		},
		computed: {
			chartOption() {
				const option = this.option || {}
				option.tooltip = option.tooltip || {}
				return option
			}
		},
		methods: {
			onDataIndexChange(dataIndex) {
				// console.log('转一手dataIndex:', dataIndex);
				uni.$emit('getDataIndex', dataIndex);
			}
		}
	}
</script>

<script module="echarts" lang="renderjs">
	const charts = {};
	let index = 0;
	export default {
		data() {
			return {
				innerCanvasId: 'render_canvas_' + (index++),
				ifOpenTenLine: false, // 标志位，用于区分开启/关闭十字刻度线
				ifMoved: false,
				touchStartTime: 0,
				longPressTimer: null,
			}
		},
		computed: {
			// #ifdef H5
			icid() {
				return this.canvasId
			},
			icoption() {
				return this.chartOption
			},
			icroot() {
				return '/'
			}
			// #endif				
			// #ifdef APP
			icid() {
				return this.innerCanvasId
			},
			icoption() {
				const canvas = document.getElementById(this.icid);
				return JSON.parse(canvas.dataset.option)
			},
			icroot() {
				return ''
			}
			// #endif
		},
		async mounted() {
			// #ifndef H5 | APP
			return
			// #endif

			if (!window.echarts) {
				await this.loadScript(this.icroot + 'static/js/echarts.min.js');
				await this.loadScript(this.icroot + 'static/js/echarts-gl.min.js');
			}
			this.initEcharts()
		},
		destroyed() {
			const chart = charts[this.icid]
			chart.dispose();
			charts[this.icid] = null
		},
		methods: {
			loadScript(src) {
				return new Promise(function(resolve, reject) {
					const s = document.createElement('script');
					let r = false;
					s.type = 'text/javascript';
					s.src = src;
					s.async = true;
					s.onerror = function(err) {
						reject(err, s);
					};
					s.onload = s.onreadystatechange = function() {
						if (!r && (!this.readyState || this.readyState == 'complete')) {
							r = true;
							resolve();
						}
					};
					const t = document.getElementsByTagName('head')[0];
					t.append(s);
				});
			},
			initEcharts() {
				const canvas = document.getElementById(this.icid);
				const chart = charts[this.icid] = window.echarts.init(canvas)
				chart.setOption(this.icoption)
				//监听移动开始事件
				canvas.addEventListener('touchstart', (event) => {
					this.touchStartTime = Date.now();
					this.ifMoved = false;
					if (!this.ifOpenTenLine) {
						this.longPressTimer = setTimeout(() => {
							if (!this.ifMoved) {
								chart.setOption({
									tooltip: {
										show: true,
									},
									dataZoom: [{
										type: 'inside',
										disabled: true,
									}],
								});
								this.ifOpenTenLine = true;
							}
						}, 500);
					}
				});
				// 处理鼠标/触摸移动的通用函数
				const handleMove = (pointInPixel) => {
					this.ifMoved = true;
					// 尝试将像素坐标转换为数据索引
					const option = chart.getOption();
					const series = option.series;
					if (series && series.length > 0) {
						// 尝试通过 convertFromPixel 获取数据索引
						// 对于不同的图表类型，可能需要不同的参数
						try {
							const result = chart.convertFromPixel({ seriesIndex: 0 }, pointInPixel);
							if (result && result.length > 0 && result[0] !== null && result[0] !== undefined) {
								const dataIndex = Math.round(result[0]);
								if (dataIndex >= 0) {
									this.$ownerInstance.callMethod('onDataIndexChange', dataIndex);
								}
							}
						} catch (e) {
							// 如果转换失败，尝试使用 xAxis 转换
							try {
								const result = chart.convertFromPixel('xAxis', pointInPixel);
								if (result !== null && result !== undefined) {
									const dataIndex = Math.round(result);
									if (dataIndex >= 0) {
										this.$ownerInstance.callMethod('onDataIndexChange', dataIndex);
									}
								}
							} catch (e2) {
								// 转换失败时忽略
							}
						}
					}
					if (this.longPressTimer) {
						clearTimeout(this.longPressTimer);
						this.longPressTimer = null;
					}
				};
				
				//监听移动事件 - 使用 getZr() 监听整个画布，包括坐标轴空白区域
				const zr = chart.getZr();
				// H5 环境：监听鼠标移动
				zr.on('mousemove', (event) => {
					const pointInPixel = [event.offsetX, event.offsetY];
					handleMove(pointInPixel);
				});
				// APP 环境：监听触摸移动
				zr.on('touchmove', (event) => {
					if (event.touches && event.touches.length > 0) {
						const touch = event.touches[0];
						const rect = canvas.getBoundingClientRect();
						const pointInPixel = [touch.clientX - rect.left, touch.clientY - rect.top];
						handleMove(pointInPixel);
					}
				});
				// 同时保留原有的 chart.on('mousemove') 用于直接悬停在数据点上的情况（更精确）
				chart.on('mousemove', (params) => {
					this.ifMoved = true;
					if (params && params.dataIndex !== undefined) {
						if (params.dataIndex !== null && params.dataIndex !== undefined) {
							this.$ownerInstance.callMethod('onDataIndexChange', params.dataIndex);
						}
					}
					if (this.longPressTimer) {
						clearTimeout(this.longPressTimer);
						this.longPressTimer = null;
					}
				});
				//监听移动结束事件
				canvas.addEventListener('touchend', (event) => {
					const touchEndTime = Date.now();
					const timeDifference = touchEndTime - this.touchStartTime;
					if (this.longPressTimer) {
						clearTimeout(this.longPressTimer);
						this.longPressTimer = null;
					}
					if (!this.ifMoved && this.ifOpenTenLine && timeDifference < 300) {
						chart.setOption({
							tooltip: {
								show: false,
							},
							dataZoom: [{
								type: 'inside',
								disabled: false,
							}],
						});
						this.ifOpenTenLine = false
					}
				});
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				const chart = charts[this.icid]
				if (chart) {
					chart.clear();
					chart.setOption(newValue)
				}
			}
		}
	}
</script>

<style>
	.echarts {
		width: 100%;
		height: 100%;
	}

	.custom-tooltips {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.8);
		padding: 20rpx;
	}
</style>