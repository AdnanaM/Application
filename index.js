fetch("https://9751e868-b8ef-4a56-ba25-90f14d8b37eb.mock.pstmn.io/get-info")
.then(response => response.json())
	.then(data => {
		const tableBody = document.querySelector('#myTable tbody');
		data.forEach(rowData => {
			const row = document.createElement('tr');
			Object.keys(rowData).forEach(key => {
				const cell = document.createElement('td');
				cell.textContent = rowData[key];
				cell.setAttribute('data-key', key);
				cell.addEventListener('click', () => {
					const newValue = prompt('Enter a new value:');
					if (newValue !== null) {
						cell.textContent = newValue;
						const id = rowData.id; 
						const key = cell.getAttribute('data-key');
						updateData(id, key, newValue);
					}
				});
				row.appendChild(cell);
			});
			tableBody.appendChild(row);
		});
	})
.catch(error => {
    console.error(error);
});



function updateData(id, key, value) {
	const url = `https://9751e868-b8ef-4a56-ba25-90f14d8b37eb.mock.pstmn.io/get-info/${id}`;
	const data = { [key]: value };
    console.log(data);
	fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then(response => {
		if (!response.ok) {
			throw new Error('Response was not ok');
		}
	})
	.catch(error => {
		console.error('There was a problem updating the data:', error);
	});
}

