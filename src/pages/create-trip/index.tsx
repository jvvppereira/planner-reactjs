
import { ArrowRight, AtSign, Calendar, MapPin, Plus, Settings2, User, UserRoundPlus, X } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";

export function CreateTripPage() {
  const navigate = useNavigate()

  const [isGuestsInputOpen, setGestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setGestsModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState([
    'joao@paes.com'
  ]);

  function openGuestsInput() {
    setGestsInputOpen(true)
  }
  function closeGuestsInput() {
    setGestsInputOpen(false)
  }

  function openGuestsModal() {
    setGestsModalOpen(true)
  }
  function closeGuestsModal() {
    setGestsModalOpen(false)
  }

  function openConfirmModal() {
    setConfirmModalOpen(true)
  }
  function closeConfirmModal() {
    setConfirmModalOpen(false)
  }

  function addEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget)
    const email = data.get("email")?.toString()

    if (!email) return

    if (emailsToInvite.includes(email)) return

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ])

    event.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)

    setEmailsToInvite(newEmailList)
  }

  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    navigate('/trips/123')
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="planner" />
          <p className="text-zinc-300 text-lg">Convide seu amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
          />

          {isGuestsInputOpen &&
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <button onClick={openGuestsModal} className="flex items-center gap-2 flex-1 text-left">
                <UserRoundPlus className="size-5 text-zinc-400" />
                {emailsToInvite.length > 0 ?
                  <span className="text-zinc-100 text-lg flex-1">{emailsToInvite.length} pessoa(s) convidada(s)</span>
                  :
                  <span className="text-zinc-400 text-lg flex-1">Quem estará na viagem?</span>
                }
              </button>

              <div className="w-px h-6 bg-zinc-800" />

              <button onClick={openConfirmModal} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Confirmar viagem
                <ArrowRight className="size-5" />
              </button>
            </div>
          }
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a className="text-zinc-300 underline" href="#">temos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>
        </p>
      </div>

      {isGuestsModalOpen &&
        <InviteGuestsModal
          emailsToInvite={emailsToInvite}
          addEmailToInvite={addEmailToInvite}
          closeGuestsModal={closeGuestsModal}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      }

      {isConfirmModalOpen &&
        <ConfirmTripModal
          closeConfirmModal={closeConfirmModal}
          createTrip={createTrip}
        />
      }
    </div>
  );
}
