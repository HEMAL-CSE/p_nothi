import React from 'react';
import { CheckCircle, XCircle, Hourglass, Users, Building, DollarSign, FileText } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-4">
      <div className="text-2xl font-bold mb-4">Dashboard Overview</div>
      <div className="row">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <Users className="text-4xl mb-2" />
              <div className="card-title">Total Employees</div>
              <div className="card-text text-2xl">1</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <Building className="text-4xl mb-2" />
              <div className="card-title">Total Departments</div>
              <div className="card-text text-2xl">2</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <DollarSign className="text-4xl mb-2" />
              <div className="card-title">Monthly Salary</div>
              <div className="card-text text-2xl">0</div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-2xl font-bold my-4">Leave Details</div>
      <div className="row">
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-body">
              <FileText className="text-4xl mb-2" />
              <div className="card-title">Leave Applied</div>
              <div className="card-text text-2xl">5</div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-body">
              <CheckCircle className="text-4xl text-success mb-2" />
              <div className="card-title">Leave Approved</div>
              <div className="card-text text-2xl">2</div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-body">
              <Hourglass className="text-4xl text-warning mb-2" />
              <div className="card-title">Leave Pending</div>
              <div className="card-text text-2xl">4</div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-body">
              <XCircle className="text-4xl text-danger mb-2" />
              <div className="card-title">Leave Rejected</div>
              <div className="card-text text-2xl">1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
