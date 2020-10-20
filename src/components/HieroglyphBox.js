import React, { useState, useEffect } from 'react'
import { getRandomInt } from '../general-functions'
import { Container, Row, Col, Button } from 'react-bootstrap'
// import dict from '../../node_modules/japanese-json/kana.json'

const HieroglyphBox = () => {
    const [hieroglyphEntry, setHieroglyphEntry] = useState(null)
    const [backgroundImageUrl, setBackgroundImageUrl] = useState(null)

    const showHint = () => {
        document.getElementById("hint").style.opacity = "1"
    }

    const hideHint = () => {
        document.getElementById("hint").style.opacity = "0"
    }

    const loadNewHieroglyphEntry = () => {
        document.getElementById("overlay").classList.remove("fadeout")
        document.getElementById("overlay").classList.add("fadein")
        fetch("https://kanjiapi.dev/v1/kanji/grade-1")
            .then(r => r.json())
            .then(data => {
                fetch("https://kanjiapi.dev/v1/kanji/" + data[getRandomInt(1, data.length)])
                    .then(r => r.json())
                    .then(data => {
                        setHieroglyphEntry(data)
                        console.log(data)
                    })
            })
    }

    const loadNewBackgroundImage = () => {
        fetch("https://source.unsplash.com/collection/1252289")
            .then(r => {
                setBackgroundImageUrl(r.url)
                console.log(r.url)
            })
            .then(() => {
                document.getElementById("overlay").classList.remove("fadein")
                document.getElementById("overlay").classList.add("fadeout")
            })
    }

    useEffect(() => {
        loadNewHieroglyphEntry()
        loadNewBackgroundImage()
    }, [])

    // useEffect(() => {
    //     fetch("https://kanjiapi.dev/v1/kanji/grade-1")
    //         .then(response => response.json())
    //         .then(data => {
    //             const randomInt = getRandomInt(1, data.length)
    //             fetch("https://kanjiapi.dev/v1/kanji/" + data[randomInt])
    //                 .then(response => response.json())
    //                 .then(data => {
    //                     setHieroglyph(data)
    //                     console.log(data)
    //                 })
    //         })
    // }, [])


    return (
        <main id="box" className="text-center vertical-center text-white" style={{backgroundImage: `url(${backgroundImageUrl})`}}>
            <div id="overlay"></div>
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
                                    hideHint()
                                    loadNewHieroglyphEntry()
                                    loadNewBackgroundImage()
                                }}>Another hieroglyph</button>
                            </Col>
                        </Row>
                    </div>
                </article>

            </Container>

        </main>
    )
}

export default HieroglyphBox