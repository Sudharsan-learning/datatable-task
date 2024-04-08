import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";

function ApplianceInfo() {
  let { id } = useParams();

  const devices = useQuery({
    queryKey: [`devicesList-${id}`],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/v1/appliances/${id}`);
        return response.data;
      } catch (err) {
        console.error("devices error", err);
      }
    },
  });

  return (
    <>
      <section className="">
        <div className="breadcrum-section">
          <p>
            <Link to="/">Devices</Link> <span>{`>`}</span>{" "}
            {devices.data && devices.data?.appliance?.serialNo}
          </p>
        </div>
        <div className="info">
          <div className="info-section">
            <div>
              <h1>{devices.data && devices.data?.appliance?.serialNo}</h1>
              <div>
                <h5>{devices.data && devices.data?.appliance?.theatreName}</h5>
                <p>
                  {devices.data && devices.data?.appliance?.location.city},{" "}
                  {devices.data && devices.data?.appliance?.location.state},{" "}
                  {devices.data && devices.data?.appliance?.location.country}
                </p>
              </div>
              <div className="info-status">
                <div className="tag">
                  <span className="green"></span>Online
                </div>
                <div className="tag ml-2">
                  {devices.data && devices.data?.appliance?.storage}
                </div>
              </div>
            </div>
            <div className="button-section">
              <button type="button">
                <span>
                  <img src="./demand.svg" alt="Demand Icon" />
                  Speedtest
                </span>
              </button>
              <button type="button" className="ml-2">
                <span>
                  <img src="./logs.svg" alt="Logs Icon" />
                  Logs
                </span>
              </button>
            </div>
          </div>
          <hr />
          <div className="navbar">
            <p>Details</p>
            <p>Contact</p>
            <p>Bandwidth</p>
          </div>
        </div>
        <div className="container">
          <div className="info-details">
            <div className="detail">
              <p>Device Serial</p>
              <h5>{devices.data && devices.data?.appliance?.serialNo}</h5>
            </div>
            <div className="detail">
              <p>Location</p>
              <h5>{devices.data && devices.data?.appliance?.theatreName}</h5>
            </div>
            <div className="detail">
              <p>City</p>
              <h5>
                {devices.data && devices.data?.appliance?.location.city},{" "}
                {devices.data && devices.data?.appliance?.location.state},{" "}
                {devices.data && devices.data?.appliance?.location.country}
              </h5>
            </div>
            <div className="detail">
              <p>ISP Payment Responsibility</p>
              <h5>
                {devices.data &&
                  devices.data?.appliance?.ispPaymentResponsibility}
              </h5>
            </div>
            <div className="detail">
              <p>Bandwidth</p>
              <h5>{devices.data && devices.data?.appliance?.bandwidth}</h5>
            </div>
            <div className="detail">
              <p>Average Bandwidth</p>
              <h5>{devices.data && devices.data?.appliance?.avgBandwidth}</h5>
            </div>
            <div className="detail">
              <p>Plan Start Date</p>
              <h5>{devices.data && devices.data?.appliance?.planStartDate}</h5>
            </div>
            <div className="detail">
              <p>Billing Cycle</p>
              <h5>{devices.data && devices.data?.appliance?.billingCycle}</h5>
            </div>
            <div className="detail">
              <p>Download Status</p>
              <h5>{devices.data && devices.data?.appliance?.downloadStatus}</h5>
            </div>
            <div className="detail">
              <p>OS Version</p>
              <h5>{devices.data && devices.data?.appliance?.osVersion}</h5>
            </div>
            <div className="detail">
              <p>Storage Available</p>
              <h5>{devices.data && devices.data?.appliance?.storage}</h5>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ApplianceInfo;
