export const availabilityOptionsLookup = {
  'weekend-morning': { value: 'weekend-morning', label: 'Weekend - Morning' },
  'weekend-evening': { value: 'weekend-evening', label: 'Weekend - Evening' },
  'weekdays-morning': { value: 'weekdays-morning', label: 'Weekdays - Morning' },
  'weekdays-evening': { value: 'weekdays-evening', label: 'Weekdays - Evening' },
  flexible: { value: 'flexible', label: 'Flexible' }
};

export const getEventOptions = (events) =>
  events.map((program) => ({
    value: program._id,
    label: [
      program.eventName,
      program.location,
      new Date(program.date).toISOString().split('T')[0],
      new Date(program.date).toISOString().split('T')[1].split('.')[0]
    ].join(' - ')
  }));
