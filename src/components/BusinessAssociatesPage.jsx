import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Adjust import based on your file structure
import FriendsList from './friends';
import RightSidebar from './RightSidebar';
import LeftSidebar from './LeftSidebar';
import bgImage from '../images/bg.jpg';
import { useNavigate } from 'react-router-dom';

// ------------------------
// 1) PROFIT AGGREGATION HELPERS (Copied from your reference code)
// ------------------------

// This structure helps define which subtypes belong to each major property type
const SUBTYPE_STRUCTURE = {
  Residential: ['Home', 'Apartment', 'Villas', 'FarmHouse'],
  Commercial: ['Office', 'Shop', 'Warehouse', 'Factory'],
  Land: ['Others']
};

// aggregator function
function aggregateProfitBySubtype(rawProperties) {
  // Initialize an object that will store results like:
  // {
  //   Residential: {
  //     Home: { qty: 0, profit: { allTime: 0, thisYear: 0, thisMonth: 0 } },
  //     Apartment: {...},
  //     ...
  //   },
  //   Commercial: {...},
  //   Land: {...}
  // }
  const results = {};
  Object.keys(SUBTYPE_STRUCTURE).forEach((type) => {
    results[type] = {};
    SUBTYPE_STRUCTURE[type].forEach((subtype) => {
      results[type][subtype] = {
        qty: 0,
        profit: { allTime: 0, thisYear: 0, thisMonth: 0 }
      };
    });
  });

  // For 'thisYear' & 'thisMonth' calculations
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-based

  rawProperties.forEach((item) => {
    // Only consider sold properties
    if (item.status?.toLowerCase() !== 'sold') return;

    // Match the propertyType to one of the keys: Residential, Commercial, Land
    const matchedType = Object.keys(SUBTYPE_STRUCTURE).find(
      (type) => item.propertyType?.toLowerCase() === type.toLowerCase()
    );
    if (!matchedType) return; // Unrecognized propertyType

    // Match the propertySubType to see if it's in the known list
    const matchedSub = SUBTYPE_STRUCTURE[matchedType].find(
      (st) => item.propertySubType?.toLowerCase() === st.toLowerCase()
    );
    if (!matchedSub) return; // Unrecognized propertySubType

    // Now we bump the quantity by 1
    const entry = results[matchedType][matchedSub];
    entry.qty += 1;

    // Determine the base from demand or budget.max
    let base = 0;
    if (item.demand && item.demand !== '') {
      base = Number(item.demand);
    } else if (item.budget?.max) {
      base = Number(item.budget.max);
    }

    // Calculate profit based on commission and addedValue
    let profitVal = 0;
    if (item.commission && item.addedValue) {
      const { commission, addedValue } = item;

      // If both are 'value'
      if (commission.type === 'value' && addedValue.type === 'value') {
        profitVal = Number(commission.value) + Number(addedValue.value);
      }
      // If both are 'percentage'
      else if (
        commission.type === 'percentage' &&
        addedValue.type === 'percentage'
      ) {
        const totalPercent =
          (Number(commission.value) + Number(addedValue.value)) / 100;
        profitVal = base * totalPercent;
      }
      // If one is 'value' and other is 'percentage', add custom logic if needed
    }

    // Add to allTime
    entry.profit.allTime += profitVal;

    // Check if property date is this year / month
    const date = new Date(item.dateAdded);
    const itemYear = date.getFullYear();
    const itemMonth = date.getMonth();

    if (itemYear === currentYear) {
      entry.profit.thisYear += profitVal;
      if (itemMonth === currentMonth) {
        entry.profit.thisMonth += profitVal;
      }
    }
  });

  return results;
}

// Optionally a quick summary aggregator (all subtypes across all types)
function computeTotalProfit(aggregatedData) {
  let totalQty = 0;
  let totalProfitAllTime = 0;
  let totalProfitThisYear = 0;
  let totalProfitThisMonth = 0;

  Object.values(aggregatedData).forEach((subtypeObj) => {
    // subtypeObj = { Home: {...}, Apartment: {...}, ... }
    Object.values(subtypeObj).forEach((entry) => {
      totalQty += entry.qty;
      totalProfitAllTime += entry.profit.allTime;
      totalProfitThisYear += entry.profit.thisYear;
      totalProfitThisMonth += entry.profit.thisMonth;
    });
  });

  return {
    totalQty,
    totalProfitAllTime,
    totalProfitThisYear,
    totalProfitThisMonth
  };
}

// ------------------------
// Styled Components from your existing code
// ------------------------

const StyledPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.7);
  min-height: 100vh;
  padding: 20px;
  padding-top: 210px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 120px;
  background-color: #ffffff;
  border: 2px solid #e74c3c;
  color: #e74c3c;
  font-size: 14px;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s, transform 0.3s;

  &:hover {
    background-color: #e74c3c;
    color: #ffffff;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    left: 10px;
    width: 100%;
    text-align: center;
  }
