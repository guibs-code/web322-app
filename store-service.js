/*********************************************************************************
WEB322 – Assignment 02
I declare that this assignment is my own work in accordance with Seneca Academic Policy.
No part of this assignment has been copied manually or electronically from any other source (including 3rd party web sites) or distributed to other students.

Name: Guilherme da Silva
Student ID: 122538234
Date: October 13, 2024
Vercel Web App URL: https://web322-8c6691wat-guibs-codes-projects.vercel.app/about (data not working)
GitHub Repository URL: https://github.com/guibs-code/web322-app

********************************************************************************/

const fs = require('fs')

let items = []
let categories = []

function initialize() {
	return new Promise(async (res, rej) => {
		fs.readFile(__dirname + '/data/items.json', 'utf8', async (err, data) => {
			if (err) {
				return rej('unable to read items file')
			}

			try {
				items = await JSON.parse(data)

				fs.readFile(
					__dirname + '/data/categories.json',
					'utf8',
					async (err, data) => {
						if (err) {
							return rej('unable to read categories file')
						}

						try {
							categories = await JSON.parse(data)
							res('data fetched')
						} catch (err) {
							return rej('unable to parse categories.json')
						}
					}
				)
			} catch (err) {
				return rej('unable to parse items file')
			}
		})
	})
}

function getAllItems() {
	return new Promise((res, rej) => {
		if (items.length > 0) {
			res(items)
		} else {
			rej('no results returned')
		}
	})
}

function getPublishedItems() {
	return new Promise((res, rej) => {
		const publishedItems = items.filter((item) => item.published === true)

		if (publishedItems.length > 0) {
			res(publishedItems)
		} else {
			rej('no results returned')
		}
	})
}

function getCategories() {
	return new Promise((res, rej) => {
		if (categories.length > 0) {
			res(categories)
		} else {
			rej('no results returned')
		}
	})
}

function addItem(itemData) {
	return new Promise((res, rej) => {
		try {
			if (itemData.published === undefined) {
				itemData.published = false
			} else {
				itemData.published = true
			}

			itemData.id = items.length + 1

			console.log(itemData)

			items.push(itemData)
			res(itemData)
		} catch (err) {
			rej(err)
		}
	})
}

function getItemsByCategory(category) {
	return new Promise((res, rej) => {
		let resultItems = items.filter((item) => item.category == category)

		if (resultItems.length === 0) {
			rej('no results returned')
		} else {
			res(resultItems)
		}
	})
}

function getItemsByMinDate(minDateStr) {
	return new Promise((res, rej) => {
		let resultItems = items.filter(
			(item) => new Date(item.postDate) >= new Date(minDateStr)
		)

		console.log(resultItems)

		if (resultItems.length === 0) {
			rej('no results returned')
		} else {
			res(resultItems)
		}
	})
}

function getItemById(id) {
	return new Promise((res, rej) => {
		let resutItem = undefined
		resultItem = items.find((item) => item.id == id)

		if (resultItem !== undefined) {
			res(resultItem)
		} else {
			rej('no results returned')
		}
	})
}

module.exports = {
	items,
	categories,
	initialize,
	getAllItems,
	getPublishedItems,
	getCategories,
	addItem,
	getItemsByCategory,
	getItemsByMinDate,
	getItemById,
}
