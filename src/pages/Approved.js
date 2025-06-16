import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import moment from 'moment';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Set modal styles
Modal.setAppElement('#root');
const modalStyles = {
  content: {
    width: '80%',
    maxHeight: '90vh',
    margin: 'auto',
    padding: '20px',
    overflow: 'auto'
  }
};

const RequisitionSystem = () => {
  // Core state
  const [allRequisitions, setAllRequisitions] = useState([]);
  const [displayedReqs, setDisplayedReqs] = useState([]);
  const [currentView, setCurrentView] = useState('pending');
  const [selectedReq, setSelectedReq] = useState(null);
  const printRef = useRef();
  const userRole = localStorage.getItem('role');

  // Fetch all requisitions
  const fetchAllRequisitions = async () => {
    try {
      const { data } = await axios.get('https://server.promisenothi.com/employees/requisition');
      setAllRequisitions(data);
      filterRequisitions(data, currentView);
    } catch (error) {
      toast.error('Failed to load requisitions');
    }
  };

  // Filter requisitions by status
  const filterRequisitions = (requisitions, view) => {
    let filtered = [];
    
    switch(view) {
      case 'approved':
        filtered = requisitions.filter(req => 
          req.approved_admin === 'APPROVED' && 
          req.approved_agm !== 'REJECTED' && 
          req.approved_hod !== 'REJECTED'
        );
        break;
        
      case 'rejected':
        filtered = requisitions.filter(req => 
          req.approved_admin === 'REJECTED' || 
          req.approved_agm === 'REJECTED' || 
          req.approved_hod === 'REJECTED'
        );
        break;
        
      default: // pending
        filtered = requisitions.filter(req => 
          req.approved_admin !== 'APPROVED' && 
          req.approved_admin !== 'REJECTED' && 
          req.approved_agm !== 'REJECTED' && 
          req.approved_hod !== 'REJECTED'
        );
    }
    
    setDisplayedReqs(filtered);
    setCurrentView(view);
  };

  // Approval actions
  const handleApproval = async (id, isApproval) => {
    const endpoint = isApproval ? 'approve' : 'reject';
    
    try {
      await axios.put(
        `https://server.promisenothi.com/employees/requisition/${endpoint}?id=${id}`
      );
      toast.success(isApproval ? 'Approved successfully' : 'Rejected');
      fetchAllRequisitions();
    } catch (error) {
      toast.error(`Action failed: ${error.message}`);
    }
  };

  // PDF generation
  const generatePDF = async () => {
    const canvas = await html2canvas(printRef.current);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`requisition_${selectedReq.id}.pdf`);
  };

  // Initial load
  useEffect(() => {
    fetchAllRequisitions();
  }, []);

  return (
    <div className="container py-4">
      {/* View Selector */}
      <div className="d-flex mb-4 border-bottom pb-3">
        <button
          className={`btn btn-lg flex-grow-1 mx-2 ${
            currentView === 'pending' ? 'btn-warning' : 'btn-outline-warning'
          }`}
          onClick={() => filterRequisitions(allRequisitions, 'pending')}
        >
          Pending Requisitions
          <span className="badge bg-dark ms-2">
            {
              allRequisitions.filter(req => 
                req.approved_admin !== 'APPROVED' && 
                req.approved_admin !== 'REJECTED' && 
                req.approved_agm !== 'REJECTED' && 
                req.approved_hod !== 'REJECTED'
              ).length
            }
          </span>
        </button>
        
        <button
          className={`btn btn-lg flex-grow-1 mx-2 ${
            currentView === 'approved' ? 'btn-success' : 'btn-outline-success'
          }`}
          onClick={() => filterRequisitions(allRequisitions, 'approved')}
        >
          Approved
          <span className="badge bg-dark ms-2">
            {allRequisitions.filter(req => req.approved_admin === 'APPROVED').length}
          </span>
        </button>
        
        <button
          className={`btn btn-lg flex-grow-1 mx-2 ${
            currentView === 'rejected' ? 'btn-danger' : 'btn-outline-danger'
          }`}
          onClick={() => filterRequisitions(allRequisitions, 'rejected')}
        >
          Rejected
          <span className="badge bg-dark ms-2">
            {
              allRequisitions.filter(req => 
                req.approved_admin === 'REJECTED' || 
                req.approved_agm === 'REJECTED' || 
                req.approved_hod === 'REJECTED'
              ).length
            }
          </span>
        </button>
      </div>

      {/* Requisitions Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Req ID</th>
              <th>Date</th>
              <th>Requester</th>
              <th>Department</th>
              <th>Status</th>
              {currentView === 'pending' && <th>Actions</th>}
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {displayedReqs.map(req => (
              <tr key={req.id} className={req.approved_admin === 'REJECTED' ? 'table-danger' : ''}>
                <td>{req.id}</td>
                <td>{moment(req.requisition_date).format('DD/MM/YYYY')}</td>
                <td>{req.user_name}</td>
                <td>{req.department_name}</td>
                <td>
                  {currentView === 'approved' ? (
                    <span className="badge bg-success">Approved</span>
                  ) : currentView === 'rejected' ? (
                    <span className="badge bg-danger">
                      {req.approved_admin === 'REJECTED' ? 'Rejected by ED' :
                       req.approved_agm === 'REJECTED' ? 'Rejected by AGM' : 'Rejected by HOD'}
                    </span>
                  ) : (
                    <span className="badge bg-warning text-dark">
                      {!req.approved_hod ? 'Pending HOD' :
                       !req.approved_agm ? 'Pending AGM' : 'Pending ED'}
                    </span>
                  )}
                </td>
                
                {currentView === 'pending' && (
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleApproval(req.id, true)}
                        disabled={userRole !== '2' && req.approved_agm}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleApproval(req.id, false)}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                )}
                
                <td>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => setSelectedReq(req)}
                  >
                    <i className="bi bi-eye-fill"></i> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={!!selectedReq}
        onRequestClose={() => setSelectedReq(null)}
        style={modalStyles}
      >
        {selectedReq && (
          <div>
            <div className="d-flex justify-content-between mb-3">
              <h3>Requisition Details</h3>
              <div>
                <button className="btn btn-primary me-2" onClick={generatePDF}>
                  <i className="bi bi-download"></i> PDF
                </button>
                <button className="btn btn-secondary" onClick={() => setSelectedReq(null)}>
                  <i className="bi bi-x-lg"></i> Close
                </button>
              </div>
            </div>
            
            <div ref={printRef} className="p-3">
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <div>
                  <h2 className="mb-1">Requisition #{selectedReq.id}</h2>
                  <p className="text-muted mb-0">
                    {moment(selectedReq.requisition_date).format('DD MMMM YYYY')}
                  </p>
                </div>
                <div className="text-end">
                  <p className="mb-1"><strong>Status:</strong> 
                    {selectedReq.approved_admin === 'APPROVED' ? (
                      <span className="text-success ms-2">Approved</span>
                    ) : selectedReq.approved_admin === 'REJECTED' || 
                        selectedReq.approved_agm === 'REJECTED' || 
                        selectedReq.approved_hod === 'REJECTED' ? (
                      <span className="text-danger ms-2">Rejected</span>
                    ) : (
                      <span className="text-warning ms-2">Pending</span>
                    )}
                  </p>
                </div>
              </div>
              
              {/* Requester Info */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <h5>Requester Information</h5>
                  <p><strong>Name:</strong> {selectedReq.user_name}</p>
                  <p><strong>Department:</strong> {selectedReq.department_name}</p>
                </div>
                <div className="col-md-6">
                  <h5>Approval Path</h5>
                  <p><strong>HOD:</strong> {selectedReq.approved_hod || 'Pending'}</p>
                  <p><strong>AGM:</strong> {selectedReq.approved_agm || 'Pending'}</p>
                  <p><strong>ED:</strong> {selectedReq.approved_admin || 'Pending'}</p>
                </div>
              </div>
              
              {/* Items Table */}
              <h5 className="mb-3">Requested Items</h5>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedReq.item_details.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.unit}</td>
                      <td>{item.price.toLocaleString()}</td>
                      <td>{(item.price * item.quantity).toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr className="table-active">
                    <td colSpan="4" className="text-end"><strong>Grand Total</strong></td>
                    <td><strong>
                      {selectedReq.item_details
                        .reduce((sum, item) => sum + (item.price * item.quantity), 0)
                        .toLocaleString()}
                    </strong></td>
                  </tr>
                </tbody>
              </table>
              
              {/* Additional Info */}
              {selectedReq.comments && (
                <div className="mt-4">
                  <h5>Comments</h5>
                  <div className="card">
                    <div className="card-body">
                      {selectedReq.comments}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RequisitionSystem;