import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const devices = useQuery({
    queryKey: [`devices-${page}-${pageSize}-${searchTerm}`],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `/api/v1/appliances?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}`
        );
        return response.data;
      } catch (err) {
        console.error("devices error", err);
      }
    },
  });

  const statusCounts = {
    Failed: 0,
    Cancelled: 0,
    Scheduled: 0,
    Downloading: 0,
    Downloaded: 0,
  };

  devices.data?.appliances?.forEach((appliance) => {
    if (statusCounts.hasOwnProperty(appliance.downloadStatus)) {
      statusCounts[appliance.downloadStatus]++;
    }
  });

  const {
    Failed: failedStatusLength,
    Cancelled: cancelledStatusLength,
    Scheduled: scheduledStatusLength,
    Downloading: downloadingStatusLength,
    Downloaded: downloadStatusLength,
  } = statusCounts;

  // console.log("appliances", devices.data?.totalPages);

  const handleSearch = (e) => {
    // console.log("e", e.target.value);
    setPage(1);
    setSearchTerm(e.target.value);
  };

  const handlePageSize = (e) => {
    // console.log("e", e.target.value);
    setPage(1);
    setPageSize(e.target.value);
  };

  const handlePageClick = (e) => {
    // console.log("e", e);
    setPage(e.selected + 1);
  };

  return (
    <>
      <section className="">
        <div className="heading-section">
          <h1>Devices</h1>
        </div>
        <div className="container">
          <div className="status-section dot">
            <ul>
              <li>
                <span className="red"></span>
                {failedStatusLength ? failedStatusLength : 0} Failed
              </li>
              <li>
                <span className="orange"></span>
                {cancelledStatusLength ? cancelledStatusLength : 0} Cancelled
              </li>
              <li>
                <span className="grey"></span>
                {scheduledStatusLength ? scheduledStatusLength : 0} Scheduled
              </li>
              <li>
                <span className="blue"></span>
                {downloadingStatusLength ? downloadingStatusLength : 0}{" "}
                Downloading
              </li>
              <li>
                <span className="green"></span>
                {downloadStatusLength ? downloadStatusLength : 0} Downloaded
              </li>
            </ul>
          </div>
        </div>
        <div className="datatable container">
          <div className="filter-section">
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => handleSearch(e)}
              />
              <div className="input-group">
                <img
                  src="./search.svg"
                  className="serch-icon"
                  alt="search-icon"
                />
              </div>
              <button type="button">
                <span>
                  <img src="./filter.svg" alt="filter-icon" />
                  Filter
                </span>
              </button>
            </div>
            <div className="pagination-section">
              <div className="select-dropdown">
                <span>Show</span>
                <select onChange={(e) => handlePageSize(e)}>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
              {devices.data?.totalPages && (
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=">"
                  pageRangeDisplayed={pageSize}
                  pageCount={devices.data?.totalPages}
                  onPageChange={handlePageClick}
                  previousLabel="<"
                  renderOnZeroPageCount={null}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              )}
            </div>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Device Serial</th>
                  <th>Location</th>
                  <th>Bandwidth</th>
                  <th>Status</th>
                  <th>Download Status</th>
                  <th>OS Version</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {}
                {devices && devices.data && devices.data.isLoading ? (
                  <>Loading...</>
                ) : (
                  devices.data?.appliances.map((device, index) => (
                    <tr key={index}>
                      <td>{device.serialNo}</td>
                      <td>
                        {device.theatreName} <br /> {device.location.city},
                        {device.location.state}, {device.location.country}
                      </td>
                      <td>
                        {device.bandwidth} <br /> {device.avgBandwidth}
                      </td>
                      <td>
                        <div className="dot">
                          {(() => {
                            switch (device.deviceStatus) {
                              case "Offline":
                                return (
                                  <>
                                    <span className="red"></span>Offline
                                  </>
                                );
                              case "Online":
                                return (
                                  <>
                                    <span className="green"></span>Online
                                  </>
                                );
                              default:
                                return null;
                            }
                          })()}
                        </div>
                      </td>
                      <td>
                        <div className="dot">
                          {(() => {
                            switch (device.downloadStatus) {
                              case "Failed":
                                return (
                                  <>
                                    <span className="red"></span>
                                    {device.downloadStatus}
                                  </>
                                );
                              case "Cancelled":
                                return (
                                  <>
                                    <span className="orange"></span>
                                    {device.downloadStatus}
                                  </>
                                );
                              case "Scheduled":
                                return (
                                  <>
                                    <span className="grey"></span>
                                    {device.downloadStatus}
                                  </>
                                );
                              case "Downloading":
                                return (
                                  <>
                                    <span className="blue"></span>
                                    {device.downloadStatus}
                                  </>
                                );
                              case "Downloaded":
                                return (
                                  <>
                                    <span className="green"></span>
                                    {device.downloadStatus}
                                  </>
                                );
                              default:
                                return (
                                  <>
                                    <span className="green"></span>
                                    {device.downloadStatus}
                                  </>
                                );
                            }
                          })()}
                        </div>
                      </td>
                      <td>{device.osVersion}</td>
                      <td>
                        <Link to={`/${device.serialNo}`}>
                          <button type="button">View</button>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
