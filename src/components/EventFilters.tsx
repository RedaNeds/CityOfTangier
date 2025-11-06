import React, { useState, useEffect } from 'react';

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

interface EventFiltersProps {
  events: Event[];
  onFilteredEvents: (events: Event[]) => void;
}

const EventFilters: React.FC<EventFiltersProps> = ({ events, onFilteredEvents }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);

  const filters = [
    { key: 'all', label: 'All Events', count: events.length },
    { key: 'music', label: 'Music', count: events.filter(e => e.category === 'music').length },
    { key: 'culture', label: 'Culture', count: events.filter(e => e.category === 'culture' || e.category === 'cultural').length },
    { key: 'food-drink', label: 'Food & Drink', count: events.filter(e => e.category === 'food-drink').length },
    { key: 'art', label: 'Art', count: events.filter(e => e.category === 'art').length },
  ];

  useEffect(() => {
    let filtered = events;

    if (activeFilter !== 'all') {
      if (activeFilter === 'culture') {
        // Include both 'culture' and 'cultural' categories
        filtered = events.filter(event => 
          event.category === 'culture' || event.category === 'cultural'
        );
      } else {
        filtered = events.filter(event => event.category === activeFilter);
      }
    }

    setFilteredEvents(filtered);
    onFilteredEvents(filtered);
  }, [activeFilter, events, onFilteredEvents]);

  const handleFilterClick = (filterKey: string) => {
    setActiveFilter(filterKey);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => handleFilterClick(filter.key)}
          className={`
            px-4 py-3 rounded-xl font-medium transition-all duration-200
            ${activeFilter === filter.key
              ? 'bg-teal-600 text-white shadow-lg transform scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
            }
          `}
        >
          <div className="text-center">
            <div className="font-semibold">{filter.label}</div>
            <div className={`text-sm mt-1 ${
              activeFilter === filter.key ? 'text-teal-100' : 'text-gray-500'
            }`}>
              {filter.count} event{filter.count !== 1 ? 's' : ''}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default EventFilters;

