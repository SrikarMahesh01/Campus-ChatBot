import type { QuickAction } from '../types/chatbot';
import { chatbotData } from '../data/chatbotData';
import './QuickActions.css';

interface QuickActionsProps {
  onActionClick: (query: string) => void;
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  const quickActions = chatbotData.quickActions;

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
      default:
        return '💬';
    }
  };

  return (
    <div className="quick-actions">
      <h3 className="quick-actions-title">Quick Actions</h3>
      <div className="quick-actions-grid">
        {quickActions.map((action: QuickAction) => (
          <button
            key={action.id}
            className="quick-action-btn"
            onClick={() => onActionClick(action.query)}
          >
            <span className="action-icon">{getCategoryIcon(action.category)}</span>
            <span className="action-label">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
