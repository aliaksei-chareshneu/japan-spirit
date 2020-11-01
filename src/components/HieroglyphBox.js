import React, { useState, useEffect } from 'react'
import { getRandomInt } from '../general-functions'
import { Container, Row, Col, Button } from 'react-bootstrap'
import MusicPlayer from './MusicPlayer'
// import dict from '../../node_modules/japanese-json/kana.json'

const HieroglyphBox = () => {
    const [hieroglyphEntry, setHieroglyphEntry] = useState(null)
    const [backgroundImageUrl, setBackgroundImageUrl] = useState(null)
    // const [tempHieroglyph, setTempHieroglyph] = useState(null)

    const showHint = () => {
        document.getElementById("hint").style.opacity = "1"
    }

    const hideHint = () => {
        document.getElementById("hint").style.opacity = "0"
    }

    const blurButtons = () => {
        [...document.querySelectorAll('button')].forEach(b => b.blur())
    }

    const fadeInAnimation = () => {
        return new Promise((resolve) => {
            const overlay = document.getElementById("overlay");
            const onAnimationEndCallback = () => {
                overlay.removeEventListener('animationend', onAnimationEndCallback);
                resolve("Animation ended, callback function removed");
            }

            overlay.addEventListener('animationend', onAnimationEndCallback)
            overlay.classList.remove("fadeout")
            overlay.classList.add("fadein")
        })
    }

    const loadNewHieroglyphEntry = () => {
        return new Promise((resolve) => {
            console.log("Hieroglyph is being fetched...")
            fetch("https://kanjiapi.dev/v1/kanji/grade-1")
                .then(r => r.json())
                .then(data => {
                    fetch("https://kanjiapi.dev/v1/kanji/" + data[getRandomInt(1, data.length)])
                        .then(r => r.json())
                        .then(data => {
                            // setTempHieroglyph(data)
                            console.log(data)
                            resolve(data)
                        })
                })
        })
    }

    const loadNewBackgroundImage = () => {
        return new Promise((resolve) => {
            console.log("Image is being fetched...")
            fetch("https://source.unsplash.com/collection/1252289")
                .then(r => {
                    // setBackgroundImageUrl(r.url)
                    console.log(r.url)
                    resolve(r.url)
                })
        }) 
    }

    const loadingWrapper = () => {
        // return Promise.all or just Promise.all?
        return Promise.all([fadeInAnimation(), loadNewHieroglyphEntry(), loadNewBackgroundImage()]).then((values) => {
            hideHint()
            blurButtons()
            console.log(values);
            setHieroglyphEntry(values[1])
            setBackgroundImageUrl(values[2])
            document.getElementById("overlay").classList.remove("fadein")
            document.getElementById("overlay").classList.add("fadeout")
        })
    }

    useEffect(() => {
        Promise.all([loadNewHieroglyphEntry(), loadNewBackgroundImage()]).then((values) => {
            console.log(values)
            setHieroglyphEntry(values[0])
            setBackgroundImageUrl(values[1])
            document.getElementById("overlay").classList.remove("fadein")
            document.getElementById("overlay").classList.add("fadeout")
        })

        // loadingWrapper()

        // loadNewHieroglyphEntry()
        // loadNewBackgroundImage()

        const overlay = document.getElementById("overlay")
        overlay.onanimationstart = (e) => {
            console.log(`Start of ${e.animationName} animation`)
            // return new Promise(resolve => resolve(`Start of ${e.animationName} animation`))
        }

        overlay.onanimationend = (e) => {
            // return new Promise(resolve => resolve(`End of ${e.animationName} animation`))
            console.log(`End of ${e.animationName} animation`)
        }
    }, [])

    return (
        <main id="box" className="text-center vertical-center text-white" style={{backgroundImage: `url(${backgroundImageUrl})`}}>
            <div id="overlay" className="text-center display-2">Japan Spirit</div>
            <Container fluid style={{ maxWidth: "600px" }}>

                <article className="card">
                    <div className="card-body">
                        <Row>
                            <Col>
                                <h1 lang="ja-jp" className="p-1 display-1">{hieroglyphEntry ? hieroglyphEntry.kanji : "..."}</h1>
                                <h2 id="hint" style={{ opacity: "0" }} className="p-1 mb-5">{hieroglyphEntry ? hieroglyphEntry.heisig_en : "..."}</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <button className="btn btn-lg btn-secondary btn-block mb-2" onClick={showHint}>Show hint</button>
                            </Col>
                            <Col>
                                <button className="btn btn-lg btn-secondary btn-block mb-2" onClick={() => {
                                    loadingWrapper()
                                    // loadNewHieroglyphEntry()
                                    // loadNewBackgroundImage()
                                }}>New hieroglyph</button>
                            </Col>
                            <Col>
                                <MusicPlayer url=""/>
                            </Col>
                        </Row>
                    </div>
                </article>

            </Container>

        </main>
    )
}

export default HieroglyphBox