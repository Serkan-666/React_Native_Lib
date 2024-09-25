import { useEffect, useState, useCallback } from 'react';
import { Audio } from 'expo-av';
import { debounce } from 'lodash';

export default function useSound({ source }) {
    const [sound, setSound] = useState(null);

    async function playSound() {
        
        const { sound } = await Audio.Sound.createAsync(source);
        setSound(sound);

        
        await sound.playAsync();
    }

    const debouncedPlaySound = useCallback(debounce(playSound, 300), [source]);

    useEffect(() => {
        return sound
            ? () => {
                
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return { playSound: debouncedPlaySound };
}