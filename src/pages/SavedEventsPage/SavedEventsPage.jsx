import { useState, useEffect } from "react";
import "./SavedEventsPage.css"
import React from 'react';
import SavedConcertCardsMui from './SavedConcertCardsMui';
import SavedYelpCardsMui from './SavedYelpCardsMui';

export default function SavedEvents({ getEvents, events, setEvents, savedYelpData }) {
    const [error, setError] = useState('');
    const [edit, setEdit] = useState(false);
    return (
        <div>
            <h1>Saved Page</h1>
            {events.map((e, idx) =>
                <SavedConcertCardsMui e={e} idx={idx} getEvents={getEvents} events={events} />
            )}

            {savedYelpData.map((y, idx) =>
                <SavedYelpCardsMui y={y} idx={idx} getEvents={getEvents} events={events} />
            )}
        </div>
    )
}