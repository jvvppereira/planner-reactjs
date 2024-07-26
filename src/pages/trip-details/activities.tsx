import { CircleCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Activity {
    date: string
    activities: {
        id: string
        title: string
        occurs_at: string
    }[]
}

export function Activities() {
    const { tripId } = useParams()
    const [activities, setActivities] = useState<Activity[]>([])

    useEffect(() => {
        api.get(`/trips/${tripId}/activities`).then(response => setActivities(response.data.activities))
    }, [tripId])

    function format(date: string, type: string) {
        const options = {};

        switch (type) {
            case 'day':
                options['day'] = 'numeric';
                break;
            case 'weekDay':
                options['weekday'] = 'long';
                break;
            case 'hour':
                options['hour12'] = false;
                options['hour'] = 'numeric';
                options['minute'] = 'numeric';
                break;
            default:
                break;
        }


        return new Intl.DateTimeFormat('pt-BR', options).format(new Date(date));
    }

    return (
        <div className="space-y-8">

            {activities.map(day => {
                return (
                    <div key={day.date} className="space-y-2.5">
                        <div className="flex gap-2 items-baseline">
                            <span className="text-xl text-zinc-300 font-semibold">Dia {format(day.date, 'day')}</span>
                            <span className="text-xs text-zinc-500">{format(day.date, 'weekDay')}</span>
                        </div>
                        {day.activities.length > 0 ? (
                            <div className="space-y-2.5">
                                {day.activities.map(activity => {
                                    return (
                                        <div key={activity.id} className="space-y-2.5">
                                            <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                                                <CircleCheck className="size-5 text-lime-300" />
                                                <span className="text-zinc-100">{activity.title}</span>
                                                <span className="text-zinc-400 text-sm ml-auto">{format(activity.occurs_at, 'hour')}h</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
                        )}
                    </div>
                )
            })}
        </div>
    )
}