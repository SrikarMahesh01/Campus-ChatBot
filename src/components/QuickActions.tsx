import type { QuickAction } from '../types/chatbot';
import { chatbotData } from '../data/chatbotData';
import './QuickActions.css';

interface QuickActionsProps {
  onActionClick: (query: string) => void;
  onHide: () => void;
}

export function QuickActions({ onActionClick, onHide }: QuickActionsProps) {
  const quickActions = chatbotData.quickActions;

  // Group actions by category for better organization
  const groupedActions = quickActions.reduce((groups: { [key: string]: typeof quickActions }, action) => {
    const category = action.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(action);
    return groups;
  }, {});

  const categoryOrder = ['general', 'academics', 'leadership', 'facilities', 'policies'];
  const orderedCategories = categoryOrder.filter(cat => groupedActions[cat]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academics':
        return '📚';
      case 'events':
        return '🎉';
      case 'departments':
        return '🏢';
      case 'facilities':
        return '🏫';
      case 'general':
        return 'ℹ️';
      case 'leadership':
        return '👔';
      case 'policies':
        return '📋';
      default:
        return '💬';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academics':
        return '#4299e1'; // Blue
      case 'events':
        return '#f56565'; // Red
      case 'departments':
        return '#48bb78'; // Green
      case 'facilities':
        return '#ed8936'; // Orange
      case 'general':
        return '#667eea'; // Indigo
      case 'leadership':
        return '#9f7aea'; // Purple
      case 'policies':
        return '#38b2ac'; // Teal
      default:
        return '#4299e1';
    }
  };

  return (
    <div className="quick-actions">
      <div className="quick-actions-header">
        <div className="quick-actions-title-section">
          <h3 className="quick-actions-title">⚡ Quick Actions</h3>
          <button className="hide-quick-actions-btn" onClick={onHide} title="Hide Quick Actions">
            ✕
          </button>
        </div>
        <p className="quick-actions-subtitle">Get instant answers to common questions about URCET</p>
      </div>
      <div className="quick-actions-grid">
        {orderedCategories.map((category) => (
          <div key={category} className="category-section">
            {groupedActions[category].map((action: QuickAction) => (
              <button
                key={action.id}
                className="quick-action-btn"
                onClick={() => {
                  if (action.externalLink) {
                    window.open(action.externalLink, '_blank');
                  } else {
                    onActionClick(action.query);
                  }
                }}
                style={{
                  '--category-color': getCategoryColor(action.category)
                } as React.CSSProperties}
              >
                <span className="action-icon">{getCategoryIcon(action.category)}</span>
                <span className="action-label">{action.label}</span>
                <span className="action-arrow">{action.externalLink ? '↗' : '→'}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
