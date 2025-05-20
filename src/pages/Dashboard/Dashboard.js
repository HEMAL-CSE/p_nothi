import React from 'react';
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
        <NavbarBrand className="fw-bold">👨‍💼 Dashboard</NavbarBrand>
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
            <Card>
              <CardBody>
                <CardTitle tag="h5">Current Semester</CardTitle>
                <h4>Spring 2025</h4>
                <p>14 Weeks Completed</p>
              </CardBody>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <CardBody>
                <CardTitle tag="h5">Registered Courses</CardTitle>
                <h4>6 Courses</h4>
                <p>18 Credits</p>
              </CardBody>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <CardBody>
                <CardTitle tag="h5">Current CGPA</CardTitle>
                <h4>3.78</h4>
                <p>Dean's List</p>
              </CardBody>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <CardBody>
                <CardTitle tag="h5">Attendance</CardTitle>
                <h4>94%</h4>
                <p>42 Days Present</p>
              </CardBody>
            </Card>
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
                <CardTitle tag="h6">Attendance Report</CardTitle>
                <Bar data={barData} options={{ responsive: true }} />
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardBody>
                <CardTitle tag="h6">Payment History</CardTitle>
                <Line data={lineData} options={{ responsive: true }} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <Card>
              <CardBody>
                <CardTitle tag="h6">Quick Links</CardTitle>

              <Button color="primary"className="m-1 btn-sm" onClick={() => { window.location.href = "/"; }} > Home Page</Button>
              <Button color="primary"className="m-1 btn-sm" onClick={() => { window.location.href = "leave"; }} > Leave Application</Button> 
              <Button color="primary"className="m-1 btn-sm" onClick={() => { window.location.href = "application"; }} > Requsition</Button>
              <Button color="primary"className="m-1 btn-sm" onClick={() => { window.location.href = "Notice"; }} > Notice</Button>
              <Button color="primary"className="m-1 btn-sm" onClick={() => { window.location.href = "workreport"; }} > Daily Work Report</Button>
                {/* <Button color="primary" className="m-1">Teaching Eval</Button> */}
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardBody>
                <CardTitle tag="h6">Latest Notices</CardTitle>
                <p><strong>Important:</strong> Final Exam Schedule Published</p>
                <p>Spring 2025 final exam schedule has been published. Check your routine immediately.</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