`;

const StyledTopBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 10px 20px;
  border-bottom: 3px solid #0073b1;
  border-radius: 18px;
  margin: 0 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Tab = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  color: #0073b1;
  padding: 10px 20px;
  margin: 0 10px;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    border-bottom: 3px solid #0073b1;
  }
`;

const Badge = styled.span`
  background-color: red;
  color: white;
  padding: 2px 6px;
  font-size: 12px;
  border-radius: 50%;
  margin-left: 10px;
`;

const StyledCatchUpContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  align-items: center;
  background-color: #ffffff;
  width: 80%;
  margin: 20px auto;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const NoRequestsMessage = styled.div`
  text-align: center;
  color: #666;
  font-size: 16px;
  margin-top: 20px;
`;

// Example main content container for profit
const ProfitContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  align-items: center;
  background-color: #ffffff;
  width: 90%;
  margin: 20px auto;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ProfitTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
  text-align: center;
`;

const ProfitTH = styled.th`
  background-color: #f3f3f3;
  padding: 8px;
  border: 1px solid #ddd;
`;

const ProfitTD = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
`;

const LeftSidebarContainer = styled.div`
  width: 240px;
  background-color: #f8f8f8;
  height: 100vh;
  padding: 20px;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    padding: 10px;
  }
`;

// ------------------------
// TABS
// ------------------------

/** 
 * The top bar with 3 tabs now:
 *  - "main" (Associates)
 *  - "catchUp" (Connection Requests)
 *  - "profit" (Profit Calculation)
 */
const TopBar = ({ activeTab, setActiveTab, friendRequestCount }) => {
  return (
    <StyledTopBar>
      <Tab
        onClick={() => setActiveTab('main')}
        style={activeTab === 'main' ? { borderBottom: '3px solid #0073b1' } : null}
      >
        Associates
      </Tab>

      <Tab
        onClick={() => setActiveTab('catchUp')}
        style={activeTab === 'catchUp' ? { borderBottom: '3px solid #0073b1' } : null}
      >
        Connection Requests
        {friendRequestCount > 0 && <Badge>{friendRequestCount}</Badge>}
      </Tab>

      {/* [NEW] A third tab for "profit" */}
      <Tab
        onClick={() => setActiveTab('profit')}
        style={activeTab === 'profit' ? { borderBottom: '3px solid #0073b1' } : null}
      >
        Profit
      </Tab>
    </StyledTopBar>
  );
};

// ------------------------
// 2) Existing Friend Logic
// ------------------------

// a simplified CatchUp tab
const CatchUpContent = ({
  friendRequests,
  handleAcceptFriendRequest,
  handleDeclineFriendRequest
}) => {
  if (friendRequests.length === 0) {
    return (
      <StyledCatchUpContent>
        <NoRequestsMessage>No Connection Request available.</NoRequestsMessage>
      </StyledCatchUpContent>
    );
  }

  return (
    <StyledCatchUpContent>
      {friendRequests.map((request) => (
        <div
          key={request._id}
          style={{
            display: 'flex',
            backgroundColor: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: 8,
            padding: 10,
            marginBottom: 10,
            width: 300,
            alignItems: 'center'
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#ccc',
              borderRadius: '50%',
              marginRight: 10
            }}
          />
          <div style={{ flex: 1 }}>
            <strong>
              {request.requester.firstName} {request.requester.lastName}
            </strong>
            <p>Wants to connect</p>
          </div>
          <button onClick={() => handleAcceptFriendRequest(request._id)}>
            Accept
          </button>
          <button onClick={() => handleDeclineFriendRequest(request._id)}>
            Decline
          </button>
        </div>
      ))}
    </StyledCatchUpContent>
  );
};

