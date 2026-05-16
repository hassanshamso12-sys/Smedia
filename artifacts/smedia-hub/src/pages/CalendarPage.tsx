import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useAuth } from '@/lib/context/AuthContext';
import { db } from '@/lib/firebase/config';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import styles from './CalendarPage.module.css';

interface CalendarEvent {
  id: string;
  title: string;
  clientName?: string;
  location?: string;
  projectType: 'shoot' | 'edit' | 'post' | 'meeting' | 'holiday';
  assignedUsers?: string[];
  start: Date;
  end: Date;
  description?: string;
}

const LEBANON_HOLIDAYS_2026 = [
  { title: 'New Year Day', start: '2026-01-01', projectType: 'holiday' },
  { title: 'Armenian Christmas', start: '2026-01-06', projectType: 'holiday' },
  { title: 'St. Maron Day', start: '2026-02-09', projectType: 'holiday' },
  { title: 'Annunciation Day', start: '2026-03-25', projectType: 'holiday' },
  { title: 'Eid al-Fitr', start: '2026-03-20', projectType: 'holiday' },
  { title: 'Good Friday (Western)', start: '2026-04-03', projectType: 'holiday' },
  { title: 'Easter Sunday (Western)', start: '2026-04-05', projectType: 'holiday' },
  { title: 'Good Friday (Eastern)', start: '2026-04-10', projectType: 'holiday' },
  { title: 'Easter Sunday (Eastern)', start: '2026-04-12', projectType: 'holiday' },
  { title: 'Labor Day', start: '2026-05-01', projectType: 'holiday' },
  { title: 'Eid al-Adha', start: '2026-05-27', projectType: 'holiday' },
  { title: 'Islamic New Year', start: '2026-06-16', projectType: 'holiday' },
  { title: 'Ashura', start: '2026-06-25', projectType: 'holiday' },
  { title: 'Assumption of Mary', start: '2026-08-15', projectType: 'holiday' },
  { title: 'Prophet Muhammad Birthday', start: '2026-08-25', projectType: 'holiday' },
  { title: 'Independence Day', start: '2026-11-22', projectType: 'holiday' },
  { title: 'Christmas Day', start: '2026-12-25', projectType: 'holiday' },
];

