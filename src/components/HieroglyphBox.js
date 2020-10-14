import React, { useState, useEffect } from 'react'
import { getRandomInt } from '../general-functions'
import { Container, Row, Col, Button } from 'react-bootstrap'
// import dict from '../../node_modules/japanese-json/kana.json'

const HieroglyphBox = () => {
    const [hieroglyph, setHieroglyph] = useState(null)

    useEffect(() => {
        fetch("https://kanjiapi.dev/v1/kanji/grade-1")
            .then(response => response.json())
            .then(data => {
                const randomInt = getRandomInt(1, data.length)
                fetch("https://kanjiapi.dev/v1/kanji/" + data[randomInt])
                    .then(response => response.json())
                    .then(data => {
                        setHieroglyph(data)
                        console.log(data)
                    })
            })
    }, [])


    return (
        <main id="box" className="text-center vertical-center text-white">
            <Container fluid style={{ maxWidth: "600px" }}>

                <article className="card">
                    <div className="card-body">
                        <Row>
                            <Col>
                                <h1 lang="ja-jp" className="p-1 display-1">{hieroglyph ? hieroglyph.kanji : "..."}</h1>
                                <h2 id="hint" style={{ opacity: "0" }} className="p-1 mb-5">{hieroglyph ? hieroglyph.heisig_en : "Загружается..."}</h2>
                                {/* <blockquote>{quotes ? quotes[randomInt].text : "Fetching random quote ..."}</blockquote>
                                <div>{quotes ? quotes[randomInt].author : "Fetching random quote author ..."}</div>*/}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <button className="btn btn-lg btn-secondary btn-block mb-2" onClick={() => {
                                    document.getElementById("hint").style.opacity = "1"
                                }}>Подсказка?</button>
                            </Col>
                            <Col>
                                <button className="btn btn-lg btn-secondary btn-block mb-2" onClick={() => {
                                    window.location.reload(true)
                                }}>Новый иероглиф?</button>

                            </Col>
                        </Row>
                    </div>
                </article>

            </Container>

        </main>
    )
}

export default HieroglyphBox