// 3) [NEW] Profit tab content
const ProfitContent = () => {
  const [properties, setProperties] = useState([]);
  const [aggregated, setAggregated] = useState({});
  const [typeFilter, setTypeFilter] = useState(''); // e.g., 'Residential', 'Commercial', 'Land', or '' for "All"
  const [summary, setSummary] = useState({
    totalQty: 0,
    totalProfitAllTime: 0,
    totalProfitThisYear: 0,
    totalProfitThisMonth: 0
  });

  useEffect(() => {
    // Example: fetch all properties from your API
    axios
      .get('/api/properties')
      .then((res) => {
        const rawProps = res.data || [];
        // 1) Aggregate
        const results = aggregateProfitBySubtype(rawProps);
        setAggregated(results);

        // 2) Compute summary
        const totals = computeTotalProfit(results);
        setSummary(totals);
        setProperties(rawProps);
      })
      .catch((err) => console.error('Error fetching properties:', err));
  }, []);

  // Filter the aggregated data if user picks a type
  let filteredAggregated = { ...aggregated };
  if (typeFilter && aggregated[typeFilter]) {
    // Only keep that one
    filteredAggregated = { [typeFilter]: aggregated[typeFilter] };
  }

  return (
    <ProfitContainer>
      <h2>Profit Calculation</h2>
      {/* [NEW] A simple type filter */}
      <div style={{ margin: '10px 0' }}>
        <label style={{ marginRight: 8 }}>Filter by Property Type: </label>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Land">Land</option>
        </select>
      </div>

      <div style={{ marginTop: 10 }}>
        <strong>Total QTY Sold:</strong> {summary.totalQty} |
        <strong style={{ marginLeft: 10 }}>All Time Profit:</strong>{' '}
        {summary.totalProfitAllTime.toLocaleString()} |
        <strong style={{ marginLeft: 10 }}>This Year:</strong>{' '}
        {summary.totalProfitThisYear.toLocaleString()} |
        <strong style={{ marginLeft: 10 }}>This Month:</strong>{' '}
        {summary.totalProfitThisMonth.toLocaleString()}
      </div>

      {/* Table of aggregated data */}
      {Object.entries(filteredAggregated).map(([typeKey, subtypeObj]) => (
        <div key={typeKey} style={{ width: '100%', marginTop: 20 }}>
          <h3>{typeKey}</h3>
          <ProfitTable>
            <thead>
              <tr>
                <ProfitTH>Subtype</ProfitTH>
                <ProfitTH>QTY</ProfitTH>
                <ProfitTH>Profit (All Time)</ProfitTH>
                <ProfitTH>Profit (This Year)</ProfitTH>
                <ProfitTH>Profit (This Month)</ProfitTH>
              </tr>
            </thead>
            <tbody>
              {Object.entries(subtypeObj).map(([subtype, data]) => (
                <tr key={subtype}>
                  <ProfitTD>{subtype}</ProfitTD>
                  <ProfitTD>{data.qty}</ProfitTD>
                  <ProfitTD>
                    {data.profit.allTime.toLocaleString(undefined, {
                      maximumFractionDigits: 0
                    })}
                  </ProfitTD>
                  <ProfitTD>
                    {data.profit.thisYear.toLocaleString(undefined, {
                      maximumFractionDigits: 0
                    })}
                  </ProfitTD>
                  <ProfitTD>
                    {data.profit.thisMonth.toLocaleString(undefined, {
                      maximumFractionDigits: 0
                    })}
                  </ProfitTD>
                </tr>
              ))}
            </tbody>
          </ProfitTable>
        </div>
      ))}
    </ProfitContainer>
  );
};

// Main Tab content: you can implement or import your existing "FriendsList"
const FriendsListContent = () => {
  return (
    <div style={{ backgroundColor: '#fff', padding: '20px' }}>
      <FriendsList />
    </div>
  );
};

// ------------------------
// MAIN COMPONENT
// ------------------------
const BusinessAssociatesPage = () => {
  const [activeTab, setActiveTab] = useState('main');
  const [friendRequestCount, setFriendRequestCount] = useState(0);
  const [friendRequests, setFriendRequests] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get('/api/friend/requests', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFriendRequests(response.data);
        setFriendRequestCount(response.data.length);
      } catch (error) {
        console.error('Failed to fetch friend requests:', error);
      }
    };

    fetchFriendRequests();
    // Polling every 3 seconds (adjust as needed)
    const intervalId = setInterval(fetchFriendRequests, 3000);
    return () => clearInterval(intervalId);
  }, [token]);

  const handleAcceptFriendRequest = async (requestId) => {
    try {
      await axios.put(
        '/api/friend/update',
        { friendsId: requestId, action: 'accept' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFriendRequests((prev) => prev.filter((req) => req._id !== requestId));
      alert('Friend request accepted!');
    } catch (error) {
      console.error('Error accepting friend request:', error);
      alert('Failed to accept friend request');
    }
  };

  const handleDeclineFriendRequest = async (requestId) => {
    try {
      await axios.put(
        '/api/friend/update',
        { friendsId: requestId, action: 'decline' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFriendRequests((prev) => prev.filter((req) => req._id !== requestId));
      alert('Friend request declined!');
    } catch (error) {
      console.error('Error declining friend request:', error);
      alert('Failed to decline friend request');
    }
  };

  return (
    <StyledPageContainer>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>

      {/* Left Sidebar */}
      <LeftSidebarContainer>
        <LeftSidebar />
      </LeftSidebarContainer>

      {/* Main area */}
      <div style={{ flex: 1 }}>
        <TopBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          friendRequestCount={friendRequestCount}
        />

        {/* MAIN TAB */}
        {activeTab === 'main' && <FriendsListContent />}

        {/* CATCHUP (Friend Requests) TAB */}
        {activeTab === 'catchUp' && (
          <CatchUpContent
            friendRequests={friendRequests}
            handleAcceptFriendRequest={handleAcceptFriendRequest}
            handleDeclineFriendRequest={handleDeclineFriendRequest}
          />
        )}

        {/* [NEW] PROFIT TAB */}
        {activeTab === 'profit' && <ProfitContent />}
      </div>

      {/* Right sidebar if you want it */}
      <RightSidebar />
    </StyledPageContainer>
  );
};

export default BusinessAssociatesPage;
