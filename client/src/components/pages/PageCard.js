import React, { useState } from 'react';
import './PageCard.css';

const PageCard = ({ page, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: page.title,
    description: page.description || '',
    published: page.published
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeColor = (type) => {
    const colors = {
      landing: '#007bff',
      sales: '#28a745',
      blog: '#ffc107',
      portfolio: '#6f42c1'
    };
    return colors[type] || '#6c757d';
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // In a real app, you'd call the API here
      console.log('Saving page:', editData);
      setIsEditing(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error updating page:', error);
    }
  };

  const handleCancel = () => {
    setEditData({
      title: page.title,
      description: page.description || '',
      published: page.published
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(page.id);
  };

  return (
    <div className="page-card">
      <div className="page-card-header">
        <div 
          className="page-type"
          style={{ backgroundColor: getTypeColor(page.type) }}
        >
          {page.type}
        </div>
        <div className="page-status">
          <span className={`status-badge ${page.published ? 'published' : 'draft'}`}>
            {page.published ? 'Published' : 'Draft'}
          </span>
        </div>
      </div>

      <div className="page-card-content">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="edit-title"
              placeholder="Page title"
            />
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              className="edit-description"
              placeholder="Page description"
              rows="3"
            />
            <label className="edit-published">
              <input
                type="checkbox"
                checked={editData.published}
                onChange={(e) => setEditData({ ...editData, published: e.target.checked })}
              />
              Published
            </label>
          </div>
        ) : (
          <>
            <h3 className="page-title">{page.title}</h3>
            {page.description && (
              <p className="page-description">{page.description}</p>
            )}
          </>
        )}
      </div>

      <div className="page-card-footer">
        <div className="page-dates">
          <small>Created: {formatDate(page.createdAt)}</small>
          {page.updatedAt !== page.createdAt && (
            <small>Updated: {formatDate(page.updatedAt)}</small>
          )}
        </div>

        <div className="page-actions">
          {isEditing ? (
            <>
              <button 
                className="action-btn save-btn"
                onClick={handleSave}
              >
                Save
              </button>
              <button 
                className="action-btn cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button 
                className="action-btn edit-btn"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button 
                className="action-btn view-btn"
                onClick={() => console.log('View page:', page.id)}
              >
                View
              </button>
              <button 
                className="action-btn delete-btn"
                onClick={handleDelete}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageCard;