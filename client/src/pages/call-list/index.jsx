import { React, useEffect, useState } from 'react';
import { getAllContacts } from '../../services/contact.service';

const CallList = () => {
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableRows, setTableRows] = useState([]);

	useEffect(() => {
		getAllContacts()
			.then(response => response.data.filter(contact => contact.phoneNumbers.length > 0 && contact.phoneNumbers.reduce((rlt, cur) => rlt === true || cur.phoneType === 'Home', false)))
			.then((data) => {
				console.log(data)
				if (data && data.length) {
					const headers = (
						<tr>
							<th key="id">Id</th>
							<th key="lastName">Last Name</th>
							<th key="firstName">First Name</th>
							<th key="emailAddress">Email Address</th>
							<th key="phoneTypes">Phone (Home)</th>
						</tr>
					);
					setTableHeaders(headers);

					const rows = data.map((contact) => {
						contact.phone = contact.phoneNumbers.reduce((rlt, cur) => {
							if(cur.phoneType === 'Home') return cur.phoneNumber;
						}, "")
						return contact;
					})
						.sort((a, b) => {
							if(a.lastName === b.lastName) return a.firstName.localeCompare(b.firstName);
							return a.lastName.localeCompare(b.lastName);
						})
						.map((row, rowIndex) => (
							<tr key={rowIndex}>
								<td key="id">{row.id}</td>
								<td key="lastName">{row.lastName}</td>
								<td key="firstName">{row.firstName}</td>
								<td key="emailAddress">{row.emailAddress}</td>
								<td key="phoneTypes">{row.phone}</td>
							</tr>
						));
					setTableRows(rows);
				}
    });
	}, [])
	return (
		<div className="contacts-page">
      <div className="section">
        <div className="container">
          <table className="table is-fullwidth is-hoverable">
            <thead>{tableHeaders}</thead>
            <tbody>{tableRows}</tbody>
          </table>
        </div>
      </div>
    </div>
	)
}

export default CallList;