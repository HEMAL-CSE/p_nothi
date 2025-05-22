import React from 'react';
import { Calendar, BookOpen, Award, CheckSquare } from 'react-feather';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Bell, User } from 'react-feather';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaPepperHot } from 'react-icons/fa';
import { BsPeopleFill } from 'react-icons/bs';
import { DockIcon } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const barData = {
    labels: [
      'January',
      'Summer 2023',
      'Fall 2023',
      'Spring 2024',
      'Summer 2024',
      'Fall 2024',
      'Spring 2025',
      // 'Spring 2026',
      // 'Spring 2027',
      // 'Spring 2028',
      // 'Spring 2029',
    ],
    datasets: [
      {
        label: 'SGPA',
        data: [3.7, 3.6, 3.75, 3.85, 3.8, 3.72, 3.82],
        backgroundColor: '#007bff',
      },
    ],
  };

  const lineData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ],
    datasets: [
      {
        label: 'Payments',
        data: [15000, 20000, 18000, 22000, 21000, 23000, 25000, 24000, 20000, 17000, 16000, 14000],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0,123,255,0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div>
      <Navbar color="light" light expand="md" className="shadow-sm px-4 mb-3">
        <NavbarBrand className="fw-bold">👨‍💼 Dashboard Overview:</NavbarBrand>
        <Nav className="ms-auto" navbar>
          <NavItem className="me-3">
            <NavLink href="#"><Bell /></NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#"><User /></NavLink>
          </NavItem>
        </Nav>
      </Navbar>

      <Container>
        <Row className="mb-4">
          <Col md="3">
            <Card className="shadow-sm border-0">
              <CardBody
                className="d-flex align-items-center p-3 shadow-sm rounded border position-relative"
                style={{ width: '100%', maxWidth: '320px' }}
              >
                {/* Left design strip */}
                <div
                  className="position-absolute start-0 top-0 h-100 bg-primary rounded-start"
                  style={{ width: '6px' }}
                ></div>

                {/* Main content */}
                <div className="d-flex justify-content-between align-items-center w-100 ps-3">
                  <div className="text-center flex-grow-1">
                    <h5 className="fw-semibold mb-1 text-dark">Total Employees</h5>
                    <p className="mb-0 fw-bold text-primary" style={{ fontSize: '18px' }}>870</p>
                  </div>
                  <div
                    className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center ms-3"
                    style={{ width: '44px', height: '44px' }}
                  >
                    <BsPeopleFill size={20} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col md="3">
            <CardBody
                className="d-flex align-items-center p-3 shadow-sm rounded border position-relative"
                style={{ width: '100%', maxWidth: '320px' }}
              >
                {/* Left design strip */}
                <div
                  className="position-absolute start-0 top-0 h-100 bg-primary rounded-start"
                  style={{ width: '6px' }}
                ></div>

                {/* Main content */}
                <div className="d-flex justify-content-between align-items-center w-100 ps-3">
                  <div className="text-center flex-grow-1">
                    <h5 className="fw-semibold mb-1 text-dark">Total Departments</h5>
                    <p className="mb-0 fw-bold text-primary" style={{ fontSize: '18px' }}>100</p>
                  </div>
                  <div
                    className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center ms-3"
                    style={{ width: '44px', height: '44px' }}
                  >
                    <DockIcon size={20} />
                  </div>
                </div>
              </CardBody>
          </Col>

          <Col md="3">
            <CardBody
                className="d-flex align-items-center p-3 shadow-sm rounded border position-relative"
                style={{ width: '100%', maxWidth: '320px' }}
              >
                {/* Left design strip */}
                <div
                  className="position-absolute start-0 top-0 h-100 bg-primary rounded-start"
                  style={{ width: '6px' }}
                ></div>

                {/* Main content */}
                <div className="d-flex justify-content-between align-items-center w-100 ps-3">
                  <div className="text-center flex-grow-1">
                    <h5 className="fw-semibold mb-1 text-dark">Total Branch</h5>
                    <p className="mb-0 fw-bold text-primary" style={{ fontSize: '18px' }}>64</p>
                  </div>
                  <div
                    className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center ms-3"
                    style={{ width: '44px', height: '44px' }}
                  >
                    <BsPeopleFill size={20} />
                  </div>
                </div>
              </CardBody>
          </Col>

          
        </Row>

        <Row className="mb-4">
          <Col md="4">
            <Card>
              <CardBody>
                <CardTitle tag="h6">Total Payable</CardTitle>
                <h4>৳ 9,57,000</h4>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <CardBody>
                <CardTitle tag="h6">Total Paid</CardTitle>
                <h4>৳ 9,57,000</h4>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <CardBody>
                <CardTitle tag="h6">Total Due</CardTitle>
                <h4>৳ 00.00</h4>
              </CardBody>
            </Card>
          </Col>
        </Row>


        <Row className="mb-4">
          <Col md="6">
            <Card>
              <CardBody>
                <CardTitle tag="h6">Monthly Attendance Report</CardTitle>
                <Bar
                  data={{
                    labels: [
                      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                    ],
                    datasets: [
                      {
                        label: 'Attendance (%)',
                        data: [98, 95, 95, 100, 93, 96, 94, 92, 90, 97, 95, 98],
                        backgroundColor: '#28a745',
                      },
                    ],
                  }}
                  options={{ responsive: true }}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardBody>
                <CardTitle tag="h6">Yearly Attendance Report</CardTitle>
                <Line
                  data={{
                    labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
                    datasets: [
                      {
                        label: 'Yearly Avg Attendance (%)',
                        data: [88, 90, 92, 94, 91, 93, 94],
                        borderColor: '#17a2b8',
                        backgroundColor: 'rgba(23, 162, 184, 0.1)',
                        fill: true,
                        tension: 0.4,
                      },
                    ],
                  }}
                  options={{ responsive: true }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>


        <Row>
          <Col md="6">
            <Card>
              <CardBody>
                <CardTitle tag="h6">Quick Links</CardTitle>

                <Button color="primary" className="m-1 btn-sm" onClick={() => { window.location.href = "/"; }} > Home Page</Button>
                <Button color="primary" className="m-1 btn-sm" onClick={() => { window.location.href = "leave"; }} > Leave Application</Button>
                <Button color="primary" className="m-1 btn-sm" onClick={() => { window.location.href = "application"; }} > Requsition</Button>
                <Button color="primary" className="m-1 btn-sm" onClick={() => { window.location.href = "Notice"; }} > Notice</Button>
                <Button color="primary" className="m-1 btn-sm" onClick={() => { window.location.href = "workreport"; }} > Daily Work Report</Button>
                {/* <Button color="primary" className="m-1">Teaching Eval</Button> */}
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card className="shadow-sm border-0">
              <CardBody>
                <CardTitle tag="h5" className="mb-4 fw-bold">
                  📢 Company Announcements
                </CardTitle>

                <div className="mb-3 p-3 bg-light rounded border-start border-4 border-info">
                  <h6 className="mb-1 text-dark fw-semibold">🔔 Office Notice</h6>
                  <p className="mb-1 text-muted small">
                    Due to maintenance work, E-Nothi updated with the time, so don't worried about it.
                  </p>
                  <span className="text-secondary small">Published: May 20, 2025</span>
                </div>

                <div className="mb-3 p-3 bg-light rounded border-start border-4 border-success">
                  <h6 className="mb-1 text-dark fw-semibold">💼 New HR Policy Updated</h6>
                  <p className="mb-1 text-muted small">
                    Please review the updated HR policy effective from June 1, available in the HR portal.
                  </p>
                  <span className="text-secondary small">Published: May 18, 2025</span>
                </div>
              </CardBody>
            </Card>
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
