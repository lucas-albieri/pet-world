import { StaticImageData } from "next/image"

export type Pet = {
    id: number
    name: string
    spriteSheet: SpriteSheetMap
    viewRange: number // Distância de visão do pet
    attackRange: number // Distância de ataque do pet
    action: PetAction
    stats: PetStats
    isDead: boolean
}

type PetStats = {
    level: number
    health: number
    maxHealth: number
    attack: number
    defense: number
    speed: number
    experience: number
    maxExperience: number
}

export type FrameData = {
    image: StaticImageData
    frames: number
    fps: number
}

type PetAction = 'idle' | 'walk' | 'attack' | 'hit' | 'death'
type SpriteSheetMap = Record<PetAction, FrameData>