const CalendarPage = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    clientName: '',
    location: '',
    projectType: 'shoot' as const,
    description: '',
    assignedUsers: '',
    startTime: '09:00',
    endTime: '10:00'
  });

  useEffect(() => {
    if (authLoading) return;
    
    const unsub = onSnapshot(collection(db, 'calendar_events'), (snap) => {
      const dbEvents = snap.docs.map(d => ({
        id: d.id,
        ...d.data(),
        start: (d.data().start as Timestamp).toDate(),
        end: (d.data().end as Timestamp).toDate(),
        color: getEventColor(d.data().projectType)
      }));
      
      const holidayEvents = LEBANON_HOLIDAYS_2026.map(h => ({
        ...h,
        id: `holiday-${h.title}`,
        allDay: true,
        display: 'background',
        backgroundColor: 'rgba(46, 204, 113, 0.15)',
        textColor: '#2ecc71'
      }));

      setEvents([...dbEvents, ...holidayEvents]);
    });

    return () => unsub();
  }, [authLoading]);

  const getEventColor = (type: string) => {
    switch (type) {
      case 'shoot': return '#ff4d4d';
      case 'edit': return '#004de5';
      case 'post': return '#00e5ff';
      case 'meeting': return '#f9cb28';
      default: return '#666';
    }
  };

  const handleDateClick = (arg: any) => {
    if (!isAdmin) return;
    setSelectedDate(arg.dateStr);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;

    const start = new Date(`${selectedDate}T${form.startTime}`);
    const end = new Date(`${selectedDate}T${form.endTime}`);

    try {
      await addDoc(collection(db, 'calendar_events'), {
        title: form.title,
        clientName: form.clientName,
        location: form.location,
        projectType: form.projectType,
        description: form.description,
        assignedUsers: form.assignedUsers.split(',').map(s => s.trim()),
        start: Timestamp.fromDate(start),
        end: Timestamp.fromDate(end),
        createdBy: user?.uid
      });
      setShowModal(false);
      setForm({ title: '', clientName: '', location: '', projectType: 'shoot', description: '', assignedUsers: '', startTime: '09:00', endTime: '10:00' });
    } catch (err) {
      alert('Failed to save event');
    }
  };

  const addToGoogleCalendar = (event: any) => {
    const start = new Date(event.start).toISOString().replace(/-|:|\.\d\d\d/g, "");
    const end = new Date(event.end).toISOString().replace(/-|:|\.\d\d\d/g, "");
    const details = `${event.description || ''}\n\nClient: ${event.clientName || 'N/A'}\nLocation: ${event.location || 'N/A'}\nResponsible: ${event.assignedUsers?.join(', ') || 'N/A'}`;
    
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(event.location || '')}`;
    window.open(url, '_blank');
  };

  if (authLoading) return <div className="loader">Loading...</div>;

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div>
            <h1 className="text-grad">Agency Calendar</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Manage shoots, edits, and posting schedules</p>
          </div>
          {isAdmin && (
            <button className="btn btn-primary" onClick={() => { setSelectedDate(new Date().toISOString().split('T')[0]); setShowModal(true); }}>
              + Add Event
            </button>
          )}
        </header>

        <div className={`glass ${styles.calendarCard}`}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={events}
            dateClick={handleDateClick}
            eventClick={(info) => {
              if (info.event.extendedProps.projectType === 'holiday') return;
              if (window.confirm(`Delete event "${info.event.title}"?`)) {
                deleteDoc(doc(db, 'calendar_events', info.event.id));
              }
            }}
            height="auto"
            eventContent={(eventInfo) => (
              <div className={styles.eventDetails} onClick={() => addToGoogleCalendar(eventInfo.event.extendedProps)}>
                <div className={`${styles.typeBadge} ${styles[eventInfo.event.extendedProps.projectType]}`}>
                  {eventInfo.event.extendedProps.projectType}
                </div>
                <div style={{ fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {eventInfo.event.title}
                </div>
                <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>
                  {eventInfo.event.extendedProps.clientName}
                </div>
              </div>
            )}
          />
        </div>

        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={`glass ${styles.modal}`}>
              <h2 className="text-grad">New Event</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Date: {selectedDate}</p>
              
              <form onSubmit={handleSave} className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label>Event Title</label>
                  <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. Fashion Shoot" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className={styles.field}>
                    <label>Client Name</label>
                    <input value={form.clientName} onChange={e => setForm({...form, clientName: e.target.value})} placeholder="Client Name" />
                  </div>
                  <div className={styles.field}>
                    <label>Project Type</label>
                    <select value={form.projectType} onChange={e => setForm({...form, projectType: e.target.value as any})}>
                      <option value="shoot">Shooting</option>
                      <option value="edit">Editing</option>
                      <option value="post">Posting</option>
                      <option value="meeting">Meeting</option>
                    </select>
                  </div>
                </div>
                <div className={styles.field}>
                  <label>Location</label>
                  <input value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="Shoot location or link" />
                </div>
                <div className={styles.field}>
                  <label>Assigned Users (Emails separated by comma)</label>
                  <input value={form.assignedUsers} onChange={e => setForm({...form, assignedUsers: e.target.value})} placeholder="user1@email.com, user2@email.com" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className={styles.field}>
                    <label>Start Time</label>
                    <input type="time" value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})} />
                  </div>
                  <div className={styles.field}>
                    <label>End Time</label>
                    <input type="time" value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})} />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>Description / Notes</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Specific responsibilities..." rows={3} />
                </div>

                <div className={styles.modalActions}>
                  <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Event</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CalendarPage;
