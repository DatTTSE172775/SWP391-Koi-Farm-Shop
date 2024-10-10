import React, { useState } from 'react';
//import { FaTruck, FaCheckCircle, FaSpinner, FaFilePdf, FaStar, FaChevronDown, FaChevronUp, FaShareAlt, FaEnvelope } from 'react-icons/fa';
import { FaTruck, FaCheckCircle, FaSpinner, FaFilePdf, FaStar, FaChevronDown, FaChevronUp} from 'react-icons/fa'; 
import { Modal, Accordion, ProgressBar } from 'react-bootstrap';
import './OrderHistory.scss';
import koiproduct1 from '../../../assets/koi-list/koiImg1.jpg';
import koiproduct2 from '../../../assets/koi-list/koiImg2.jpg';
import koiproduct3 from '../../../assets/koi-list/koiImg3.jpg';

const OrderHistory = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [ratings, setRatings] = useState({});
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetails, setShowDetails] = useState(false); // State added here

  const orders = [
    {
      orderNumber: '12345',
      fishType: 'Kohaku',
      size: '40cm',
      price: '$1500',
      date: '2024-10-01',
      status: 'Delivered',
      tracking: 'Track123',
      estimatedDelivery: '2024-10-05',
      imgSrc: koiproduct1,
    },
    {
      orderNumber: '67890',
      fishType: 'Sanke',
      size: '50cm',
      price: '$1800',
      date: '2024-09-15',
      status: 'Ongoing',
      tracking: 'Track456',
      estimatedDelivery: '2024-10-08',
      imgSrc: koiproduct2,
    },
    {
      orderNumber: '11223',
      fishType: 'Showa',
      size: '35cm',
      price: '$1200',
      date: '2024-09-25',
      status: 'Processing',
      tracking: null,
      estimatedDelivery: 'Pending',
      imgSrc: koiproduct3,
    }
  ];

  // Status icons
  const renderStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <FaCheckCircle className="status-icon delivered" />;
      case 'Ongoing':
        return <FaTruck className="status-icon ongoing" />;
      case 'Processing':
        return <FaSpinner className="status-icon processing" />;
      default:
        return null;
    }
  };

  // Simulate progress based on status
  const renderProgressBar = (status) => {
    let progress = 0;
    switch (status) {
      case 'Delivered':
        progress = 100;
        break;
      case 'Ongoing':
        progress = 60;
        break;
      case 'Processing':
        progress = 20;
        break;
      default:
        progress = 0;
    }
    return <ProgressBar now={progress} label={`${progress}%`} />;
  };

  const handleImageClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const toggleOrderDetails = (orderNumber) => {
    if (expandedOrder === orderNumber) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderNumber);
      
      // Thêm tính năng cuộn xuống phần đánh giá
      setTimeout(() => {
        const rateSection = document.querySelector(".order-rating");
        if (rateSection) {
          rateSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 300); // Thời gian chờ để cuộn xuống sau khi mở chi tiết
    }
  };

  // Search functionality improvements
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStarClick = (orderNumber, starValue) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [orderNumber]: starValue,
    }));
    alert(`Bạn đã đánh giá đơn hàng #${orderNumber} với ${starValue} sao!`);
  };

  const renderStars = (orderNumber) => {
    const rating = ratings[orderNumber] || 0;
    return (
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`star-icon ${star <= rating ? 'filled' : ''}`}
            onClick={() => handleStarClick(orderNumber, star)}
          />
        ))}
      </div>
    );
  };

  const filteredOrders = filterStatus === 'All' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const searchedOrders = filteredOrders.filter(order => 
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.fishType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.size.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Update handleToggle function
  const handleToggle = () => {
    setShowDetails(!showDetails);
    
    if (!showDetails) {
      setTimeout(() => {
        const rateSection = document.querySelector(".order-rating");
        rateSection.scrollIntoView({ behavior: "smooth" });
      }, 300);  // Adjust the delay if needed
    }
  };

  return (
    <div className="order-history-container">
      <h1 className="title">Your Koi Fish Orders</h1>

      {/* Filter and Search Bar */}
      <div className="filter-search-container">
        <div className="filter-buttons">
          {['All', 'Delivered', 'Ongoing', 'Processing'].map(status => (
            <button
              key={status}
              className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
              onClick={() => setFilterStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="order-list">
        {searchedOrders.map((order, index) => (
          <div key={index} className="order-card">
            <div className="order-header">
              <span className="order-number">Order #{order.orderNumber}</span>
              <span className="order-date">{order.date}</span>
            </div>
            <div className="order-body">
              <img
                src={order.imgSrc}
                alt={order.fishType}
                className="fish-image"
                onClick={() => handleImageClick(order)}
              />
              <div className="order-details">
                <div className="detail-row">
                  <span>Fish Type:</span> <span>{order.fishType}</span>
                </div>
                <div className="detail-row">
                  <span>Size:</span> <span>{order.size}</span>
                </div>
                <div className="detail-row">
                  <span>Price:</span> <span>{order.price}</span>
                </div>
                <div className="detail-row">
                  <span>Estimated Delivery:</span> <span>{order.estimatedDelivery}</span>
                </div>
              </div>
              <div className="order-status">
                {renderStatusIcon(order.status)}
                {renderProgressBar(order.status)}
                <span className={`status-badge ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
            </div>
            <div className="order-actions">
              <button className="view-details-btn" onClick={() => toggleOrderDetails(order.orderNumber)}>
                {expandedOrder === order.orderNumber ? <FaChevronUp /> : <FaChevronDown />} {expandedOrder === order.orderNumber ? 'Hide Details' : 'Show Details'}
              </button>

              {/* Add Download Invoice Button */}
              <button className="invoice-btn" onClick={() => alert(`Invoice for Order #${order.orderNumber} is being downloaded.`)}>
                <FaFilePdf /> Download Invoice
              </button>
            </div>

            {/* New Star Rating Feature */}
            <div className="order-rating">
              <h4>Rate Your Experience</h4>
              {renderStars(order.orderNumber)}
            </div>

            {/* Collapsible Order Details */}
            {expandedOrder === order.orderNumber && (
              <div className="additional-details">
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Breeder Info</Accordion.Header>
                    <Accordion.Body>
                      This fish is a high-quality {order.fishType} from XYZ Koi Farm, known for producing champion-level koi. Originated in Japan.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Instructions</Accordion.Header>
                    <Accordion.Body>
                      Ensure the water temperature remains between 18°C-25°C with a pH of 7.0-7.5. Regular water changes and quality filtration are required.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedOrder && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Order #{selectedOrder.orderNumber}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedOrder.imgSrc}
              alt={selectedOrder.fishType}
              className="modal-image"
            />
            <p><strong>Fish Type:</strong> {selectedOrder.fishType}</p>
            <p><strong>Size:</strong> {selectedOrder.size}</p>
            <p><strong>Price:</strong> {selectedOrder.price}</p>
            <p><strong>Estimated Delivery:</strong> {selectedOrder.estimatedDelivery}</p>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default OrderHistory;
