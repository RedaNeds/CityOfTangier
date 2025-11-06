import React, { useState, useEffect } from 'react';

interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  eventDate: string;
  endDate?: string;
  category: string;
  location?: {
    name?: string;
    address?: string;
  };
  price?: {
    amount?: number;
    currency?: string;
    free?: boolean;
  };
}

interface CalendarProps {
  events: Event[];
}

const EventsCalendar: React.FC<CalendarProps> = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);

  // Get events for a specific date
  const getEventsForDate = (date: Date): Event[] => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => {
      const eventDate = new Date(event.eventDate).toISOString().split('T')[0];
      const endDate = event.endDate ? new Date(event.endDate).toISOString().split('T')[0] : eventDate;
      return eventDate <= dateStr && dateStr <= endDate;
    });
  };

  // Get events for the current month
  const getEventsForMonth = (date: Date): Event[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return events.filter(event => {
      const eventDate = new Date(event.eventDate);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  // Handle date selection
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedEvents(getEventsForDate(date));
  };

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
    setSelectedEvents(getEventsForDate(today));
  };

  // Get category color
  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      'cultural': 'bg-purple-100 text-purple-800',
      'music': 'bg-blue-100 text-blue-800',
      'food-drink': 'bg-orange-100 text-orange-800',
      'art': 'bg-pink-100 text-pink-800',
      'sports': 'bg-green-100 text-green-800',
      'festival': 'bg-yellow-100 text-yellow-800',
      'workshop': 'bg-indigo-100 text-indigo-800',
      'other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.other;
  };

  // Format time
  const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const calendarDays = generateCalendarDays();
  const monthEvents = getEventsForMonth(currentDate);
  const today = new Date();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {currentDate.toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
          })}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Previous month"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToToday}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
          >
            Today
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Next month"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {calendarDays.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const isToday = day.toDateString() === today.toDateString();
          const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
          
          return (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              className={`
                relative p-2 h-20 text-left rounded-lg transition-all hover:bg-gray-50
                ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-900'}
                ${isToday ? 'bg-teal-100 font-semibold' : ''}
                ${isSelected ? 'bg-teal-200 ring-2 ring-teal-500' : ''}
                ${dayEvents.length > 0 ? 'border-l-4 border-teal-500' : ''}
              `}
            >
              <div className="text-sm font-medium mb-1">
                {day.getDate()}
              </div>
              
              {/* Event indicators */}
              <div className="space-y-1">
                {dayEvents.slice(0, 2).map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className={`
                      text-xs px-1 py-0.5 rounded truncate
                      ${getCategoryColor(event.category)}
                    `}
                    title={event.title}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-gray-500">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Date Events */}
      {selectedDate && selectedEvents.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Events on {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </h3>
          <div className="space-y-3">
            {selectedEvents.map(event => (
              <div key={event._id} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      <a 
                        href={`/events/${event.slug.current}`}
                        className="hover:text-teal-600 transition-colors"
                      >
                        {event.title}
                      </a>
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatTime(event.eventDate)}
                        {event.endDate && ` - ${formatTime(event.endDate)}`}
                      </span>
                      {event.location?.name && (
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location.name}
                        </span>
                      )}
                      {event.price && (
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          {event.price.free ? 'Free' : `${event.price.amount} ${event.price.currency}`}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No events message */}
      {selectedDate && selectedEvents.length === 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl text-center">
          <div className="text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>No events scheduled for this date</p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Event Categories</h4>
        <div className="flex flex-wrap gap-2">
          {['cultural', 'music', 'food-drink', 'art', 'sports', 'festival', 'workshop'].map(category => (
            <div key={category} className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${getCategoryColor(category).replace('text-', 'bg-').replace('-800', '-500')}`}></div>
              <span className="text-xs text-gray-600 capitalize">{category.replace('-', ' ')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsCalendar;

