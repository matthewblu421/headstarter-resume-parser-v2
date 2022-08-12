import React from 'react';
import './App.css';
import FileUpload from './FileUpload';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import JSONDATA from './resumes/MOCK_DATA.json';

function App() {
	const [ resumes, setResumes ] = useState([]);
	const [ searchTerm, setSearchTerm ] = useState('');

	const readExcel = (file) => {
		const promise = new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsArrayBuffer(file);

			fileReader.onload = (e) => {
				const bufferArray = e.target.result;
				const wb = XLSX.read(bufferArray, { type: 'buffer' });
				const wsname = wb.SheetNames[0];

				const ws = wb.Sheets[wsname];

				const data = XLSX.utils.sheet_to_json(ws);

				resolve(data);
			};

			fileReader.onerror = (error) => {
				reject(error);
			};
		});

		promise.then((d) => {
			setResumes(d);
		});
	};

	return (
		<div className="App">
			<FileUpload />
			<h1>Select Excel File to be Read</h1>
			<input
				type="file"
				onChange={(e) => {
					const file = e.target.files[0];
					readExcel(file);
				}}
			/>

			<table class="table">
				<thead>
					<tr>
						<th scope="col">First Name</th>
						<th scope="col">Last Name</th>
						<th scope="col">Main Skill</th>
						<th scope="col">Years of Experience</th>
						<th scope="col" />
					</tr>
				</thead>
				<tbody>
					{resumes.map((d) => (
						<tr key={d.first_name}>
							<th>{d.first_name}</th>
							<td>{d.last_name}</td>
							<td>{d.skills}</td>
							<td>{d.experience}</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="searchBar">
				<h3>Search by First Name, Skills, or Minimum Work Experience (In Years)</h3>
				<input
					type="text"
					placeholder="Search Here"
					onChange={(event) => {
						setSearchTerm(event.target.value);
					}}
				/>
        <div className="searchList">
				{resumes
					.filter((val) => {
						if (searchTerm == '') {
							return val;
						} else if (
							val.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
							val.skills.toLowerCase().includes(searchTerm.toLowerCase()) ||
							val.experience >= searchTerm
						) {
							return val;
						}
					})
					.map((val, key) => {
						return (
							<div className="user" key={key}>
								<p>{val.first_name}</p>
							</div>
						);
					})}
          </div>
			</div>

			{/* <SearchBar /> */}
		</div>
	);
}

export default App;
