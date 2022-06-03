import { useContext, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import ModalContext from '../../contexts/modal-context';
import { createContact, getContactById, updateContact } from '../../services/contact.service';
import './contact-modal.scss';

const ContactModal = () => {
  const modalContext = useContext(ModalContext);
  const [formDisabled, setFormDisabled] = useState(false);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm();

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'phoneNumbers',
  });

  useEffect(() => {
    if(modalContext.currentId) {
      getContactById(modalContext.currentId).then(contact => {
        // reset()
        const {data} = contact;
        setFName(data.firstName);
        setLName(data.lastName);
        setEmail(data.emailAddress);

        if(data.phoneNumbers.length > 0) {
          reset({
            phoneNumbers: data.phoneNumbers
          })
        }
      });
    }
  }, [modalContext.currentId])

  const onValid = (data) => {
    setFormDisabled(true);
    if(modalContext.currentId) {
      data.id = modalContext.currentId;
      updateContact(data).then(
        (response) => {
          modalContext.closeModal();
          setFName("");
          setLName("");
          setEmail("");
          reset();
          setFormDisabled(false);
        },
        (errors) => {
          setFormDisabled(false);
        }
      )
    } else {
      createContact(data).then(
        (response) => {
          modalContext.closeModal();
          setFName("");
          setLName("");
          setEmail("");
          reset();
          setFormDisabled(false);
        },
        (errors) => {
          setFormDisabled(false);
        }
      );
    }
  };

  const onClose = () => {
    modalContext.closeModal();
    reset();
  };

  const getPhoneNumberError = (index) => {
    if (errors.phoneNumbers && errors.phoneNumbers[index] && errors.phoneNumbers[index].phoneNumber) {
      return errors.phoneNumbers[index].phoneNumber;
    }
  };

  const getPhoneTypeError = (index) => {
    if (errors.phoneNumbers && errors.phoneNumbers[index] && errors.phoneNumbers[index].phoneType) {
      return errors.phoneNumbers[index].phoneType;
    }
  };

  const onFName = (e) => {
    e.preventDefault();
    setFName(e.target.value);
  }

  const onLName = (e) => {
    e.preventDefault();
    setLName(e.target.value);
  }

  const onEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  }

  return (
    <div className={`modal ${modalContext.showModal ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <form className="box contact-form" onSubmit={handleSubmit(onValid)}>
          <div className="field">
            <label className="label">
              First Name<span className="required">*</span>
              <span className="error">{errors.firstName?.type === 'required' && 'Required'}</span>
            </label>
            <div className="control">
              <input
                {...register('firstName', { required: true })}
                className={`input ${errors.firstName ? 'error' : ''}`}
                type="text"
                disabled={formDisabled}
                value={fName}
                onChange={onFName}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Last Name<span className="required">*</span>
              <span className="error">{errors.lastName?.type === 'required' && 'Required'}</span>
            </label>
            <div className="control">
              <input
                {...register('lastName', { required: true })}
                className={`input ${errors.lastName ? 'error' : ''}`}
                type="text"
                disabled={formDisabled}
                value={lName}
                onChange={onLName}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Email Address
              <span className="error">{errors.emailAddress?.type === 'pattern' && 'Invalid email'}</span>
            </label>
            <div className="control">
              <input
                {...register('emailAddress', { pattern: /^\S+@\S+\.\S+$/i })}
                className={`input ${errors.emailAddress ? 'error' : ''}`}
                type="text"
                disabled={formDisabled}
                value={email}
                onChange={onEmail}
              />
            </div>
          </div>
          <br />
          <div>
            {fields.map((item, index) => (
              <div key={`phone-number-${index}`} className="field-row">
                <div className="field phone-number">
                  <label className="label">
                    Phone Number<span className="required">*</span>
                    <span className="error">{getPhoneNumberError(index)?.type === 'required' && 'Required'}</span>
                  </label>
                  <div className="control">
                    <input
                      {...register(`phoneNumbers.${index}.phoneNumber`, { required: true })}
                      className={`input ${getPhoneNumberError(index) ? 'error' : ''}`}
                      type="text"
                      disabled={formDisabled}
                      placeholder="Enter phone number (required)"
                    />
                  </div>
                </div>
                <div className="field phone-type">
                  <label className="label">
                    Phone Type<span className="required">*</span>
                    <span className="error">{getPhoneTypeError(index)?.type === 'required' && 'Required'}</span>
                  </label>
                  <div className="control select">
                    <select
                      {...register(`phoneNumbers.${index}.phoneType`, { required: true })}
                      className={`${getPhoneTypeError(index) ? 'error' : ''}`}
                      placeholder="Enter phone type (required)"
                    >
                      <option value="">Enter Phone Type (required)</option>
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Mobile">Mobile</option>
                    </select>
                  </div>
                </div>
                <div className="field phone-remove">
                  <button type="button" className="button is-danger" onClick={() => remove(index)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div>
              <button type="button" className="button is-primary" onClick={() => append({})}>
                Add Phone Number
              </button>
            </div>
          </div>
          <br />
          <div className="buttons is-centered">
            <button type="submit" className="button is-primary" disabled={formDisabled}>
              Submit
            </button>
          </div>
        </form>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  );
};

export default ContactModal;
