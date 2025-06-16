'use client'

import { useEffect, useState } from "react";
import { FrameData } from "../types/pet";
import { MachineSnapshot, MachineContext, AnyEventObject, AnyActorRef, StateValue, NonReducibleUnknown, MetaObject } from "xstate";

type Props = {
    totalFrames: number
    currentSprite: FrameData
    state: MachineSnapshot<MachineContext, AnyEventObject, Record<string, AnyActorRef>, StateValue, string, NonReducibleUnknown, MetaObject, any>
}

export function MyPet({ totalFrames, currentSprite, state }: Props) {

    const frameWidth = 48; // Largura de cada frame
    const scale = 3; // Fator de escala

    const [posX, setPosX] = useState(100)
    const [direction, setDirection] = useState<'right' | 'left'>('right')
    const [frameIndex, setFrameIndex] = useState(0)

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined

        if (state.matches('walking')) {
            interval = setInterval(() => {
                setFrameIndex((prev) => (prev + 1) % totalFrames)

                setPosX((prev) => {
                    const next = direction === 'right' ? prev + 2 : prev - 2
                    if (next >= window.innerWidth - frameWidth * scale) setDirection('left')
                    if (next <= 0) setDirection('right')
                    return next
                })
            }, 120)
        }
        else if (state.matches('idle')) {
            setFrameIndex(0)
            if (interval) clearInterval(interval)
        } else if (state.matches('chasing')) {
            interval = setInterval(() => {
                setFrameIndex((prev) => (prev + 1) % totalFrames)

                setPosX((prev) => {
                    const next = direction === 'right' ? prev + 3 : prev - 3
                    if (next >= window.innerWidth - frameWidth * scale) setDirection('left')
                    if (next <= 0) setDirection('right')
                    return next
                })
            }, 100)
        } else if (state.matches('attacking')) {
            interval = setInterval(() => {
                setFrameIndex((prev) => (prev + 1) % totalFrames)
            }, 100)
        } else if (state.matches('hit')) {
            interval = setInterval(() => {
                setFrameIndex((prev) => (prev + 1) % totalFrames)
            }, 200)
        } else if (state.matches('dead')) {
            interval = setInterval(() => {
                setFrameIndex((prev) => (prev + 1) % totalFrames)
            }, 200)
        }

        return () => { if (interval) clearInterval(interval) }
    }, [state.value, direction])

    return (
        <div
            style={{
                position: 'absolute',
                top: 200,
                left: posX,
                width: frameWidth * scale, // Ex: 144
                height: frameWidth * scale,
                backgroundImage: `url("${currentSprite.image.src}")`, // Usando o caminho da imagem
                backgroundRepeat: 'no-repeat',
                backgroundPosition: `-${frameIndex * frameWidth * scale}px 0px`, // desloca horizontalmente
                backgroundSize: `${frameWidth * totalFrames * scale}px ${frameWidth * scale}px`, // Ex: 576x144
                transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
                transformOrigin: 'center',
                imageRendering: 'pixelated',
            }}
        />
    )
}