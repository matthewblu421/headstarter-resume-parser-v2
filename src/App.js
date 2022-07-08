import React from 'react';
import './App.css';
import FileUpload from './FileUpload';
import { useEffect, useState } from 'react';
import XLSX from 'xlsx';
import JSONDATA from './resumes/MOCK_DATA.json';

function App() {
	const readExcel = (file) => {
		const promise = new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsArrayBuffer(file);

			fileReader.onload = (e) => {
				const bufferArray = e.target.result;
			};
		});
	};

	return (
		<div className="App">
      <h1>Select Excel File</h1>
			<input
				type="file"
				onChange={(e) => {
					const file = e.target.files[0];
					readExcel(file);
				}}
			/>
			<FileUpload />
			<SearchBar />
		</div>
	);
}

function SearchBar() {
	const [ searchTerm, setSearchTerm ] = useState('');
	return (
		<div className="searchBar">
			<input
				type="text"
				placeholder="Search Here"
				onChange={(event) => {
					setSearchTerm(event.target.value);
				}}
			/>
			{JSONDATA.filter((val) => {
				if (searchTerm == '') {
					return val;
				} else if (val.first_name.toLowerCase().includes(searchTerm.toLowerCase())) {
					return val;
				}
			}).map((val, key) => {
				return (
					<div className="user" key={key}>
						<p>{val.first_name}</p>
					</div>
				);
			})}
		</div>
	);
}
export default App;
