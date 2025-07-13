import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BarChart3, TrendingUp, Users, DollarSign, Eye, Plus } from 'lucide-react';

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 140px);
`;

const DashboardHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  .stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    
    h3 {
      color: #666;
      font-size: 0.9rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &.primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
      &.success { background: linear-gradient(135deg, #56cc9d 0%, #41b883 100%); color: white; }
      &.warning { background: linear-gradient(135deg, #ffb74d 0%, #ff9800 100%); color: white; }
      &.info { background: linear-gradient(135deg, #42a5f5 0%, #1976d2 100%); color: white; }
    }
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .stat-change {
    font-size: 0.9rem;
    color: #56cc9d;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

const QuickActions = styled.div`
  margin-bottom: 3rem;
  
  h2 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1rem;
  }
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const ActionCard = styled(Link)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
  
  .action-icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.25rem;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    line-height: 1.5;
  }
`;

const RecentActivity = styled.div`
  h2 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1rem;
  }
`;

const ActivityList = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const ActivityItem = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
  
  .activity-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .activity-text {
    color: #333;
    font-size: 0.95rem;
  }
  
  .activity-time {
    color: #666;
    font-size: 0.85rem;
  }
`;

function Dashboard() {
  return (
    <DashboardContainer>
      <DashboardHeader>
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening with your pages and projects.</p>
      </DashboardHeader>

      <StatsGrid>
        <StatCard>
          <div className="stat-header">
            <h3>Total Pages</h3>
            <div className="icon primary">
              <BarChart3 size={20} />
            </div>
          </div>
          <div className="stat-value">24</div>
          <div className="stat-change">
            <TrendingUp size={16} />
            +12% from last month
          </div>
        </StatCard>

        <StatCard>
          <div className="stat-header">
            <h3>Page Views</h3>
            <div className="icon info">
              <Eye size={20} />
            </div>
          </div>
          <div className="stat-value">12.5K</div>
          <div className="stat-change">
            <TrendingUp size={16} />
            +8% from last week
          </div>
        </StatCard>

        <StatCard>
          <div className="stat-header">
            <h3>Conversions</h3>
            <div className="icon success">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="stat-value">892</div>
          <div className="stat-change">
            <TrendingUp size={16} />
            +23% conversion rate
          </div>
        </StatCard>

        <StatCard>
          <div className="stat-header">
            <h3>Active Users</h3>
            <div className="icon warning">
              <Users size={20} />
            </div>
          </div>
          <div className="stat-value">1,234</div>
          <div className="stat-change">
            <TrendingUp size={16} />
            +5% active users
          </div>
        </StatCard>
      </StatsGrid>

      <QuickActions>
        <h2>Quick Actions</h2>
        <ActionsGrid>
          <ActionCard to="/page-builder">
            <div className="action-icon">
              <Plus size={24} />
            </div>
            <h3>Create New Page</h3>
            <p>Start building a new sales page or landing page with our AI-powered page builder.</p>
          </ActionCard>

          <ActionCard to="/product-generator">
            <div className="action-icon">
              <BarChart3 size={24} />
            </div>
            <h3>Generate Product Content</h3>
            <p>Use AI to create compelling product descriptions and marketing copy.</p>
          </ActionCard>

          <ActionCard to="/api">
            <div className="action-icon">
              <TrendingUp size={24} />
            </div>
            <h3>View Analytics</h3>
            <p>Check your page performance, conversion rates, and detailed analytics.</p>
          </ActionCard>
        </ActionsGrid>
      </QuickActions>

      <RecentActivity>
        <h2>Recent Activity</h2>
        <ActivityList>
          <ActivityItem>
            <div className="activity-content">
              <div className="activity-text">Created new sales page "Premium Wireless Headphones"</div>
              <div className="activity-time">2 hours ago</div>
            </div>
          </ActivityItem>
          <ActivityItem>
            <div className="activity-content">
              <div className="activity-text">Generated product description for "Smart Fitness Tracker"</div>
              <div className="activity-time">5 hours ago</div>
            </div>
          </ActivityItem>
          <ActivityItem>
            <div className="activity-content">
              <div className="activity-text">Updated Shopify integration settings</div>
              <div className="activity-time">1 day ago</div>
            </div>
          </ActivityItem>
          <ActivityItem>
            <div className="activity-content">
              <div className="activity-text">Synced 15 products from CJ Dropshipping</div>
              <div className="activity-time">2 days ago</div>
            </div>
          </ActivityItem>
        </ActivityList>
      </RecentActivity>
    </DashboardContainer>
  );
}

export default Dashboard;