import * as ui from './modules/ui.js'
import * as http from './modules/http.js'

const selectors = ui.getSelectors()
const burgerBtn = document.querySelector(selectors.burgerBtn)
const addBtn = document.querySelector(selectors.addBtn)
const checkBtn = document.querySelector(selectors.ulList)
const updateBtn = document.querySelector(selectors.updateBtn)
const deleteBtn = document.querySelector(selectors.deleteBtn)
const backBtn = document.querySelector(selectors.backBtn)
const clearAllBtn = document.querySelector(selectors.removeBtn)

let total;

const getItems = () => {
	http
		.get(`http://localhost:3000/data`)
		.then(data => {
			ui.editState('inline', 'none'), 
			total = ui.totalMoney(data)
			
			
			ui.calculatePercent(total),
			ui.getItems(data)
		})
		.catch(err => console.log(err))
}
const input = ui.inputs()
const submitItem = () => {
	

	const selectedCategory = ui.selectCategory()
	const category = ui.checkCategory(selectedCategory)

	const data = {
		body: input.body.value,
		number: input.number.value,
		category: category,
	}

	if (input.body.value !== '' && input.number.value !== '' && input.categoryIndex.selectedIndex !== 0) {
		if (input.id.value === '') {
			http
				.post(`http://localhost:3000/data`, data)
				.then(data => {
					ui.clearFields(input)
					ui.clearItems()
					getItems()
				})
				.catch(err => console.log(err))
		} else {
			http
				.put(`http://localhost:3000/data/${id.value}`, data)
				.then(data => {
					ui.clearFields(input)
					ui.clearItems()
					getItems()
				})
				.catch(err => console.log(err))
		}
	}
}

const checkSubmit = e => {
	// const input = ui.inputs()
	if (e.target.matches('.fa-pencil')) {
		const id = e.target.parentElement.closest('li').id
		const body = e.target.parentElement.closest('li').firstChild.textContent
		const number = parseInt(e.target.parentElement.closest('li').lastChild.textContent)
		const categoryClass = e.target.parentElement.closest('li').firstChild.firstChild.className

		const categoryText = ui.selectCategoryText(categoryClass)
		const categoryIndex = ui.selectIndex(categoryText)
		
		const data = {
			id,
			body,
			number,
			categoryIndex,
		}

		ui.fillForm(input, data)
		ui.editState('none', 'inline')

		return {
			id
		}
	}
}

const delteSubmit = (e) => {
	
	const id= document.querySelector('#id').value
	console.log(id);
	
	http
		.del(`http://localhost:3000/data/${id}`)
		.then(data => {
			ui.clearFields(input)
			ui.clearItems()
			getItems()
		})
		.catch(err => console.log(err))
}
const clearAllSubmit =()=>{
	const li = document.querySelectorAll('li')
	
	li.forEach(item=>{
		const id =item.getAttribute('id')
		
		http
		.del(`http://localhost:3000/data/${id}`)
		.then(data => {
			ui.clearFields(input)
			ui.clearItems()
			getItems()
		})
		.catch(err => console.log(err))
	})


	
	
}
const backSubmit =()=>{
	ui.clearFields(input)
	ui.editState('inline', 'none')
}
clearAllBtn.addEventListener('click',clearAllSubmit)
backBtn.addEventListener('click',backSubmit)
deleteBtn.addEventListener('click', delteSubmit)
updateBtn.addEventListener('click', submitItem)
checkBtn.addEventListener('click', checkSubmit)
addBtn.addEventListener('click', submitItem)
burgerBtn.addEventListener('click', ui.showTransaction)
document.addEventListener('DOMContentLoaded', getItems)
