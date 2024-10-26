import { Spin } from "antd";
import React, { useState, useEffect } from "react";
import ConsignmentList from "../../../../components/staff/consign/consign-list/ConsignmentList";
import axiosInstance from "../../../../api/axiosInstance";

const ProcessingConsignment = () => {
  const [consignments, setConsignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsignments = async () => {
      try {
        // const userId = localStorage.getItem('userId');
        const userId = 3;
        const response = await axiosInstance.get(`/koiconsignment/pending/${userId}`);
        console.log("API Response:", response.data);
        if (response.data && Array.isArray(response.data.data)) {
          setConsignments(response.data.data);
        } else {
          console.error("API did not return an array in data property:", response.data);
          setConsignments([]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching consignments:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchConsignments();
  }, []);

  if (loading) return <Spin tip="Loading consignments..." />;
  if (error) return <div>Error: {error}</div>;

  return (
    <ConsignmentList 
      initialConsignments={consignments} 
      filterStatus="Pending"
    />
  );
};

export default ProcessingConsignment;
