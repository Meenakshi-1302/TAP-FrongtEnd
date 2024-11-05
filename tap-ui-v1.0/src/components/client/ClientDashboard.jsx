import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Chart from 'react-apexcharts';
import moment from 'moment';
import ClientSidebar from './ClientSidebar';
import ClientNavbar from '../ClientNavbar';
import { getJobRequirements, getManufacturers } from '../../services/ClientDashboardService'; // Importing the service functions

const ClientDashboard = () => {
  const [userName, setUserName] = useState('John Doe');
  const [currentTime, setCurrentTime] = useState(moment().format('LTS'));
  const [jobPosts, setJobPosts] = useState(0);
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [hiringCount, setHiringCount] = useState(0);
  const [rowData, setRowData] = useState([]);
  const [chartSeries, setChartSeries] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  const columnDefs = [
    { headerName: 'Requirement', field: 'requirement', sortable: true, filter: true },
    { headerName: 'Candidate Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Status', field: 'status', sortable: true, filter: true },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requirementsData = await getJobRequirements(); // Assuming this function still fetches job requirements
        setJobPosts(requirementsData.length);

        // Fetch candidates directly from JSON server
        const candidatesResponse = await fetch('http://localhost:3000/candidates'); // URL to your JSON server
        const candidatesData = await candidatesResponse.json();

        setTotalApplicants(candidatesData.length);
        setHiringCount(candidatesData.filter(candidate => candidate.status === 'Shortlisted').length);

        // Transform candidatesData to match the required structure
        const transformedCandidatesData = candidatesData.map(candidate => ({
          requirement: candidate.requirement,  // Adjust this based on your data structure
          name: candidate.name,
          status: candidate.status,
        }));

        setRowData(transformedCandidatesData);
        
        const applicationsCount = candidatesData.length;
        const interviewsCount = candidatesData.filter(candidate => candidate.status === 'In Process').length;
        const offersCount = candidatesData.filter(candidate => candidate.status === 'Offer Made').length;
        const hiresCount = candidatesData.filter(candidate => candidate.status === 'Hired').length;

        setChartSeries([applicationsCount, interviewsCount, offersCount, hiresCount]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  const chartOptions = {
    chart: {
      type: 'pie',
      height: '350',
    },
    labels: ['Applications', 'Interviews', 'Offers', 'Hires'],
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const handleViewMore = () => {
    setPageSize(prevPageSize => prevPageSize + 5); // Increase page size by 5
  };

  return (
    <div className="flex flex-row mt-8">
      <div className="flex-grow p-6 ml-64">
        <ClientNavbar />
        <ClientSidebar />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-center">Welcome, {userName}!</h2>
            <p className="text-gray-600 text-center">{currentTime}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold">Requirements Posted</h3>
            <p className="text-2xl">{jobPosts}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold">Total Applicants</h3>
            <p className="text-2xl">{totalApplicants}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold">Hiring Count</h3>
            <p className="text-2xl">{hiringCount}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">Job Applications Overview</h3>
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="pie"
              height={350}
            />
          </div>
          <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg font-semibold">Applicants List</p>
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded-md"
                onClick={handleViewMore}
              >
                View More
              </button>
            </div>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={pageSize} // Use dynamic page size
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;