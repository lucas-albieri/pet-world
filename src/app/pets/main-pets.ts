import { Pet } from "../types/pet";
import wallkingTurtle from '@assets/pets/Tartaruga/Walk.png';
import attackTurtle from '@assets/pets/Tartaruga/Attack.png';
import deathTurtle from '@assets/pets/Tartaruga/Death.png';
import hitTurtle from '@assets/pets/Tartaruga/Hurt.png';
import idleTurtle from '@assets/pets/Tartaruga/Idle.png';

export const mainPets = [
    {
        id: 1,
        name: 'Tartaruga',
        action: 'walk',
        isDead: false,
        viewRange: 100, // Distância de visão do pet
        attackRange: 50, // Distância de ataque do pet
        spriteSheet: {
            attack: {
                image: attackTurtle,
                frames: 6,
                fps: 10
            },
            death: {
                image: deathTurtle,
                frames: 6,
                fps: 10
            },
            hit: {
                image: hitTurtle,
                frames: 2,
                fps: 10
            },
            idle: {
                image: idleTurtle,
                frames: 4,
                fps: 10
            },
            walk: {
                image: wallkingTurtle,
                frames: 6,
                fps: 10
            }
        },
        stats: {
            level: 1,
            health: 100,
            maxHealth: 100,
            attack: 10,
            defense: 5,
            speed: 2,
            experience: 0,
            maxExperience: 100
        }
    }
] as Pet[];