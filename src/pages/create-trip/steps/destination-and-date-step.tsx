import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../../components/button";
import { DateRange, DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css'
import { formatDate } from "../../../lib/formatDate";

interface DestinationAndDateStepProps {
    isGuestsInputOpen: boolean
    eventDateRange: DateRange | undefined
    closeGuestsInput: () => void
    openGuestsInput: () => void
    setDestination: (destination: string) => void
    setEventDateRange: (dates: DateRange | undefined) => void
}

export function DestinationAndDateStep({
    isGuestsInputOpen,
    eventDateRange,
    closeGuestsInput,
    openGuestsInput,
    setDestination,
    setEventDateRange
}: DestinationAndDateStepProps) {
    const [isDatePickerOpen, setDatePickerOpen] = useState(false)

    function openDatePicker() {
        setDatePickerOpen(true)
    }
    function closeDatePicker() {
        setDatePickerOpen(false)
    }

    const displayedDate = eventDateRange && eventDateRange.from ?
        `${formatDate(eventDateRange.from, 'pt-br')} até ${formatDate(eventDateRange.to || new Date(), 'pt-br')}` :
        null

    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
                <MapPin className="size-5 text-zinc-400" />
                <input disabled={isGuestsInputOpen} onChange={(event) => setDestination(event.target.value)} type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
            </div>

            <button onClick={openDatePicker} disabled={isGuestsInputOpen} className="flex items-center gap-2 text-left w-[240px]">
                <Calendar className="size-5 text-zinc-400" />
                <span className="text-lg text-zinc-400 w-40 flex-1">
                    {displayedDate || 'Quando?'}
                </span>
            </button>

            {isDatePickerOpen &&
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Selecione a data</h2>
                                <button onClick={closeDatePicker}>
                                    <X className="size-5 text-zinc-400" />
                                </button>
                            </div>
                        </div>

                        <DayPicker mode="range" selected={eventDateRange} onSelect={setEventDateRange} />
                    </div>
                </div>
            }

            <div className="w-px h-6 bg-zinc-800" />

            {isGuestsInputOpen ? (
                <Button onClick={closeGuestsInput} variant="secondary">
                    Alterar local/data
                    <Settings2 className="size-5" />
                </Button>
            ) : (
                <Button onClick={openGuestsInput}>
                    Continuar
                    <ArrowRight className="size-5" />
                </Button>
            )
            }
        </div>
    )
}