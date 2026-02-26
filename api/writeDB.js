import dbPromise from "./db";
import {bankNote,yearList,categoryList,yearListcom,categoryListcom,stampCategoryList} from './common.js'

const getList = () => {
		return Promise.all([
			bankNote({
				type: 1
			}).then(res => {				
				let data = JSON.parse(JSON.stringify(res.data[0].childList[0]))
				data.list = data.childList
				delete data.childList
				const paperData = {
					id: 'paper_money',
					name: '纪念钞',
					content: [data]
				}
				addSampleData(paperData)
				const otherData = {
					id: 'banknote_other', 
					name: '人民币',
					content: res.otherData
				}
				addSampleData(otherData)
			}),

			yearList().then(res => {
				return categoryList(res.data).then(reslove => {
					const childList = Object.keys(reslove.data).map(item => ({
						name: `${item}年`,
						id: item,
						total: reslove.data[item].length,
						list: reslove.data[item],
					}));
					childList.sort((a, b) => b.id - a.id);
					
					const goldData = {
						id: 'gold_coin',
						name: '贵金属纪念币',
						content: JSON.parse(JSON.stringify(childList)),
					}
					addSampleData(goldData)
					return 
				});
			}),

			yearListcom().then(res => {
				return categoryListcom(res.data).then(reslove => {
					 const childList = Object.keys(reslove.data).map(item => ({
						name: `${item}年`,
						id: item,
						total: reslove.data[item].length,
						list: reslove.data[item],
					}));
					childList.sort((a, b) => b.id - a.id);
					const commonData = {
						id: 'common_coin',
						name: '普通金属纪念币',
						content: JSON.parse(JSON.stringify(childList))
					}
					addSampleData(commonData)
					return
				});
			}),
		]);
	};
	
	const getStamp = () => {
		stampCategoryList().then(res => {
			const list = res.data.map(item => ({
				...item,
				title: item.name.split('邮票')[0]
			}))
			const stampData = {
				id: 'stamp',
				name: '邮票',
				content: JSON.parse(JSON.stringify(list))
			}
			addSampleData(stampData)
		})
	}
	
	//type 纪念钞、人民币、贵金属纪念币、普通金属纪念币、邮票：paper_money、banknote_other、gold_coin、common_coin、stamp
	async function addSampleData(data) {
		const db = await dbPromise
		const tx = db.transaction('item', 'readwrite')
		const store = tx.objectStore('item')
		try {
			await store.put(data)
			await tx.done
		} catch (err) {
			console.error('your are idon', err)
			await tx.abort()
		}
	}
	
	export default async function asyncGetList() {
		const db = await dbPromise
		const tx = db.transaction('item','readonly')
		const store = tx.objectStore('item')
		const count = await store.count()
		if(count === 5) return
		try {
			const token = uni.getStorageSync('token')
			if(!token) return
			await getList()
			getStamp()
		} catch (err) {
			console.error(err)
		}
	}