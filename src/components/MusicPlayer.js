import React, {useState, useEffect} from 'react'
import { Button } from 'react-bootstrap'

const useAudio = (url) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [audio] = useState(new Audio(url))

    const toggleIsPlaying = () => {
        console.log("Before toggle", isPlaying)
        setIsPlaying(!isPlaying)
        console.log("After toggle", isPlaying)
    }

    useEffect(() => {
        if (isPlaying) {
            console.log(isPlaying)
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise
                    .then(_ => {
                        // Automatic playback started!
                        // Show playing UI.
                        console.log("audio played auto");
                    })
                    .catch(error => {
                        // Auto-play was prevented
                        // Show paused UI.
                        console.log("playback prevented");
                    });
            }
        } else {
            audio.pause()
        }
    }, [isPlaying])

    useEffect(() => {
        audio.addEventListener('ended', () => setIsPlaying(false))
        return () => {
            audio.removeEventListener('ended', () => setIsPlaying(false))
        }
    }, [])

    return [isPlaying, toggleIsPlaying]
}

// destructuring needed ?
const MusicPlayer = (props) => {
    const [isPlaying, toggleIsPlaying] = useAudio(props.url)

    return (
        <Button onClick={toggleIsPlaying} variant="secondary" size="lg" block>{isPlaying ? "Pause" : "Play"}</Button>
    )
}

export default MusicPlayer