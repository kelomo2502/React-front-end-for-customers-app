import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const AddCustomer = (props) => {
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [show, setShow] = useState(props.show);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="block mx-auto m-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" onClick={props.toggleShow}> + Add New Customer</button>
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id='editModal' className="w-full max-w-sm" onSubmit={e => {
            e.preventDefault();
            props.addCustomerFn(name, industry);
            setName('');
            setIndustry('');

          }}>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="name">
                  Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Amazon" />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="industry">
                  Industry
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="industry" type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="E-commerce" />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={props.toggleShow} className="shadow bg-gray-600 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
            Close
          </button>
          <button form='editModal' className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCustomer;

