// UI Selectors
const UISelectors = {
	ulList: '.transaction-list',
	liList: '.transaction',
	itemID: '#id',
	inputName: '#item-name',
	inputNumber: '#item-money',
	addBtn: '.add-btn',
	updateBtn: '.update-btn',
	deleteBtn: '.delete-btn',
	backBtn: '.back-btn',
	totalMoney: '.total__cash',
	category: '#category',
	removeBtn: '.btn-remove',
	svg: 'svg',
	totalPercent: '.total__percent',
	burgerBtn: '.transaction__burger',
	transactions: '.transactions',
}

const getItems = items => {
	items.forEach(item => {
		const li = document.createElement('li')
		li.classList.add('transaction')
		li.setAttribute('id', item.id)
		li.innerHTML = `<p class="transaction-name"><i class="${item.category}"></i>${item.body}</p>
            <p class="transaction-amount">${item.number} <button class="edit"><i class="fa fa-pencil"></i></button></p>`

		const ulList = document.querySelector(UISelectors.ulList)
		item.number > 0 ? li.lastChild.style.color = 'lime' :li.lastChild.style.color = 'red'

		ulList.append(li)
	})
}

const totalMoney = items => {
	let arr = [0]

	items.forEach(item => {
		arr.push(parseInt(item.number))
	})
	const totalMoney = arr.reduce((a, b) => a + b)
	
	const showTotal = document.querySelector(UISelectors.totalMoney)
	let data = 0
	let speed = parseInt(totalMoney / 100)
	
	const counter = () => {
		if (totalMoney > 0) {
			data += speed
			
			showTotal.textContent = `${data}$`
			if(data >= totalMoney){
				data=totalMoney
				showTotal.textContent = `${data}$`
				clearInterval(counts)
			}
		}else {
			
			data -= -speed
			
			showTotal.textContent = `${data}$`
			if(data <= totalMoney){
				data = totalMoney
				showTotal.textContent = `${data}$`
				clearInterval(counts)
			}
		}
	}
	
	let counts = setInterval(counter, 10)

	return totalMoney
	
}

// calculate percent money
const calculatePercent = (item) => {
	// get svg form
	const svg = document.querySelector(UISelectors.svg)
	// get circle stats
	const circle = svg.lastChild.previousElementSibling
	// get total percent text
	const totalPercent = document.querySelector(UISelectors.totalPercent)
	// calculate percent
	const percent = parseInt((item / 1000000) * 100)
	console.log(item);
	let data = 0

	// counter percent
	const countPercent = () => {
		if (data < percent) {
			
			data++
			console.log(data)
			totalPercent.textContent = `${data}%`
			circle.style.cssText = `--percent: ${data}`
			circle.attributes.stroke.value = 'lime'
			if (data >= percent) {
				data = percent
				clearInterval(counts)
			} else if (data >= 100) {
				data = 100
				clearInterval(counts)
			}
		} else if (data > percent) {
			totalPercent.textContent = `${data}%`
			circle.style.cssText = `--percent: ${data}`
			data--
			circle.attributes.stroke.value = 'red'
			if (data <= percent) {
				data = percent
				clearInterval(counts)
			} else if (data <= -100) {
				data = -100
			}
			
		}

		circle.style.cssText = `--percent: ${data}`
		totalPercent.textContent = `${data}%`

	
	}

	let counts = setInterval(countPercent, 20)
}

const fillForm =(input,data)=>{
	input.id.value = data.id
	input.body.value = data.body
	input.number.value = data.number
	input.categoryIndex.selectedIndex = data.categoryIndex
}
const selectIndex = (index)=>{
	let category = document.querySelector(UISelectors.category).options

	category = [...category]
	
	let arr = []
	category.forEach(item=>{
		arr.push(item.innerHTML)
	})

	
	const selectIndex =arr.indexOf(index)
	
	return selectIndex
}
const selectCategory = () => {
	const category = document.querySelector(UISelectors.category)

	const selectedCategory = category.options[category.selectedIndex].text
	return selectedCategory
}

const checkCategory = category => {
	let categoryIcon

	switch (category) {
		case '[ + ] Incomes':
			categoryIcon = 'fas fa-money-bill-wave'
			break
		case '[ - ] Home':
			categoryIcon = 'fa-solid fa-house'
			break
		case '[ - ] Entertaiment':
			categoryIcon = 'fas fa-film'
			break
		case '[ - ] Shopping':
			categoryIcon = 'fas fa-cart-arrow-down'
			break
	}
	return categoryIcon
}

const selectCategoryText = category => {
	let categoryText

	switch (category) {
		case 'fas fa-money-bill-wave':
			categoryText = ' [ + ] Incomes'
			break
		case 'fa-solid fa-house':
			categoryText = ' [ - ] Home'
			break
		case 'fas fa-film':
			categoryText = ' [ - ] Entertaiment'
			break
		case 'fas fa-cart-arrow-down':
			categoryText = ' [ - ] Shopping'
			break
	}
	return categoryText
}

const inputs = () => {
	const id = document.querySelector(UISelectors.itemID)
	const body = document.querySelector(UISelectors.inputName)
	const number = document.querySelector(UISelectors.inputNumber)
	const categoryIndex = document.querySelector(UISelectors.category)

	return {
		id,
		body,
		number,
		categoryIndex,
	}
}

const editState = (inline, none) => {
	(document.querySelector(UISelectors.addBtn).style.display = inline),
	(document.querySelector(UISelectors.updateBtn).style.display = none),
	(document.querySelector(UISelectors.deleteBtn).style.display = none),
	(document.querySelector(UISelectors.backBtn).style.display = none)
}

const clearFields = input => {
	input.id.value =''
	input.body.value = ''
	input.number.value = ''
	input.categoryIndex.selectedIndex = 0
}

const clearItems = () => {
	const ulList = document.querySelector(UISelectors.ulList)
	ulList.textContent = ''
}

const showTransaction = () => {
	const transaction = document.querySelector(UISelectors.transactions)

	transaction.classList.toggle('active')
}

const getSelectors = () => {
	return UISelectors
}

export {
	getItems,
	showTransaction,
	getSelectors,
	selectCategory,
	checkCategory,
	inputs,
	clearFields,
	clearItems,
	editState,
	totalMoney,
	selectCategoryText,
	fillForm,
	selectIndex,
	calculatePercent
}
