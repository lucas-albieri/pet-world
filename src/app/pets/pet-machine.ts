import { createMachine } from 'xstate'

export const petMachine = createMachine({
    id: 'pet',
    initial: 'idle',
    states: {
        idle: {
            on: {
                WALK: 'walking',
                SEE_ENEMY: 'chasing',
                HIT: 'hit',
                DIE: 'dead',
            },
        },
        walking: {
            on: {
                IDLE: 'idle',
                SEE_ENEMY: 'chasing',
                HIT: 'hit',
                DIE: 'dead',
            },
        },
        chasing: {
            on: {
                ATTACK: 'attacking',
                LOST_ENEMY: 'walking',
                HIT: 'hit',
                DIE: 'dead',
            },
        },
        attacking: {
            on: {
                ENEMY_DEFEATED: 'walking',
                HIT: 'hit',
                DIE: 'dead',
            },
        },
        hit: {
            after: {
                500: 'walking', // volta a andar depois de tomar hit
            },
        },
        dead: {
            on: {
                RESPAWN: 'idle', // pode ser usado para reiniciar o pet
                WALK: 'walking',
                SEE_ENEMY: 'chasing',
                ATTACK: 'attacking',
                HIT: 'hit',
            }
        },
    },
})
