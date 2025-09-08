import React, { useState } from 'react';
import EventFilters from './EventFilters';
import FilteredEvents from './FilteredEvents';

interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  category: string;
  eventDate: string;
  endDate?: string;
  location?: any;
  price?: any;
  featuredImage?: any;
  featured: boolean;
  tags?: string[];
}

interface EventsPageProps {
  events: Event[];
}

const EventsPage: React.FC<EventsPageProps> = ({ events }) => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);

  const handleFilteredEvents = (events: Event[]) => {
    setFilteredEvents(events);
  };

  return (
    <div>
      {/* Event Filters */}
      <EventFilters 
        events={events} 
        onFilteredEvents={handleFilteredEvents}
      />

      {/* Filtered Events Display */}
      <FilteredEvents 
        events={filteredEvents}
        showFeatured={true}
        title="All Events"
      />
    </div>
  );
};

export default EventsPage;

