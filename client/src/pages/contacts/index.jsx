import { React, useEffect, useState } from 'react';
import { getAllContacts, deleteContact } from '../../services/contact.service';
import ContactModal from '../../components/contact-modal';
import ModalContext from '../../contexts/modal-context';
import './contacts.scss';

const ContactsPage = () => {
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  function getTable() {
    getAllContacts().then((response) => {
      if (response.data && response.data.length) {
        console.log(response.data)
        const headers = (
          <tr>
            <th key="id">Id</th>
            <th key="lastName">Last Name</th>
            <th key="firstName">First Name</th>
            <th key="emailAddress">Email Address</th>
            <th key="phoneTypes">Phone Types</th>
            <th key="edit">Edit</th>
            <th key="delete">Delete</th>
          </tr>
        );
        setTableHeaders(headers);

        const rows = response.data
          .sort((a, b) => a.id - b.id)
          .map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td key="id">{row.id}</td>
              <td key="lastName">{row.lastName}</td>
              <td key="firstName">{row.firstName}</td>
              <td key="emailAddress">{row.emailAddress}</td>
              <td key="phoneTypes">{row.phoneNumbers.map((p) => p.phoneType).join(', ')}</td>
              <td key="edit" onClick={() => onEdit(row.id)}>Edit</td>
              <td key="delete" onClick={() => onDelete(row.id)}>Delete</td>
            </tr>
          ));
        setTableRows(rows);
      }
      else {
        setTableHeaders([]);
        setTableRows([]);
      }
    });
  }

  useEffect(() => {
    getTable();
  }, [showModal]);

  const onEdit = (id) => {
    setCurrentId(id);
    setShowModal(true);
  }

  const onDelete = (id) => {
    deleteContact(id).then(() => getTable());
  }

  const onCloseModal = () => {
    setShowModal(false);
    setCurrentId(null);
  }

  return (
    <div className="contacts-page">
      <div className="section">
        <div className="container">
          <div className="container page-header">
            <h6 className="title">Contacts</h6>
            <button className="button is-primary create-contact-button" onClick={() => setShowModal(true)}>
              Create Contact
            </button>
          </div>
          <hr />
          <table className="table is-fullwidth is-hoverable">
            <thead>{tableHeaders}</thead>
            <tbody>{tableRows}</tbody>
          </table>
        </div>
      </div>
      {showModal &&
        <ModalContext.Provider value={{ showModal: showModal, closeModal: onCloseModal, currentId: currentId }}>
          <ContactModal />
        </ModalContext.Provider>
      }
    </div>
  );
};

export default ContactsPage;
