import React, { useEffect, useRef, useState } from 'react';
import { fromDatetimeLocalValue, toDatetimeLocalValue } from '../utils/reminderUtils';
import '../Styles/ReminderStyles.css';

/**
 * anchorKey: `data-reminder-anchor` value on the row that opens this picker (e.g. note id or "compose").
 * Prevents the document listener from treating clicks on the bell icon as "outside" the picker.
 */
const ReminderPicker = ({ isOpen, onClose, initialMs, onSave, anchorKey }) => {
  const [value, setValue] = useState('');
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    setValue(initialMs != null ? toDatetimeLocalValue(Number(initialMs)) : '');
  }, [isOpen, initialMs]);

  useEffect(() => {
    if (!isOpen) return;
    const onDoc = (e) => {
      if (panelRef.current?.contains(e.target)) return;
      if (anchorKey != null) {
        const anchor = e.target.closest?.('[data-reminder-anchor]');
        if (
          anchor &&
          String(anchor.getAttribute('data-reminder-anchor')) === String(anchorKey)
        ) {
          return;
        }
      }
      onClose();
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [isOpen, onClose, anchorKey]);

  if (!isOpen) return null;

  const handleSave = () => {
    const ts = fromDatetimeLocalValue(value);
    if (ts == null) return;
    onSave(Number(ts));
    onClose();
  };

  const handleClear = () => {
    onSave(null);
    onClose();
  };

  return (
    <div
      className="reminder-picker"
      ref={panelRef}
      role="dialog"
      aria-label="Set reminder"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="reminder-picker-label">Remind me on</div>
      <input
        type="datetime-local"
        className="reminder-picker-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="reminder-picker-actions">
        <button type="button" className="reminder-picker-btn" onClick={handleClear}>
          Clear
        </button>
        <button type="button" className="reminder-picker-btn primary" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ReminderPicker;
