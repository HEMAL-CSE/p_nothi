import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-modal";
import moment from "moment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from '../assets/logo.png'

const ApprovedElt = () => {
  // Core state
  const [allRequisitions, setAllRequisitions] = useState([]);
  const [displayedReqs, setDisplayedReqs] = useState([]);
  const [currentView, setCurrentView] = useState("all");
  const [selectedReq, setSelectedReq] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const printRef = useRef();
  const userRole = localStorage.getItem("role");
  const [isTabActive, setIsTabActive] = useState("all");
  const [brochures, setBrochures] = useState([]);

  const fetchAllRequisitions = () => {
    setIsLoading(true);

    axios
      .get("https://server.promisenothi.com/employees/requisition_elt?admin=1")
      .then((response) => {
        const rawData = response.data;

        // Remove duplicates based on 'id'
        const uniqueData = Array.from(
          new Map(
            rawData.map((item) => [
              item.id,
              {
                ...item,
                item_details: Array.isArray(item.item_details)
                  ? item.item_details
                  : [],
              },
            ])
          ).values()
        );

        setAllRequisitions(uniqueData);
        filterRequisitions(uniqueData, isTabActive);
      })
      .catch((error) => {
        console.error("Failed to fetch requisitions:", error);
        toast.error("Failed to load requisitions");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Get brochures for a requisition
  const getBrochures = (requisition_id) => {
    const employee_id = localStorage.getItem('employee_id');
    axios.get(`https://server.promisenothi.com/employees/job_info?employee_id=${employee_id}`).then(res => {
      const requisition_url = res.data[0].department == 2 && ['9', '10'].includes(localStorage.getItem('role')) 
        ? `requisition_elt` 
        : `requisition`;
      
      axios.get(`https://server.promisenothi.com/employees/${requisition_url}/brochures?requisition_id=${requisition_id}`)
        .then(res => {
          setBrochures(res.data);
        })
        .catch(error => {
          console.error("Failed to fetch brochures:", error);
        });
    });
  };

  // Filter requisitions by status
  const filterRequisitions = (requisitions, view) => {
    let filtered = [];

    switch (view) {
      case "pending":
        filtered = requisitions.filter(
          (req) =>
            req.approved_admin !== "APPROVED" &&
            req.approved_admin !== "REJECTED" &&
            req.approved_agm !== "REJECTED" &&
            req.approved_dc !== "REJECTED" &&
            req.approved_adh !== "REJECTED"
        );
        break;

      case "approved":
        filtered = requisitions.filter(
          (req) => req.approved_admin === "APPROVED"
        );
        break;

      case "rejected":
        filtered = requisitions.filter(
          (req) =>
            req.approved_admin === "REJECTED" ||
            req.approved_agm === "REJECTED" ||
            req.approved_dc === "REJECTED" ||
            req.approved_adh === "REJECTED"
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
    const endpoint = isApproval ? "approve" : "reject";
    const status = isApproval ? "APPROVED" : "REJECTED";

    try {
      await axios.put(
        `https://server.promisenothi.com/employees/requisition_elt/${endpoint}?approved_admin=${status}&id=${id}`
      );
      toast.success(isApproval ? "Approved successfully" : "Rejected");
      fetchAllRequisitions();
    } catch (error) {
      toast.error(`Action failed: ${error.message}`);
    }
  };

  // PDF generation
  const handleDownloadPdf = async (e) => {
    e.preventDefault();
    if (!selectedReq) return;

    try {
      const element = printRef.current;
      const canvas = await html2canvas(element, { scale: 2 });
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      const imgProperties = pdf.getImageProperties(canvas.toDataURL("image/png"));
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pdfWidth, height);
      pdf.save(`requisition_${selectedReq.id}.pdf`);
    } catch (error) {
      toast.error("Failed to generate PDF");
    }
  };

  // Initial load
  useEffect(() => {
    fetchAllRequisitions();
  }, [isTabActive]);

  const handleTabChange = (tab) => {
    setIsTabActive(tab);
    filterRequisitions(allRequisitions, tab);
  };

  if (isLoading) {
    return (
      <div className="container py-4 text-center">Loading requisitions...</div>
    );
  }

  return (
    <div className="container py-4">
      <h4 style={{
        fontSize: '1.7em',
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        padding: '5px 20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 3px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: 'fit-content',
        margin: '0 auto'
      }}>
        Approved Requisition (E-Learning All Branch): </h4> <br />

      {/* View Selector */}
      <div className="d-flex mb-4 border-bottom pb-3 flex-wrap">
        <button
          className={`btn btn-lg flex-grow-1 mx-2 mb-2 ${isTabActive === "all" ? "btn-primary" : "btn-outline-primary"
            }`}
          onClick={() => handleTabChange("all")}
        >
          All Requisitions
          <span className="badge bg-dark ms-2">{allRequisitions.length}</span>
        </button>

        <button
          className={`btn btn-lg flex-grow-1 mx-2 mb-2 ${isTabActive === "pending" ? "btn-warning" : "btn-outline-warning"
            }`}
          onClick={() => handleTabChange("pending")}
        >
          Pending
          <span className="badge bg-dark ms-2">
            {
              allRequisitions.filter(
                (req) =>
                  req.approved_admin !== "APPROVED" &&
                  req.approved_admin !== "REJECTED" &&
                  req.approved_agm !== "REJECTED" &&
                  req.approved_dc !== "REJECTED" &&
                  req.approved_adh !== "REJECTED"
              ).length
            }
          </span>
        </button>

        <button
          className={`btn btn-lg flex-grow-1 mx-2 mb-2 ${isTabActive === "approved" ? "btn-success" : "btn-outline-success"
            }`}
          onClick={() => handleTabChange("approved")}
        >
          Approved (ED)
          <span className="badge bg-dark ms-2">
            {
              allRequisitions.filter((req) => req.approved_admin === "APPROVED")
                .length
            }
          </span>
        </button>

        <button
          className={`btn btn-lg flex-grow-1 mx-2 mb-2 ${isTabActive === "rejected" ? "btn-danger" : "btn-outline-danger"
            }`}
          onClick={() => handleTabChange("rejected")}
        >
          Rejected
          <span className="badge bg-dark ms-2">
            {
              allRequisitions.filter(
                (req) =>
                  req.approved_admin === "REJECTED" ||
                  req.approved_agm === "REJECTED" ||
                  req.approved_dc === "REJECTED" ||
                  req.approved_adh === "REJECTED"
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
              <th>Designation</th>
              <th>Branch</th>
              <th>Status</th>
              {currentView === "pending" && <th>Actions</th>}
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {displayedReqs.length > 0 ? (
              displayedReqs.map((req) => {
                // Determine status for display
                let status, statusClass;
                if (req.approved_admin === "APPROVED") {
                  status = "Approved by ED";
                  statusClass = "success";
                } else if (req.approved_admin === "REJECTED") {
                  status = "Rejected by ED";
                  statusClass = "danger";
                } else if (req.approved_agm === "REJECTED") {
                  status = "Rejected by AGM";
                  statusClass = "danger";
                } else if (req.approved_dc === "REJECTED") {
                  status = "Rejected by DH";
                  statusClass = "danger";
                } else if (req.approved_adh === "REJECTED") {
                  status = "Rejected by ADC";
                  statusClass = "danger";
                } else if (req.approved_agm === "APPROVED") {
                  status = "Pending ED";
                  statusClass = "warning";
                } else if (req.approved_dc === "APPROVED") {
                  status = "Pending AGM";
                  statusClass = "warning";
                } else if (req.approved_adh === "APPROVED") {
                  status = "Pending DH";
                  statusClass = "warning";
                } else {
                  status = "Pending ADC";
                  statusClass = "warning";
                }

                return (
                  <tr
                    key={req.id}
                    className={statusClass === "danger" ? "table-danger" : ""}>
                    <td>{req.id}</td>
                    <td>{moment(req.requisition_date).format("DD/MM/YYYY")}</td>
                    <td>{req.user_name}</td>
                    <td>{req.designation}</td>
                    <td>{req.branch_name}</td>
                    <td>
                      <span className={`badge bg-${statusClass}`}>
                        {status}
                      </span>
                    </td>

                    {currentView === "pending" && (
                      <td>
                        <div className="d-flex gap-2">
                          {req.approved_agm === "APPROVED" && (
                            <>
                              <button
                                className="btn btn-sm btn-success"
                                onClick={() => handleApproval(req.id, true)}
                                disabled={userRole !== "2"} // Only ED can approve
                              >
                                Approve
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleApproval(req.id, false)}
                                disabled={userRole !== "2"} // Only ED can reject
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
                        onClick={() => {
                          setSelectedReq(req);
                          getBrochures(req.id);
                        }}>
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={currentView === "pending" ? 7 : 6}
                  className="text-center py-4"
                >
                  No {currentView} requisitions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      <Modal
        style={{
          content: {
            width: "50%",
            zIndex: 10,
            left: "30%",
            right: "10%",
            overflow: "auto",
            borderRadius: "5px",
            border: "1px solid #ccc",
          },
          overlay: { zIndex: 10000, backgroundColor: 'transparent' }
        }}
        isOpen={!!selectedReq}
        onRequestClose={() => setSelectedReq(null)}
      >
        {selectedReq && (
          <>
            <div className='m-2'>
              <span className='fw-bold'>PDF Download:</span> 
              <button 
                onClick={handleDownloadPdf} 
                className='btn btn-secondary text-center m-2'
              >
                Click Here
              </button>
            </div>

            <div className="container mt-4">
              <div className="row">
                <div className="col-lg-9 offset-md-2">
                  <div ref={printRef} className="card shadow">
                    <header className="bg-white align-items-center justify-content-between">
                      <div className='bg-blue p-2'></div>
                      <div className="d-flex align-items-center">
                        <img
                          src={logo}
                          alt="E-Learning & Earning Ltd."
                          height={121}
                          width={132}
                          className="p-3"
                        />
                      </div>
                    </header>
                    
                    <div className="d-flex row mb-4 mx-4 justify-content-between">
                      <div className="col-6">
                        <h6 className="text-uppercase fw-bold">Requisitions</h6>
                        <p style={{ fontSize: '12px' }} className="text-muted p-0 m-0">REQ ID #{selectedReq.id}</p>
                        <p style={{ fontSize: '12px' }} className="text-muted p-0 m-0">Name: {selectedReq.user_name}</p>
                        <p style={{ fontSize: '12px' }} className="text-muted p-0 m-0">Department: {selectedReq.department_name}</p>
                        <p style={{ fontSize: '12px' }} className="text-muted p-0 m-0">Designation: {selectedReq.designation}</p>
                        <p style={{ fontSize: '12px' }} className="text-muted p-0 m-0">Branch: {selectedReq.branch_name}</p>
                      </div>
                      <div className="col-3">
                        <p style={{ fontSize: '12px' }} className="text-muted">Date: {moment(selectedReq.requisition_date).format('DD/MM/yyyy')}</p>
                      </div>
                    </div>

                    <div className="table-responsive mx-4 mb-4">
                      <table style={{ border: '1px solid black' }} className="table">
                        <thead>
                          <tr>
                            <th style={{ border: '1px solid black', fontSize: '12px', width: '150px' }} className="fw-bold text-end">Description</th>
                            <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end">Quantity</th>
                            <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end">Unit</th>
                            <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end">Unit Price</th>
                            <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedReq.item_details.map((item, index) => (
                            <tr key={index}>
                              <td style={{ border: '1px solid black', fontSize: '12px', width: '250px' }} className='text-end'>{item.name}</td>
                              <td style={{ border: '1px solid black', fontSize: '12px' }} className='text-end'>{item.quantity}</td>
                              <td style={{ border: '1px solid black', fontSize: '12px' }} className='text-end'>{item.unit}</td>
                              <td style={{ border: '1px solid black', fontSize: '12px' }} className='text-end'>{item.price}</td>
                              <td style={{ border: '1px solid black', fontSize: '12px' }} className='text-end'>{parseFloat(item.price) * parseFloat(item.quantity)}</td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan={4} style={{ border: '1px solid black', fontSize: '12px' }} className='text-center fw-bold'>Total Price</td>
                            <td style={{ border: '1px solid black', fontSize: '12px' }} className='text-end fw-bold'>
                              {selectedReq.item_details.reduce((n, { price, quantity }) => n + parseFloat(price) * parseFloat(quantity), 0)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div style={{ width: '92%' }} className="table-responsive mx-auto mb-5 pb-5">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end p-2 m-0">Approved By DH</th>
                            <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end p-2 m-0">Approved By ADC</th>
                            <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end p-2 m-0">Approved By AGM</th>
                            <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end p-2 m-0">Approved By ED</th>
                            <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end p-2 m-0">Approved By MD</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className='text-end p-2 m-0' style={{ fontSize: '12px', border: '1px solid black' }}>{selectedReq.approved_dc}</td>
                            <td className='text-end p-2 m-0' style={{ fontSize: '12px', border: '1px solid black' }}>{selectedReq.approved_adh}</td>
                            <td className='text-end p-2 m-0' style={{ fontSize: '12px', border: '1px solid black' }}>{selectedReq.approved_agm}</td>
                            <td className='text-end p-2 m-0' style={{ fontSize: '12px', border: '1px solid black' }}>{selectedReq.approved_admin}</td>
                            <td className='text-end p-2 m-0' style={{ fontSize: '12px', border: '1px solid black' }}>
                              {selectedReq.total_price > 5000 ? selectedReq.approved_md : 'Not Required'}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="my-0"></div>

                    <div className='mx-3 d-flex justify-content-between'>
                      <div className='text-center'>
                        <hr style={{ width: '100px' }} />
                        <p className='fw-bold'>AGM</p>
                      </div>
                      <div className='text-center'>
                        <hr style={{ width: '100px' }} />
                        <p className='fw-bold'>CEO</p>
                      </div>
                      <div className='text-center'>
                        <hr style={{ width: '100px' }} />
                        <p className='fw-bold'>ED</p>
                      </div>
                      <div className='text-center'>
                        <hr style={{ width: '100px' }} />
                        <p className='fw-bold'>MD</p>
                      </div>
                    </div>

                    <p style={{ fontSize: '12px' }} className="mt-4 mb-0 pb-0 mx-3">
                      <strong>Head Office :</strong> Khaja IT Park, 2nd to 7th Floor, Mirpur Road, Dhaka-1207.
                    </p>
                    <p style={{ fontSize: '12px' }} className="mt-0 mb-1 pt-0 mx-3">
                      <strong>Phone:</strong> 02-8091188, +88 01550 666 800 |
                      <strong> Email:</strong> info@e-laeltd.com
                    </p>

                    <div className="bg-success text-white text-center pb-0">
                      <div className="container">
                        <p className='my-0'>
                          <a style={{ fontSize: '12px' }} className="text-white" href="https://www.facebook.com/elaeltd">https://www.facebook.com/elaeltd</a>
                          <span> | </span>
                          <a style={{ fontSize: '12px' }} className="text-white" href="https://www.promisenothi.com">https://www.promisenothi.com</a>
                        </p>
                      </div>
                    </div>
                    <p style={{ fontSize: '12px' }} className='bg-blue text-white text-center mb-2'>
                      All rights reserved by @ Promise E-nothi
                    </p>
                  </div>

                  {brochures.length > 0 && (
                    <>
                      <h3 className='mt-3 text-success border border-success'>Brochures</h3>
                      {brochures.map((item, index) => (
                        <div key={index}>
                          <a 
                            target='_blank' 
                            rel="noopener noreferrer" 
                            className='btn btn-warning' 
                            href={item.image}
                          >
                            File Link {index + 1}
                          </a>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ApprovedElt;