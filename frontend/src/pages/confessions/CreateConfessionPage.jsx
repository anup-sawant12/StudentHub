import { useNavigation } from "../../context/NavigationContext";
import { useConfessions } from "../../hooks/useConfessions";
import ConfessionForm from "../../components/confessions/ConfessionForm";
import "./CreateConfessionPage.css";

export default function CreateConfessionPage() {
  const { navigateToList } = useNavigation();
  const { addConfession } = useConfessions();

  return (
    <div className="create-conf-page">
      {/* Back button */}
      <div className="create-conf-header">
        <button onClick={navigateToList} className="btn-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="back-arrow-icon">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Timeline
        </button>
      </div>

      <div className="create-conf-content">
        <ConfessionForm onAdd={addConfession} />
      </div>
    </div>
  );
}
