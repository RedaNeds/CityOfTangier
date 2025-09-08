import React from 'react';

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

interface FilteredEventsProps {
  events: Event[];
  showFeatured?: boolean;
  showUpcoming?: boolean;
  title?: string;
}

const FilteredEvents: React.FC<FilteredEventsProps> = ({ 
  events, 
  showFeatured = false, 
  showUpcoming = false,
  title = "Events"
}) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
        <p className="text-gray-500">Try adjusting your filters to see more events.</p>
      </div>
    );
  }

  const categoryIcons = {
    'music': '🎵',
    'cultural': '🎭',
    'culture': '🎭',
    'food-drink': '🍽️',
    'art': '🎨',
    'sports': '⚽',
    'festival': '🎉',
    'workshop': '🔧',
    'other': '📅'
  };

  const getEventStatus = (event: Event) => {
    const eventDate = new Date(event.eventDate);
    const now = new Date();
    const isOngoing = event.endDate && new Date(event.endDate) > now;
    const isUpcoming = eventDate > now;
    const isToday = eventDate.toDateString() === now.toDateString();
    const isTomorrow = eventDate.toDateString() === new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString();
    const isThisWeekend = eventDate.getDay() === 0 || eventDate.getDay() === 6;

    if (isOngoing) return { text: 'Ongoing', class: 'bg-green-500 text-white' };
    if (isToday) return { text: 'Today', class: 'bg-green-500 text-white' };
    if (isTomorrow) return { text: 'Tomorrow', class: 'bg-blue-500 text-white' };
    if (isThisWeekend) return { text: 'This Weekend', class: 'bg-yellow-500 text-white' };
    if (isUpcoming) return { text: 'Upcoming', class: 'bg-blue-500 text-white' };
    return { text: 'Past', class: 'bg-gray-500 text-white' };
  };

  const formatPrice = (price: any) => {
    if (!price) return 'Free';
    if (typeof price === 'object' && price.amount) {
      return `${price.amount} ${price.currency || 'MAD'}`;
    }
    return price.toString();
  };

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        {title} ({events.length} event{events.length !== 1 ? 's' : ''})
      </h2>
      
      {showFeatured ? (
        // Featured events grid layout
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.slice(0, 6).map((event) => {
            const eventDate = new Date(event.eventDate);
            const status = getEventStatus(event);
            
            return (
              <div key={event._id} className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden transition-all hover:shadow-lg">
                {event.featuredImage ? (
                  <img 
                    src={event.featuredImage} 
                    alt={event.title}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="h-64 bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-4xl mb-2">{categoryIcons[event.category] || '🎉'}</div>
                      <h3 className="text-xl font-bold capitalize">{event.category}</h3>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                      {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.class}`}>
                      {status.text}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-500 text-sm mb-3">
                    {event.location?.name || event.location?.address || 'Location TBA'}
                  </p>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {event.category} {event.tags && event.tags.length > 0 && `• ${event.tags.slice(0, 2).join(', ')}`}
                    </span>
                    <a 
                      href={`/events/${event.slug.current}`} 
                      className="text-teal-600 hover:text-teal-800 font-medium"
                    >
                      View details →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // List layout for other events
        <div className="space-y-6">
          {events.map((event) => {
            const eventDate = new Date(event.eventDate);
            const status = getEventStatus(event);
            
            return (
              <div key={event._id} className="bg-white rounded-xl border border-[#F0F0F0] p-6 transition-all hover:shadow-md">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-2xl">{categoryIcons[event.category] || '📅'}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.class}`}>
                        {status.text}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">
                      {event.location?.name || event.location?.address || 'Location TBA'} • 
                      {eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                      {event.price && ` • ${formatPrice(event.price)}`}
                    </p>
                    <p className="text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {event.category} {event.tags && event.tags.length > 0 && `• ${event.tags.slice(0, 2).join(', ')}`}
                      </span>
                      <a 
                        href={`/events/${event.slug.current}`} 
                        className="text-teal-600 hover:text-teal-800 font-medium"
                      >
                        View details →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilteredEvents;

