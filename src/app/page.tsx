'use client'

import { useEffect, useState } from "react";
import spriteSheet from '@assets/pets/Tartaruga/Walk.png'
import { useMachine } from "@xstate/react";
import { petMachine } from "./pets/pet-machine";
import { mainPets } from "./pets/main-pets";
import { MyPet } from "./_components/my-pet";

export default function Home() {

  const [state, send] = useMachine(petMachine)
  const actualState = typeof state.value === 'string' ? state.value : JSON.stringify(state.value)
  const turtle = mainPets[0]

  const stateToActionMap: Record<string, keyof typeof turtle.spriteSheet> = {
    idle: 'idle',
    walking: 'walk',
    chasing: 'walk',   // Se quiser, mude para outra animação
    attacking: 'attack',
    hit: 'hit',
    dead: 'death'
  };

  const currentAction = typeof state.value === 'string'
    ? stateToActionMap[state.value] || 'idle'
    : 'idle';

  const currentSprite = turtle.spriteSheet[currentAction];

  return (
    <div className="w-screen h-screen bg-blue-300 relative overflow-hidden">
      <div className="p-4">
        <h2>{turtle.name}</h2>
        <p>Estado atual: {actualState}</p>

        <div className="flex gap-2 mt-4">
          <button onClick={() => send({ type: 'WALK' })}>Andar</button>
          <button onClick={() => send({ type: 'SEE_ENEMY' })}>Viu Inimigo</button>
          <button onClick={() => send({ type: 'ATTACK' })}>Atacar</button>
          <button onClick={() => send({ type: 'HIT' })}>Tomou Dano</button>
          <button onClick={() => send({ type: 'DIE' })}>Morrer</button>
        </div>
      </div>
      <MyPet
        totalFrames={currentSprite.frames}
        currentSprite={currentSprite}
        state={state}

      />
    </div>
  );
}
