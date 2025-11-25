import React from 'react'
import { Link } from 'react-router-dom'

export default function EventCard({event}){
  return (
    <div className="border rounded overflow-hidden shadow-sm bg-white">
      <div className="h-40 bg-gray-200 flex items-center justify-center">Image</div>
      <div className="p-4">
        <h3 className="font-semibold">{event.title}</h3>
        <p className="text-sm text-gray-600">{event.date} · {event.place}</p>
        <div className="mt-3 flex justify-between items-center">
          <Link to={`/event/${event.id}`} className="text-blue-600 text-sm">Voir</Link>
          <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded">S'inscrire</button>
        </div>
      </div>
    </div>
  )
}
