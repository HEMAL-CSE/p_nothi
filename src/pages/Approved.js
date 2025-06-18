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
  const [currentView, setCurrentView] = useState('all');
  const [selectedReq, setSelectedReq] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const printRef = useRef();
  const userRole = localStorage.getItem('role');

  // Fetch all requisitions
  const fetchAllRequisitions = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('https://server.promisenothi.com/employees/requisition');
      // Ensure each requisition has item_details array
      const processedData = data.map(req => ({
        ...req,
        item_details: req.item_details || []
      }));
      setAllRequisitions(processedData);
      filterRequisitions(processedData, currentView);
    } catch (error) {
      toast.error('Failed to load requisitions');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter requisitions by status
  const filterRequisitions = (requisitions, view) => {
    let filtered = [];
    
    switch(view) {
      case 'pending':
        filtered = requisitions.filter(req => 
          req.approved_admin !== 'APPROVED' && 
          req.approved_admin !== 'REJECTED' && 
          req.approved_agm !== 'REJECTED' && 
          req.approved_hod !== 'REJECTED'
        );
        break;
        
      case 'approved':
        filtered = requisitions.filter(req => 
          req.approved_admin === 'APPROVED'
        );
        break;
        
      case 'rejected':
        filtered = requisitions.filter(req => 
          req.approved_admin === 'REJECTED' || 
          req.approved_agm === 'REJECTED' || 
          req.approved_hod === 'REJECTED'
        );
        break;
        
      default: // all
        filtered = [...requisitions];
    }
    
    setDisplayedReqs(filtered);
    setCurrentView(view);
  };

  // Approval actions
  const handleApproval = async (id, isApproval) => {
    const endpoint = isApproval ? 'approve' : 'reject';
    const status = isApproval ? 'APPROVED' : 'REJECTED';
    
    try {
      await axios.put(
        `https://server.promisenothi.com/employees/requisition/${endpoint}?approved_admin=${status}&id=${id}`
      );
      toast.success(isApproval ? 'Approved successfully' : 'Rejected');
      fetchAllRequisitions();
    } catch (error) {
      toast.error(`Action failed: ${error.message}`);
    }
  };

  // PDF generation
  const generatePDF = async () => {
    if (!selectedReq) return;
    
    try {
      const canvas = await html2canvas(printRef.current);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`requisition_${selectedReq.id}.pdf`);
    } catch (error) {
      toast.error('Failed to generate PDF');
    }
  };

  // Initial load
  useEffect(() => {
    fetchAllRequisitions();
  }, []);

  if (isLoading) {
    return <div className="container py-4 text-center">Loading requisitions...</div>;
  }

  return (
    <div className="container py-4">
      {/* View Selector */}
      <div className="d-flex mb-4 border-bottom pb-3 flex-wrap">
        <button
          className={`btn btn-lg flex-grow-1 mx-2 mb-2 ${
            currentView === 'all' ? 'btn-primary' : 'btn-outline-primary'
          }`}
          onClick={() => filterRequisitions(allRequisitions, 'all')}
        >
          All Requisitions
          <span className="badge bg-dark ms-2">
            {allRequisitions.length}
          </span>
        </button>
        
        <button
          className={`btn btn-lg flex-grow-1 mx-2 mb-2 ${
            currentView === 'pending' ? 'btn-warning' : 'btn-outline-warning'
          }`}
          onClick={() => filterRequisitions(allRequisitions, 'pending')}
        >
          Pending
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
          className={`btn btn-lg flex-grow-1 mx-2 mb-2 ${
            currentView === 'approved' ? 'btn-success' : 'btn-outline-success'
          }`}
          onClick={() => filterRequisitions(allRequisitions, 'approved')}
        >
          Approved (ED)
          <span className="badge bg-dark ms-2">
            {allRequisitions.filter(req => req.approved_admin === 'APPROVED').length}
          </span>
        </button>
        
        <button
          className={`btn btn-lg flex-grow-1 mx-2 mb-2 ${
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
              {/* <th>Total Items</th>
              <th>Total Amount</th> */}
              {currentView === 'pending' && <th>Actions</th>}
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {displayedReqs.length > 0 ? (
              displayedReqs.map(req => {
                // Determine status for display
                let status, statusClass;
                if (req.approved_admin === 'APPROVED') {
                  status = 'Approved by ED';
                  statusClass = 'success';
                } else if (req.approved_admin === 'REJECTED') {
                  status = 'Rejected by ED';
                  statusClass = 'danger';
                } else if (req.approved_agm === 'REJECTED') {
                  status = 'Rejected by AGM';
                  statusClass = 'danger';
                } else if (req.approved_hod === 'REJECTED') {
                  status = 'Rejected by HOD';
                  statusClass = 'danger';
                } else if (req.approved_agm === 'APPROVED') {
                  status = 'Pending ED';
                  statusClass = 'warning';
                } else if (req.approved_hod === 'APPROVED') {
                  status = 'Pending AGM';
                  statusClass = 'warning';
                } else {
                  status = 'Pending HOD';
                  statusClass = 'warning';
                }

                // Calculate totals safely
                const totalItems = req.item_details?.length || 0;
                const totalAmount = req.item_details?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;

                return (
                  <tr key={req.id} className={statusClass === 'danger' ? 'table-danger' : ''}>
                    <td>{req.id}</td>
                    <td>{moment(req.requisition_date).format('DD/MM/YYYY')}</td>
                    <td>{req.user_name}</td>
                    <td>{req.department_name}</td>
                    <td>
                      <span className={`badge bg-${statusClass}`}>
                        {status}
                      </span>
                    </td>
                    {/* <td>{totalItems}</td>
                    <td>{totalAmount.toLocaleString()}</td> */}
                    
                    {currentView === 'pending' && (
                      <td>
                        <div className="d-flex gap-2">
                          {req.approved_agm === 'APPROVED' && (
                            <>
                              <button
                                className="btn btn-sm btn-success"
                                onClick={() => handleApproval(req.id, true)}
                                disabled={userRole !== '2'} // Only ED can approve
                              >
                                Approve
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleApproval(req.id, false)}
                                disabled={userRole !== '2'} // Only ED can reject
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    )}
                    
                    <td>
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => setSelectedReq(req)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={currentView === 'pending' ? 9 : 8} className="text-center py-4">
                  No {currentView} requisitions found
                </td>
              </tr>
            )}
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
                  Download PDF
                </button>
                <button className="btn btn-secondary" onClick={() => setSelectedReq(null)}>
                  Close
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
                      <span className="text-success ms-2">Approved by ED</span>
                    ) : selectedReq.approved_admin === 'REJECTED' ? (
                      <span className="text-danger ms-2">Rejected by ED</span>
                    ) : selectedReq.approved_agm === 'REJECTED' ? (
                      <span className="text-danger ms-2">Rejected by AGM</span>
                    ) : selectedReq.approved_hod === 'REJECTED' ? (
                      <span className="text-danger ms-2">Rejected by HOD</span>
                    ) : selectedReq.approved_agm === 'APPROVED' ? (
                      <span className="text-warning ms-2">Pending ED Approval</span>
                    ) : selectedReq.approved_hod === 'APPROVED' ? (
                      <span className="text-warning ms-2">Pending AGM Approval</span>
                    ) : (
                      <span className="text-warning ms-2">Pending HOD Approval</span>
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
                  <p><strong>Designation:</strong> {selectedReq.designation}</p>
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
                  {selectedReq.item_details?.length > 0 ? (
                    selectedReq.item_details.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.unit}</td>
                        <td>{item.price?.toLocaleString()}</td>
                        <td>{(item.price * item.quantity)?.toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No items found</td>
                    </tr>
                  )}
                  <tr className="table-active">
                    <td colSpan="4" className="text-end"><strong>Grand Total</strong></td>
                    <td><strong>
                      {selectedReq.item_details?.reduce((sum, item) => sum + (item.price * item.quantity), 0)?.toLocaleString()}
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